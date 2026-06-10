import Image from "next/image";
import { WRITER_PIXEL } from "@/constants/writer";

export function WriterPixelSection() {
  return (
    <section className="writer-pixel-band" aria-label="The pixel">
      <div className="writer-pixel-copy">
        <div className="writer-media-frame relative mb-6 aspect-[3/4] w-28">
          <Image
            src={WRITER_PIXEL.detailSrc}
            alt={WRITER_PIXEL.detailAlt}
            fill
            sizes="7rem"
            className="object-cover"
          />
        </div>
        <p className="writer-display writer-pixel-type" data-writer-pixel-type>
          {WRITER_PIXEL.lineOne}
        </p>
        <p
          className="writer-display writer-pixel-type writer-pixel-type--offset"
          data-writer-pixel-type
        >
          {WRITER_PIXEL.lineTwo}
        </p>
      </div>

      <div className="writer-pixel-hero relative min-h-[18rem]" data-writer-pixel-image>
        <Image
          src={WRITER_PIXEL.portraitSrc}
          alt={WRITER_PIXEL.portraitAlt}
          fill
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="writer-pixel-hero-shade" aria-hidden="true" />
      </div>

      <div className="writer-pixel-accent" aria-hidden="true" />
    </section>
  );
}
