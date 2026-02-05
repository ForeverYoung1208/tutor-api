---
title: 'OpenVidu Integration & Meeting Management System'
slug: 'openvidu-meeting-system'
created: '2026-02-05T10:52:00.000Z'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['NestJS', 'TypeScript', 'TypeORM', 'PostgreSQL', 'JWT', 'OpenVidu', 'AWS S3']
files_to_modify: ['src/modules/meetings/meetings.module.ts', 'src/modules/recordings/recordings.module.ts', 'package.json', 'src/modules/openvidu/openvidu.module.ts', 'src/modules/openvidu/openvidu.service.ts', 'src/config/openvidu.config.ts', 'src/modules/meetings/meetings.service.ts', 'src/modules/meetings/meetings.controller.ts', 'src/modules/meetings/dto/create-meeting.dto.ts', 'src/modules/meetings/responses/meeting.response.ts', 'src/modules/recordings/recordings.service.ts', 'src/modules/recordings/recordings.controller.ts', 'src/modules/recordings/dto/recording-response.dto.ts', 'src/app.module.ts']
code_patterns: ['NestJS modular architecture', 'TypeORM entities with UUID', 'Response DTOs with @UseResponse decorator', 'JWT authentication', 'Role-based access control']
test_patterns: ['Jest testing framework', 'HTTP file testing']
---

# Tech-Spec: OpenVidu Integration & Meeting Management System

**Created:** 2026-02-05T10:52:00.000Z

## Overview

### Problem Statement

Need to integrate OpenVidu server for video conferencing functionality and build comprehensive meeting/recording management APIs on top of the existing NestJS authentication and user management foundation.

### Solution

Build OpenVidu client integration with meeting CRUD operations, token management, and recording control, following the established NestJS patterns and TypeORM entity structure already in place.

### Scope

**In Scope:**
- OpenVidu session creation and management
- Meeting CRUD operations (admin create, user list)
- Token generation for user meeting access
- Recording start/stop/management
- All API endpoints for meeting lifecycle

**Out of Scope:**
- Advanced features like meeting scheduling
- Participant permissions beyond basic join/leave
- Meeting analytics or reporting

## Context for Development

### Codebase Patterns

- **NestJS Modular Architecture**: Feature-specific modules in `src/modules/` with controllers, services, DTOs, and responses
- **TypeORM Entities**: UUID primary keys, proper relationships, enum types for status fields
- **Response DTOs**: Located in `responses/` subdirectories, use `@Exclude()` and `@Expose()` decorators, `@ApiProperty()` for Swagger
- **Serialization**: `@UseResponse(ResponseClass)` decorator on controllers for automatic response transformation
- **Authentication**: JWT with access/refresh tokens, role-based guards (admin/user)
- **Database**: PostgreSQL with TypeORM, migrations via CLI, foreign key relationships
- **Configuration**: Environment-based config via `@nestjs/config`, external service credentials in `.env`

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `src/entities/meeting.entity.ts` | Meeting entity with sessionId, status enum, user relationships |
| `src/entities/recording.entity.ts` | Recording entity with S3 URL, duration, status enum |
| `src/modules/auth/auth.service.ts` | JWT token generation and user validation patterns |
| `src/modules/users/users.service.ts` | CRUD service patterns with TypeORM repositories |
| `src/modules/users/responses/user.response.ts` | Response DTO patterns with serialization |
| `src/decorators/use-response.decorator.ts` | Custom decorator for automatic response serialization |
| `src/modules/meetings/meetings.module.ts` | Empty module scaffold to be implemented |
| `src/modules/recordings/recordings.module.ts` | Empty module scaffold to be implemented |
| `.env.example` | Environment variables including OpenVidu and AWS S3 credentials |
| `package.json` | Current dependencies (need to add OpenVidu SDK) |

### Technical Decisions

- **OpenVidu Integration**: Use OpenVidu Node.js SDK for session management and token generation
- **Authentication Flow**: Leverage existing JWT system for meeting access control
- **Database Schema**: Use existing Meeting and Recording entities, extend with OpenVidu session IDs
- **Recording Storage**: Utilize AWS S3 integration already configured in OpenVidu server
- **Module Structure**: Follow established patterns - create services, controllers, DTOs, and response classes
- **Error Handling**: Use existing exception filter system for consistent error responses
- **Configuration**: Add OpenVidu SDK configuration to existing config system

## Implementation Plan

### Tasks

- [ ] Task 1: Add OpenVidu SDK dependency
  - File: `package.json`
  - Action: Add `openvidu-node-client` to dependencies
  - Notes: Required for OpenVidu server integration

- [ ] Task 2: Create OpenVidu configuration service
  - File: `src/config/openvidu.config.ts`
  - Action: Create configuration service for OpenVidu URL and secret
  - Notes: Follow existing config patterns in `src/config/`

- [ ] Task 3: Create OpenVidu service
  - File: `src/modules/openvidu/openvidu.service.ts`
  - Action: Create service for session management and token generation
  - Notes: Implement session creation, token generation, and session lifecycle management

- [ ] Task 4: Create OpenVidu module
  - File: `src/modules/openvidu/openvidu.module.ts`
  - Action: Create module with OpenViduService and configuration
  - Notes: Import OpenViduModule in app.module.ts

