BEGIN;

CREATE TABLE "team" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "noun" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "employee" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "reg_number" TEXT NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "station" TEXT,
    "profile_picture" TEXT,
    "team_id" int NOT NULL REFERENCES "team"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "status" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "affected_status" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "comment" TEXT,
    "date" DATE NOT NULL,
    "team_id" int NOT NULL REFERENCES "team"("id"),
    "employee_id" int NOT NULL REFERENCES "employee"("id"),
    "status_id" int NOT NULL REFERENCES "status"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "shift" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "team_id" int NOT NULL REFERENCES "team"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;