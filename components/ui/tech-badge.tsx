import Link from "next/link";
import type { ReactNode } from "react";
import DoodleIcon from "./doodle-icon";

// one tint per tag, keyed by the normalised tag name
const TAG_COLORS: Record<string, string> = {
  nextjs: "text-stone-700 bg-stone-200/70 dark:text-stone-300 dark:bg-stone-500/15",
  typescript: "text-blue-700 bg-blue-100/70 dark:text-blue-300 dark:bg-blue-500/10",
  javascript: "text-yellow-700 bg-yellow-100/70 dark:text-yellow-300 dark:bg-yellow-500/10",
  reactjs: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  tailwindcss: "text-sky-700 bg-sky-100/70 dark:text-sky-300 dark:bg-sky-500/10",
  zustand: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  reactquery: "text-red-700 bg-red-100/70 dark:text-red-300 dark:bg-red-500/10",
  postgresql: "text-indigo-700 bg-indigo-100/70 dark:text-indigo-300 dark:bg-indigo-500/10",
  trino: "text-fuchsia-700 bg-fuchsia-100/70 dark:text-fuchsia-300 dark:bg-fuchsia-500/10",
  metabase: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  sentry: "text-rose-700 bg-rose-100/70 dark:text-rose-300 dark:bg-rose-500/10",
  posthog: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  redux: "text-fuchsia-700 bg-fuchsia-100/70 dark:text-fuchsia-300 dark:bg-fuchsia-500/10",
  mui: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  graphql: "text-pink-700 bg-pink-100/70 dark:text-pink-300 dark:bg-pink-500/10",
  git: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  github: "text-stone-700 bg-stone-100/70 dark:text-stone-300 dark:bg-stone-500/10",
  nodejs: "text-lime-700 bg-lime-100/70 dark:text-lime-300 dark:bg-lime-500/10",
  expressjs: "text-stone-700 bg-stone-100/70 dark:text-stone-300 dark:bg-stone-500/10",
  mongodb: "text-lime-700 bg-lime-100/70 dark:text-lime-300 dark:bg-lime-500/10",
  redis: "text-red-700 bg-red-100/70 dark:text-red-300 dark:bg-red-500/10",
  framermotion: "text-yellow-700 bg-yellow-100/70 dark:text-yellow-300 dark:bg-yellow-500/10",
  turso: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  drizzleorm: "text-lime-700 bg-lime-100/70 dark:text-lime-300 dark:bg-lime-500/10",
  betterauth: "text-stone-700 bg-stone-100/70 dark:text-stone-300 dark:bg-stone-500/10",
  cloudflareworkers: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  chromeextension: "text-yellow-700 bg-yellow-100/70 dark:text-yellow-300 dark:bg-yellow-500/10",
  websocket: "text-stone-700 bg-stone-100/70 dark:text-stone-300 dark:bg-stone-500/10",
  puppeteer: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  npmpackage: "text-red-700 bg-red-100/70 dark:text-red-300 dark:bg-red-500/10",
  python: "text-yellow-700 bg-yellow-100/70 dark:text-yellow-300 dark:bg-yellow-500/10",
  inducedai: "text-stone-700 bg-stone-200/70 dark:text-stone-300 dark:bg-stone-500/15",
  unolo: "text-fuchsia-700 bg-fuchsia-100/70 dark:text-fuchsia-300 dark:bg-fuchsia-500/10",
  humanbehavior: "text-lime-700 bg-lime-100/70 dark:text-lime-300 dark:bg-lime-500/10",
  keychain: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  amogh: "text-stone-700 bg-stone-200/70 dark:text-stone-300 dark:bg-stone-500/15",
  wip: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  virbike: "text-emerald-700 bg-emerald-100/70 dark:text-emerald-300 dark:bg-emerald-500/10",
  kvtek: "text-sky-700 bg-sky-100/70 dark:text-sky-300 dark:bg-sky-500/10",
  microsoftgroupme: "text-indigo-700 bg-indigo-100/70 dark:text-indigo-300 dark:bg-indigo-500/10",
  aitpune: "text-red-700 bg-red-100/70 dark:text-red-300 dark:bg-red-500/10",
  entc: "text-stone-700 bg-stone-200/70 dark:text-stone-300 dark:bg-stone-500/15",
  iecell: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  "i&ecell": "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  rdcell: "text-violet-700 bg-violet-100/70 dark:text-violet-300 dark:bg-violet-500/10",
  "r&dcell": "text-violet-700 bg-violet-100/70 dark:text-violet-300 dark:bg-violet-500/10",
  restapis: "text-stone-700 bg-stone-100/70 dark:text-stone-300 dark:bg-stone-500/10",
  superkalam: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  homi: "text-rose-700 bg-rose-100/70 dark:text-rose-300 dark:bg-rose-500/10",
  validd: "text-emerald-700 bg-emerald-100/70 dark:text-emerald-300 dark:bg-emerald-500/10",
  multyfi: "text-indigo-700 bg-indigo-100/70 dark:text-indigo-300 dark:bg-indigo-500/10",
  prospectlens: "text-sky-700 bg-sky-100/70 dark:text-sky-300 dark:bg-sky-500/10",
  hobbyflow: "text-violet-700 bg-violet-100/70 dark:text-violet-300 dark:bg-violet-500/10",
  langgraph: "text-teal-700 bg-teal-100/70 dark:text-teal-300 dark:bg-teal-500/10",
  reactnative: "text-cyan-700 bg-cyan-100/70 dark:text-cyan-300 dark:bg-cyan-500/10",
  tanstackquery: "text-red-700 bg-red-100/70 dark:text-red-300 dark:bg-red-500/10",
  rag: "text-fuchsia-700 bg-fuchsia-100/70 dark:text-fuchsia-300 dark:bg-fuchsia-500/10",
  aws: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  java: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  springboot: "text-lime-700 bg-lime-100/70 dark:text-lime-300 dark:bg-lime-500/10",
  novu: "text-rose-700 bg-rose-100/70 dark:text-rose-300 dark:bg-rose-500/10",
  strapi: "text-violet-700 bg-violet-100/70 dark:text-violet-300 dark:bg-violet-500/10",
  supabase: "text-emerald-700 bg-emerald-100/70 dark:text-emerald-300 dark:bg-emerald-500/10",
  cashfree: "text-blue-700 bg-blue-100/70 dark:text-blue-300 dark:bg-blue-500/10",
  firebase: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  expo: "text-stone-700 bg-stone-100/70 dark:text-stone-300 dark:bg-stone-500/10",
  langsmith: "text-teal-700 bg-teal-100/70 dark:text-teal-300 dark:bg-teal-500/10",
  pm2: "text-violet-700 bg-violet-100/70 dark:text-violet-300 dark:bg-violet-500/10",
  weasyprint: "text-sky-700 bg-sky-100/70 dark:text-sky-300 dark:bg-sky-500/10",
  qdrant: "text-red-700 bg-red-100/70 dark:text-red-300 dark:bg-red-500/10",
  gemini: "text-blue-700 bg-blue-100/70 dark:text-blue-300 dark:bg-blue-500/10",
  cloudfront: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  notifee: "text-indigo-700 bg-indigo-100/70 dark:text-indigo-300 dark:bg-indigo-500/10",
  fcm: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10",
  turbo: "text-red-700 bg-red-100/70 dark:text-red-300 dark:bg-red-500/10",
  reactflow: "text-sky-700 bg-sky-100/70 dark:text-sky-300 dark:bg-sky-500/10",
  stepfunctions: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  dynamodb: "text-indigo-700 bg-indigo-100/70 dark:text-indigo-300 dark:bg-indigo-500/10",
  clerk: "text-violet-700 bg-violet-100/70 dark:text-violet-300 dark:bg-violet-500/10",
  prisma: "text-stone-700 bg-stone-100/70 dark:text-stone-300 dark:bg-stone-500/10",
  whatsapp: "text-emerald-700 bg-emerald-100/70 dark:text-emerald-300 dark:bg-emerald-500/10",
  vite: "text-violet-700 bg-violet-100/70 dark:text-violet-300 dark:bg-violet-500/10",
  amazons3: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  razorpay: "text-blue-700 bg-blue-100/70 dark:text-blue-300 dark:bg-blue-500/10",
  lambda: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  cloudinary: "text-sky-700 bg-sky-100/70 dark:text-sky-300 dark:bg-sky-500/10",
  gigsfield: "text-stone-700 bg-stone-200/70 dark:text-stone-300 dark:bg-stone-500/15",
  echosphere: "text-teal-700 bg-teal-100/70 dark:text-teal-300 dark:bg-teal-500/10",
  firecrawl: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  groq: "text-orange-700 bg-orange-100/70 dark:text-orange-300 dark:bg-orange-500/10",
  zod: "text-violet-700 bg-violet-100/70 dark:text-violet-300 dark:bg-violet-500/10",
};

