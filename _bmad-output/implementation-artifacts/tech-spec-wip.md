---
title: 'OpenVidu Integration & Meeting Management System'
slug: 'openvidu-meeting-system'
created: '2026-02-05T10:52:00.000Z'
status: 'in-progress'
stepsCompleted: [1, 2]
tech_stack: ['NestJS', 'TypeScript', 'TypeORM', 'PostgreSQL', 'JWT', 'OpenVidu', 'AWS S3']
files_to_modify: ['src/modules/meetings/meetings.module.ts', 'src/modules/recordings/recordings.module.ts', 'package.json']
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

### Acceptance Criteria

## Additional Context

### Dependencies

- OpenVidu server (external, already deployed)
- OpenVidu Node.js SDK
- AWS S3 for recording storage (already configured)
- Existing User and authentication system

### Testing Strategy

- Use existing Jest setup for basic endpoint testing
- Manual testing via HTTP files for OpenVidu integration
- Focus on API contract validation

### Notes

- OpenVidu server accessible at https://for-test.click
- Credentials should be stored in environment variables
- Recording storage via AWS S3 bucket configured by OpenVidu installation
