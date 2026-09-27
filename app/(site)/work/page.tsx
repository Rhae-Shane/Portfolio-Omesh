import AsciiDither from "@/components/Dither/AsciiDither";
import BackHome from "@/components/ui/back-home";
import Enter from "@/components/ui/enter";
import { DocsTableOfContents } from "@/components/ui/toc";
import { workMdxComponents } from "@/lib/work-mdx";
import { tocFromMdx } from "@/lib/utils";
import fs from "fs";
import matter from "gray-matter";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";

interface WorkMatter {
  title: string;
  description: string;
}

async function getWorkContent() {
  const filePath = path.join(process.cwd(), "content", "work.mdx");

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data as WorkMatter,
      content,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const workData = await getWorkContent();

  if (!workData) {
    return {
      title: "Work Experience Not Found",
    };
  }

  const { frontmatter } = workData;

  return {
    title: `${frontmatter.title}`,
    description: frontmatter.description,
  };
}

export default async function WorkPage() {
  const workData = await getWorkContent();

  if (!workData) {
    notFound();
  }

  const { content } = workData;
  const toc = tocFromMdx(content);

  return (
    <div
      className="min-h-screen relative font-inter"
      style={{ fontOpticalSizing: "none", fontVariationSettings: '"opsz" 32' }}
    >
      <AsciiDither />
      <div className="max-w-4xl mx-auto p-4 relative z-10">
        <Enter stagger={1}>
          <BackHome current="proof-of-work" />
        </Enter>

        {/* inline by default, pinned into the gutter once there is room */}
        <Enter stagger={2}>
          <DocsTableOfContents
            toc={toc}
            className="ps-0 mt-4 w-full min-[1400px]:fixed min-[1400px]:top-28 min-[1400px]:left-[calc(50%+28rem)] min-[1400px]:mt-0 min-[1400px]:max-h-[70vh] min-[1400px]:w-56 min-[1400px]:overflow-y-auto min-[1400px]:ps-6"
          />
        </Enter>

        {/* Content */}
        <Enter stagger={3}>
          <div className="prose prose-gray dark:prose-invert max-w-none border-t border-dashed mt-4 [&_img]:block [&_img]:my-6 [&_p]:my-4">
            <MDXRemote source={content} components={workMdxComponents} />
          </div>
        </Enter>


      </div>
    </div>
  );
}
