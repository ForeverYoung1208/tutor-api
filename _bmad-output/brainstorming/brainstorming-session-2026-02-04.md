---
stepsCompleted: [1, 2]
inputDocuments: []
session_topic: 'tutoring platform POC API development'
session_goals: 'brainstorm features, architecture decisions, and implementation approaches for video-based tutoring platform'
selected_approach: 'simplified-poc'
techniques_used: ['quick-poc-brainstorm']
context_file: ''
---

# Brainstorming Session Results

**Facilitator:** Ihor
**Date:** 2026-02-04

## Session Overview

**Topic:** tutoring platform POC API development
**Goals:** brainstorm features, architecture decisions, and implementation approaches for video-based tutoring platform

### Context Guidance

Project is building a NestJS-based tutoring platform API with OpenVidu integration for video calls. Core POC features include user authentication, user management, meeting orchestration, and recording capabilities. Technology stack includes TypeScript, TypeORM, PostgreSQL, Swagger, and AWS S3 for recordings storage.

### Session Setup

## Technique Selection

**Approach:** Simplified POC Brainstorm
**Analysis Context:** POC-focused tutoring platform development with essential features only

**Selected Technique:** Quick POC Brainstorm
- **Phase 1:** Core POC Features (5 min) - Absolute minimum needed to prove concept
- **Phase 2:** Technical Essentials (5 min) - NestJS modules and OpenVidu must-haves  
- **Phase 3:** POC Success Criteria (5 min) - What proves viability

**Rationale:** Streamlined approach focused on practical POC deliverables rather than comprehensive project planning.

## Quick POC Brainstorm Results

### Phase 1: Core POC Features

**What's the absolute minimum needed to prove the concept works?**

**Essential User Flows:**
- User registration/login (JWT auth with access/refresh tokens)
- Admin creates meeting room (multi-user capable)
- Users join existing meeting
- Basic video call functionality
- Start/stop recording
- View recording list

**Non-essential for POC:**
- Advanced user profiles
- Payment/billing
- Complex scheduling
- Whiteboard features
- Chat functionality
- Multi-language support

### Phase 2: Technical Essentials

**NestJS Modules You Absolutely Need:**
- `auth` - JWT authentication with access/refresh tokens (following example pattern)
- `users` - User entity, CRUD operations
- `meetings` - Meeting entity, OpenVidu integration
- `recordings` - Recording metadata, S3 links

**Authentication Requirements:**
- JWT with access tokens (short-lived) + refresh tokens (long-lived)
- Follow example/src/modules/auth pattern exactly
- PasswordAuthGuard for signin, JwtAuthGuard for protected routes
- JwtRefreshAuthGuard for token refresh endpoint

**OpenVidu Integration Must-Haves:**
- Create session API calls
- Generate tokens for users
- Start/stop recording
- Webhook handling for recording events

**Database Tables That Can't Wait:**
- `users` (id, email, password_hash, role)
- `meetings` (id, title, created_by, session_id, status)
- `recordings` (id, meeting_id, s3_url, created_at)

### Phase 3: POC Success Criteria

**What Proves This Approach Is Viable:**
- Multiple users can join same video call (admin-created multi-user meetings)
- Admin can create meeting room
- Recording starts and stops successfully
- Recording appears in S3 and can be accessed
- JWT auth with access/refresh tokens protects endpoints

**Minimum Viable Demo Functionality:**
- JWT auth endpoints (signin, refresh)
- Admin meeting creation endpoint
- User meeting join endpoint
- OpenVidu session/token generation
- Recording start/stop endpoints
- Recording list endpoint

**Quick Wins to Show Stakeholders:**
- Working API endpoints within 1 week
- OpenVidu integration with existing server
- Recording functionality
- Clean API documentation (Swagger)

## POC Implementation Priority (1-Week Timeline)

**Day 1-2: Core Setup**
1. Set up NestJS project structure
2. JWT auth module with access/refresh tokens (following example pattern)
3. User entity and registration/signin endpoints

**Day 3-4: OpenVidu Integration**
1. OpenVidu client setup for https://for-test.click
2. Meeting creation and management endpoints
3. Token generation for users

**Day 5: Recording & Polish**
1. Recording start/stop endpoints
2. Recording list endpoint
3. API documentation and testing

**Success Metrics:**
- ✅ Users can authenticate
- ✅ Meetings can be created and joined
- ✅ Video calls work reliably
- ✅ Recordings store and playback correctly
