import {
  Box,
  Caption,
  Frame,
  IcAlert,
  IcApp,
  IcCheck,
  IcDb,
  IcDoc,
  IcPackage,
  IcSheet,
  IcSplit,
  IcTag,
  Link,
  Pill,
} from "./parts";

/** Monorepo → two apps: extract auth, migrate route by route, then fold core in. */
export const MonolithSplit = () => (
  <Frame
    h={440}
    label="Step one extracts auth into a shared package; step two migrates routes one at a time, parking shared dependencies in dashboard-core so both apps can use them, and folds dashboard-core into kos once the last route lands, while apps/dashboard continues to serve the other teams and no team is ever blocked"
  >
    {/* ---------- step 1 ---------- */}
    <Caption x={20} y={20}>step 1 - extract the shared foundation</Caption>
    <Box x={20} y={30} w={156} h={46} title="webapp-monorepo" sub="one deploy · 16–18 min" icon={IcSplit} />
    <Link d="M180 53 L 216 53" flow />
    <Box x={220} y={30} w={148} h={46} title="packages/auth" sub="pulled out first" icon={IcPackage} accent />
    <Caption x={380} y={50} accent>every route needs it,</Caption>
    <Caption x={380} y={63}>so it moves before anything else</Caption>

    <line x1={20} y1={98} x2={580} y2={98} className="stroke-border" strokeDasharray="3 4" />

    {/* ---------- step 2 ---------- */}
    <Caption x={20} y={120}>step 2 - migrate, one route at a time</Caption>
    <Box x={20} y={132} w={150} h={46} title="apps/dashboard" sub="routes leaving" icon={IcApp} />
    <Link d="M174 155 L 232 155" flow />
    <Caption x={178} y={148} accent>route by route</Caption>
    <Box x={236} y={132} w={150} h={46} title="apps/kos" sub="routes arriving" icon={IcApp} accent />

    {/* shared dependency parking */}
    <Box x={104} y={214} w={202} h={46} title="packages/dashboard-core" sub="deps more than one route needs" icon={IcPackage} accent />
    <Link d="M150 214 L 150 198 L 95 198 L 95 183" dashed />
    <Link d="M262 214 L 262 198 L 311 198 L 311 183" dashed />
    <Caption x={320} y={232}>both apps import it while the</Caption>
    <Caption x={320} y={245}>migration is still in flight</Caption>

    <line x1={20} y1={282} x2={580} y2={282} className="stroke-border" strokeDasharray="3 4" />

    {/* ---------- end state ---------- */}
    <Caption x={20} y={304}>end state - what depends on what</Caption>
    <Pill x={20} y={318} w={140} text="packages/ui" />
    <Pill x={20} y={342} w={140} text="packages/auth" />
    <Pill x={20} y={366} w={140} text="packages/dashboard-core" accent />

    {/* one bus instead of six crossing lines */}
    <Link d="M164 327 L 196 327" arrow={false} muted />
    <Link d="M164 351 L 196 351" arrow={false} muted />
    <Link d="M164 375 L 196 375" arrow={false} muted dashed />
    <Link d="M196 327 L 196 385" arrow={false} muted />
    <Link d="M196 333 L 242 333" muted />
    <Link d="M196 385 L 242 385" muted />

    <Box x={246} y={312} w={150} h={42} title="apps/kos" sub="7–8 min · own deploy" icon={IcApp} accent />
    <Box x={246} y={364} w={150} h={42} title="apps/dashboard" sub="9–10 min · own deploy" icon={IcApp} />

    <Caption x={408} y={328} accent>dashboard-core is temporary -</Caption>
    <Caption x={408} y={341}>it folds into kos once the last</Caption>
    <Caption x={408} y={354}>route lands. dashboard stays.</Caption>

    <Caption x={20} y={424} accent>no freeze - every team kept shipping throughout · two apps, two independent deploys</Caption>
  </Frame>
);

/** Upload → classify → map to DTO → extract → verify → resolve → ingest. */
export const ExtractionPipeline = () => (
  <Frame
    h={250}
    tone="violet"
    label="Documents are classified, mapped to the backend DTO schema, extracted, then verified; missing mandatory fields are fixed inline or through bulk error resolution before ingest"
  >
    <Box x={16} y={40} w={96} h={44} title="upload" sub="document" icon={IcDoc} accent />

    <Link d="M116 62 L 148 62" flow />
    <Box x={152} y={40} w={104} h={44} title="classify" sub="doc type" icon={IcTag} />
    <Pill x={152} y={92} w={58} text="food safety" />
    <Pill x={214} y={92} w={58} text="customer" />
    <Pill x={152} y={114} w={58} text="vendor" />
    <Pill x={214} y={114} w={58} text="recipe" />

    <Link d="M260 62 L 284 62" flow />
    <Box x={288} y={40} w={148} h={44} title="column mapping" sub="→ backend DTO schema" icon={IcSheet} />

    <Link d="M440 62 L 456 62" flow />
    <Box x={460} y={40} w={124} h={44} title="extraction" sub="fields + values" icon={IcDb} />

    {/* verification gate */}
    <Link d="M522 88 L 522 116" flow />
    <Box x={432} y={120} w={152} h={46} title="verification layer" sub="mandatory fields present?" icon={IcCheck} accent />

    {/* happy path */}
    <Link d="M432 143 L 392 143" />
    <Box x={268} y={121} w={120} h={44} title="ingest" sub="into the ERP" icon={IcCheck} accent />

    {/* failure path → bulk resolution loop */}
    <Link d="M508 170 L 508 194" dashed />
    <Box x={300} y={192} w={208} h={44} title="bulk error resolution" sub="export xlsx → edit → re-upload" icon={IcAlert} />
    <Link d="M300 214 C 250 214, 250 160, 268 152" dashed />
    <Caption x={300} y={182}>missing / invalid</Caption>

    <Caption x={16} y={214}>4,500-row file</Caption>
    <Caption x={16} y={228}>load-tested</Caption>
    <Caption x={16} y={150} accent>false DUPLICATE</Caption>
    <Caption x={16} y={164} accent>flagging fixed</Caption>
  </Frame>
);

