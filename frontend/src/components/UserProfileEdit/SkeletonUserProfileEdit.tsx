import { Skeleton } from "../ui/skeleton";
export const SkeletonUserProfileEdit = () => {
  return (
    <div className="rounded-lg shadow p-6">
      <Skeleton className="h-6 w-2/4 mb-4" />
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="h-16 w-16" />
        <div className="w-full">
          <Skeleton className="h-4 w-1/4 mb-4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  );
};
