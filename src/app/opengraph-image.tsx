import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.headline}`;
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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#08090a",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(45,212,191,0.28), transparent 45%), radial-gradient(circle at 95% 10%, rgba(129,140,248,0.2), transparent 40%)",
          color: "#ededee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "2px solid rgba(255,255,255,0.18)",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {profile.initials}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: 22,
              color: "#a3a3ab",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#5eead4" }} />
            Open to remote roles · {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#a3a3ab" }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            Full-Stack &amp;&nbsp;<span style={{ color: "#5eead4" }}>AI Engineer</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#a3a3ab", maxWidth: 980 }}>{profile.tagline}</div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#ededee" }}>
          {["TypeScript", "React", "Next.js", "NestJS", "LLMs & agents"].map((t) => (
            <div
              key={t}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
