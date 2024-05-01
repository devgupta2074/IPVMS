-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS employment_status_id_seq;

-- Table Definition
CREATE TABLE "public"."employment_status" (
    "id" int4 NOT NULL DEFAULT nextval('employment_status_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "joining_date" timestamp,
    "retirement_date" timestamp,
    "employment_type" varchar,
    "employment_status" varchar,
    "confirmation_date" timestamp,
    CONSTRAINT "employment_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."employment_status" ("id", "user_id", "joining_date", "retirement_date", "employment_type", "employment_status", "confirmation_date") VALUES
(11, 1, '2022-01-15 00:00:00', NULL, 'Full-time', 'Active', '2022-02-01 00:00:00');
INSERT INTO "public"."employment_status" ("id", "user_id", "joining_date", "retirement_date", "employment_type", "employment_status", "confirmation_date") VALUES
(12, 2, '2021-11-10 00:00:00', NULL, 'Full-time', 'Active', '2021-11-15 00:00:00');
INSERT INTO "public"."employment_status" ("id", "user_id", "joining_date", "retirement_date", "employment_type", "employment_status", "confirmation_date") VALUES
(13, 3, '2023-03-20 00:00:00', NULL, 'Part-time', 'Active', '2023-03-25 00:00:00');
INSERT INTO "public"."employment_status" ("id", "user_id", "joining_date", "retirement_date", "employment_type", "employment_status", "confirmation_date") VALUES
(14, 14, '2020-08-05 00:00:00', NULL, 'Full-time', 'Active', '2020-08-15 00:00:00'),
(15, 5, '2022-06-12 00:00:00', NULL, 'Full-time', 'Active', '2022-06-25 00:00:00'),
(16, 6, '2021-09-30 00:00:00', NULL, 'Contract', 'Active', '2021-10-10 00:00:00'),
(17, 7, '2023-01-02 00:00:00', NULL, 'Full-time', 'Active', '2023-01-15 00:00:00'),
(18, 8, '2022-04-18 00:00:00', NULL, 'Full-time', 'Active', '2022-05-01 00:00:00'),
(19, 9, '2020-12-08 00:00:00', NULL, 'Full-time', 'Active', '2020-12-15 00:00:00'),
(20, 10, '2023-05-20 00:00:00', NULL, 'Contract', 'Active', '2023-05-25 00:00:00');