/** A UI symptom traced down through the API and DB to a single migration batch. */
export const IncidentTrace = () => (
  <Frame
    h={218}
    tone="rose"
    label="A blank address in the sales order UI traced down through the API to null address foreign keys in the database, and back to a single ERP migration batch"
  >
    {/* layer bands */}
    {[
      { y: 26, label: "ui" },
      { y: 92, label: "api" },
      { y: 158, label: "db" },
    ].map((l) => (
      <g key={l.label}>
        <line x1={64} y1={l.y + 22} x2={584} y2={l.y + 22} className="stroke-border" strokeDasharray="3 4" />
        <text x={22} y={l.y + 26} className="fill-muted-foreground/50 text-[10px]">{l.label}</text>
      </g>
    ))}

    <Box x={72} y={26} w={150} h={44} title="sales order screen" sub="address renders blank" icon={IcApp} accent />
    <Caption x={236} y={52} accent>the symptom</Caption>

    <Link d="M147 74 L 147 90" flow />
    <Box x={72} y={92} w={150} h={44} title="/erp/sales-orders" sub="address returns null" icon={IcDoc} />

    <Link d="M147 140 L 147 156" flow />
    <Box x={72} y={158} w={150} h={44} title="sales_order" sub="address_id → null" icon={IcDb} accent />

    {/* the scope of the damage */}
    <Link d="M226 180 L 268 180" />
    <Box x={272} y={158} w={126} h={44} title="119 of 326" sub="rows affected" icon={IcAlert} accent />

    {/* the cause */}
    <Link d="M402 180 L 444 180" flow />
    <Box x={448} y={158} w={136} h={44} title="one ERP batch" sub="single write window" icon={IcDb} accent />

    <Link d="M516 156 C 516 120, 516 110, 516 92" dashed />
    <Box x={448} y={92} w={136} h={44} title="*_aud tables" sub="bounded the blast radius" icon={IcSheet} />
    <Caption x={448} y={74}>audit trail, not guesswork</Caption>
  </Frame>
);

/** Validd: one Next app → shared packages → four apps, own deploys. */
export const ValiddTurboSplit = () => (
  <Frame
    h={440}
    tone="sky"
    label="Step one extracts shared packages; step two splits marketing, blogs, deeplinks and dashboard into their own apps; nginx fronts them as one site with independent deploys"
  >
    <Caption x={20} y={20} tone="orange">step 1 - extract the shared foundation</Caption>
    <Box x={20} y={30} w={168} h={46} title="validd next repo" sub="one deploy · was breaking" icon={IcSplit} accent tone="orange" />
    <Link d="M192 53 L 216 53" flow tone="sky" />
    <Box x={220} y={30} w={156} h={46} title="packages/common" sub="pulled out first" icon={IcPackage} accent tone="sky" />
    <Caption x={390} y={50} tone="sky">auth, env, ui tokens —</Caption>
    <Caption x={390} y={63}>every app needs them first</Caption>

    <line x1={20} y1={98} x2={580} y2={98} className="stroke-border" strokeDasharray="3 4" />

    <Caption x={20} y={120} tone="violet">step 2 - split, one app at a time</Caption>
    <Box x={20} y={132} w={150} h={46} title="apps/static" sub="marketing leaving" icon={IcApp} accent tone="violet" />
    <Link d="M174 155 L 210 155" flow tone="emerald" />
    <Caption x={176} y={148} tone="emerald">app by app</Caption>
    <Box x={236} y={132} w={150} h={46} title="apps/dashboard" sub="investor arriving" icon={IcApp} accent tone="emerald" />
    <Pill x={20} y={190} w={70} text="blogs" tone="amber" />
    <Pill x={96} y={190} w={78} text="deeplink" tone="teal" />
    <Pill x={180} y={190} w={58} text="ui / db" tone="sky" accent />
    <Caption x={250} y={202}>both apps import packages while</Caption>
    <Caption x={250} y={215}>the split is still in flight</Caption>

    <line x1={20} y1={246} x2={580} y2={246} className="stroke-border" strokeDasharray="3 4" />

    <Caption x={20} y={268}>end state - what depends on what</Caption>
    <Pill x={20} y={282} w={148} text="packages/ui" tone="sky" />
    <Pill x={20} y={306} w={148} text="packages/common" tone="amber" />
    <Pill x={20} y={330} w={148} text="packages/db" tone="emerald" accent />

    <Link d="M172 291 L 204 291" arrow={false} muted />
    <Link d="M172 315 L 204 315" arrow={false} muted />
    <Link d="M172 339 L 204 339" arrow={false} muted />
    <Link d="M204 291 L 204 385" arrow={false} muted />
    <Link d="M204 312 L 246 312" muted />
    <Link d="M204 360 L 246 360" muted />

    <Box x={250} y={278} w={150} h={42} title="apps/static" sub="own deploy" icon={IcApp} accent tone="violet" />
    <Box x={250} y={328} w={150} h={42} title="apps/dashboard" sub="own deploy" icon={IcApp} accent tone="emerald" />
    <Box x={416} y={278} w={150} h={42} title="apps/blogs" sub="Strapi revalidate" icon={IcApp} accent tone="amber" />
    <Box x={416} y={328} w={150} h={42} title="apps/deeplink" sub="universal links" icon={IcApp} accent tone="teal" />

    <Caption x={20} y={392} tone="sky">nginx :3000 is one site — /  /blog  /dashboard  /links</Caption>
    <Caption x={20} y={424} tone="emerald">no freeze — beta and prod kept shipping · four apps, independent deploys</Caption>
  </Frame>
);

/** SuperKalam DNA: scrape → OCR → LLM → Strapi → verify → PDF. */
export const DnaPipeline = () => (
  <Frame
    h={268}
    tone="violet"
    label="E-paper is scraped and OCR'd, classified by source, summarised by an LLM, published in Strapi, verified, then rendered to PDF"
  >
    <Box x={16} y={36} w={100} h={44} title="intake" sub="e-paper / scrape" icon={IcDoc} accent />
    <Link d="M120 58 L 148 58" flow />
    <Box x={152} y={36} w={104} h={44} title="classify" sub="source" icon={IcTag} />
    <Pill x={152} y={88} w={50} text="IE" />
    <Pill x={206} y={88} w={50} text="Hindu" />
    <Pill x={152} y={110} w={50} text="PIB" />
    <Pill x={206} y={110} w={50} text="UPSC" accent />

    <Link d="M260 58 L 284 58" flow />
    <Box x={288} y={36} w={120} h={44} title="OCR + LLM" sub="Gemini summary" icon={IcSheet} />

    <Link d="M412 58 L 436 58" flow />
    <Box x={440} y={36} w={140} h={44} title="Strapi" sub="dna-summaries" icon={IcDb} />

    <Link d="M510 84 L 510 116" flow />
    <Box x={424} y={120} w={156} h={46} title="verification" sub="IST date · fields present?" icon={IcCheck} accent />

    <Link d="M424 143 L 384 143" />
    <Box x={256} y={121} w={124} h={44} title="WeasyPrint" sub="daily + article PDF" icon={IcCheck} accent />

    <Link d="M256 143 L 216 143" />
    <Box x={88} y={121} w={124} h={44} title="CloudFront" sub="student download" icon={IcApp} />

    <Link d="M500 170 L 500 198" dashed />
    <Box x={292} y={196} w={216} h={44} title="reject / Slack" sub="stale edition · missing fields" icon={IcAlert} />
    <Caption x={16} y={232} accent>stale IE URL vs today IST</Caption>
    <Caption x={16} y={248}>cannot publish yesterday as today</Caption>
  </Frame>
);

