const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return "https://omeshkumar.dev";
};

export const siteConfig = {
  name: "Omesh Kumar",
  description:
    "Full-stack developer and final-year ENTC student at Army Institute of Technology, Pune.",
  url: getSiteUrl(),

  author: {
    name: "Omesh Kumar",
    email: "omeshkumar9813499778@gmail.com",
    twitter: "@Omesh_RaoSahab",
    github: "Rhae-Shane",
    linkedin: "omeshxkumar",
    cal30: "https://cal.com/omeshkumar/30min",
    cal45: "https://cal.com/omeshkumar/45min",
  },

  analytics: {
    visitors: {
      token: process.env.NEXT_PUBLIC_VISITORS_TOKEN,
    },
    umami: {
      websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      url: process.env.NEXT_PUBLIC_UMAMI_URL,
    },
    clarity: {
      projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
