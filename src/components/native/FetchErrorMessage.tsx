export default function FetchErrorMessage({
  error,
}: {
  error: { message: string };
}) {
  return (
    <div className="flex items-center justify-center w-full p-4 rounded-lg">
      <p className="text-xl text-red-600">{error.message}</p>
    </div>
  );
}
