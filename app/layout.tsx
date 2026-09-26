import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SessNetwork VM Panel",
  description: "There is description",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
