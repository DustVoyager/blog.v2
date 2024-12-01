"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSpyElem } from "@/hook/useSpy";
import { cn } from "@/lib/utils";

const navList = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const { ref, marginTop } = useSpyElem(65);

  return (
    <header
      style={{ marginTop }}
      ref={ref}
      className="fixed w-full border-b bg-white shadow-sm"
    >
      <div className="flex w-full max-w-[800px] h-[64px] mx-auto items-center justify-between">
        <h1>
          <Link href="/">오수빈 개발 블로그</Link>
        </h1>
        <nav>
          <ul className="flex w-full items-center justify-between">
            <li className="flex items-center gap-2">
              {navList.map((navItem) => (
                <Link
                  href={navItem.href}
                  key={navItem.name}
                  className={cn(
                    "rounded-full px-4 py-1 text-center text-sm",
                    pathname?.startsWith(navItem.href)
                      ? "bg-blue-600 text-white"
                      : "text-primary"
                  )}
                >
                  {navItem.name}
                </Link>
              ))}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
