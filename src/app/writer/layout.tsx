import { Newsreader, Playfair_Display } from "next/font/google";
import "./writer.css";

const writerDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-writer-display",
  display: "swap",
});

const writerBody = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-writer-body",
  display: "swap",
});

export default function WriterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${writerDisplay.variable} ${writerBody.variable} writer-root`}>
      {children}
    </div>
  );
}
