"use client";

import { useRouter } from "next/navigation";
import debounce from "p-debounce";
import { useMemo, useState, useTransition } from "react";

interface SearchInputProps {
  value: string;
}

export function SearchInput(props: SearchInputProps) {
  const { value } = props;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticValue, setOptimisticValue] = useState(value);
	const currentValue = isPending ? optimisticValue : value

	const navigate = useMemo(() => {
		return debounce(router.push, 200)
	}, [])

  return (
    <label>
      <div>Search</div>
      <input
        className="border rounded"
        name="q"
        type="search"
        onChange={(event) => {
          const value = event.currentTarget.value;
					/**
					 * :+1:
					 */
					setOptimisticValue(value);
          startTransition(async () => {
						/**
						 * :+1:
						 *
						 * React *does* treat this as a transition action, since it's a regular async function.
						 */
						await navigate("?q=" + value);
          });
        }}
        value={currentValue}
      />
    </label>
  );
}
