# AI Codebase Instructions & Architecture Overview

This document serves as a knowledge base for LLMs to quickly understand the project structure, patterns, and conventions of the `tutor-api`.

## Project is API for tutoring platform. Core feature - video calls and meetings using openVidu server (installed separately)
For now it is POC, we need to 
- build an API to identify (athenticate / authorize) users, 
- build an API to manage users, 
- build an API to control openVidu server, create video calls and meetings using openVidu server (installed separately)
- allow admin users to create/delete rooms, start/stop recordings of meeting
- allow users to join/leave rooms

The other functionality is still unknow (TBD)

## Codestyle and organization reference: see folder ./example
This folder contains *Another* project, built using almost the same technology stack, but with different different business logic. It is used as a reference for the current project.

For the clarification, see the next information:

## 1. Technology Stack
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Documentation**: Swagger (NestJS OpenApi)
- **Serialization**: `class-transformer`
- **Validation**: `class-validator`
- **Infrastructure**: AWS CDK
- **Videoserver**: OpenVidu server (installed separately), address and credentials should be stored in environment variables
- **Recordings Storage**: AWS S3 (bucket is created separately by OpenVidu installation, credentials should be stored in environment variables)
- **API**: REST, websockets if needed
- **Testing**: Jest, for now - only default test cases thay come with NestJs, no another tests should be added for now (will be added later, after POC stage). 
- **Versioning**: API versioning is not used yet, will be added later.

## 2. Project Structure
The project follows a modular architecture within `src/modules`.
- **`src/entities`**: Contains global TypeORM entity definitions.
- **`src/modules`**: Feature-specific modules (e.g., `users`, `meetings`, `auth`, ...etc).
- **`src/db/migrations`**: Database migrations.


## 3. Database Schema & Relationships
Key entities and their relationships observed:
- **`User`**: The central actor.
- **`Meeting`**: Info about meetings that were created by admin users - invited participants (users), links to recordings.
Other entities still unknown (TBD)

## 4. Coding Patterns & Conventions

### Response DTOs (Serialization)
- **Location**: `src/modules/<module-name>/responses/`
- **Naming**: `*.response.ts`
- **Decorator**: Controllers should use `@UseResponse(ResponseClass)` to automatically apply serialization. See UseResponce decorator implementation at the /example reference project.
- **Base Decorators**:
  - Classes must use `@Exclude()` to hide properties by default.
  - Properties exposed to the client must use `@Expose()`.
- **Swagger**: properties need `@ApiProperty()`.
- **Nested Objects**: 
  - When nesting objects (e.g., a `ProductResponse` inside `CartsProductsResponse`), you **MUST** use the `@Type(() => ClassName)` decorator from `class-transformer`. Without this, the nested object will not be serialized correctly.
  
  *Example:*
  ```typescript
  @Exclude()
  export class ParentResponse {
    @Expose()
    @ApiProperty()
    @Type(() => ChildResponse)
    child!: ChildResponse;
  }
  ```

### Services & repositories
- Business logic resides in `*.service.ts`.
- Standard TypeORM `Repository` pattern is used.
- Custom interfaces for inter-module communication may exist (e.g., `src/modules/ai-agent/interfaces-needed/`).

### Migrations
- Migrations are timestamped key files in `src/db/migrations`. Generated **ONLY** by TypeORM CLI. Never manually.
- Migrations are applied **ONLY** by TypeORM CLI. Never manually.
- Migrations can be extended manually only for case of seeding starting data.

### Seeding
- Seeding must be done within migrations.

## 5. Development Workflow
- **MCP Servers**: The project it is possible that there are MCP servers for local database access (yet they can be not available).