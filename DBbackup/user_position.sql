-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_position_id_seq;

-- Table Definition
CREATE TABLE "public"."user_position" (
    "id" int4 NOT NULL DEFAULT nextval('user_position_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "company" varchar,
    "business_unit" varchar,
    "department" varchar,
    "subdepartment" varchar,
    "designation" varchar,
    "region" varchar,
    "branch" varchar,
    "reporting_manager" int4,
    "functional_manager" int4,
    CONSTRAINT "user_position_functional_manager_fkey" FOREIGN KEY ("functional_manager") REFERENCES "public"."user_table"("id"),
    CONSTRAINT "user_position_reporting_manager_fkey" FOREIGN KEY ("reporting_manager") REFERENCES "public"."user_table"("id"),
    CONSTRAINT "user_position_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."user_position" ("id", "user_id", "company", "business_unit", "department", "subdepartment", "designation", "region", "branch", "reporting_manager", "functional_manager") VALUES
(11, 1, 'TechSolutions Inc.', 'Software Development', 'Engineering', 'Frontend', 'Software Development Manager', 'California', 'San Francisco', 2, 3);
INSERT INTO "public"."user_position" ("id", "user_id", "company", "business_unit", "department", "subdepartment", "designation", "region", "branch", "reporting_manager", "functional_manager") VALUES
(12, 2, 'TechSolutions Inc.', 'Software Development', 'Engineering', 'Frontend', 'Senior Frontend Developer', 'California', 'San Francisco', 8, 5);
INSERT INTO "public"."user_position" ("id", "user_id", "company", "business_unit", "department", "subdepartment", "designation", "region", "branch", "reporting_manager", "functional_manager") VALUES
(13, 3, 'TechSolutions Inc.', 'Software Development', 'Engineering', 'Backend', 'Software Engineer', 'California', 'San Jose', 6, 7);
INSERT INTO "public"."user_position" ("id", "user_id", "company", "business_unit", "department", "subdepartment", "designation", "region", "branch", "reporting_manager", "functional_manager") VALUES
(14, 14, 'CodeCrafters Ltd.', 'Product Management', 'Product Development', 'UI/UX Design', 'Product Design Manager', 'New York', 'Manhattan', 8, 9),
(15, 5, 'CodeCrafters Ltd.', 'Product Management', 'Product Development', 'UI/UX Design', 'Senior UI/UX Designer', 'New York', 'Manhattan', 10, 11),
(16, 6, 'CodeCrafters Ltd.', 'Product Management', 'Quality Assurance', 'Automation Testing', 'QA Automation Lead', 'Washington', 'Seattle', 12, 13),
(17, 7, 'SoftEdge Solutions', 'Client Services', 'Customer Support', 'Technical Support', 'Customer Support Manager', 'Texas', 'Austin', 14, 15),
(18, 8, 'SoftEdge Solutions', 'Client Services', 'Customer Support', 'Technical Support', 'Senior Technical Support Specialist', 'Texas', 'Austin', 1, 2),
(19, 9, 'SoftEdge Solutions', 'Client Services', 'Customer Success', 'Account Management', 'Customer Success Manager', 'Florida', 'Miami', 3, 14),
(20, 10, 'SoftEdge Solutions', 'Software Development', 'Engineering', 'Fullstack', 'Senior Fullstack Developer', 'Texas', 'Dallas', 5, 6);