# Kudos System Specification

## Functional Requirements

### User Stories

#### Recognition Workflow

1. **User selects a colleague**
   - Choose another employee from a directory
   - Current user excluded from selection

2. **User writes an appreciation message**
   - Maximum 500 characters
   - Message cannot be empty

3. **User submits kudos**
   - Stores sender, receiver, message, and timestamp
   - Shows confirmation after submission

4. **User views organisation recognition feed**
   - Displays recent visible kudos
   - Ordered by newest first

5. **User tracks personal activity**
   - Can view sent and received kudos
   - Supports chronological sorting


#### Identity and Access

6. **Authenticated usage**
   - Only logged in users can create or view kudos
   - Uses internal SSO

7. **Role based access**
   - Admin users have moderation privileges
   - Regular users see only approved content


#### Moderation and Governance

> ARCHITECT UPDATE: Added moderation capability
8. **Admin moderates recognition content**
   - Can hide inappropriate kudos without deleting records
   - Moderation metadata captured for auditing

9. **Visibility enforcement**
   - Hidden kudos excluded from public feed
   - Feed updates reflect moderation instantly

10. **User reporting behaviour**
   - Users can flag inappropriate kudos for admin review


#### Feed Experience Enhancements

11. **Feed filtering**
   - Filter by sender or recipient
   - Supports keyword matching

12. **Duplicate submission protection**
   - Prevent rapid identical kudos submissions

13. **Notification awareness**
   - Users receive feedback when kudos is received

---

### Acceptance Criteria

#### Recognition Submission
- Users must be authenticated before creating kudos.
- Message length limited to 500 characters.
- Empty or invalid submissions are rejected.
- Successful submissions appear in feed promptly.

#### Feed Behaviour
- Feed displays only entries where `is_visible = true`.
- Items sorted by most recent timestamp.
- Pagination supported for performance.

#### Moderation Behaviour
> ARCHITECT UPDATE:
- Administrators can mark kudos as hidden.
- Hidden kudos remain stored but are not visible to regular users.
- Moderation metadata (admin ID and timestamp) is recorded.

#### Security and Access
- Only admin role can access moderation actions.
- Inputs validated server side to prevent misuse.
- Rate limiting prevents spam submissions.

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

> ARCHITECT UPDATE: Moderation fields added
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

> ARCHITECT UPDATE: Moderation endpoint
#### PATCH /api/kudos/:id/moderate
Allows an administrator to update visibility of a kudos message.

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

> ARCHITECT UPDATE:
- Role based access control for moderation features.
- Rate limiting to reduce spam behaviour.
- Content filtering checks before storing kudos.

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

---

## Reflection

Initial idea -> “just a kudos feature”  
Architect thinking -> realised missing concerns like moderation, misuse, and edge cases.

Spec-first approach -> forced clearer thinking before coding, which made implementation smoother and less ambiguous.

Big takeaway -> working with AI shifts the role from writing code to guiding decisions and thinking about system risks early.
