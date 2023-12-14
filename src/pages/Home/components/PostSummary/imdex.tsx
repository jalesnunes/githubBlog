export function PostSummary() {
  return (
    <div className="w-[26rem] h-64 bg-basePost p-8 overflow-hidden rounded-xl hover:outline hover:cursor-pointer hover:outline-baseBorder">
      <header className="flex items-start gap-3 justify-between">
        <h1 className="text-xl text-baseTitle font-bold">
          JavaScript data types and data structures
        </h1>
        <span className="text-sm text-baseSpan whitespace-nowrap">1 day ago</span>
      </header>

      <p className="text-baseText mt-8">
        Programming languages all have built-in data structures, but these often
        differ from one language to another. This article attempts to list the
        built-in data structures available in
      </p>
    </div>
  );
}
