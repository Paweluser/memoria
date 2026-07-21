type DrawerProps = {
  isOpen: boolean;
};

export function Drawer({ isOpen }: DrawerProps) {
  return (
    <div
      className={`fixed top-20 right-0 z-50 h-full w-full transition-transform duration-300 md:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      
    </div>
  );
}
