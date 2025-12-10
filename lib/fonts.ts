import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Libre_Baskerville,
  Rye,
  Sancreek,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontSerif = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
});

export const fontDisplay = Rye({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});