/** Chat image RAG: insert then extract into the thread. */
export const ImageRagPipeline = () => (
  <Frame
    h={250}
    tone="violet"
    label="Editors insert watermarked diagrams into S3 and Qdrant; chat embeds the question and attaches the retrieved figure"
  >
    <Caption x={16} y={22}>insert</Caption>
    <Box x={16} y={32} w={100} h={44} title="upload" sub="diagram + keywords" icon={IcDoc} accent />
    <Link d="M120 54 L 148 54" flow />
    <Box x={152} y={32} w={112} h={44} title="watermark" sub="resize → WebP" icon={IcSheet} />
    <Link d="M268 54 L 296 54" flow />
    <Box x={300} y={32} w={120} h={44} title="embed" sub="text-embedding-3" icon={IcTag} />
    <Link d="M424 54 L 452 54" flow />
    <Box x={456} y={32} w={124} h={44} title="Qdrant" sub="image_search" icon={IcDb} accent />

    <line x1={16} y1={100} x2={584} y2={100} className="stroke-border" strokeDasharray="3 4" />

    <Caption x={16} y={120}>extract — student asks in chat</Caption>
    <Box x={16} y={132} w={112} h={44} title="query" sub="same embed model" icon={IcDoc} />
    <Link d="M132 154 L 168 154" flow />
    <Box x={172} y={132} w={120} h={44} title="retrieve" sub="dense search" icon={IcDb} accent />
    <Link d="M296 154 L 332 154" flow />
    <Box x={336} y={132} w={128} h={44} title="attach" sub="figure in the thread" icon={IcCheck} accent />

    <Box x={16} y={196} w={200} h={40} title="coverage tool" sub="subject → unit → lesson %  ·  gaps" icon={IcAlert} />
    <Caption x={232} y={220} accent>team sees what to insert next</Caption>
  </Frame>
);

/** Homi Red Pen: photo → OCR steps → RAG → score → feedback. */
export const HomiRedPenPipeline = () => (
  <Frame
    h={248}
    tone="rose"
    label="Handwritten work is OCR'd, retrieved against the curriculum, scored, then written as red-pen feedback"
  >
    <Caption x={16} y={18} tone="sky">Red Pen — grade the working, not just the final number</Caption>
    <Box x={16} y={32} w={108} h={48} title="photo" sub="notebook page" icon={IcDoc} accent tone="sky" />
    <Link d="M128 56 L 156 56" flow tone="amber" />
    <Box x={160} y={32} w={120} h={48} title="OCR" sub="steps, not just answer" icon={IcSheet} accent tone="amber" />
    <Link d="M284 56 L 312 56" flow tone="violet" />
    <Box x={316} y={32} w={128} h={48} title="match" sub="canonical + alternates" icon={IcSplit} accent tone="violet" />
    <Link d="M448 56 L 476 56" flow tone="teal" />
    <Box x={480} y={32} w={104} h={48} title="score" sub="method vs key" icon={IcCheck} accent tone="teal" />

    <Box x={16} y={112} w={200} h={48} title="red-pen note" sub="which step broke · what to retry" icon={IcAlert} accent tone="rose" />
    <Link d="M220 136 L 256 136" flow tone="emerald" />
    <Box x={260} y={112} w={180} h={48} title="teacher comment" sub="method sound? retry this" icon={IcCheck} accent tone="emerald" />

    <Caption x={16} y={188} tone="rose">a correct method with an arithmetic slip is not a blank</Caption>
    <Caption x={16} y={204}>output is a short teacher comment — not a binary mark</Caption>
  </Frame>
);

/** Homi RAG: query stays inside board / class / chapter. */
export const HomiRagPipeline = () => (
  <Frame
    h={248}
    tone="sky"
    label="A maths query is filtered to the current board, class, and chapter before retrieval; thin hits refuse instead of inventing an off-syllabus proof"
  >
    <Caption x={16} y={18} tone="sky">curriculum RAG — stay inside what this class has been taught</Caption>
    <Box x={16} y={32} w={112} h={48} title="ask" sub="linear equations" icon={IcDoc} accent tone="sky" />
    <Link d="M132 56 L 160 56" flow tone="amber" />
    <Box x={164} y={32} w={140} h={48} title="scope" sub="board · class · chapter" icon={IcTag} accent tone="amber" />
    <Link d="M308 56 L 336 56" flow tone="violet" />
    <Box x={340} y={32} w={132} h={48} title="retrieve" sub="worked examples" icon={IcDb} accent tone="violet" />
    <Link d="M476 56 L 504 56" flow tone="emerald" />
    <Box x={508} y={32} w={76} h={48} title="write" sub="same method" icon={IcCheck} accent tone="emerald" />

    <Pill x={164} y={96} w={56} text="CBSE" tone="sky" />
    <Pill x={228} y={96} w={64} text="Class 8" tone="amber" />
    <Pill x={300} y={96} w={72} text="chapter" tone="violet" />

    <Box x={16} y={136} w={200} h={48} title="thin retrieval" sub="off-syllabus or empty hit" icon={IcAlert} accent tone="rose" />
    <Link d="M220 160 L 256 160" flow tone="rose" />
    <Box x={260} y={136} w={200} h={48} title="refuse" sub="do not invent a textbook" icon={IcCheck} accent tone="rose" />

    <Caption x={16} y={208} tone="amber">Class 8 linear equations must not pull Class 10 identity proofs</Caption>
  </Frame>
);

