"use client";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

type ExperienceCardProps = {
  id: number;
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  link: string;
  isFirst: boolean;
  isLast: boolean;
  description: string;
  logoUrl?: string;
  logoBg?: string;
  slug: string;
};

const getInitials = (companyName: string) =>
  companyName
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

const CompanyLogo = ({
  companyName,
  logoUrl,
  logoBg,
}: {
  companyName: string;
  logoUrl?: string;
  logoBg?: string;
}) => {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={`${companyName} logo`}
        width={48}
        height={48}
        className={cn(
          "size-11 sm:size-12 border rounded-lg object-contain",
          logoBg ?? "bg-white p-1"
        )}
      />
    );
  }

  return (
    <div className="size-11 sm:size-12 border rounded-lg bg-muted/50 backdrop-blur-2xl flex items-center justify-center text-xs font-medium tracking-tight">
      {getInitials(companyName)}
    </div>
  );
};

const ExperienceCard = ({
  companyName,
  role,
  startDate,
  endDate,
  link,
  isFirst,
  isLast,
  description,
  logoUrl,
  logoBg,
  slug,
}: ExperienceCardProps) => {
  const Icon = (
    <CompanyLogo
      companyName={companyName}
      logoUrl={logoUrl}
      logoBg={logoBg}
    />
  );
  const hasDescription = description.trim().length > 0;
  const [isOpen, setIsOpen] = useState(isFirst && hasDescription);

  const handleClick = () => {
    if (!hasDescription) return;
    setIsOpen(!isOpen);
  };

  const renderDescription = (value: string) => {
    const lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const bulletLines = lines.filter((line) => line.startsWith("- "));
    const textLines = lines.filter((line) => !line.startsWith("- "));

    if (bulletLines.length === 0) {
      if (lines.length <= 1) {
        return <p className="text-sm text-muted-foreground">{value}</p>;
      }

      return (
        <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
          {lines.map((line, index) => (
            <li key={`exp-line-${index}`}>{line}</li>
          ))}
        </ul>
      );
    }

    return (
      <div className="space-y-2">
        {textLines.map((line, index) => (
          <p key={`exp-text-${index}`} className="text-sm text-muted-foreground">
            {line}
          </p>
        ))}
        <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
          {bulletLines.map((line, index) => (
            <li key={`exp-bullet-${index}`}>{line.replace(/^-\\s+/, "")}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col px-2 md:px-4 gap-2 group z-20">
      <div className="flex items-start gap-3 transition-opacity duration-150 group-hover/experience:opacity-40 group-hover:opacity-100!">
        <div className="flex flex-col items-center self-stretch">
          <Link
            href={link}
            target="_blank"
            className="icon-container size-11 sm:size-12 aspect-square"
          >
            {Icon}
          </Link>
          <div
            className={cn(
              "w-px bg-border flex-1",
              isLast ? "h-0 w-0" : "min-h-6"
            )}
          />
        </div>

        <div className="flex-1">
          <div
            onClick={handleClick}
            className={cn("size-full", { "cursor-pointer": hasDescription })}
            aria-disabled={!hasDescription}
          >
            <h3 className="text-base uppercase">{role}</h3>
            <div className="flex w-full justify-between items-center">
              <p className="text-sm text-muted-foreground sm:w-[100px] sm:pr-0 pr-2 group-hover:text-foreground transition-colors">
                {companyName}
              </p>
              <div className="grow border-b border-dashed border-border" />
              <p className="text-sm text-muted-foreground text-right w-[170px] group-hover:text-foreground transition-colors">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <div className="w-full h-4" />
          <AnimatePresence initial={false}>
            {isOpen && hasDescription && (
              <motion.div
                key="experience-description"
                initial={{ height: 0, opacity: 0, y: -6 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -6 }}
                transition={{ ease: "easeOut", duration: 0.125 }}
                className="overflow-hidden"
              >
                {renderDescription(description)}
                <Link
                  href={`/work/${slug}`}
                  onClick={(event) => event.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1 text-sm leading-none text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>More</span>
                  <ChevronsRight className="size-3.5 shrink-0 translate-y-px" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-full h-6" />
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
