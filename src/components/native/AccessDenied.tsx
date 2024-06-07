import Image from "next/image";

export default function AccessDenied() {
  return (
    <>
      <Image
        src="/access-denied.png"
        width={500}
        height={500}
        alt="access denied"
      />
      <p className="text-lg font-semibold">
        You don&apos;t have the permission to access this page
      </p>
    </>
  );
}
