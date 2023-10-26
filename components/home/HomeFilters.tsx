"use client";

import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const HomeFilters = (props: Props) => {
  const active = "newest";

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex hidden ">
      {HomePageFilters.map((filter, index) => (
        <Button
          key={filter.value}
          onClick={() => {}}
          className={`font-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-500 text-white"
              : "bg-light-800 text-dark-500 dark:bg-gray-800 dark:text-light-700"
          } hover:bg-light-900 dark:bg-dark-800 dark:hover:bg-dark-400}`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
