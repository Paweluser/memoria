import { NavLinkList } from "./NavLinkList";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Drawer({ isOpen, onClose }: DrawerProps) {
  return (
    <div
      className={`fixed top-20 right-0 bottom-0 z-50 w-full transition-transform duration-300 md:hidden overflow-y-auto ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <NavLinkList onClick={onClose} />
    </div>
  );
}
