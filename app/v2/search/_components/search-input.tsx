"use client";

import { useRouter } from "next/navigation";
import { useMemo, useOptimistic, useTransition } from "react";
import debounce from "lodash.debounce"

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
          startTransition(() => {
						/**
						 * :-1:
						 *
						 * @see https://react.dev/reference/react/startTransition#caveats
						 * "Transition updates can’t be used to control text inputs."
						 */
            setOptimisticValue(value);

						/**
						 * :-1:
						 *
						 * React does not treat this as a transition action - it's just a sync function which sets a timeout.
						 */
						navigate("?q=" + value);
          });
        }}
        value={optimisticValue}
      />
    </label>
  );
}
