# Kudos System – Spec Driven Development

This repository contains the implementation of the "Kudos" feature developed as part of the Datacom Graduate Program.

## Approach

This project was built using a specification-first workflow rather than traditional coding-first development.

Process followed:
1. Generate initial feature specification using AI assistance.
2. Architect review and refinement of requirements.
3. Addition of moderation capabilities and security considerations.
4. Implementation generated based on approved specification.

## Project Structure

backend/
- Minimal Express API simulating Kudos system endpoints.
- Includes moderation workflow aligned with specification.

frontend/
- React component structure representing dashboard feed and kudos submission flow.

SPECIFICATION.md
- Final architect-reviewed specification used as source of truth.

## Key Design Decisions

- Content moderation introduced via `is_visible` and moderation metadata fields.
- Role-based access assumed for admin moderation actions.
- In-memory data model used to demonstrate architecture without infrastructure complexity.

## Note

This implementation is a conceptual demonstration aligned with spec-driven development principles.
