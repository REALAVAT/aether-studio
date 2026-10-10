import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0908",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 9999,
            border: "2px solid rgba(242,237,228,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 132,
              height: 48,
              borderRadius: 9999,
              border: "6px solid #e8a54b",
              transform: "rotate(-28deg)",
              display: "flex",
            }}
          />
          <div style={{ width: 28, height: 28, borderRadius: 9999, background: "#e8a54b", display: "flex" }} />
        </div>
      </div>
    ),
    size,
  );
}
