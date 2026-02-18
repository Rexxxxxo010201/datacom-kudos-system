# Kudos System Specification

## Functional Requirements

### User Stories

1. As an authenticated user, I can select a colleague from a list of employees.
2. As an authenticated user, I can write a kudos message (maximum 500 characters).
3. As an authenticated user, I can submit a kudos message to the system.
4. As a user, I can view a public feed of recently submitted kudos on the dashboard.
5. As a system administrator, I can manage users and access the internal portal.

<!-- ARCHITECT UPDATE: Added moderation capability -->
6. As an administrator, I can hide or remove inappropriate kudos messages from the public feed to maintain a safe and professional environment.

---

### Acceptance Criteria

- Users must be authenticated before creating kudos.
- User selection must be populated from an existing employee directory.
- Kudos message must enforce a 500 character limit.
- Submitted kudos appear in the dashboard feed within seconds.
- The dashboard feed displays kudos in reverse chronological order.
- Empty submissions or invalid users should return validation errors.

<!-- ARCHITECT UPDATE -->
- Administrators can mark a kudos message as hidden.
- Hidden kudos should not appear in the public feed.
- Only users with admin role can perform moderation actions.

---

## Technical Design

### System Architecture Overview

The Kudos system will follow a standard web application architecture:

- Frontend: React based UI
- Backend: Node.js with Express REST API
- Database: PostgreSQL relational database
- Authentication: Existing internal SSO integration

---

### Database Schema

#### Users Table
- id (UUID, Primary Key)
- name (string)
- email (string)
- role (string)

#### Kudos Table
- id (UUID, Primary Key)
- sender_id (UUID, Foreign Key → Users)
- receiver_id (UUID, Foreign Key → Users)
- message (text)
- created_at (timestamp)

<!-- ARCHITECT UPDATE: Moderation fields added -->
- is_visible (boolean, default true)
- moderated_by (UUID, nullable)
- moderated_at (timestamp, nullable)
- reason_for_moderation (text, nullable)

---

### API Endpoints

#### POST /api/kudos
Creates a new kudos entry.

Body:
- receiver_id
- message

Response:
- kudos object

#### GET /api/kudos
Returns a list of recent kudos.

Query Params:
- limit
- page

#### GET /api/users
Returns a list of users for dropdown selection.

<!-- ARCHITECT UPDATE: Moderation endpoint -->
#### PATCH /api/kudos/:id/moderate
Allows an administrator to hide or update visibility of a kudos message.

Body:
- is_visible
- reason_for_moderation

Authorization:
- Admin role required

---

### Frontend Components

- KudosForm
  - User dropdown selector
  - Message input
  - Submit button

- KudosFeed
  - Displays list of kudos cards

- DashboardPage
  - Combines form and feed

---

### Security Considerations

- Validate all inputs server side.
- Prevent XSS by sanitizing message content.
- Ensure authenticated sessions before allowing submissions.

<!-- ARCHITECT UPDATE -->
- Role-based access control to restrict moderation features to administrators.
- Rate limiting to prevent spam submissions.
- Content filtering checks before storing kudos messages.

---

## Implementation Plan

1. Define database schema and migrations.
2. Implement backend REST API routes.
3. Build frontend components for form and feed.
4. Connect frontend to backend endpoints.
5. Implement validation and error handling.
6. Add pagination to kudos feed.
7. Implement moderation workflow and admin controls.
8. Perform testing and deployment preparation.

---

## Testing Strategy

- Unit tests for API endpoints.
- Integration tests for submission workflow.
- UI tests for form validation and feed rendering.
- Moderation workflow testing.

---

## Deployment Considerations

- Containerized deployment using Docker.
- CI/CD pipeline integration.
- Environment configuration for database credentials.

## Reflection


Initial idea -> “just a kudos feature”  
Architect thinking -> realised missing concerns like moderation, misuse, and edge cases.

Spec-first approach -> forced clearer thinking before coding, which made implementation smoother and less ambiguous.

Big takeaway -> working with AI shifts the role from writing code to guiding decisions and thinking about system risks early.


