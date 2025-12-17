import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { join } from "path";
import { readFileSync } from "fs";

export const runtime = "nodejs";

// Helper to load Google Fonts robustly
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();

  // Regex to find the font URL in the CSS response
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype|woff|woff2)'\)/
  );

  if (resource && resource[1]) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title") || siteConfig.name;
  const title = rawTitle
    .replace(/<[^>]*>/g, "")
    .slice(0, 100)
    .trim();

  const universalSubset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.,:;&| ";
  const allText =
    title +
    universalSubset +
    "Ace Arts Tattoo LOCATION Cedar Rapids, IA ACEARTS.COM";

  const fontData = await loadGoogleFont("Rammetto+One", allText);

  // 2. Prepare URL for your Spade Logo
  let logoDataUrl: string | undefined = undefined;
  try {
    const filePath = join(process.cwd(), "public", "logo.png");
    const logoBuffer = readFileSync(filePath);
    // FIX: Convert Buffer to Base64 Data URL String
    logoDataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  } catch (e) {
    console.warn("Could not find logo in public folder. Skipping.");
  }

  const colors = {
    background: "#F5F0E6", // Warm beige
    cardBg: "#FAFAF9",
    ink: "#1c1917", // Soft black
    gold: "#D4AF37",
    green: "#008236",
    red: "#d40e14", // Traditional Red
  };

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        padding: "40px",
        backgroundColor: colors.background,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: colors.cardBg,
          border: `2px solid ${colors.ink}`,
          boxShadow: `6px 6px 0px 0px ${colors.ink}`,
          padding: "50px",
          position: "relative",
        }}
      >
        {/* Decorative Corners */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: 20,
            height: 20,
            borderTop: `4px solid ${colors.gold}`,
            borderLeft: `4px solid ${colors.gold}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 20,
            height: 20,
            borderTop: `4px solid ${colors.gold}`,
            borderRight: `4px solid ${colors.gold}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            width: 20,
            height: 20,
            borderBottom: `4px solid ${colors.gold}`,
            borderLeft: `4px solid ${colors.gold}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 20,
            height: 20,
            borderBottom: `4px solid ${colors.gold}`,
            borderRight: `4px solid ${colors.gold}`,
          }}
        />

        {/* Header with Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl}
            alt="Ace Arts Spade"
            width="64"
            height="64"
            style={{ opacity: 0.9 }}
          />
          <div
            style={{
              fontSize: 24,
              fontFamily: '"Rammetto One"',
              color: colors.ink,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Ace Arts Tattoo
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: "flex",
            textAlign: "center",
            fontSize: 72,
            fontFamily: '"Rammetto One"',
            color: colors.ink,
            lineHeight: 1.1,
            textTransform: "uppercase",
            maxWidth: "90%",
            textShadow: `3px 3px 0px ${colors.background}`,
          }}
        >
          {title}
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "20px",
            borderTop: `2px solid ${colors.ink}`,
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 20,
                color: colors.ink,
                opacity: 0.6,
                fontWeight: 700,
              }}
            >
              LOCATION
            </span>
            <span style={{ fontSize: 24, color: colors.ink }}>
              Cedar Rapids, IA
            </span>
          </div>

          {/* CTA Button Style */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.cardBg,
              color: colors.red,
              padding: "12px 32px",
              fontSize: 24,
              fontFamily: '"Rammetto One"',
              border: `2px solid ${colors.red}`,
              boxShadow: `6px 6px 0px 0px ${colors.red}`,
            }}
          >
            {siteConfig.url}
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Rammetto One",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
