-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_id_seq;

-- Table Definition
CREATE TABLE "public"."user_table" (
    "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    "group_id" int4,
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_by" int4,
    "updated_at" timestamp,
    "password" varchar NOT NULL,
    "is_active" bool DEFAULT true,
    "employee_code" int2,
    "mobile_number" text,
    "password_reset" bool DEFAULT false,
    CONSTRAINT "user_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."role"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX user_pkey ON public.user_table USING btree (id);

INSERT INTO "public"."user_table" ("id", "group_id", "first_name", "last_name", "email", "created_at", "updated_by", "updated_at", "password", "is_active", "employee_code", "mobile_number", "password_reset") VALUES
(1, 1, 'John', 'Doe', 'john.doe@example.com', '2024-04-01 04:45:06.717038', NULL, NULL, 'password123', 't', NULL, NULL, NULL);
INSERT INTO "public"."user_table" ("id", "group_id", "first_name", "last_name", "email", "created_at", "updated_by", "updated_at", "password", "is_active", "employee_code", "mobile_number", "password_reset") VALUES
(2, 1, 'Test', 'User', 'restmail@ex2india.com', '2024-04-01 06:34:33.099972', NULL, NULL, '$2a$10$IkiZonUMZkfHq4YLi7UfPOr6vWtVtPPXge/bgGD8f3dHRKha0qLgy', 't', NULL, NULL, NULL);
INSERT INTO "public"."user_table" ("id", "group_id", "first_name", "last_name", "email", "created_at", "updated_by", "updated_at", "password", "is_active", "employee_code", "mobile_number", "password_reset") VALUES
(3, NULL, 'Test', 'User', 'pestmail@ex2india.com', '2024-04-01 06:35:27.53264', NULL, NULL, '$2a$10$19jaT3GEw4oN49czDoeNRu43ZMzYBx51Ta9ZqFaVZ88fQ2O/8Qnw.', 't', NULL, NULL, NULL);
INSERT INTO "public"."user_table" ("id", "group_id", "first_name", "last_name", "email", "created_at", "updated_by", "updated_at", "password", "is_active", "employee_code", "mobile_number", "password_reset") VALUES
(5, 1, 'rithvik', 'reddy', 'rithck@gmail.com', '2024-04-22 11:08:38.272008', NULL, NULL, 'nwenjewuijoew', 't', NULL, NULL, NULL),
(6, 1, 'siraj', 'reddy', 'siraj@gmail.com', '2024-04-22 11:09:16.88419', NULL, NULL, 'nwenjewuijoew', 't', NULL, NULL, NULL),
(7, 1, 'dheeraj', 'reddy', 'dheeraj@gmail.com', '2024-04-22 11:09:29.223168', NULL, NULL, 'nwenjewuijoew', 't', NULL, NULL, NULL),
(8, 1, 'sahil', 'reddy', 'sahil@gmail.com', '2024-04-22 11:09:47.547317', NULL, NULL, 'nwenjewuijoew', 't', NULL, NULL, NULL),
(9, 1, 'gunjeet', 'reddy', 'gunjeet@gmail.com', '2024-04-22 11:10:02.633888', NULL, NULL, 'nwenjewuijoew', 't', NULL, NULL, NULL),
(10, 1, 'john', 'king', 'jk@gmail.com', '2024-04-26 07:08:44.750654', NULL, NULL, 'jdhbeifvuhidwbvfh', 't', 9087, '9807676767', 't'),
(11, 1, 'John', 'King', 'john.king@example.com', '2024-04-26 07:21:54.520808', NULL, NULL, 'password123', 't', 1234, '1234567890', 't'),
(12, 1, 'Alice', 'Johnson', 'alice.johnson@example.com', '2024-04-26 07:21:54.520808', NULL, NULL, 'password456', 't', 5678, '9876543210', 'f'),
(13, 1, 'Bob', 'Smith', 'bob.smith@example.com', '2024-04-26 07:21:54.520808', NULL, NULL, 'password789', 't', 9101, '1112223333', 't'),
(14, 1, 'Emily', 'Davis', 'emily.davis@example.com', '2024-04-26 07:21:54.520808', NULL, NULL, 'passwordabc', 't', 1213, '4445556666', 'f'),
(15, 1, 'Michael', 'Brown', 'michael.brown@example.com', '2024-04-26 07:21:54.520808', NULL, NULL, 'passwordxyz', 'f', 1617, '7778889999', 't'),
(16, NULL, 'QA', 'QA', 'QA@ex2india.com', '2024-04-26 08:43:31.102959', NULL, NULL, '$2a$10$G0nsWvujHs/4hQwQ6RgZl.WNxHg5HcwEw7yFy.E.Zj.1kjX7p9wya', 't', NULL, NULL, 'f'),
(18, NULL, 'John', 'Snow', 'johnsnow2@ex2india.com', '2024-04-24 07:11:02.000662', NULL, '2024-04-24 07:11:02.000662', '$2a$10$hHWDFK369rAnJYNErcqdvO7ka94d4vfZ2BbrDmdN2NynbBX6tz5IS', 't', NULL, NULL, 'f'),
(19, NULL, 'Rithvik', 'Reddy', 'rithvik@ex2india.com', '2024-04-24 18:01:54.108701', NULL, '2024-04-24 18:01:54.108701', '$2a$10$dGIXvetP7l3gtyHvSu.RMugpRfMSHgJq.ZyVStEVenFAhHOmn.Lnq', 't', NULL, NULL, 'f'),
(20, NULL, 'Dev', 'Gupta', 'dgupta@ex2india.com', '2024-04-25 09:56:21.97073', NULL, '2024-04-25 09:56:21.97073', '$2a$10$uhCxXnv8rk4ublYgPtu85u7imjK/Xf1aJVB7wYygzXt0/xU.R2W.a', 't', NULL, NULL, 'f'),
(21, NULL, 'jake', 'lopas', 'johnsnow@ex2india.com', '2024-04-24 07:10:32.168112', NULL, '2024-04-24 07:10:32.168112', '$2a$10$7mGo5GXA0OR1egexfHyXNuson/b/2gmmEAJsVBgJf7QkSCrlccbwu', 't', NULL, NULL, 't'),
(22, NULL, 'Dev', 'Gupta', 'hello@ex2india.com', '2024-04-24 07:25:39.07527', NULL, '2024-04-24 07:25:39.07527', '$2a$10$svGy.1i2bRE/juHuOOmeXu9MSn.G/V.iwR16fGCA3ALf2ETKcoC9u', 't', NULL, NULL, 'f'),
(23, NULL, 'Tapasvi', '', 'kalob@ex2india.com', '2024-04-25 06:41:48.69762', NULL, '2024-04-25 06:41:48.69762', '$2a$10$0gd/Q46qqKz1K4NwYxsKde6jtovERojisZJJSMcuNs/XfapuZ/Kfy', 't', NULL, NULL, 'f'),
(24, NULL, 'Babita', 'Gaur', 'bgaur@ex2india.com', '2024-04-26 04:49:57.812798', NULL, '2024-04-26 04:49:57.812798', '$2a$10$tbR6ZRQoxMiGuuvxvDCgmOf1dsRizEQEvfaRljO3bycHkIgWpOgYy', 't', NULL, NULL, 'f'),
(26, NULL, 'QA', 'QA', 'spam.rithvik@gmail.com', '2024-04-26 09:05:57.669604', NULL, NULL, '$2a$10$1sxT0jM2/Dgu5XYEbuErEuCPUyJskN6KqrPyyEG2VG2DdDyI85wky', 't', NULL, NULL, 'f'),
(27, NULL, 'Rithvik', 'Reddy', 'srreddy@ex2india.com', '2024-04-29 05:40:06.880515', NULL, NULL, '$2a$10$AnbEusjMRyuW9vO6PVON1.pl62ZM.GRdqXdwc6/I8GSiDeQJdfB4.', 't', NULL, NULL, 'f'),
(17, NULL, 'Test', 'account', 'ipvmsQA@ex2india.com', '2024-04-24 07:08:40.524498', NULL, '2024-04-24 07:08:40.524498', '$2a$10$CSc77.AFsFzEifPdtmMj/O1HBmn59Ht9reL.QyFUFGbRDhVgWzs6q', 't', NULL, NULL, 'f'),
(25, NULL, 'Test', 'account', 'testmail@ex2india.com', '2024-04-24 07:06:06.796832', NULL, '2024-04-24 07:06:06.796832', '$2a$10$ho5ILFNk71aE2xWH41r5J.hIDBLNpWKXE.EdOvGPvPd6YbGt3T0Em', 't', NULL, NULL, 'f'),
(29, NULL, 'Diksha', 'Mehta', 'dmehta@ex2india.com', '2024-04-30 05:32:48.628539', NULL, NULL, '$2a$10$v0FOd5iQCI2boGlxO.0aC.gIE2a3jK9ZOWxa0Fmzv4046H2118fqK', 't', NULL, NULL, 'f');