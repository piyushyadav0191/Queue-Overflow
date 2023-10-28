import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles?: string;
  isAuthor?: boolean;
  href?: string;
};

const Metric = ({
  alt,
  imgUrl,
  isAuthor,
  textStyles,
  title,
  value,
  href,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={20}
        height={20}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyles} flex items-center gap-2 space-x-2 `}>
        {value}
        <span
          className={`text-sm line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex justify-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return (
    <div className="flex justify-center flex-wrap gap-1">{metricContent}</div>
  );
};

export default Metric;
