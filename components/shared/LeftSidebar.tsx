"use client";
import { sidebbarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const LeftSidebar = (props: Props) => {
  const pathname = usePathname();
  return (
    <section className="bg-gray-200-0 dark:bg-gray-800 sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto  p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] ">
      <div className="flex-1 flex   flex-col gap-6 ">
        {sidebbarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? " bg-primary-500 rounded-lg text-light-900"
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
              <p
                className={`${
                  isActive
                    ? "font-semibold max-lg:hidden "
                    : "font-medium max-lg:hidden"
                }`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href={"/sign-in"}>
            <Button className="min-h-[41px] w-full bg-slate-800 rounded-lg px-4 py-3 shadow-none ">
              <span className="text-primary-500">Log in</span>
            </Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button className="min-h-[41px] w-full bg-slate-600 rounded-lg px-4 py-3 shadow-none ">
              <span className="text-primary-500">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
