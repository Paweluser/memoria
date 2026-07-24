import { ReactNode } from "react";
import { Navigation } from "../components/DashboardLayout/Nav/Navigation";
import { Sidebar } from "../components/DashboardLayout/Nav/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <>
        <Navigation />
          <main className="md:flex"> 
          <Sidebar />
            {children}
          </main>
      </>
  );
}
