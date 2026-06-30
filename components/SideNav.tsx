// The left rail. "Daily Brief" is the active section (ember, with the ember
// indicator); Overview / Actions / Impact are visual placeholders for the
// prototype.
export function SideNav() {
  return (
    <nav className="flex shrink-0 items-start pt-12">
      <div className="relative w-[3px] self-stretch overflow-hidden">
        <div className="absolute left-0 top-0 h-[18px] w-[3px] bg-accent" />
      </div>
      <div className="flex w-[127px] flex-col gap-6 px-2 text-[15px]">
        <span className="text-accent">Daily Brief</span>
        <span className="text-fg">Overview</span>
        <span className="text-fg">Actions</span>
        <span className="text-fg">Impact</span>
      </div>
    </nav>
  );
}
