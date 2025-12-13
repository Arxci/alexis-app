import { Libre_Baskerville, Rammetto_One } from "next/font/google";

export const fontSerif = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
});

export const fontDisplay = Rammetto_One({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});