/** Homi LangGraph: evaluate → retrieve → write; OCR fail does not become a mark. */
export const HomiLangGraphPipeline = () => (
  <Frame
    h={232}
    tone="violet"
    label="LangGraph runs evaluate, retrieve, then write-feedback; a failed OCR step stops the graph instead of silently marking the student wrong"
  >
    <Caption x={16} y={18} tone="violet">LangGraph — a failed OCR step does not become a wrong mark</Caption>
    <Box x={16} y={32} w={120} h={48} title="evaluate" sub="OCR + steps" icon={IcSheet} accent tone="amber" />
    <Link d="M140 56 L 168 56" flow tone="sky" />
    <Box x={172} y={32} w={128} h={48} title="retrieve" sub="syllabus map" icon={IcDb} accent tone="sky" />
    <Link d="M304 56 L 332 56" flow tone="emerald" />
    <Box x={336} y={32} w={148} h={48} title="write feedback" sub="red-pen comment" icon={IcCheck} accent tone="emerald" />

    <Link d="M76 80 L 76 116" dashed tone="rose" />
    <Box x={16} y={120} w={168} h={48} title="OCR fail" sub="unreadable page" icon={IcAlert} accent tone="rose" />
    <Link d="M188 144 L 224 144" flow tone="rose" />
    <Box x={228} y={120} w={180} h={48} title="stop + retry" sub="ask for a clearer photo" icon={IcSplit} accent tone="rose" />

    <Caption x={16} y={196} tone="teal">Postgres stores problem metadata, syllabus maps, and replayable traces</Caption>
  </Frame>
);

/** Validd advisor: message → route → tools → paywall / Novu. */
export const ValiddAdvisorPipeline = () => (
  <Frame
    h={232}
    tone="violet"
    label="Chat hits a LangGraph router, tools pull market data, unpaid users hit a paywall, alerts go out on Novu"
  >
    <Caption x={16} y={18} tone="sky">LangGraph advisor — Supabase realtime, 24h channel memory</Caption>
    <Box x={16} y={32} w={108} h={48} title="message" sub="Supabase realtime" icon={IcDoc} accent tone="sky" />
    <Link d="M128 56 L 156 56" flow tone="violet" />
    <Box x={160} y={32} w={128} h={48} title="router" sub="LangGraph intent" icon={IcSplit} accent tone="violet" />
    <Link d="M292 56 L 320 56" flow tone="amber" />
    <Box x={324} y={32} w={132} h={48} title="tools" sub="NSE · candles · snapshot" icon={IcSheet} accent tone="amber" />
    <Link d="M460 56 L 488 56" flow tone="emerald" />
    <Box x={492} y={32} w={92} h={48} title="reply" sub="24h memory" icon={IcCheck} accent tone="emerald" />

    <Pill x={160} y={96} w={60} text="stock Q" tone="sky" />
    <Pill x={228} y={96} w={56} text="search" tone="teal" />
    <Pill x={292} y={96} w={68} text="research" tone="amber" />
    <Pill x={368} y={96} w={68} text="off-topic" tone="rose" />

    <Box x={16} y={132} w={148} h={48} title="paywall" sub="voice clip · unpaid" icon={IcAlert} accent tone="rose" />
    <Box x={180} y={132} w={148} h={48} title="Novu" sub="trade alert push" icon={IcApp} accent tone="orange" />
    <Caption x={348} y={152} tone="orange">same topics as equity / portfolio / F&O</Caption>
    <Caption x={16} y={204} tone="teal">LangSmith traces every router + tool hop</Caption>
  </Frame>
);

/** Validd: Cashfree pay → idempotent webhook → DigiLocker KYC → Novu tags. */
export const ValiddPayKycPipeline = () => (
  <Frame
    h={248}
    tone="amber"
    label="One Cashfree stack covers equity, portfolio, and F&O; an idempotent webhook extends premium, then DigiLocker KYC unlocks advisory and Novu tags the product they bought"
  >
    <Caption x={16} y={18} tone="amber">one Cashfree stack · three products</Caption>
    <Pill x={16} y={32} w={72} text="equity" tone="sky" />
    <Pill x={96} y={32} w={80} text="portfolio" tone="emerald" />
    <Pill x={184} y={32} w={56} text="F&O" tone="violet" />

    <Box x={16} y={64} w={120} h={48} title="Cashfree" sub="order · autopay" icon={IcDoc} accent tone="blue" />
    <Link d="M140 88 L 168 88" flow tone="amber" />
    <Box x={172} y={64} w={148} h={48} title="webhook" sub="idempotent extend" icon={IcCheck} accent tone="amber" />
    <Link d="M324 88 L 352 88" flow tone="rose" />
    <Box x={356} y={64} w={132} h={48} title="DigiLocker" sub="KYC after first pay" icon={IcTag} accent tone="rose" />
    <Link d="M492 88 L 520 88" flow tone="orange" />
    <Box x={524} y={64} w={60} h={48} title="Novu" sub="tags" icon={IcApp} accent tone="orange" />

    <Box x={16} y={140} w={200} h={48} title="retry safe" sub="idempotent · no double extend" icon={IcCheck} accent tone="teal" />
    <Box x={232} y={140} w={200} h={48} title="SEBI gate" sub="blocks advisory until KYC" icon={IcAlert} accent tone="rose" />

    <Caption x={16} y={212} tone="rose">status lives on the user in Supabase — app and dashboard both read it</Caption>
  </Frame>
);

/** Validd: OneSignal cutover → self-hosted Novu → FCM data → Notifee. */
export const ValiddNovuPipeline = () => (
  <Frame
    h={248}
    tone="orange"
    label="OneSignal is mapped to self-hosted Novu topics; FCM data messages render through Notifee so Android never draws a grey tray icon"
  >
    <Caption x={16} y={18} tone="orange">self-hosted Novu at novu.validd.in — not a plugin in the app repo</Caption>
    <Box x={16} y={32} w={128} h={48} title="OneSignal" sub="old segment names" icon={IcDoc} accent tone="rose" />
    <Link d="M148 56 L 176 56" flow tone="amber" />
    <Box x={180} y={32} w={132} h={48} title="map API" sub="admin unchanged" icon={IcSplit} accent tone="amber" />
    <Link d="M316 56 L 344 56" flow tone="orange" />
    <Box x={348} y={32} w={120} h={48} title="Novu" sub="own box" icon={IcApp} accent tone="orange" />
    <Link d="M472 56 L 500 56" flow tone="sky" />
    <Box x={504} y={32} w={80} h={48} title="FCM" sub="data only" icon={IcSheet} accent tone="sky" />

    <Box x={16} y={112} w={168} h={48} title="Notifee" sub="branded tray + trade sound" icon={IcCheck} accent tone="teal" />
    <Pill x={200} y={112} w={64} text="Equity" tone="sky" />
    <Pill x={272} y={112} w={78} text="Portfolio" tone="emerald" />
    <Pill x={358} y={112} w={48} text="F&O" tone="violet" />
    <Pill x={414} y={112} w={68} text="premium" tone="amber" />
    <Pill x={490} y={112} w={56} text="active" tone="teal" />

    <Caption x={16} y={184} tone="sky">STOCKSYNC + AI service fire the same topics · 100 tokens / subscriber</Caption>
    <Caption x={16} y={200}>plan change rewrites topic membership so the next push is the product they bought</Caption>
  </Frame>
);

