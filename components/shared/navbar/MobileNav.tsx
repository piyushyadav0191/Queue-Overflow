"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebbarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16 pb-6">
      {sidebbarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${isActive
                  ? " bg-orange-500 dark:bg-orange-500-500 rounded-lg text-light-900"
                  : "text-dark-300 dark:text-light-900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgUrl}
                alt="logo"
                width={20}
                height={20}
                className={`${isActive ? "" : "dark:invert "}`}
              />
              <p className={`${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
const MobileNav = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/images/menu.svg"}
          width={36}
          height={36}
          alt="menu"
          className="sm:hidden "
        />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-light-900 dark:bg-gray-900 border-none"
      >
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/images/site-icon.svg"}
            width={23}
            height={23}
            alt="Queue overflow"
          />
          <p className="font-bold  text-dark-100 dark:text-light-900 ">
            Queue <span className="text-primary-500">Overflow</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href={"/sign-in"}>
                  <Button className="min-h-[41px] w-full bg-slate-800 rounded-lg px-4 py-3 shadow-none ">
                    <span className="text-primary-500">Log in</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/sign-up"}>
                  <Button className="min-h-[41px] w-full bg-slate-600 rounded-lg px-4 py-3 shadow-none ">
                    <span className="text-primary-500">Sign up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
