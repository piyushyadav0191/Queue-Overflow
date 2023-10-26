import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex-between fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={"/images/site-icon.svg"}
          width={23}
          height={23}
          alt="Queue overflow"
        />
        <p className="font-bold font-spaceGortesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Queue <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      GlobalSearch
      <div className="flex-between gap-5">
        Theme
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