/** Validd: Supabase source of truth + crons + realtime chat memory. */
export const ValiddDataPipeline = () => (
  <Frame
    h={232}
    tone="emerald"
    label="Supabase is the source of truth for users and plans; realtime carries AI chat memory; crons refresh LTP, NAVs, and portfolio vs Nifty"
  >
    <Caption x={16} y={18} tone="emerald">Supabase — separate from the Next apps</Caption>
    <Box x={16} y={32} w={120} h={48} title="Auth" sub="users · plans" icon={IcDoc} accent tone="sky" />
    <Link d="M140 56 L 168 56" flow tone="emerald" />
    <Box x={172} y={32} w={140} h={48} title="Postgres" sub="subs · seats · holdings" icon={IcDb} accent tone="emerald" />
    <Link d="M316 56 L 344 56" flow tone="violet" />
    <Box x={348} y={32} w={140} h={48} title="realtime" sub="AI chat · 24h memory" icon={IcSplit} accent tone="violet" />

    <Box x={16} y={112} w={132} h={48} title="LTP + NAV" sub="daily cron" icon={IcSheet} accent tone="amber" />
    <Box x={164} y={112} w={148} h={48} title="vs Nifty" sub="portfolio cron" icon={IcTag} accent tone="orange" />
    <Box x={328} y={112} w={148} h={48} title="engagement" sub="push cron" icon={IcApp} accent tone="rose" />

    <Caption x={16} y={188} tone="teal">PROD → BETA clone with a schema safety check</Caption>
    <Caption x={16} y={204}>migrations I wrote for subscriptions, staff seats, and active-days</Caption>
  </Frame>
);

/** Validd: GitHub Action builds, then atomic swap into the live tree and PM2 reload. */
export const ValiddDeployPipeline = () => (
  <Frame
    h={220}
    tone="teal"
    label="Actions build in the workspace, then an atomic swap of node_modules, packages, and .next into the live tree before PM2 reload so checkout cannot delete the running site"
  >
    <Caption x={16} y={18} tone="teal">self-hosted deploy — checkout used to delete live .next mid-ship</Caption>
    <Box x={16} y={32} w={132} h={48} title="Action" sub="build workspace" icon={IcDoc} accent tone="sky" />
    <Link d="M152 56 L 180 56" flow tone="amber" />
    <Box x={184} y={32} w={132} h={48} title="build" sub="one app or all four" icon={IcPackage} accent tone="amber" />
    <Link d="M320 56 L 348 56" flow tone="orange" />
    <Box x={352} y={32} w={140} h={48} title="atomic swap" sub=".next + node_modules" icon={IcSplit} accent tone="orange" />
    <Link d="M496 56 L 524 56" flow tone="emerald" />
    <Box x={528} y={32} w={56} h={48} title="PM2" sub="reload" icon={IcCheck} accent tone="emerald" />

    <Pill x={16} y={104} w={64} text="static" tone="violet" />
    <Pill x={88} y={104} w={56} text="blogs" tone="amber" />
    <Pill x={152} y={104} w={72} text="deeplink" tone="teal" />
    <Pill x={232} y={104} w={80} text="dashboard" tone="emerald" />
    <Caption x={328} y={116} tone="sky">live tree is $HOME/validd-frontend · beta and prod runners</Caption>

    <Caption x={16} y={156} tone="orange">3_release.sh swaps, then reload — never serve from the Actions workspace</Caption>
    <Caption x={16} y={172}>first cutover is all four; later updates can ship one app</Caption>
  </Frame>
);

/** Gigsfield: canvas graph → API Gateway → Step Functions → model Lambdas → S3. */
export const GigsfieldPipeline = () => (
  <Frame
    h={268}
    tone="orange"
    label="A node graph on the canvas is compiled into a Step Functions execution; each node runs as a Lambda against Flux, Veo, Kling or Gemini, then writes media to S3"
  >
    <Caption x={16} y={20} tone="sky">canvas — Next.js + xyflow</Caption>
    <Box x={16} y={32} w={120} h={44} title="graph" sub="nodes · edges · credits" icon={IcApp} accent tone="sky" />
    <Link d="M140 54 L 168 54" flow tone="sky" />
    <Box x={172} y={32} w={120} h={44} title="API Gateway" sub="flexible execute" icon={IcDoc} accent tone="amber" />
    <Link d="M296 54 L 324 54" flow tone="orange" />
    <Box x={328} y={32} w={132} h={44} title="Step Functions" sub="dynamic state machine" icon={IcSplit} accent tone="orange" />
    <Link d="M464 54 L 492 54" flow tone="violet" />
    <Box x={496} y={32} w={88} h={44} title="Lambda" sub="one node" icon={IcPackage} accent tone="violet" />

    <line x1={16} y1={100} x2={584} y2={100} className="stroke-border" strokeDasharray="3 4" />

    <Caption x={16} y={118}>model fan-out</Caption>
    <Pill x={16} y={130} w={56} text="Flux" tone="orange" accent />
    <Pill x={78} y={130} w={72} text="Ideogram" tone="rose" />
    <Pill x={156} y={130} w={56} text="Veo 3" tone="sky" />
    <Pill x={218} y={130} w={56} text="Kling" tone="violet" />
    <Pill x={280} y={130} w={72} text="Seedance" tone="teal" />
    <Pill x={358} y={130} w={64} text="Gemini" tone="blue" accent />
    <Pill x={428} y={130} w={70} text="Imagen 4" tone="emerald" />

    <Box x={16} y={176} w={140} h={44} title="DynamoDB" sub="workflow + execution" icon={IcDb} accent tone="emerald" />
    <Link d="M160 198 L 196 198" flow tone="sky" />
    <Box x={200} y={176} w={140} h={44} title="S3" sub="async-workflow-outputs" icon={IcSheet} accent tone="sky" />
    <Link d="M344 198 L 380 198" flow tone="teal" />
    <Box x={384} y={176} w={140} h={44} title="review" sub="QC before download" icon={IcCheck} accent tone="teal" />

    <Caption x={16} y={240} tone="orange">campaigns batch a CSV across the same graph · credits debit per node</Caption>
  </Frame>
);

