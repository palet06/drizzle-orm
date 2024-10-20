import { projects } from '@/configs/db/schema';
export type ListProjectsType = typeof projects.$inferSelect;