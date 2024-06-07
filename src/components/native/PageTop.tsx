function lowercaseFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export default function PageTop({
  title,
  showSubTitle = true,
}: {
  title: string;
  showSubTitle?: boolean;
}): JSX.Element {
  return (
    <>
      <h4 className="w-full text-2xl font-bold truncate text-slate-700">
        {title}
      </h4>
      {showSubTitle && (
        <p className="w-full text-sm truncate text-slate-700">
          Welcome to {lowercaseFirstLetter(title)}
        </p>
      )}
    </>
  );
}