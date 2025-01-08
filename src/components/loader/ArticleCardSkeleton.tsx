import { cn } from "../../lib/utils";

interface ArticleCardSkeletonProps {
  featured?: boolean;
}

export function ArticleCardSkeleton({ featured }: ArticleCardSkeletonProps) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-xl overflow-hidden border",
        "animate-pulse",
        featured ? "col-span-2 row-span-2" : ""
      )}
    >
      <div className="relative aspect-video w-full bg-gray-200" />

      <div className="absolute bottom-0 p-6 w-full">
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 bg-gray-300 rounded-full" />
            <div className="h-6 w-24 bg-gray-300 rounded-full" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-8 bg-gray-300 rounded-lg w-3/4" />
          {featured && <div className="h-4 bg-gray-300 rounded w-full" />}

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
