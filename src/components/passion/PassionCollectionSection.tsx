import Image from "next/image";
import Link from "next/link";
import type { PassionCollection, PassionCollectionItem } from "@/constants/passion-collections";
import { PassionSketchNote } from "@/components/passion/PassionSketchNote";

const LAYOUT_GRID_CLASS: Record<
  PassionCollectionItem["layout"],
  string
> = {
  note: "passion-col-note",
  square: "passion-col-square",
  wide: "passion-col-wide",
  tall: "passion-col-tall",
};

const LAYOUT_ASPECT: Record<
  Exclude<PassionCollectionItem["layout"], "note">,
  string
> = {
  square: "aspect-square",
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4]",
};

function CollectionItem({ item }: { item: PassionCollectionItem }) {
  const media = (
    <div
      className={`passion-collection-media overflow-hidden bg-[#f1f0ed] ring-1 ring-brutal-fg/[0.06] ${
        item.layout === "note" ? "h-full" : ""
      }`}
    >
      {item.layout === "note" ? (
        <PassionSketchNote caption={item.caption} />
      ) : (
        <div className={`relative w-full ${LAYOUT_ASPECT[item.layout]}`}>
          <Image
            src={item.imageSrc ?? "/hero.png"}
            alt={item.imageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
    </div>
  );

  const body = (
    <>
      {media}
      <div className="mt-4 space-y-2">
        {item.title ? (
          <h3 className="font-sans text-[0.9375rem] font-semibold tracking-[-0.02em] text-brutal-fg">
            {item.title}
          </h3>
        ) : null}
        <p className="font-sans text-[0.8125rem] leading-[1.65] tracking-[-0.01em] text-brutal-fg/58">
          {item.description}
        </p>
        {item.caption && item.layout !== "note" ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brutal-fg/40">
            {item.caption}
          </p>
        ) : null}
      </div>
    </>
  );

  return (
    <article
      data-story-reveal
      className={`passion-collection-item group ${LAYOUT_GRID_CLASS[item.layout]}`}
    >
      {item.href ? (
        <Link href={item.href} className="block transition-opacity hover:opacity-80">
          {body}
        </Link>
      ) : (
        body
      )}
    </article>
  );
}

type PassionCollectionSectionProps = {
  collection: PassionCollection;
};

export function PassionCollectionSection({
  collection,
}: PassionCollectionSectionProps) {
  return (
    <section
      id={collection.id}
      data-passion-collection
      className="passion-collection border-t border-brutal-fg/[0.07] py-16 sm:py-20 lg:py-24"
      aria-labelledby={`${collection.id}-heading`}
    >
      <div className="passion-collection-layout">
        <h2
          id={`${collection.id}-heading`}
          data-story-reveal
          className="passion-collection-title font-sans text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-brutal-fg"
        >
          {collection.title}
        </h2>

        <div className="passion-collection-grid">
          {collection.items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
