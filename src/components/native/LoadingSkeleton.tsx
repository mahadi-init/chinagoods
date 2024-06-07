export default function LoadingSkeleton(): JSX.Element {
  return (
    <div role="status" className="w-full animate-pulse">
      <div className="mb-4 h-2.5 rounded-full bg-gray-200"></div>
      <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
      <div className="mb-2.5 h-2 rounded-full  bg-gray-200"></div>
      <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
      <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
      <div className="h-2 bg-gray-200 rounded-full"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
