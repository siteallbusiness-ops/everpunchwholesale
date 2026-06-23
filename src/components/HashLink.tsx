"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

/** Hash links that replace the fragment on the same page (avoids Next.js double-hash bug). */
export default function HashLink({ href, onClick, ...props }: Props) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : href.pathname ?? "";

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        const hashIndex = hrefStr.indexOf("#");
        if (hashIndex === -1) return;

        const path = hrefStr.slice(0, hashIndex);
        const hash = hrefStr.slice(hashIndex + 1);
        if (!hash || pathname !== path) return;

        e.preventDefault();
        window.history.replaceState(null, "", hrefStr);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }}
      {...props}
    />
  );
}
