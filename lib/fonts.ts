import { Libre_Baskerville, Rammetto_One } from "next/font/google";
import { cn } from "./utils";

const fontSerif = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  display: "swap",
});

const fontDisplay = Rammetto_One({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

export const fontVariables = cn(fontSerif.variable, fontDisplay.variable);
