-- Revert organizer:seeding from pg

BEGIN;

TRUNCATE TABLE "team", "employee", "status", "affected_status", "shift" CASCADE;

COMMIT;
