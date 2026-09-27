import AsciiDither from "@/components/Dither/AsciiDither";
import { ArrowUpRightIcon } from "@/components/icons";
import BackHome from "@/components/ui/back-home";
import { Button } from "@/components/ui/button";
import Enter from "@/components/ui/enter";
import { DocsTableOfContents } from "@/components/ui/toc";
import {
  getExperienceMdx,
  getExperienceMeta,
  getExperienceSlugs,
} from "@/lib/experience";
import {
  getProjectMdx,
  getProjectMeta,
  getProjectSlugs,
} from "@/lib/projects";
import { cn, tocFromMdx } from "@/lib/utils";
import { workMdxComponents } from "@/lib/work-mdx";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...getExperienceSlugs(), ...getProjectSlugs()].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperienceMeta(slug);
  const project = getProjectMeta(slug);
  const mdx = exp ? getExperienceMdx(slug) : getProjectMdx(slug);

  if ((!exp && !project) || !mdx) {
    return { title: "Work not found" };
  }

  return {
    title: mdx.frontmatter.title,
    description: mdx.frontmatter.description,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const exp = getExperienceMeta(slug);
  const project = getProjectMeta(slug);
  const mdx = exp ? getExperienceMdx(slug) : getProjectMdx(slug);

  if ((!exp && !project) || !mdx) {
    notFound();
  }

  const toc = tocFromMdx(mdx.content);
  const crumb = exp?.slug ?? project?.slug;

  return (
    <div
      className="min-h-screen relative font-inter"
      style={{ fontOpticalSizing: "none", fontVariationSettings: '"opsz" 32' }}
    >
      <AsciiDither />
      <div className="max-w-4xl mx-auto p-4 relative z-10">
        <Enter stagger={1}>
          <BackHome current={crumb} />
        </Enter>

        <Enter stagger={2}>
          <header className="flex items-start gap-4 border-b border-dashed pb-6">
            {exp?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={exp.logoUrl}
                alt={`${exp.company} logo`}
                width={56}
                height={56}
                className={cn(
                  "size-14 shrink-0 rounded-lg border object-contain",
                  exp.logoBg ?? "bg-white p-1"
                )}
              />
            ) : project?.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageSrc}
                alt={`${project.title} cover`}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-lg border object-cover bg-white"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              {exp ? (
                <>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {exp.startDate} — {exp.endDate}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground/80">
                    {exp.role}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.company}</p>
                  <Button asChild variant="outline" size="xs" className="mt-3">
                    <Link href={exp.link} target="_blank" rel="noreferrer">
                      {exp.company}
                      <ArrowUpRightIcon className="size-3.5" />
                    </Link>
                  </Button>
                </>
              ) : project ? (
                <>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Project · {project.date}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground/80">
                    {project.title}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.Livelink ? (
                      <Button asChild variant="outline" size="xs">
                        <Link href={project.Livelink} target="_blank" rel="noreferrer">
                          Live
                          <ArrowUpRightIcon className="size-3.5" />
                        </Link>
                      </Button>
                    ) : null}
                    {project.gitHubLink ? (
                      <Button asChild variant="outline" size="xs">
                        <Link href={project.gitHubLink} target="_blank" rel="noreferrer">
                          GitHub
                          <ArrowUpRightIcon className="size-3.5" />
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          </header>
        </Enter>

        {toc.length > 0 ? (
          <Enter stagger={3}>
            <DocsTableOfContents
              toc={toc}
              className="ps-0 mt-4 w-full min-[1400px]:fixed min-[1400px]:top-28 min-[1400px]:left-[calc(50%+28rem)] min-[1400px]:mt-0 min-[1400px]:max-h-[70vh] min-[1400px]:w-56 min-[1400px]:overflow-y-auto min-[1400px]:ps-6"
            />
          </Enter>
        ) : null}

        <Enter stagger={4}>
          <div className="prose prose-gray dark:prose-invert max-w-none mt-6 [&_img]:block [&_img]:my-6 [&_p]:my-4">
            <MDXRemote
              source={mdx.content}
              components={workMdxComponents}
            />
          </div>
        </Enter>
      </div>
    </div>
  );
}
