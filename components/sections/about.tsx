import Link from "next/link";
import TechBadge from "../ui/tech-badge";
import { ArrowUpRightIcon } from "../icons";
import userData from "@/config/userData";
import { ConnectCopy } from "../ui/connect-links";

const About = () => {
  const { resume } = userData.personalInfo;

  return (
    <div>
      <div className="p-4 w-full mx-auto space-y-4 pb-8">
        <div className="text-muted-foreground text-base tracking-tight">
          <div>
            I&rsquo;m a&nbsp;
            <h1 className="inline-block border-foreground/60 text-foreground">
              Fullstack Engineer
            </h1>
            &nbsp;interning at&nbsp;
            <TechBadge
              tag="SuperKalam"
              href="https://superkalam.com"
            />
            &nbsp;(YC W23) and&nbsp;
            <TechBadge tag="Homi" href="https://heyhomi.in" />
            , building AI learning products. Final-year&nbsp;
            <TechBadge tag="ENTC" />
            &nbsp;at&nbsp;
            <TechBadge tag="AIT Pune" href="https://www.aitpune.com/" />
            &nbsp;(CGPA 8.56).
          </div>

          <div className="mt-6">
            <div className="text-muted-foreground leading-relaxed">
              Previously founding engineer at&nbsp;
              <TechBadge tag="Validd" href="https://validd.ai" />
              &nbsp;— launched the AI investment platform to 120K MRR in 3 months.
              Before that I interned at&nbsp;
              <TechBadge tag="Multyfi" href="https://www.multyfi.com" />
              ,&nbsp;
              <TechBadge tag="VIR Bike" href="https://www.virbike.com/" />
              , and&nbsp;
              <TechBadge tag="KVtek" />
              .
            </div>
          </div>

          <div className="mt-6">
            <div className="text-muted-foreground leading-relaxed">
              Checkout my&nbsp;
              <Link
                href="/work"
                className="border-b cursor-pointer border-dashed border-foreground/60 text-foreground hover:text-primary transition-colors inline-flex items-center gap-0.5"
              >
                Proof of Work
                <ArrowUpRightIcon className="size-2.5 shrink-0" />
              </Link>
              &nbsp;and&nbsp;
              <Link
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b cursor-pointer border-dashed border-foreground/60 text-foreground hover:text-primary transition-colors inline-flex items-center gap-0.5"
              >
                Resume
                <ArrowUpRightIcon className="size-2.5 shrink-0" />
              </Link>
              .
            </div>
          </div>

          <div className="mt-6">
            <div className="text-muted-foreground leading-relaxed">
              Hackathons: IIT Bombay Techfest (1st), Build on Aptos (2nd), BUILDAITHON 2024 Winner, AlgoHack Bangalore (Special Mention), Aavishkar National Finalist. JEE Advanced AIR 8609.
            </div>
          </div>

          <div className="mt-6">
            <div className="text-muted-foreground leading-relaxed">
              Building&nbsp;
              <TechBadge
                tag="Gigsfield"
                href="/work/gigsfield"
              />
              ,&nbsp;
              <TechBadge
                tag="ProspectLens"
                href="/work/prospectlens"
              />
              ,&nbsp;
              <TechBadge
                tag="HobbyFlow"
                href="/work/hobbyflow"
              />
              , Pull-Quest,&nbsp;
              <TechBadge
                tag="Echosphere"
                href="/work/echosphere"
              />
              , and CalcAI. Checkout&nbsp;
              <Link
                href="/design"
                className="border-b cursor-pointer border-dashed border-foreground/60 text-foreground hover:text-primary transition-colors inline-flex items-center gap-0.5"
              >
                Selected Work.
                <ArrowUpRightIcon className="size-2.5 shrink-0" />
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <ConnectCopy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
