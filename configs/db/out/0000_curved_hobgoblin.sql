CREATE TABLE IF NOT EXISTS "assigned_task" (
	"assignee_id" integer NOT NULL,
	"executive_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	"project_id" integer NOT NULL,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone,
	CONSTRAINT "assigned_task_task_id_pk" PRIMARY KEY("task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attachment" (
	"attachment_id" serial PRIMARY KEY NOT NULL,
	"file_url" varchar(255) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"description" varchar(500),
	"task_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"comment_id" integer NOT NULL,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_log" (
	"log_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"activity_type" text NOT NULL,
	"activity_description" text NOT NULL,
	"activity_time" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"task_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"attachment_id" integer,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permission" (
	"permission_id" serial PRIMARY KEY NOT NULL,
	"permission_name" varchar(255) NOT NULL,
	"permission_description" varchar(500) NOT NULL,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"project_id" serial PRIMARY KEY NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"project_description" text,
	"project_picture_url" varchar(255),
	"isActive" boolean DEFAULT true,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_to_user" (
	"project_to_user_id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"role_id" serial PRIMARY KEY NOT NULL,
	"role_name" varchar(255) NOT NULL,
	"role_description" varchar(500) NOT NULL,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role_permissions" (
	"permission_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"task_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(50) DEFAULT 'İnceleniyor' NOT NULL,
	"priority" varchar(50) DEFAULT 'Orta' NOT NULL,
	"tags" varchar(255),
	"isDone" boolean DEFAULT false,
	"start_date" timestamp with time zone DEFAULT now() NOT NULL,
	"due_date" timestamp with time zone DEFAULT now() NOT NULL,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone,
	"user_id" integer,
	"project_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" varchar(20),
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar(255),
	"surname" varchar(255),
	"isActive" boolean DEFAULT true,
	"isExecutive" boolean DEFAULT false,
	"isTeamMember" boolean DEFAULT false,
	"profile_picture_url" varchar(255),
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_role" (
	"user_role_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"created_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assigned_task" ADD CONSTRAINT "assigned_task_assignee_id_user_user_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assigned_task" ADD CONSTRAINT "assigned_task_executive_id_user_user_id_fk" FOREIGN KEY ("executive_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assigned_task" ADD CONSTRAINT "assigned_task_task_id_task_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("task_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assigned_task" ADD CONSTRAINT "assigned_task_project_id_project_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_to_user" ADD CONSTRAINT "project_to_user_project_id_project_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_to_user" ADD CONSTRAINT "project_to_user_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permission_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("permission_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_role_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
