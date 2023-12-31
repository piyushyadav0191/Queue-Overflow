

import LeftSidebar from "@/components/shared/LeftSidebar";
import RIghtSidebar from "@/components/shared/RIghtSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="background-light-850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RIghtSidebar />
      </div>
    </main>
  );
};

export default layout;
