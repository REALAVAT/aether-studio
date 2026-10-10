import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Aether Studio — Brand, product & digital craft from Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0908",
          color: "#f2ede4",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -40,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(232,165,75,0.32) 0%, rgba(232,165,75,0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 135,
            width: 380,
            height: 380,
            borderRadius: 9999,
            border: "34px solid #2b241e",
            boxShadow: "0 0 0 2px rgba(232,165,75,0.6), inset 0 0 60px rgba(232,165,75,0.45)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -90,
            top: 255,
            width: 520,
            height: 140,
            borderRadius: 9999,
            border: "3px solid #e8a54b",
            transform: "rotate(-18deg)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
            <div style={{ width: 16, height: 16, borderRadius: 9999, background: "#e8a54b", display: "flex" }} />
            {site.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
            <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2, display: "flex", flexWrap: "wrap" }}>
              We shape brands, products &amp; worlds&nbsp;<span style={{ color: "#e8a54b" }}>of light.</span>
            </div>
            <div style={{ marginTop: 28, fontSize: 26, color: "rgba(242,237,228,0.7)", display: "flex" }}>
              Creative &amp; product studio · Dubai Design District
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
