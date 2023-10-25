import React from "react";

type Props = {
  children: React.ReactNode;
};

const authLayout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default authLayout;
