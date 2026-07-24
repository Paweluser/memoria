import { NavLinkList } from "./UI/NavLinkList";

export function Sidebar() {
  return (
    <div className="hidden md:block md:w-fit md:border-r-2 md:h-screen">
      <NavLinkList />
    </div>
  );
}