- [ ] Task 5: Create Meeting DTOs
  - File: `src/modules/meetings/dto/create-meeting.dto.ts`
  - Action: Create DTO for meeting creation with title validation
  - Notes: Follow existing DTO patterns with class-validator

- [ ] Task 6: Create Meeting response DTOs
  - File: `src/modules/meetings/responses/meeting.response.ts`
  - Action: Create response DTO with proper serialization
  - Notes: Use @Exclude(), @Expose(), @ApiProperty(), @Type() decorators

- [ ] Task 7: Implement Meeting service
  - File: `src/modules/meetings/meetings.service.ts`
  - Action: Create service with CRUD operations and OpenVidu integration
  - Notes: Inject OpenViduService, use Meeting entity repository

- [ ] Task 8: Implement Meeting controller
  - File: `src/modules/meetings/meetings.controller.ts`
  - Action: Create controller with admin-only create and user list endpoints
  - Notes: Use @WithAuth decorator, @UseResponse decorator, proper Swagger documentation

- [ ] Task 9: Complete Meetings module
  - File: `src/modules/meetings/meetings.module.ts`
  - Action: Update module with controller, service, and entity imports
  - Notes: Follow existing module structure patterns

- [ ] Task 10: Create Recording DTOs
  - File: `src/modules/recordings/dto/recording-response.dto.ts`
  - Action: Create response DTO for recording data
  - Notes: Include S3 URL, duration, and status fields

- [ ] Task 11: Implement Recording service
  - File: `src/modules/recordings/recordings.service.ts`
  - Action: Create service for recording start/stop operations
  - Notes: Integrate with OpenVidu recording API, update Recording entities

- [ ] Task 12: Implement Recording controller
  - File: `src/modules/recordings/recordings.controller.ts`
  - Action: Create controller for recording management endpoints
  - Notes: Admin-only endpoints for start/stop, list recordings

- [ ] Task 13: Complete Recordings module
  - File: `src/modules/recordings/recordings.module.ts`
  - Action: Update module with controller, service, and entity imports
  - Notes: Follow existing module structure patterns

- [ ] Task 14: Create meeting join endpoint
  - File: `src/modules/meetings/meetings.controller.ts`
  - Action: Add POST /meetings/:id/join endpoint
  - Notes: Generate OpenVidu token for authenticated user

- [ ] Task 15: Update app module imports
  - File: `src/app.module.ts`
  - Action: Import OpenViduModule and update module imports
  - Notes: Ensure proper dependency injection setup

### Acceptance Criteria

- [ ] AC 1: Given an authenticated admin user, when creating a meeting with valid title, then meeting is created with OpenVidu session and returns meeting response with sessionId
- [ ] AC 2: Given an authenticated admin user, when creating a meeting with invalid title, then returns 400 validation error
- [ ] AC 3: Given an authenticated user, when listing meetings, then returns all meetings with proper response serialization
- [ ] AC 4: Given an authenticated user, when joining an existing meeting, then returns valid OpenVidu token for that session
- [ ] AC 5: Given an authenticated user, when joining non-existent meeting, then returns 404 error
- [ ] AC 6: Given an authenticated admin user, when starting recording for active meeting, then recording starts and recording entity is created with 'processing' status
- [ ] AC 7: Given an authenticated admin user, when stopping recording for recording meeting, then recording stops and recording entity is updated with 'ready' status and S3 URL
- [ ] AC 8: Given an authenticated admin user, when listing recordings, then returns all recordings with S3 URLs and metadata
- [ ] AC 9: Given an unauthenticated user, when accessing any meeting endpoint, then returns 401 error
- [ ] AC 10: Given an authenticated non-admin user, when creating meeting or starting recording, then returns 403 error
- [ ] AC 11: Given OpenVidu server connection failure, when performing any OpenVidu operation, then returns proper error response with logging
- [ ] AC 12: Given valid meeting creation, when checking database, then Meeting entity has correct sessionId, status, and createdBy relationship

## Additional Context

### Dependencies

- OpenVidu server (external, already deployed)
- OpenVidu Node.js SDK
- AWS S3 for recording storage (already configured)
- Existing User and authentication system

### Testing Strategy

- **Unit Tests**: Test service methods for OpenVidu integration, meeting CRUD operations, and recording management
- **Integration Tests**: Test controller endpoints with authentication guards and response serialization
- **Manual Testing**: Use HTTP files to test OpenVidu session creation, token generation, and recording workflows
- **API Contract Validation**: Verify all endpoints return proper response formats and error codes
- **Database Validation**: Ensure Meeting and Recording entities are created and updated correctly
- **OpenVidu Integration**: Test with actual OpenVidu server at https://for-test.click

### Notes

- **High-Risk Items**: OpenVidu server connectivity, token generation security, recording S3 URL handling
- **Known Limitations**: No meeting scheduling, basic participant permissions only
- **Future Considerations**: Meeting analytics, advanced permissions, meeting templates, webhook integration
- **Security Considerations**: Validate OpenVidu token generation, ensure admin-only operations are properly guarded
- **Performance Considerations**: Optimize database queries for meeting lists, handle concurrent session creation
