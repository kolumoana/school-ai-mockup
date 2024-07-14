"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/chat", label: "チャットボット" },
  { href: "/teacher", label: "先生用ダッシュボード" },
  { href: "/stats", label: "利用統計" },
  { href: "/monitor", label: "生徒活動モニター" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            AI学習サポート
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} passHref>
                    <Button variant={pathname === item.href ? "default" : "ghost"} className="relative">
                      {item.label}
                      {pathname === item.href && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-purple-600"
                          layoutId="underline"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                          style={{ width: "100%" }}
                        />
                      )}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
