"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h2 className="text-2xl font-semibold text-red-500">{error.message}</h2>
      <button
        type="button"
        className="py-2.5 px-5 mt-5 mr-2 mb-2 text-sm font-medium text-white bg-red-700 rounded-lg dark:bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}