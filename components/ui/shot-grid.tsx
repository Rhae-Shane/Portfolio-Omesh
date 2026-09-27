import ImageModal from "./image-modal";

const ShotGrid = ({
  items,
  columns = "3",
}: {
  items: string;
  columns?: "2" | "3";
}) => {
  const shots = items
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [src, alt] = item.split("|").map((part) => part.trim());
      return { src, alt: alt || src };
    });

  return (
    <div
      className={`not-prose my-6 grid gap-3 ${
        columns === "2" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3"
      }`}
    >
      {shots.map((shot) => (
        <figure key={shot.src} className="min-w-0">
          <ImageModal
            src={shot.src}
            alt={shot.alt}
            className="my-0 max-w-none bg-background object-contain"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {shot.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default ShotGrid;