/** Echosphere: report / voice → Gemini classify → assign → WhatsApp → resolve. */
export const EchospherePipeline = () => (
  <Frame
    h={250}
    tone="teal"
    label="A resident report or voice call is classified by Gemini, assigned to a technician field, and progressed through WhatsApp until the owner or resident marks it resolved"
  >
    <Box x={16} y={36} w={108} h={44} title="intake" sub="app · voice · WhatsApp" icon={IcDoc} accent tone="sky" />
    <Link d="M128 58 L 156 58" flow tone="violet" />
    <Box x={160} y={36} w={124} h={44} title="Gemini" sub="type · priority · trade" icon={IcSplit} accent tone="violet" />
    <Pill x={160} y={88} w={56} text="issue" tone="rose" />
    <Pill x={220} y={88} w={64} text="service" tone="amber" />
    <Pill x={160} y={110} w={48} text="P1" tone="rose" accent />
    <Pill x={212} y={110} w={72} text="approve?" tone="amber" />

    <Link d="M288 58 L 316 58" flow tone="amber" />
    <Box x={320} y={36} w={128} h={44} title="assign" sub="Prisma · field match" icon={IcTag} accent tone="amber" />
    <Link d="M452 58 L 480 58" flow tone="emerald" />
    <Box x={484} y={36} w={100} h={44} title="WhatsApp" sub="status ping" icon={IcApp} accent tone="emerald" />

    <Link d="M384 84 L 384 124" flow tone="orange" />
    <Box x={248} y={128} w={148} h={44} title="in progress" sub="photos · Cloudinary" icon={IcSheet} accent tone="orange" />
    <Link d="M400 150 L 440 150" tone="teal" />
    <Box x={444} y={128} w={140} h={44} title="resolved" sub="owner / resident close" icon={IcCheck} accent tone="teal" />

    <Caption x={16} y={200} tone="amber">owner approval gates services · issues skip straight to the matching trade</Caption>
    <Caption x={16} y={220}>roles: resident · owner · technician · PG community analytics</Caption>
  </Frame>
);

/** ProspectLens: planner → research fan-out → analyze → QC loop → report. */
export const ProspectLensPipeline = () => (
  <Frame
    h={360}
    tone="sky"
    label="A session hits the planner, then research fans out in parallel across Perplexity, Tavily, Firecrawl, Apollo, NewsAPI and ProductHunt; analyze and hybrid QC decide whether to recover gap-only queries or generate the report"
  >
    <Caption x={16} y={18} tone="sky">graph — LangGraph astream + Postgres checkpoint</Caption>
    <Box x={16} y={30} w={108} h={44} title="session" sub="company · objective" icon={IcDoc} accent tone="sky" />
    <Link d="M128 52 L 156 52" flow tone="blue" />
    <Box x={160} y={30} w={108} h={44} title="planner" sub="targeted queries" icon={IcSheet} accent tone="blue" />
    <Link d="M272 52 L 300 52" flow tone="violet" />
    <Box x={304} y={30} w={120} h={44} title="research" sub="asyncio.gather" icon={IcSplit} accent tone="violet" />

    <line x1={16} y1={92} x2={584} y2={92} className="stroke-border" strokeDasharray="3 4" />

    <Caption x={16} y={108}>fan-out — first pass only; retries skip the heavy providers</Caption>
    <Pill x={16} y={122} w={78} text="Perplexity" tone="sky" accent />
    <Pill x={100} y={122} w={58} text="Tavily" tone="teal" />
    <Pill x={164} y={122} w={72} text="Firecrawl" tone="orange" />
    <Pill x={242} y={122} w={56} text="Apollo" tone="amber" />
    <Pill x={304} y={122} w={68} text="NewsAPI" tone="rose" />
    <Pill x={378} y={122} w={86} text="ProductHunt" tone="emerald" />
    <Caption x={16} y={150}>thin / error payloads get sanitized before analyze sees them</Caption>

    <line x1={16} y1={170} x2={584} y2={170} className="stroke-border" strokeDasharray="3 4" />

    <Caption x={16} y={186}>QC loop — score ≥ 0.75 or retry ≥ 2 leaves; else gap-only recovery</Caption>
    <Box x={16} y={200} w={108} h={44} title="analyze" sub="signals · ICP · risks" icon={IcSheet} accent tone="amber" />
    <Link d="M128 222 L 156 222" flow tone="teal" />
    <Box x={160} y={200} w={128} h={44} title="quality check" sub="coverage + LLM" icon={IcCheck} accent tone="teal" />
    <Link d="M292 222 L 324 222" tone="rose" />
    <Box x={328} y={200} w={120} h={44} title="recovery" sub="gap queries only" icon={IcAlert} accent tone="rose" />
    <Link d="M388 200 L 388 176 L 364 176 L 364 78 L 364 74" dashed tone="rose" />
    <Caption x={456} y={214} tone="rose">back to research</Caption>
    <Caption x={456} y={228}>not a full re-fan-out</Caption>

    <Box x={16} y={268} w={128} h={44} title="report" sub="10-section fan-out" icon={IcDoc} accent tone="violet" />
    <Link d="M148 290 L 176 290" flow tone="emerald" />
    <Box x={180} y={268} w={128} h={44} title="validate" sub="normalize · unknowns" icon={IcCheck} accent tone="emerald" />
    <Link d="M312 290 L 340 290" flow tone="sky" />
    <Box x={344} y={268} w={140} h={44} title="pgvector" sub="index briefing" icon={IcDb} accent tone="sky" />

    <Caption x={16} y={332} tone="sky">checkpoint per node — resume skips planner/research · Redis caches research + node outputs</Caption>
  </Frame>
);

/** ProspectLens report: one node fans into 10 parallel section LLM calls. */
export const ProspectLensReportFanout = () => (
  <Frame
    h={232}
    tone="violet"
    label="Report generator extracts Apollo firmographics then fans ten section overviews in parallel, merges them, and normalizes before persist"
  >
    <Caption x={16} y={18} tone="amber">report generator — parallel section calls</Caption>
    <Box x={16} y={30} w={140} h={44} title="extract" sub="Apollo · sources · snapshot" icon={IcSheet} accent tone="amber" />
    <Link d="M160 52 L 188 52" flow tone="violet" />
    <Box x={192} y={30} w={140} h={44} title="fan-out" sub="10 LLM overviews" icon={IcSplit} accent tone="violet" />
    <Link d="M336 52 L 364 52" flow tone="teal" />
    <Box x={368} y={30} w={140} h={44} title="merge" sub="normalize_report" icon={IcCheck} accent tone="teal" />

    <Pill x={16} y={96} w={72} text="company" tone="sky" />
    <Pill x={94} y={96} w={72} text="products" tone="blue" />
    <Pill x={172} y={96} w={78} text="customers" tone="teal" />
    <Pill x={256} y={96} w={86} text="stakeholders" tone="violet" />
    <Pill x={348} y={96} w={58} text="signals" tone="amber" accent />
    <Pill x={16} y={120} w={56} text="risks" tone="rose" />
    <Pill x={78} y={120} w={78} text="discovery" tone="orange" />
    <Pill x={162} y={120} w={72} text="outreach" tone="emerald" />
    <Pill x={240} y={120} w={78} text="unknowns" tone="rose" />
    <Pill x={324} y={120} w={64} text="sources" tone="sky" />

    <Caption x={16} y={160} tone="violet">same gather pattern as research — one slow section does not block the rest</Caption>
    <Caption x={16} y={176}>dashboard + full view + print PDF read the same JSONB</Caption>
    <Caption x={16} y={208}>SSE stepper shows each graph node; report fan-out is inside report_generator</Caption>
  </Frame>
);

