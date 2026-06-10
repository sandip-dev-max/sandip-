import Link from "next/link";
import { WRITER_SITE_TITLE } from "@/constants/writer";

export default function WriterPoemNotFound() {
  return (
    <div className="writer-poem-reader flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center">
      <p className="writer-eyebrow text-[rgb(235_232_228/0.45)]">Poem not found</p>
      <h1 className="writer-display writer-poem-title mt-4">This page has moved on.</h1>
      <Link href="/writer" className="writer-poem-back mt-8">
        ← Back to {WRITER_SITE_TITLE}
      </Link>
    </div>
  );
}
