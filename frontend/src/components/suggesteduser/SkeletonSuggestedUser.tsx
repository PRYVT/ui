import { Skeleton } from "../ui/skeleton";
export const SkeletonSuggestedUser = () => {
  return (
    <li className="flex items-center justify-between">
      <Skeleton className="h-8 w-full" />
    </li>
  );
};