const FALLBACK = "text-muted-foreground bg-muted";

const COMPANY_LOGOS: Record<string, { src: string; className?: string }> = {
  superkalam: { src: "/experience/superkalam.png" },
  homi: { src: "/experience/homi.png" },
  validd: { src: "/experience/validd.png", className: "rounded-[2px]" },
  multyfi: { src: "/experience/multyfi.png" },
  virbike: { src: "/experience/virbike.png", className: "min-w-5" },
  kvtek: { src: "/experience/kvtek.png" },
  microsoftgroupme: { src: "/experience/microsoft.svg" },
  microsoft: { src: "/experience/microsoft.svg" },
  prospectlens: { src: "/projects/prospectlens.svg", className: "rounded-[2px]" },
  hobbyflow: { src: "/projects/hobbyflow.png", className: "rounded-[2px]" },
  gigsfield: { src: "/projects/gigsfield.svg", className: "rounded-[2px] min-w-5" },
  echosphere: { src: "/projects/echosphere.svg", className: "rounded-[2px]" },
};

export const tagColor = (tag: string) =>
  TAG_COLORS[tag.toLowerCase().replace(/[\s.\-/]+/g, "")] ?? FALLBACK;

const TechBadge = ({
  tag,
  icon,
  href,
}: {
  tag: string;
  /** overrides the techStack logo lookup */
  icon?: ReactNode;
  /** renders the badge as a link */
  href?: string;
}) => {
  const key = tag.toLowerCase().replace(/[\s.\-/]+/g, "");
  const brand = COMPANY_LOGOS[key];
  const className = `h-fit text-xs rounded-sm px-1.5 py-0.5 inline-flex items-center gap-1.5 align-middle ${tagColor(tag)}`;

  const content = (
    <>
      {icon ??
        (brand ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.src}
            alt=""
            width={14}
            height={14}
            style={{ margin: 0 }}
            className={`size-3.5 object-contain ${brand.className ?? ""}`}
          />
        ) : (
          <DoodleIcon name={tag} />
        ))}
      {tag}
    </>
  );

  if (!href) return <span className={className}>{content}</span>;

  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`${className} hover:brightness-125 transition-all`}
    >
      {content}
    </Link>
  );
};

export default TechBadge;
