import { ReactNode } from "react";
import { Navigation } from "../components/DashboardLayout/Nav/Navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
        <Navigation />
      <div>{children}</div>
    </main>
  );
}
