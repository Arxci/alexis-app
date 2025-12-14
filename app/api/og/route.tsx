import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || siteConfig.name;

  // Colors extracted from your globals.css and component context
  const colors = {
    background: "#F5F0E6", // Warm beige (Flash paper)
    cardBg: "#FAFAF9", // Lighter stone (Card background)
    ink: "#1c1917", // Stone-900 (Text/Border)
    gold: "#D4AF37", // Matching your 'bg-gold'
  };

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        backgroundColor: colors.background,
      }}
    >
      {/* The Card Container - Mimics your UI/Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: colors.cardBg,
          border: `3px solid ${colors.ink}`,
          // This mimics the hard shadow found on your badge/buttons, but scaled up for the card
          boxShadow: `12px 12px 0px 0px ${colors.ink}`,
          padding: "40px",
        }}
      >
        {/* 1. The Eyebrow Badge - Exact match to split-layout.tsx */}
        {/* class: bg-gold text-ink border-2 shadow-[4px_4px_0px_0px] font-mono tracking-widest */}
        <div
          style={{
            display: "flex",
            backgroundColor: colors.gold,
            color: colors.ink,
            border: `2px solid ${colors.ink}`,
            boxShadow: `4px 4px 0px 0px ${colors.ink}`,
            padding: "8px 16px",
            marginBottom: "40px",
            // Typography
            fontFamily: "monospace",
            fontSize: 20,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Ace Arts Tattoo
        </div>

        {/* 2. The Heading - Exact match to split-layout.tsx */}
        {/* class: font-black uppercase leading-[0.9] */}
        <div
          style={{
            display: "flex",
            textAlign: "center",
            fontSize: 80, // Scaled for OG image size
            fontWeight: 900,
            color: colors.ink,
            lineHeight: 0.9,
            textTransform: "uppercase",
            maxWidth: "90%",
            // Optional: adds a tiny text stroke to simulate "font-display" weight if system font is too thin
            textShadow: `2px 2px 0px ${colors.background}`,
          }}
        >
          {title}
        </div>

        {/* Decorative Location/Subheading */}
        <div
          style={{
            marginTop: "40px",
            fontSize: 32,
            color: colors.ink,
            fontFamily: "serif", // Matches your body text style
            opacity: 0.8,
          }}
        >
          Cedar Rapids, Iowa
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
