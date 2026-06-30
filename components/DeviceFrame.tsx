import type { ReactNode } from "react";

// Centers the app inside an iPad-style bezel on a darker backdrop, so the brief
// reads as the tablet prototype it is. The screen scrolls inside the bezel; the
// detail overlay is rendered as a sibling so it sits over the screen, not
// inside its scroll.
export function DeviceFrame({
  children,
  overlay,
}: {
  children: ReactNode;
  overlay?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-[#0a0807] p-6 sm:p-10">
      <div className="relative flex h-[880px] max-h-[92vh] w-[1189px] max-w-full overflow-hidden rounded-[32px] border-[6px] border-[#23201c] bg-base shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
        <div className="h-full w-full overflow-auto">{children}</div>
        {overlay}
      </div>
    </div>
  );
}
