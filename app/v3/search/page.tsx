import { SearchInput } from "./_components/search-input";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <main>
      <SearchInput value={searchParams.q ?? ""} />
    </main>
  );
}
