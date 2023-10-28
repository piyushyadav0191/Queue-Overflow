import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: string): string => {
  const createdAtDate: Date = new Date(createdAt);
  const now: Date = new Date();
  const elapsedMilliseconds: number = now.getTime() - createdAtDate.getTime();

  // Define time units in milliseconds
  const minuteInMs: number = 60 * 1000;
  const hourInMs: number = 60 * minuteInMs;
  const dayInMs: number = 24 * hourInMs;
  const weekInMs: number = 7 * dayInMs;
  const monthInMs: number = 30 * dayInMs;
  const yearInMs: number = 365 * dayInMs;

  if (elapsedMilliseconds < minuteInMs) {
    return "Just now";
  } else if (elapsedMilliseconds < hourInMs) {
    const minutes: number = Math.floor(elapsedMilliseconds / minuteInMs);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (elapsedMilliseconds < dayInMs) {
    const hours: number = Math.floor(elapsedMilliseconds / hourInMs);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (elapsedMilliseconds < weekInMs) {
    const days: number = Math.floor(elapsedMilliseconds / dayInMs);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (elapsedMilliseconds < monthInMs) {
    const weeks: number = Math.floor(elapsedMilliseconds / weekInMs);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (elapsedMilliseconds < yearInMs) {
    const months: number = Math.floor(elapsedMilliseconds / monthInMs);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years: number = Math.floor(elapsedMilliseconds / yearInMs);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};
