-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS puser_id_seq;

-- Table Definition
CREATE TABLE "public"."puser" (
    "id" int2 NOT NULL DEFAULT nextval('puser_id_seq'::regclass),
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" int2,
    "password" text NOT NULL,
    "is_active" bool,
    "email" text NOT NULL,
    CONSTRAINT "puser_updateby_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."puser"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."puser" ("id", "first_name", "last_name", "created_at", "updated_at", "updated_by", "password", "is_active", "email") VALUES
(1, 'brianc', 'gal', '2024-03-20 10:31:26.211411', '2024-03-20 10:31:26.211411', NULL, '123456', NULL, 'brian.m.carlson@gmail.com');
INSERT INTO "public"."puser" ("id", "first_name", "last_name", "created_at", "updated_at", "updated_by", "password", "is_active", "email") VALUES
(3, 'brianc', 'gal', '2024-03-20 10:32:20.609935', '2024-03-20 10:32:20.609935', NULL, '123456', NULL, 'brian.m.carlson2@gmail.com');
INSERT INTO "public"."puser" ("id", "first_name", "last_name", "created_at", "updated_at", "updated_by", "password", "is_active", "email") VALUES
(4, 'Tapasvi', 'Arora', '2024-03-20 10:39:54.262225', '2024-03-20 10:39:54.262225', NULL, 'Tapasvi@123456789', NULL, 'Tapasviarora2002@gmail.com');
INSERT INTO "public"."puser" ("id", "first_name", "last_name", "created_at", "updated_at", "updated_by", "password", "is_active", "email") VALUES
(6, 'Tapasvi', 'Arora', '2024-03-20 10:41:56.01479', '2024-03-20 10:41:56.01479', NULL, 'Tapasvi@123456789', 't', 'Tapasviarora2003@gmail.com'),
(8, 'Tapasvi', 'Arora', '2024-03-20 10:42:31.684551', '2024-03-20 10:42:31.684551', NULL, 'Tapasvi@123456789', 't', 'Tapasviarora2004@gmail.com'),
(9, 'Tapasvi', 'Arora', '2024-03-20 10:44:57.695179', '2024-03-20 10:44:57.695179', NULL, 'Tapasvi@123456789', 't', 'abc2004@gmail.com'),
(10, 'Tapasvi', 'Arora', '2024-03-20 10:45:16.899839', '2024-03-20 10:45:16.899839', NULL, 'Tapasvi@123456789', 't', 'abc2008@gmail.com'),
(11, 'Tapasvi', 'Arora', '2024-03-20 10:45:51.744126', '2024-03-20 10:45:51.744126', NULL, 'Tapasvi@123456789', 't', 'abc2089@gmail.com'),
(12, 'Tapasvi', 'Arora', '2024-03-20 10:46:43.890906', '2024-03-20 10:46:43.890906', NULL, 'Tapasvi@123456789', 't', 'abc2019@gmail.com'),
(13, 'Tapasvi', 'Arora', '2024-03-20 10:46:59.09097', '2024-03-20 10:46:59.09097', NULL, 'Tapasvi@123456789', 't', 'abc200@gmail.com'),
(14, 'Tapasvi', 'Arora', '2024-03-20 10:47:35.700162', '2024-03-20 10:47:35.700162', NULL, 'Tapasvi@123456789', 't', 'abc100@gmail.com'),
(15, 'Tapasvi', 'Arora', '2024-03-20 10:50:06.760803', '2024-03-20 10:50:06.760803', NULL, 'Tapasvi@123456789', 't', 'abc0@gmail.com'),
(18, 'Tapasvi', 'Arora', '2024-03-20 10:50:58.995227', '2024-03-20 10:50:58.995227', NULL, 'Tapasvi@123456789', 't', 'abcsad0@gmail.com'),
(19, 'Tapasvi', 'Arora', '2024-03-20 10:53:09.583043', '2024-03-20 10:53:09.583043', NULL, 'Tapasvi@123456789', 't', 'abcsadsad0@gmail.com'),
(20, 'Tapasvi', 'Arora', '2024-03-20 11:05:41.802259', '2024-03-20 11:05:41.802259', NULL, 'Tapasvi@123456789', 't', 'abcsadsaasdd0@gmail.com'),
(21, 'Tapasvi', 'Arora', '2024-03-20 11:06:02.425898', '2024-03-20 11:06:02.425898', NULL, 'Tapasvi@123456789', 't', 'abcsadsaasasdd0@gmail.com'),
(22, 'Tapasvi', 'Arora', '2024-03-20 11:09:12.193405', '2024-03-20 11:09:12.193405', NULL, 'Tapasvi@123456789', 't', 'abdd0@gmail.com'),
(23, 'Tapasvi', 'Arora', '2024-03-20 11:20:21.213105', '2024-03-20 11:20:21.213105', NULL, 'Tapasvi@123456789', 't', 'ab0@gmail.com'),
(26, 'T', 'Arora', '2024-03-20 11:27:25.45441', '2024-03-20 11:27:25.45441', NULL, '$2a$10$qzHFSLOU..hgxWNB9c7BB.0Jv.9Z7O0JRWZsq3/8UojQsWCe6d5aC', 't', 'hello@gmail.com'),
(27, 'Tapasvi', 'Arora', '2024-03-21 08:23:49.570289', '2024-03-21 08:23:49.570289', NULL, '$2a$10$MhMgLWiHK49e3b57kyEAgOsI3NMdfygA/DgRkd89Siu9sHhljM/om', 't', 'hello@ex2india.com');