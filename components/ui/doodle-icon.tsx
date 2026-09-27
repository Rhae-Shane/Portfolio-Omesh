const keyOf = (name: string) => name.toLowerCase().replace(/[\s.\-/]+/g, "");

const Doodle = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3 shrink-0"
    style={{ margin: 0 }}
    aria-hidden
  >
    <title>{title}</title>
    {children}
  </svg>
);

const ICONS: Record<string, React.ReactNode> = {
  reactjs: (
    <Doodle title="React">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(-60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </Doodle>
  ),
  reactnative: (
    <Doodle title="React Native">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <circle cx="12" cy="18.5" r="0.7" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="10" rx="3.2" ry="1.4" />
      <ellipse cx="12" cy="10" rx="3.2" ry="1.4" transform="rotate(60 12 10)" />
      <ellipse cx="12" cy="10" rx="3.2" ry="1.4" transform="rotate(-60 12 10)" />
    </Doodle>
  ),
  nextjs: (
    <Doodle title="Next.js">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.2 16.2 16.4 7.8" />
      <path d="M15.2 8.4v8" />
    </Doodle>
  ),
  typescript: (
    <Doodle title="TypeScript">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M7 10.2h6.5M10.2 10.2V17" />
      <path d="M14.2 13.2c.4-.7 1.1-1 1.9-1 .9 0 1.6.4 1.6 1.3 0 1.4-3.5.8-3.5 2.6 0 .8.7 1.3 1.7 1.3.8 0 1.5-.3 1.9-1" />
    </Doodle>
  ),
  javascript: (
    <Doodle title="JavaScript">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M10 9.5v6.2c0 1.3-.6 1.8-1.7 1.8" />
      <path d="M13 13.2c.4-.8 1.2-1.2 2.1-1.2 1 0 1.7.5 1.7 1.5 0 1.6-3.6.9-3.6 2.8 0 .9.8 1.4 1.9 1.4.9 0 1.6-.3 2-1" />
    </Doodle>
  ),
  nodejs: (
    <Doodle title="Node.js">
      <path d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6Z" />
      <path d="M12 8.2v7.6" />
    </Doodle>
  ),
  python: (
    <Doodle title="Python">
      <path d="M9.2 4.8h5.4c1.2 0 1.8.7 1.8 1.8v3.2H9.6c-1.4 0-2.4.9-2.4 2.3v.2" />
      <path d="M14.8 19.2H9.4c-1.2 0-1.8-.7-1.8-1.8v-3.2h6.8c1.4 0 2.4-.9 2.4-2.3v-.2" />
      <circle cx="10.2" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="13.8" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </Doodle>
  ),
  postgresql: (
    <Doodle title="PostgreSQL">
      <ellipse cx="12" cy="7" rx="6.5" ry="3" />
      <path d="M5.5 7v6c0 1.8 2.9 3.2 6.5 3.2s6.5-1.4 6.5-3.2V7" />
      <path d="M5.5 10.2c0 1.8 2.9 3.2 6.5 3.2s6.5-1.4 6.5-3.2" />
      <path d="M16.8 14.8c.6 1.6.3 3.4-1.2 4.2" />
    </Doodle>
  ),
  postgres: (
    <Doodle title="Postgres">
      <ellipse cx="12" cy="7" rx="6.5" ry="3" />
      <path d="M5.5 7v6c0 1.8 2.9 3.2 6.5 3.2s6.5-1.4 6.5-3.2V7" />
      <path d="M5.5 10.2c0 1.8 2.9 3.2 6.5 3.2s6.5-1.4 6.5-3.2" />
    </Doodle>
  ),
  mongodb: (
    <Doodle title="MongoDB">
      <path d="M12 3.4s4.8 3.2 4.8 9.1c0 4-2.2 6.6-4.8 8.1-2.6-1.5-4.8-4.1-4.8-8.1 0-5.9 4.8-9.1 4.8-9.1Z" />
      <path d="M12 6.2v14.4" />
    </Doodle>
  ),
  redis: (
    <Doodle title="Redis">
      <path d="M4 9.2 12 5.6 20 9.2 12 12.8Z" />
      <path d="M4 12.4 12 16l8-3.6" />
      <path d="M4 15.6 12 19.2 20 15.6" />
    </Doodle>
  ),
  tailwindcss: (
    <Doodle title="Tailwind CSS">
      <path d="M4.5 13c1.8-4.4 4.2-6.6 7.2-6.6 3 0 4.2 2.2 6 2.2 1.4 0 2.7-.8 4.3-2.4-1.8 4.4-4.2 6.6-7.2 6.6-3 0-4.2-2.2-6-2.2-1.4 0-2.7.8-4.3 2.4Z" />
      <path d="M4.5 18.2c1.8-3.6 4-5.4 6.6-5.4 2.5 0 3.6 1.8 5.2 1.8 1.2 0 2.4-.6 3.8-1.8-1.6 3.6-3.8 5.4-6.4 5.4-2.5 0-3.6-1.8-5.2-1.8-1.2 0-2.4.6-4 1.8Z" />
    </Doodle>
  ),
  expressjs: (
    <Doodle title="Express">
      <path d="M3.8 8.4 8.6 16h.2L14 8.4" />
      <path d="M15.2 12.2h5" />
      <path d="M17.8 9.2v6.4" />
    </Doodle>
  ),
  git: (
    <Doodle title="Git">
      <circle cx="7.2" cy="16.6" r="2.1" />
      <circle cx="16.8" cy="16.6" r="2.1" />
      <circle cx="12" cy="6.4" r="2.1" />
      <path d="M7.2 14.5V11.2c0-1.4 1-2.4 2.4-2.4h4.8" />
    </Doodle>
  ),
  github: (
    <Doodle title="GitHub">
      <path d="M9 19.2c-4.2 1.2-4.2-2.2-5.8-2.6" />
      <path d="M15 21v-3.2a2.8 2.8 0 0 0-.8-2.2c2.6-.3 5.4-1.3 5.4-5.8 0-1.3-.5-2.3-1.2-3.1.1-.3.5-1.6-.1-3.2 0 0-1-.3-3.3 1.2a11 11 0 0 0-6 0C6.7 3.6 5.7 3.9 5.7 3.9c-.6 1.6-.2 2.9-.1 3.2A4.4 4.4 0 0 0 4.4 10c0 4.5 2.8 5.5 5.4 5.8-.3.3-.6.9-.7 1.7v3.5" />
    </Doodle>
  ),
  docker: (
    <Doodle title="Docker">
      <path d="M3.5 14.2c.4 3 3.2 5 7.4 5 5.6 0 8.8-2.6 9.6-6.4-1.6.8-3.4 1-5 .4" />
      <rect x="5" y="11.2" width="3.1" height="2.4" rx="0.3" />
      <rect x="8.6" y="11.2" width="3.1" height="2.4" rx="0.3" />
      <rect x="12.2" y="11.2" width="3.1" height="2.4" rx="0.3" />
      <rect x="8.6" y="8.2" width="3.1" height="2.4" rx="0.3" />
    </Doodle>
  ),
  aws: (
    <Doodle title="AWS">
      <path d="M5 15.8c2.4 2.4 8.2 3.4 14-.4" />
      <path d="M7.4 8.2 12 5.6l4.6 2.6v5.4L12 16.2 7.4 13.6Z" />
    </Doodle>
  ),
  cloudfront: (
    <Doodle title="CloudFront">
      <path d="M6.5 16.2a4.2 4.2 0 0 1 .4-8.2 5.2 5.2 0 0 1 10.1 1.4 3.6 3.6 0 0 1 .5 6.8H6.5Z" />
      <path d="M10 12h4M12 10v4" />
    </Doodle>
  ),
  sentry: (
    <Doodle title="Sentry">
      <path d="M12 4.2 20.2 18.6H3.8Z" />
      <path d="M12 9.4v5.2" />
      <circle cx="12" cy="16.2" r="0.6" fill="currentColor" stroke="none" />
    </Doodle>
  ),
  posthog: (
    <Doodle title="PostHog">
      <circle cx="9" cy="12" r="5.2" />
      <circle cx="16.2" cy="9.2" r="3.4" />
      <circle cx="8.4" cy="11" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="15.8" cy="8.6" r="0.55" fill="currentColor" stroke="none" />
    </Doodle>
  ),
  langgraph: (
    <Doodle title="LangGraph">
      <circle cx="6.2" cy="7" r="2" />
      <circle cx="17.8" cy="7" r="2" />
      <circle cx="12" cy="17.4" r="2" />
      <circle cx="12" cy="11.2" r="1.6" />
      <path d="M7.8 8.2 10.6 10.4M16.2 8.2 13.4 10.4M12 12.8v2.6" />
    </Doodle>
  ),
  langchain: (
    <Doodle title="LangChain">
      <path d="M8 8.2c-1.8 0-3.2 1.4-3.2 3.2S6.2 14.6 8 14.6" />
      <path d="M16 8.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2" />
      <path d="M8.4 11.4h7.2" />
    </Doodle>
  ),
  langsmith: (
    <Doodle title="LangSmith">
      <circle cx="12" cy="8.2" r="3" />
      <path d="M7.2 18.6c.6-3 2.4-4.4 4.8-4.4s4.2 1.4 4.8 4.4" />
      <path d="M16.8 6.4 19 4.6" />
    </Doodle>
  ),
  rag: (
    <Doodle title="RAG">
      <rect x="4" y="5" width="7.2" height="9.2" rx="1" />
      <path d="M13.4 8.2h6.2M13.4 11.2h5M13.4 14.2h4" />
      <path d="M8 16.6v2.6l2-1 2 1v-2.6" />
    </Doodle>
  ),
  novu: (
    <Doodle title="Novu">
      <path d="M6.2 9.4a5.8 5.8 0 0 1 11.6 0c0 4.2 1.2 5.4 1.2 5.4H5s1.2-1.2 1.2-5.4Z" />
      <path d="M10 17.8a2 2 0 0 0 4 0" />
    </Doodle>
  ),
  strapi: (
    <Doodle title="Strapi">
      <path d="M6.2 6.2h7.4v7.4H6.2Z" />
      <path d="M13.6 10.4h4.2v7.4H10.4v-4.2" />
    </Doodle>
  ),
  supabase: (
    <Doodle title="Supabase">
      <path d="M13.6 3.6 6.4 13.8h5.2L10.4 20.4 17.6 10H12.4Z" />
    </Doodle>
  ),
  cashfree: (
    <Doodle title="Cashfree">
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.4v9.2" />
      <path d="M9.4 9.4c.5-1 1.5-1.6 2.7-1.6 1.6 0 2.8.9 2.8 2.3 0 2.8-5.4 1.5-5.4 4 0 1.2 1.1 2.1 2.7 2.1 1.3 0 2.3-.6 2.8-1.6" />
    </Doodle>
  ),
  firebase: (
    <Doodle title="Firebase">
      <path d="M6.4 16.8 10.2 4.8l3 6.4 1.6-2.4 2.8 8Z" />
      <path d="M6.4 16.8 12 19.6l5.6-2.8" />
    </Doodle>
  ),
  fcm: (
    <Doodle title="FCM">
      <path d="M6.2 9.4a5.8 5.8 0 0 1 11.6 0c0 4.2 1.2 5.4 1.2 5.4H5s1.2-1.2 1.2-5.4Z" />
      <path d="M8 8.2 12 4.8 16 8.2" />
    </Doodle>
  ),
  notifee: (
    <Doodle title="Notifee">
      <circle cx="12" cy="12" r="8.2" />
      <path d="M8.4 12.8c.8 1.6 2 2.4 3.6 2.4s2.8-.8 3.6-2.4" />
      <circle cx="9.2" cy="10" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="10" r="0.7" fill="currentColor" stroke="none" />
    </Doodle>
  ),
  expo: (
    <Doodle title="Expo">
      <path d="M4.8 16.8 12 4.6l7.2 12.2" />
      <path d="M8.2 16.8h7.6" />
    </Doodle>
  ),
  pm2: (
    <Doodle title="PM2">
      <rect x="3.6" y="6.4" width="16.8" height="11.2" rx="2" />
      <path d="M7 14.6V9.4h2.2c1.2 0 1.8.6 1.8 1.6s-.6 1.6-1.8 1.6H7" />
      <path d="M13.4 9.4h3.2c.8 0 1.4.5 1.4 1.3 0 .7-.5 1.2-1.2 1.3l1.4 2.6" />
    </Doodle>
  ),
  weasyprint: (
    <Doodle title="WeasyPrint">
      <path d="M7 4.8h8.4l2.6 2.6V19.2H7Z" />
      <path d="M15.2 4.8v2.8h2.8" />
      <path d="M9.4 11.2h5.2M9.4 14h4.2" />
    </Doodle>
  ),
  qdrant: (
    <Doodle title="Qdrant">
      <circle cx="12" cy="12" r="7.4" />
      <path d="M16.6 16.6 20 20" />
      <circle cx="12" cy="12" r="2.2" />
    </Doodle>
  ),
  gemini: (
    <Doodle title="Gemini">
      <path d="M12 3.6c.6 3.8 2.6 5.8 6.4 6.4-3.8.6-5.8 2.6-6.4 6.4-.6-3.8-2.6-5.8-6.4-6.4 3.8-.6 5.8-2.6 6.4-6.4Z" />
    </Doodle>
  ),
  zustand: (
    <Doodle title="Zustand">
      <circle cx="12" cy="13.4" r="6.2" />
      <path d="M8.2 11.4c.8-2 2.2-3 3.8-3s3 .8 3.8 2.6" />
      <path d="M9.6 15.2h4.8" />
    </Doodle>
  ),
  tanstackquery: (
    <Doodle title="TanStack Query">
      <circle cx="10.4" cy="10.4" r="5.4" />
      <path d="M14.4 14.4 19 19" />
      <path d="M8.4 10.4h4" />
    </Doodle>
  ),
  reactquery: (
    <Doodle title="React Query">
      <circle cx="10.4" cy="10.4" r="5.4" />
      <path d="M14.4 14.4 19 19" />
    </Doodle>
  ),
  restapis: (
    <Doodle title="REST APIs">
      <path d="M8.2 8.4 4.8 12l3.4 3.6" />
      <path d="M15.8 8.4 19.2 12l-3.4 3.6" />
      <path d="M13.2 6.8 10.8 17.2" />
    </Doodle>
  ),
  graphql: (
    <Doodle title="GraphQL">
      <path d="M12 4.4 19 8.4v7.2L12 19.6 5 15.6V8.4Z" />
      <circle cx="12" cy="4.4" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="8.4" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="15.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="15.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="8.4" r="1.1" fill="currentColor" stroke="none" />
    </Doodle>
  ),
  redux: (
    <Doodle title="Redux">
      <path d="M7.2 15.6a5.2 5.2 0 0 1 1.2-8.4" />
      <path d="M16.8 8.4a5.2 5.2 0 0 1-1.2 8.4" />
      <circle cx="8.2" cy="16.6" r="1.4" />
      <circle cx="15.8" cy="7.4" r="1.4" />
    </Doodle>
  ),
  java: (
    <Doodle title="Java">
      <path d="M10.2 13.6c2.6 1.4 5.6.4 6.6-1.4" />
      <path d="M9.4 15.8c3 1.6 6.6.6 7.6-1.4" />
      <path d="M11.2 5.6c1.2 1.6.4 3-.6 3.8 1.6.2 2.8 1.4 2.2 3" />
    </Doodle>
  ),
  springboot: (
    <Doodle title="Spring Boot">
      <path d="M6 15.4c1.8 3 5 4.4 8.4 3.4 3.2-1 5.2-3.8 5-7.2C19 8 15.6 5.2 12 5.6" />
      <path d="M7.2 8.4c1.6-1 3.4-.8 4.6.4" />
    </Doodle>
  ),
  figma: (
    <Doodle title="Figma">
      <circle cx="9.4" cy="7.2" r="2.6" />
      <circle cx="14.6" cy="7.2" r="2.6" />
      <circle cx="9.4" cy="12" r="2.6" />
      <circle cx="14.6" cy="12" r="2.6" />
      <circle cx="9.4" cy="16.8" r="2.6" />
    </Doodle>
  ),
  websocket: (
    <Doodle title="WebSocket">
      <path d="M5 10.2c2.4-2.6 5.2-3.8 7-3.8s4.6 1.2 7 3.8" />
      <path d="M7.4 13c1.6-1.6 3.2-2.4 4.6-2.4s3 0.8 4.6 2.4" />
      <circle cx="12" cy="17.2" r="1.2" fill="currentColor" stroke="none" />
    </Doodle>
  ),
  mysql: (
    <Doodle title="MySQL">
      <path d="M5.2 15.8c1.6 2.2 4.2 3.4 7.2 3.4s5.2-1 6.6-3" />
      <path d="M8.4 6.6c2.2 4.8 2.6 8.2 1.2 11" />
      <path d="M14.8 7.2c.8 3.6.6 6.8-.6 9.6" />
    </Doodle>
  ),
  turbo: (
    <Doodle title="Turbo">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4.6v2.6M12 16.8v2.6M4.6 12h2.6M16.8 12h2.6M6.4 6.4l1.8 1.8M15.8 15.8l1.8 1.8M17.6 6.4l-1.8 1.8M8.2 15.8l-1.8 1.8" />
    </Doodle>
  ),
  go: (
    <Doodle title="Go">
      <ellipse cx="12" cy="12" rx="9" ry="5.4" />
      <circle cx="9.2" cy="11.4" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="11.4" r="0.7" fill="currentColor" stroke="none" />
      <path d="M9.8 14c.8.6 3.6.6 4.4 0" />
    </Doodle>
  ),
  framermotion: (
    <Doodle title="Framer Motion">
      <path d="M6.4 5.2h11.2v6.4H12Z" />
      <path d="M6.4 11.6h5.6v7.2Z" />
    </Doodle>
  ),
  cpp: (
    <Doodle title="C++">
      <circle cx="9.2" cy="12" r="6.2" />
      <path d="M16.4 9.6v4.8M14 12h4.8" />
      <path d="M18.2 7.8v3.2M16.6 9.4h3.2" />
    </Doodle>
  ),
  cplusplus: (
    <Doodle title="C++">
      <circle cx="9.2" cy="12" r="6.2" />
      <path d="M16.4 9.6v4.8M14 12h4.8" />
    </Doodle>
  ),
  groq: (
    <Doodle title="Groq">
      <path d="M5 12h14" />
      <path d="M8 8h8v8H8z" />
      <path d="M8 12h8" />
    </Doodle>
  ),
  clerk: (
    <Doodle title="Clerk">
      <circle cx="12" cy="9" r="3.2" />
      <path d="M6 18.2c1.4-2.4 3.4-3.6 6-3.6s4.6 1.2 6 3.6" />
    </Doodle>
  ),
  prisma: (
    <Doodle title="Prisma">
      <path d="M8 18 12 5l6 12-8 2.2z" />
    </Doodle>
  ),
  vite: (
    <Doodle title="Vite">
      <path d="M12 4 5 17h14L12 4z" />
      <path d="M12 9v8" />
    </Doodle>
  ),
  whatsapp: (
    <Doodle title="WhatsApp">
      <path d="M7 16.4 5.6 19.2 8.8 17.6A7.2 7.2 0 1 0 7 16.4Z" />
      <path d="M9.4 10.4c.4 1.6 2 3.2 3.6 3.6" />
    </Doodle>
  ),
  fastapi: (
    <Doodle title="FastAPI">
      <circle cx="12" cy="12" r="8" />
      <path d="M9 12h6M12 8v8" />
    </Doodle>
  ),
  openai: (
    <Doodle title="OpenAI">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5v2.4M12 16.6V19M6.4 8.2l2 1.2M15.6 14.6l2 1.2M6.4 15.8l2-1.2M15.6 9.4l2-1.2" />
    </Doodle>
  ),
  bullmq: (
    <Doodle title="BullMQ">
      <path d="M5 8h10l4 4-4 4H5V8z" />
      <path d="M8 11v2" />
    </Doodle>
  ),
  razorpay: (
    <Doodle title="Razorpay">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </Doodle>
  ),
  dynamodb: (
    <Doodle title="DynamoDB">
      <ellipse cx="12" cy="7" rx="7" ry="2.4" />
      <path d="M5 7v10c0 1.4 3.1 2.4 7 2.4s7-1 7-2.4V7" />
    </Doodle>
  ),
  firecrawl: (
    <Doodle title="Firecrawl">
      <path d="M12 19c4-3 5-6.4 5-9.2C17 6 12 4 12 4S7 6 7 9.8C7 12.6 8 16 12 19z" />
    </Doodle>
  ),
  zod: (
    <Doodle title="Zod">
      <path d="M7 7h10L7 17h10" />
    </Doodle>
  ),
  stepfunctions: (
    <Doodle title="Step Functions">
      <rect x="5" y="5" width="6" height="5" rx="1" />
      <rect x="13" y="14" width="6" height="5" rx="1" />
      <path d="M8 10v3h8v1" />
    </Doodle>
  ),
  reactflow: (
    <Doodle title="React Flow">
      <circle cx="7" cy="8" r="2.2" />
      <circle cx="17" cy="8" r="2.2" />
      <circle cx="12" cy="16" r="2.2" />
      <path d="M9 9.2 11 14M15 9.2 13 14" />
    </Doodle>
  ),
  lambda: (
    <Doodle title="Lambda">
      <path d="M7 18 12 6l5 12" />
      <path d="M9.4 13.2h5.2" />
    </Doodle>
  ),
  amazons3: (
    <Doodle title="Amazon S3">
      <path d="M6 8h12v10H6z" />
      <path d="M6 11h12" />
    </Doodle>
  ),
  cloudinary: (
    <Doodle title="Cloudinary">
      <path d="M7 16a4 4 0 1 1 1.6-7.6A5 5 0 0 1 18 12a3.4 3.4 0 0 1-1 6.6H7z" />
    </Doodle>
  ),
};

export default function DoodleIcon({ name }: { name: string }) {
  return ICONS[keyOf(name)] ?? (
    <Doodle title={name}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M8.4 12h7.2M12 8.4v7.2" />
    </Doodle>
  );
}
