import userData from "@/config/userData";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { ArrowUpRightIcon } from "../icons";
import { cn } from "@/lib/utils";

const slots = () => {
  const { cal30, cal45 } = userData.personalInfo;
  return [
    { href: cal30, label: "30 min" },
    { href: cal45, label: "45 min" },
  ];
};

const linkClass =
  "border-b cursor-pointer border-dashed border-foreground/60 text-foreground hover:text-primary transition-colors inline-flex items-center gap-0.5";

export function ConnectCopy() {
  const [short, long] = slots();

  return (
    <div className="text-muted-foreground leading-relaxed">
      Connect with me — book a&nbsp;
      <Link href={short.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {short.label}
        <ArrowUpRightIcon className="size-2.5 shrink-0" />
      </Link>
      &nbsp;or&nbsp;
      <Link href={long.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {long.label}
        <ArrowUpRightIcon className="size-2.5 shrink-0" />
      </Link>
      &nbsp;call.
    </div>
  );
}

export function ConnectButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {slots().map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Book a ${label} call`}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Calendar className="size-3.5" />
          {label}
        </Link>
      ))}
    </div>
  );
}
