import userData from "@/config/userData";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface ExperienceMatter {
  title: string;
  description: string;
}

export function getExperienceMeta(slug: string) {
  return userData.experience.find((exp) => exp.slug === slug) ?? null;
}

export function getExperienceSlugs() {
  return userData.experience.map((exp) => exp.slug);
}

export function getExperienceMdx(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "experience",
    `${slug}.mdx`
  );

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data as ExperienceMatter,
      content,
    };
  } catch {
    return null;
  }
}
