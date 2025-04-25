import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <ul className="flex flex-col gap-y-6">
        <li>
          <Link className="underline" href="/v1/search">
            Version 1 (no debouncing, with useOptimistic)
          </Link>
        </li>
        <li>
          <Link className="underline" href="/v2/search">
            Version 2 (with regular debounce, with useOptimistic)
          </Link>
        </li>
        <li>
          <Link className="underline" href="/v3/search">
            Version 3 (with awaited async debounce, with useOptimistic)
          </Link>
        </li>
        <li>
          <Link className="underline" href="/v4/search">
            Version 4 (with awaited async debounce, with useState)
          </Link>
        </li>
      </ul>
    </main>
  );
}
