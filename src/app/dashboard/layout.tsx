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
      <div className="flex">
        <Sidebar />
        <main className="w-full flex-1 flex justify-center p-4 md:p-8">
          <div className="w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </>
  );
}
