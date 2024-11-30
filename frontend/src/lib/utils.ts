import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomTailwindBackgroundColor(uniqueValue: string) {
  const colors = [
    "bg-red-700 dark:bg-red-800",
    "bg-green-700 dark:bg-green-800",
    "bg-blue-700 dark:bg-blue-800",
    "bg-yellow-700 dark:bg-yellow-800",
    "bg-violet-700 dark:bg-violet-800",
    "bg-pink-700 dark:bg-pink-800",
    "bg-indigo-700 dark:bg-indigo-800",
    "bg-gray-700 dark:bg-gray-800",
  ];
  const index =
    Math.abs(
      uniqueValue.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % colors.length;
  return colors[index];
}

export function chooseTwoCharsFromName(name: string) {
  const [first, second] = name.split(" ");
  if (second) {
    return (first[0] + second[0]).toUpperCase();
  } else {
    return (first[0] + first[1]).toUpperCase();
  }
}
