import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

//import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

export const project = pgTable("project", {
  projectId: serial("project_id").primaryKey(),
  projectName: varchar("project_name", { length: 255 }).notNull(),
  projectDescription: text("project_description"),
  projectPictureUrl: varchar("project_picture_url", { length: 255 }),
  isActive: boolean("isActive").default(true),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),

  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
});

export const projectRelation = relations(project, ({ many }) => ({
  projectToUser: many(projectToUser),
  tasks: many(task),
  assignedTasks: many(assignedTask),
}));

export const user = pgTable("user", {
  userId: serial("user_id").primaryKey(),
  username: varchar("username", { length: 20 }),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  name: varchar("name", { length: 255 }),
  surname: varchar("surname", { length: 255 }),
  isActive: boolean("isActive").default(true),
  isExecutive: boolean("isExecutive").default(false),
  isTeamMember: boolean("isTeamMember").default(false),
  profilePictureUrl: varchar("profile_picture_url", { length: 255 }),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),

  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
});

export const userRelation = relations(user, ({ many }) => ({
  projectToUser: many(projectToUser),
  tasks: many(task),
  comments: many(comment),
  assignedTasks: many(assignedTask, { relationName: "assignee-relation" }),
  userRoles: many(userRole),
  auditLogs: many(auditLog),
}));

export const projectToUser = pgTable("project_to_user", {
  projectToUserId: serial("project_to_user_id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => project.projectId),
  userId: integer("user_id")
    .notNull()
    .references(() => user.userId),
});

export const projectToUserRelations = relations(projectToUser, ({ one }) => ({
  project: one(project, {
    fields: [projectToUser.projectId],
    references: [project.projectId],
  }),
  user: one(user, {
    fields: [projectToUser.userId],
    references: [user.userId],
  }),
}));

export const task = pgTable("task", {
  taskId: serial("task_id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).default("İnceleniyor").notNull(),
  priority: varchar("priority", { length: 50 }).default("Orta").notNull(),
  tags: varchar("tags", { length: 255 }),
  isDone: boolean("isDone").default(false),
  startDate: timestamp("start_date", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: timestamp("due_date", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
  userId: integer("user_id"),
  projectId: integer("project_id"),
});

export const taskRelations = relations(task, ({ one, many }) => ({
  user: one(user, {
    fields: [task.userId],
    references: [user.userId],
  }),
  project: one(project, {
    fields: [task.userId],
    references: [project.projectId],
  }),

  comments: many(comment),
  assignedTasks: many(assignedTask),
}));

export const comment = pgTable("comment", {
  commentId: serial("comment_id").primaryKey(),
  text: text("text").notNull(),
  taskId: integer("task_id").notNull(),
  userId: integer("user_id").notNull(),
  attachmentId: integer("attachment_id"),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
});

export const commentRelations = relations(comment, ({ one, many }) => ({
  user: one(user, {
    fields: [comment.userId],
    references: [user.userId],
  }),
  task: one(task, {
    fields: [comment.taskId],
    references: [task.taskId],
  }),
  attachments: many(attachment),
}));

export const attachment = pgTable("attachment", {
  attachmentId: serial("attachment_id").primaryKey(),
  fileUrl: varchar("file_url", { length: 255 }).notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }),
  taskId: integer("task_id").notNull(),
  userId: integer("user_id").notNull(),
  commentId: integer("comment_id").notNull(),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
});

export const attachmentRelations = relations(attachment, ({ one }) => ({
  comment: one(comment, {
    fields: [attachment.commentId],
    references: [comment.commentId],
  }),
}));

export const assignedTask = pgTable(
  "assigned_task",
  {
    //assignedTaskId: serial("assigned_task_id").primaryKey(),
    assigneeId: integer("assignee_id")
      .references(() => user.userId)
      .notNull(),
    executiveId: integer("executive_id")
      .references(() => user.userId)
      .notNull(),
    taskId: integer("task_id")
      .references(() => task.taskId)
      .notNull(),
    projectId: integer("project_id")
      .references(() => project.projectId)
      .notNull(),
    createdDate: timestamp("created_date", {
      mode: "date",
      withTimezone: true,
    }).defaultNow(),
    updatedDate: timestamp("updated_date", {
      mode: "date",
      withTimezone: true,
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.taskId] }),
  })
);

export const assignedTaskRelations = relations(assignedTask, ({ one }) => ({
  assignee: one(user, {
    fields: [assignedTask.assigneeId],
    references: [user.userId],
    relationName: "assignee-relation",
  }),
  executive: one(user, {
    fields: [assignedTask.executiveId],
    references: [user.userId],
    relationName: "executive-relation",
  }),
  task: one(task, {
    fields: [assignedTask.taskId],
    references: [task.taskId],
  }),
  project: one(project, {
    fields: [assignedTask.projectId],
    references: [project.projectId],
  }),
}));

export const role = pgTable("role", {
  roleId: serial("role_id").primaryKey(),
  roleName: varchar("role_name", { length: 255 }).notNull(),
  roleDescription: varchar("role_description", { length: 500 }).notNull(),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
});

export const roleRelations = relations(role, ({ many }) => ({
  userRoles: many(userRole),
}));

export const userRole = pgTable("user_role", {
  userRoleId: serial("user_role_id").primaryKey(),
  userId: integer("user_id")
    .references(() => user.userId)
    .notNull(),
  roleId: integer("role_id")
    .references(() => role.roleId)
    .notNull(),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
});

export const userRoleRelations = relations(userRole, ({ one }) => ({
  user: one(user, {
    fields: [userRole.userId],
    references: [user.userId],
  }),
  role: one(role, {
    fields: [userRole.roleId],
    references: [role.roleId],
  }),
}));

export const permission = pgTable("permission", {
  permissionId: serial("permission_id").primaryKey(),
  permissionName: varchar("permission_name", { length: 255 }).notNull(),
  permissionDescription: varchar("permission_description", {
    length: 500,
  }).notNull(),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
});

export const rolePermissions = pgTable("role_permissions", {
  rolePermissionId: serial("permission_id").primaryKey(),
  roleId: integer("role_id")
    .references(() => role.roleId)
    .notNull(),
  permissionId: integer("permission_id")
    .references(() => permission.permissionId)
    .notNull(),
  createdDate: timestamp("created_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedDate: timestamp("updated_date", { mode: "date", withTimezone: true }),
});

export const auditLog = pgTable("audit_log", {
  logId: serial("log_id").primaryKey(),
  userId: integer("user_id").notNull(),
  activityType: text("activity_type").notNull(),
  activitiyDescription: text("activity_description").notNull(),
  activityTime: timestamp("activity_time", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
});

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  user: one(user, {
    fields: [auditLog.userId],
    references: [user.userId],
  }),
}));

export type ProjectTableFieldsTypes = {
  projectId: number;
  projectName: string;
  projectDescription: string | null;
  projectPictureUrl: string | null;
  isActive: boolean | null;
  createdDate: Date | null;
  updatedDate: Date | null;
  assignedTasks: {
    assignee: {
      name: string | null;
      surname: string | null;
    };
  }[];
};

export type Team = {
  id: number;
  userName: string;
  email: string;
  phone: string | null;
  password: string;
  profilePictureUrl?: string | null;
  isAdmin: boolean | null;
  isTeamMember: boolean | null;
  role?: string | null;
  createdDate: Date | null;
  updatedDate: Date | null;
  tasks: {
    assigneeId: number;
    createdDate: Date | null;
    updatedDate: Date | null;
    id: number;
    taskId: number | null;
    userId: number | null;
  }[];
  projects: {
    userId: number | null;
    projectId: number | null;
  }[];
};