/** ProspectLens chat: RAG first, then optional tool fan-out. */
export const ProspectLensChatPipeline = () => (
  <Frame
    h={210}
    tone="teal"
    label="Follow-up chat retrieves briefing chunks from pgvector first, then can fan out to live tools without re-running the graph"
  >
    <Box x={16} y={36} w={108} h={44} title="question" sub="follow-up chat" icon={IcDoc} accent tone="sky" />
    <Link d="M128 58 L 156 58" flow tone="emerald" />
    <Box x={160} y={36} w={132} h={44} title="search_report" sub="pgvector top-k" icon={IcDb} accent tone="emerald" />
    <Link d="M296 58 L 324 58" flow tone="violet" />
    <Box x={328} y={36} w={128} h={44} title="agent" sub="tool-calling loop" icon={IcSplit} accent tone="violet" />
    <Link d="M460 58 L 488 58" flow tone="teal" />
    <Box x={492} y={36} w={92} h={44} title="reply" sub="Redis ctx" icon={IcCheck} accent tone="teal" />

    <Caption x={16} y={104}>tool fan-out — only if the briefing is thin</Caption>
    <Pill x={16} y={118} w={78} text="web_search" tone="sky" />
    <Pill x={100} y={118} w={64} text="Apollo" tone="amber" />
    <Pill x={170} y={118} w={56} text="news" tone="rose" />
    <Pill x={232} y={118} w={86} text="deep_research" tone="violet" />
    <Pill x={324} y={118} w={72} text="scrape" tone="orange" accent />

    <Caption x={16} y={160} tone="teal">Redis report_ctx · 7d — chat boots without re-embedding</Caption>
    <Caption x={16} y={176}>embeddings: text-embedding-3-small · 1536-d in report_rag_chunks</Caption>
  </Frame>
);

/** HobbyFlow: creation chat → provider cascade → 5–8 technique plan. */
export const HobbyFlowPipeline = () => (
  <Frame
    h={300}
    tone="amber"
    label="Creation chat collects hobby intent, then a plan pipeline tries Groq, OpenRouter, then the AI Gateway, validates, and materializes a 5–8 technique roadmap"
  >
    <Caption x={16} y={18} tone="sky">create — LangGraph chat, then POST /plans</Caption>
    <Box x={16} y={30} w={108} h={44} title="intent" sub="hobby · level · goal" icon={IcDoc} accent tone="sky" />
    <Link d="M128 52 L 156 52" flow tone="violet" />
    <Box x={160} y={30} w={128} h={44} title="clarify" sub="4–5 MCQ chips" icon={IcSplit} accent tone="violet" />
    <Link d="M292 52 L 320 52" flow tone="emerald" />
    <Box x={324} y={30} w={128} h={44} title="goal card" sub="edit · confirm" icon={IcCheck} accent tone="emerald" />

    <line x1={16} y1={92} x2={584} y2={92} className="stroke-border" strokeDasharray="3 4" />

    <Caption x={16} y={108}>provider cascade — blocking, user-facing</Caption>
    <Box x={16} y={122} w={100} h={44} title="cache" sub="hobby + level + goal" icon={IcDb} accent tone="teal" />
    <Link d="M120 144 L 148 144" flow tone="orange" />
    <Box x={152} y={122} w={88} h={44} title="Groq" sub="Llama 3.3" icon={IcSheet} accent tone="orange" />
    <Link d="M244 144 L 268 144" dashed tone="violet" />
    <Box x={272} y={122} w={100} h={44} title="OpenRouter" sub="free fallback" icon={IcSheet} accent tone="violet" />
    <Link d="M376 144 L 400 144" dashed tone="blue" />
    <Box x={404} y={122} w={100} h={44} title="Gateway" sub="Gemini lite" icon={IcSheet} accent tone="blue" />

    <Box x={16} y={192} w={120} h={44} title="validate" sub="Zod · no URLs" icon={IcCheck} accent tone="teal" />
    <Link d="M140 214 L 168 214" flow tone="amber" />
    <Box x={172} y={192} w={132} h={44} title="modality" sub="video · audio · read" icon={IcTag} accent tone="amber" />
    <Link d="M308 214 L 336 214" flow tone="emerald" />
    <Box x={340} y={192} w={140} h={44} title="roadmap" sub="5–8 techniques" icon={IcApp} accent tone="emerald" />

    <Caption x={16} y={260} tone="amber">LLM returns search_query only — server never accepts invented URLs</Caption>
    <Caption x={16} y={276}>JWT via Supabase JWKS · plan cache 24h · LangSmith on the graph</Caption>
  </Frame>
);

/** HobbyFlow lesson: pending_content → media fan-out → ready. */
export const HobbyFlowLessonPipeline = () => (
  <Frame
    h={236}
    tone="sky"
    label="A lesson stays pending until the learner opens it; LangGraph then fans text, YouTube, and Google image resolve into Storage and flips the node to ready"
  >
    <Caption x={16} y={18} tone="sky">just-in-time lesson — not pre-generated at CREATE</Caption>
    <Box x={16} y={32} w={120} h={44} title="open lesson" sub="pending_content" icon={IcDoc} accent tone="sky" />
    <Link d="M140 54 L 168 54" flow tone="violet" />
    <Box x={172} y={32} w={120} h={44} title="LangGraph" sub="pages + queries" icon={IcSplit} accent tone="violet" />
    <Link d="M296 54 L 324 54" flow tone="orange" />
    <Box x={328} y={32} w={140} h={44} title="resolve" sub="YouTube · Google" icon={IcSheet} accent tone="orange" />
    <Link d="M472 54 L 500 54" flow tone="emerald" />
    <Box x={504} y={32} w={80} h={44} title="ready" sub="player" icon={IcCheck} accent tone="emerald" />

    <Pill x={172} y={96} w={48} text="text" tone="sky" />
    <Pill x={226} y={96} w={56} text="image" tone="amber" />
    <Pill x={288} y={96} w={52} text="video" tone="rose" accent />
    <Pill x={346} y={96} w={52} text="audio" tone="teal" />

    <Box x={16} y={140} w={200} h={48} title="Storage" sub="lesson-media · same assets next open" icon={IcDb} accent tone="teal" />
    <Caption x={232} y={152} tone="amber" width={560}>skip vs replace are different</Caption>
    <Caption x={232} y={166} width={560}>skip drops · replace re-runs one technique</Caption>
  </Frame>
);

