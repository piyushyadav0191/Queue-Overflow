"use client";

import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { useTheme } from "next-themes";

type Props = {};

const Theme = (props: Props) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger>
          {theme === "dark" ? (
            <Image src={"/images/moon.svg"} width={20} height={20} alt="moon" />
          ) : (
            <Image src={"/images/sun.svg"} width={20} height={20} alt="sun" />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-4 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          <MenubarItem onClick={() => setTheme("light")}>
            <Image
              src={"/images/sun.svg"}
              className="mr-2"
              width={20}
              height={20}
              alt="Sun"
            />
            Light
          </MenubarItem>
          <MenubarItem onClick={() => setTheme("dark")}>
            <Image
              src={"/images/moon.svg"}
              className="mr-2"
              width={20}
              height={20}
              alt="moon"
            />
            Dark
          </MenubarItem>
          <MenubarItem onClick={() => setTheme("system")}>
            <Image
              className="mr-2"
              src={"/images/desktop.svg"}
              width={20}
              height={20}
              alt="Sun"
            />
            System
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
