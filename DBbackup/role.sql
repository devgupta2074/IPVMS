-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS role_id_seq;

-- Table Definition
CREATE TABLE "public"."role" (
    "id" int4 NOT NULL DEFAULT nextval('role_id_seq'::regclass),
    "name" varchar NOT NULL,
    "can_create" bool DEFAULT false,
    "can_delete" bool DEFAULT false,
    "can_update" bool DEFAULT false,
    "can_read" bool DEFAULT false,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "created_by" int4,
    "updated_by" int4,
    "updated_date" timestamp,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."role" ("id", "name", "can_create", "can_delete", "can_update", "can_read", "created_at", "created_by", "updated_by", "updated_date") VALUES
(1, 'user', 'f', 'f', 'f', 't', '2024-04-01 04:29:32.221261', NULL, NULL, NULL);
INSERT INTO "public"."role" ("id", "name", "can_create", "can_delete", "can_update", "can_read", "created_at", "created_by", "updated_by", "updated_date") VALUES
(2, 'admin', 't', 't', 't', 't', '2024-04-29 05:29:44.315849', NULL, NULL, NULL);
