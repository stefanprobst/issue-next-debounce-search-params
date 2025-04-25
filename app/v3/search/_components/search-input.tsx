"use client";

import { useRouter } from "next/navigation";
import { useMemo, useOptimistic, useTransition } from "react";
import debounce from "p-debounce"

interface SearchInputProps {
  value: string;
}

export function SearchInput(props: SearchInputProps) {
  const { value } = props;

  const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const [optimisticValue, setOptimisticValue] = useOptimistic(value);

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
          startTransition(async () => {
						/**
						 * :-1:
						 *
						 * @see https://react.dev/reference/react/startTransition#caveats
						 * "Transition updates can’t be used to control text inputs."
						 */
            setOptimisticValue(value);

						/**
						 * :+1:
						 *
						 * React *does* treat this as a transition action, since it's a regular async function.
						 */
						await navigate("?q=" + value);
          });
        }}
        value={optimisticValue}
      />
    </label>
  );
}
