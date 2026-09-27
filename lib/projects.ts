import userData from "@/config/userData";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface ProjectMatter {
  title: string;
  description: string;
}

export function getProjectMeta(slug: string) {
  return userData.projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectSlugs() {
  return userData.projects
    .map((project) => project.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export function getProjectMdx(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "projects",
    `${slug}.mdx`
  );

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data as ProjectMatter,
      content,
    };
  } catch {
    return null;
  }
}
