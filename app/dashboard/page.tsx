"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { seedProjects, type Project } from "@/lib/seed";

type Draft = Omit<Project, "id" | "sort_order"> & {
  id?: string;
  sort_order: number | "";
};

const emptyDraft: Draft = {
  slug: "",
  title: "",
  tagline: "",
  description: "",
  tech: [],
  category: "Software",
  repo_url: null,
  demo_url: null,
  image_url: null,
  sort_order: 100,
  published: true,
};

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createBrowserSupabase();
  const [rows, setRows] = useState<Project[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setRows(data as Project[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/login");
      else load();
    });
  }, [supabase, router, load]);

  function validateSlug(value: string) {
    setSlugError(
      /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)
        ? null
        : "Use lowercase letters, numbers, and single hyphens."
    );
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (slugError) return;
    setStatus("Saving");
    const payload = {
      slug: draft.slug,
      title: draft.title,
      tagline: draft.tagline,
      description: draft.description,
      tech: draft.tech,
      category: draft.category || "Software",
      repo_url: draft.repo_url || null,
      image_url: draft.image_url || null,
      demo_url: draft.demo_url || null,
      sort_order: Number(draft.sort_order) || 100,
      published: draft.published,
    };
    const query = draft.id
      ? supabase.from("projects").update(payload).eq("id", draft.id)
      : supabase.from("projects").insert(payload);
    const { error } = await query;
    setStatus(error ? "Save failed: " + error.message : "Saved");
    if (!error) {
      setDraft(emptyDraft);
      load();
    }
  }

  async function remove(row: Project) {
    const ok = window.confirm(
      'Delete "' + row.title + '"? This cannot be undone.'
    );
    if (!ok) return;
    const { error } = await supabase.from("projects").delete().eq("id", row.id);
    setStatus(error ? "Delete failed: " + error.message : "Deleted");
    load();
  }

  async function importSeed() {
    setStatus("Importing seed projects");
    const payload = seedProjects.map(({ id, ...rest }) => rest);
    const { error } = await supabase.from("projects").insert(payload);
    setStatus(error ? "Import failed: " + error.message : "Seed imported");
    load();
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-16">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="eyebrow">Owner dashboard</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Portfolio content
          </h1>
        </div>
        <button onClick={signOut} className="quiet-link text-sm">
          Sign out
        </button>
      </div>

      {status && (
        <p className="mt-4 text-sm text-[var(--graphite)]" role="status">
          {status}
        </p>
      )}

      <section className="mt-8">
        {loading ? (
          <p className="text-sm text-[var(--graphite)]">Loading projects</p>
        ) : rows.length === 0 ? (
          <div className="rule py-8">
            <p className="text-sm text-[var(--graphite)]">
              No projects in the database yet. Import the CV seed to start,
              then edit each entry.
            </p>
            <button
              onClick={importSeed}
              className="mt-3 rounded-md bg-[var(--blueprint)] px-4 py-2 text-sm font-medium text-white"
            >
              Import seed projects
            </button>
          </div>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              className="rule flex flex-wrap items-center justify-between gap-2 py-3"
            >
              <div>
                <p className="font-medium">
                  {row.title}{" "}
                  {!row.published && (
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--graphite)]">
                      draft
                    </span>
                  )}
                </p>
                <p className="text-xs text-[var(--graphite)]">{row.slug}</p>
              </div>
              <div className="flex gap-4 text-sm">
                <button
                  className="quiet-link"
                  onClick={() =>
                    setDraft({ ...row, sort_order: row.sort_order })
                  }
                >
                  Edit
                </button>
                <button
                  className="text-[var(--destructive)]"
                  onClick={() => remove(row)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <form onSubmit={save} className="mt-10 max-w-xl space-y-4">
        <p className="eyebrow">{draft.id ? "Edit project" : "Add project"}</p>
        <label className="block text-sm">
          Title
          <input
            required
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Slug
          <input
            required
            value={draft.slug}
            onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
            onBlur={(e) => validateSlug(e.target.value)}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
          />
          {slugError && (
            <span className="mt-1 block text-xs text-[var(--destructive)]">
              {slugError}
            </span>
          )}
        </label>
        <label className="block text-sm">
          Tagline
          <input
            value={draft.tagline}
            onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Description
          <textarea
            rows={4}
            value={draft.description}
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Tech (comma separated)
          <input
            value={draft.tech.join(", ")}
            onChange={(e) =>
              setDraft({
                ...draft,
                tech: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">
            Repository URL
            <input
              value={draft.repo_url ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, repo_url: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Category
            <select
              value={draft.category}
              onChange={(e) =>
                setDraft({ ...draft, category: e.target.value as Draft["category"] })
              }
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
            >
              <option value="Machine Learning">Machine Learning</option>
              <option value="Software">Software</option>
            </select>
          </label>
          <label className="block text-sm">
            Image URL
            <input
              value={draft.image_url ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, image_url: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Sort order
            <input
              type="number"
              value={draft.sort_order}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  sort_order:
                    e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
            />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(e) =>
              setDraft({ ...draft, published: e.target.checked })
            }
          />
          Published
        </label>
        <div className="flex gap-3">
          <button className="rounded-md bg-[var(--blueprint)] px-4 py-2 text-sm font-medium text-white">
            {draft.id ? "Save changes" : "Add project"}
          </button>
          {draft.id && (
            <button
              type="button"
              onClick={() => setDraft(emptyDraft)}
              className="quiet-link text-sm"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
