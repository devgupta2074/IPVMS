-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS template_version_id_seq;

-- Table Definition
CREATE TABLE "public"."template_version" (
    "id" int4 NOT NULL DEFAULT nextval('template_version_id_seq'::regclass),
    "version_number" float8,
    "doc_id" int4,
    "delta" json,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "created_by" int4,
    "updated_by" int4,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

