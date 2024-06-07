import LoadingSkeleton from "./LoadingSkeleton";

export default function SixSkeleton() {
  return (
    <div className="flex flex-wrap w-full gap-2 p-2">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
}
