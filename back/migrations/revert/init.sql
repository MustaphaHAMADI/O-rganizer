-- Revert organizer:init from pg

BEGIN;

DROP TABLE "team", "employee", "status", "affected_status", "shift";

COMMIT;
