import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { GithubIcon } from "../icons";
import TextButton from "./text-button";
import { cn } from "@/lib/utils";
import TechBadge from "./tech-badge";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  liveLink?: string;
  imageSrc?: string;
  date: string;
  gitHubLink: string | null;
  working?: boolean;
  slug?: string;
};

const ProjectCard = ({
  title,
  description,
  tags,
  liveLink,
  imageSrc,
  date,
  gitHubLink,
  working = false,
  slug,
}: ProjectCardProps) => {
  return (
    <div className="flex z-20 self-start flex-col justify-between gap-1 rounded-xl bg-white hover:bg-white/70 dark:bg-background/50 dark:hover:bg-background/80 shadow-xs transition-all border border-dashed p-2 group">
      {imageSrc ? (
      <Image
        src={imageSrc}
        alt={title}
        width={1024}
        height={532}
        className={cn(
          "w-full rounded-lg transition-all duration-150 group-hover/projects:opacity-40 group-hover:!opacity-100",
          imageSrc.endsWith(".svg") || imageSrc.includes("hobbyflow") || imageSrc.includes("prospectlens")
            ? "h-[13rem] object-contain bg-muted/50 p-10"
            : imageSrc.includes("gigsfield-hero") || imageSrc.includes("echosphere-hero")
              ? "h-auto object-contain"
              : "h-[13rem] object-cover object-top"
        )}
      />
      ) : (
        <div className="w-full h-[13rem] rounded-lg border border-dashed border-border bg-muted/40 flex items-center justify-center">
          <span className="text-sm text-muted-foreground tracking-tight">{title}</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="inline-flex justify-start items-center -mb-2 gap-2">
          <TextButton text={title} textSize={18} uppercase="capitalize" />
          {working && <TechBadge tag="WIP" />}
        </span>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex gap-2 flex-wrap">
        {tags?.map((tag) => (
          <TechBadge key={tag} tag={tag} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border border-dashed">
        {liveLink && (
          <Link
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("text-muted-foreground hover:text-foreground w-full text-sm text-center text-nowrap transition-all border-dashed",
              gitHubLink || slug ? "border-r border-dashed" : "border-none"
            )}
          >
            Live link
          </Link>
        )}
        {gitHubLink && (
          <Link
            href={gitHubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-muted-foreground hover:text-foreground w-full text-sm flex items-center justify-center gap-2 transition-all",
              slug ? "border-r border-dashed" : ""
            )}
          >
            GitHub
            <GithubIcon />
          </Link>
        )}
        {slug && (
          <Link
            href={`/work/${slug}`}
            className="text-muted-foreground hover:text-foreground w-full text-sm inline-flex items-center justify-center gap-1 leading-none transition-all"
          >
            <span>More</span>
            <ChevronsRight className="size-3.5 shrink-0 translate-y-px" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
