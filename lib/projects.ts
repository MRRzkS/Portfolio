import { createServerSupabase, hasSupabaseEnv } from "@/lib/supabase/server";
import { seedProjects, type Project } from "@/lib/seed";

export type { Project } from "@/lib/seed";
export { seedProjects } from "@/lib/seed";



export async function getPublishedProjects(): Promise<Project[]> {
  if (!hasSupabaseEnv()) return seedProjects;
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return seedProjects;
  return data as Project[];
}
