import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#08090a",
          border: "3px solid #5eead4",
          color: "#5eead4",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}
