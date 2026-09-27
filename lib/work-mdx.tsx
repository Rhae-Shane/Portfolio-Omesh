import {
  CalcAiPipeline,
  DnaPipeline,
  EchospherePipeline,
  ExtractionPipeline,
  GigsfieldCreditsPipeline,
  GigsfieldPipeline,
  HobbyFlowAskPipeline,
  HobbyFlowLessonPipeline,
  HobbyFlowPipeline,
  HomiLangGraphPipeline,
  HomiRagPipeline,
  HomiRedPenPipeline,
  ImageRagPipeline,
  IncidentTrace,
  MonolithSplit,
  ProspectLensChatPipeline,
  ProspectLensPipeline,
  ProspectLensReportFanout,
  PullQuestPipeline,
  ValiddAdvisorPipeline,
  ValiddDataPipeline,
  ValiddDeployPipeline,
  ValiddNovuPipeline,
  ValiddPayKycPipeline,
  ValiddTurboSplit,
} from "@/components/ui/diagram";
import GitHubGraph from "@/components/ui/github-graph";
import ImageModal from "@/components/ui/image-modal";
import LinesBG from "@/components/ui/lines-bg";
import LogoRow from "@/components/ui/logo-row";
import RoleHeading from "@/components/ui/role-heading";
import ShotGrid from "@/components/ui/shot-grid";
import TechStack from "@/components/ui/tech-stack";
import { slugify } from "@/lib/utils";
import {
  Bell,
  Bot,
  CreditCard,
  Globe,
  Server,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import React from "react";

function HeadingMark({ title }: { title: string }) {
  const key = title.toLowerCase();
  const mark = "size-3.5 shrink-0 object-contain";
  const stroke = "size-3.5 shrink-0 text-foreground/55";

  if (key.includes("turbo") || key.includes("web")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/tech/turborepo.svg" alt="" className={`${mark} dark:invert`} />
    );
  }
  if (key.includes("novu") || key.includes("push")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/tech/novu.svg" alt="" className={mark} />
    );
  }
  if (key.includes("strapi")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/tech/strapi.svg" alt="" className={mark} />
    );
  }
  if (key.includes("mobile")) return <Smartphone className={stroke} />;
  if (key.includes("deploy")) return <Server className={stroke} />;
  if (key.includes("advisor") || key.includes("ai")) return <Bot className={stroke} />;
  if (key.includes("admin") || key.includes("crm")) return <Users className={stroke} />;
  if (key.includes("payment") || key.includes("kyc")) return <CreditCard className={stroke} />;
  if (key.includes("feature")) return <Sparkles className={stroke} />;
  return <Globe className={stroke} />;
}

export const workMdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-semibold tracking-tight mb-6 text-foreground/70">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2
      id={slugify(String(children))}
      className="scroll-mt-24 text-xl font-semibold mb-4 mt-12 text-foreground/80"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-base font-medium tracking-tight mb-3 mt-10 text-foreground/80">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => {
    const title = String(children);
    return (
      <h4
        id={slugify(title)}
        className="flex items-center gap-2 scroll-mt-24 text-sm font-medium tracking-tight mb-2 mt-6 text-muted-foreground"
      >
        <HeadingMark title={title} />
        {children}
      </h4>
    );
  },
  p: ({ children }: { children: React.ReactNode }) => {
    const hasBlockElements = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === "div"
    );

    if (hasBlockElements) {
      return (
        <div className="text-muted-foreground/80 mb-4 leading-relaxed">
          {children}
        </div>
      );
    }

    return (
      <p className="text-muted-foreground/80 mb-4 leading-relaxed">
        {children}
      </p>
    );
  },
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-4 text-muted-foreground/80 space-y-2">
      {children}
    </ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-muted-foreground/80">{children}</li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => {
    const text = String(children).replace(/\.$/, "").trim();
    return (
      <strong
        id={slugify(text)}
        className="scroll-mt-24 font-medium text-foreground/70"
      >
        {children}
      </strong>
    );
  },
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <ImageModal src={src ?? ""} alt={alt ?? ""} />
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="rounded-[3px] bg-muted/70 px-1 py-px text-[0.85em] font-medium text-foreground/75">
      {children}
    </code>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="not-prose relative my-8 rounded-r-md border-l-2 border-foreground/25 bg-muted/40 py-4 pl-5 pr-4 text-[0.95rem] leading-relaxed text-foreground/75 [&_p]:m-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-t border-dashed border-border" />,
  CalcAiPipeline,
  DnaPipeline,
  EchospherePipeline,
  ExtractionPipeline,
  GigsfieldCreditsPipeline,
  GigsfieldPipeline,
  GitHubGraph,
  HobbyFlowAskPipeline,
  HobbyFlowLessonPipeline,
  HobbyFlowPipeline,
  HomiLangGraphPipeline,
  HomiRagPipeline,
  HomiRedPenPipeline,
  ImageRagPipeline,
  IncidentTrace,
  LinesBG,
  LogoRow,
  MonolithSplit,
  ProspectLensChatPipeline,
  ProspectLensPipeline,
  ProspectLensReportFanout,
  PullQuestPipeline,
  RoleHeading,
  ShotGrid,
  TechStack,
  ValiddAdvisorPipeline,
  ValiddDataPipeline,
  ValiddDeployPipeline,
  ValiddNovuPipeline,
  ValiddPayKycPipeline,
  ValiddTurboSplit,
};