/** HobbyFlow ask + daily tasks: tools scoped to JWT user. */
export const HobbyFlowAskPipeline = () => (
  <Frame
    h={248}
    tone="rose"
    label="Ask Anything and daily tasks are LangGraph tool loops over this user’s rows only; daily tasks generate lazily when the learner taps See today"
  >
    <Box x={16} y={28} w={120} h={48} title="Ask FAB" sub="new chat thread" icon={IcDoc} accent tone="sky" />
    <Link d="M140 52 L 168 52" flow tone="violet" />
    <Box x={172} y={28} w={148} h={48} title="tools" sub="JWT-scoped reads" icon={IcSplit} accent tone="violet" />
    <Link d="M324 52 L 352 52" flow tone="emerald" />
    <Box x={356} y={28} w={140} h={48} title="reply" sub="HobbyFlow-aware" icon={IcCheck} accent tone="emerald" />

    <Pill x={172} y={92} w={64} text="profile" tone="sky" />
    <Pill x={244} y={92} w={80} text="roadmaps" tone="violet" />
    <Pill x={332} y={92} w={60} text="streak" tone="amber" />
    <Pill x={400} y={92} w={48} text="pact" tone="rose" />
    <Pill x={456} y={92} w={52} text="posts" tone="teal" />

    <Box x={16} y={128} w={280} h={52} title="daily task" sub="lazy generate · 2 regenerates · rating once / day" icon={IcAlert} accent tone="rose" />
    <Caption x={16} y={204} tone="rose">
      a miss still counts if they never tapped See today
    </Caption>
    <Caption x={16} y={220}>bonus tasks after the daily rating do not raise the score</Caption>
  </Frame>
);

/** Pull-Quest: PR → quality score → ranking profile. */
export const PullQuestPipeline = () => (
  <Frame
    h={230}
    tone="emerald"
    label="A GitHub pull request is scored by the maintainer, stored apart from raw PR count, and ranked on a LeetCode-style contributor profile"
  >
    <Box x={16} y={36} w={108} h={44} title="PR" sub="GitHub event" icon={IcDoc} accent tone="sky" />
    <Link d="M128 58 L 156 58" flow tone="amber" />
    <Box x={160} y={36} w={120} h={44} title="judge" sub="maintainer score" icon={IcCheck} accent tone="amber" />
    <Link d="M284 58 L 312 58" flow tone="emerald" />
    <Box x={316} y={36} w={120} h={44} title="Mongo" sub="quality ≠ count" icon={IcDb} accent tone="emerald" />
    <Link d="M440 58 L 468 58" flow tone="violet" />
    <Box x={472} y={36} w={112} h={44} title="rank" sub="recruiter view" icon={IcTag} accent tone="violet" />

    <Pill x={160} y={100} w={72} text="review" tone="sky" />
    <Pill x={238} y={100} w={64} text="merge" tone="teal" />
    <Pill x={308} y={100} w={78} text="quality" tone="amber" accent />
    <Caption x={16} y={148} tone="emerald">profile is LeetCode-shaped — recruiters see outcome, not green-square volume</Caption>
    <Caption x={16} y={164}>Aptos hackathon build · Zustand client · Express REST</Caption>
  </Frame>
);

/** CalcAI: parse → local math or Gemini → history. */
export const CalcAiPipeline = () => (
  <Frame
    h={220}
    tone="blue"
    label="Typed input is parsed as math or natural language; regular expressions stay local, hard problems go to Gemini, and history stores both"
  >
    <Box x={16} y={36} w={108} h={48} title="input" sub="keys · NL" icon={IcDoc} accent tone="sky" />
    <Link d="M128 60 L 156 60" flow tone="amber" />
    <Box x={160} y={36} w={120} h={48} title="parse" sub="math vs ask" icon={IcSplit} accent tone="amber" />
    <Link d="M220 84 L 220 112" flow tone="teal" />
    <Link d="M280 60 L 316 60" flow tone="violet" />
    <Box x={16} y={116} w={140} h={48} title="local" sub="regular calc" icon={IcSheet} accent tone="teal" />
    <Box x={320} y={36} w={128} h={48} title="Gemini" sub="hard problems" icon={IcCheck} accent tone="violet" />
    <Link d="M86 164 L 180 164" flow tone="emerald" />
    <Link d="M384 84 L 384 140 L 324 140 L 324 164" flow tone="emerald" />
    <Box x={184} y={140} w={140} h={48} title="history" sub="both traces stored" icon={IcDb} accent tone="emerald" />
    <Caption x={16} y={208} tone="blue">React + TypeScript front · Python back</Caption>
  </Frame>
);

/** Gigsfield credits + campaign expand. */
export const GigsfieldCreditsPipeline = () => (
  <Frame
    h={200}
    tone="amber"
    label="Credits debit per node on execute; a campaign CSV expands one graph into N executions with the same QC gate"
  >
    <Box x={16} y={36} w={120} h={44} title="Razorpay" sub="top-up wallet" icon={IcDoc} accent tone="blue" />
    <Link d="M140 58 L 168 58" flow tone="amber" />
    <Box x={172} y={36} w={128} h={44} title="badge" sub="cost on the node" icon={IcTag} accent tone="amber" />
    <Link d="M304 58 L 332 58" flow tone="orange" />
    <Box x={336} y={36} w={128} h={44} title="debit" sub="when Lambda runs" icon={IcCheck} accent tone="orange" />

    <Box x={16} y={116} w={140} h={44} title="CSV campaign" sub="one graph × N SKUs" icon={IcSplit} accent tone="violet" />
    <Link d="M160 138 L 196 138" flow tone="sky" />
    <Box x={200} y={116} w={148} h={44} title="N executions" sub="same Step Functions" icon={IcPackage} accent tone="sky" />
    <Link d="M352 138 L 388 138" flow tone="teal" />
    <Box x={392} y={116} w={140} h={44} title="QC" sub="review before download" icon={IcCheck} accent tone="teal" />
  </Frame>
);
