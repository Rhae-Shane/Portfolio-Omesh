const LogoRow = ({
  items,
}: {
  items: string;
}) => {
  const logos = items
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [src, alt] = item.split("|").map((part) => part.trim());
      return { src, alt: alt || src };
    });

  return (
    <div className="not-prose my-6 flex flex-wrap items-center gap-3">
      {logos.map((logo) => (
        <div
          key={logo.src}
          className="inline-flex h-11 items-center gap-2 rounded-md border border-border/70 bg-background px-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={logo.alt}
            title={logo.alt}
            className="h-6 w-auto max-w-28 object-contain"
            style={{ margin: 0 }}
          />
        </div>
      ))}
    </div>
  );
};

export default LogoRow;
