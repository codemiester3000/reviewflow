import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReviewFlow - Get More Google Reviews on Autopilot",
  description: "Automated review management for local businesses. Send review requests via SMS, route feedback intelligently, and grow your online reputation for just $29/month.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
