// app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || siteConfig.name;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f4",
        padding: "40px",
      }}
    >
      {/* Your branding */}
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: "#171717",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      {/* Site name */}
      <div
        style={{
          fontSize: 40,
          color: "#737373",
        }}
      >
        Ace Arts Tattoo
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
