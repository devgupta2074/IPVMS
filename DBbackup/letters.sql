-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS letters_id_seq;

-- Table Definition
CREATE TABLE "public"."letters" (
    "id" int4 NOT NULL DEFAULT nextval('letters_id_seq'::regclass),
    "template_id" int4,
    "filepath" varchar,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "created_by" int4,
    CONSTRAINT "letters_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."user_table"("id"),
    CONSTRAINT "letters_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."template"("id"),
    PRIMARY KEY ("id")
);

