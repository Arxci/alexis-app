import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title") || siteConfig.name;

  // Sanitize title - remove HTML tags and limit length
  const title =
    rawTitle
      .replace(/<[^>]*>/g, "")
      .slice(0, 100)
      .trim() || siteConfig.name;

  const colors = {
    background: "#F5F0E6",
    cardBg: "#FAFAF9",
    ink: "#1c1917",
    gold: "#D4AF37",
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

          boxShadow: `12px 12px 0px 0px ${colors.ink}`,
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: colors.gold,
            color: colors.ink,
            border: `2px solid ${colors.ink}`,
            boxShadow: `4px 4px 0px 0px ${colors.ink}`,
            padding: "8px 16px",
            marginBottom: "40px",

            fontFamily: "monospace",
            fontSize: 20,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Ace Arts Tattoo
        </div>

        <div
          style={{
            display: "flex",
            textAlign: "center",
            fontSize: 80,
            fontWeight: 900,
            color: colors.ink,
            lineHeight: 0.9,
            textTransform: "uppercase",
            maxWidth: "90%",

            textShadow: `2px 2px 0px ${colors.background}`,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "40px",
            fontSize: 32,
            color: colors.ink,
            fontFamily: "serif",
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
