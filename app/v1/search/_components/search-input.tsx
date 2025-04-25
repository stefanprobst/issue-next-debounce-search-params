"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

interface SearchInputProps {
  value: string;
}

export function SearchInput(props: SearchInputProps) {
  const { value } = props;

  const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const [optimisticValue, setOptimisticValue] = useOptimistic(value);

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

						router.push("?q=" + value);
          });
        }}
        value={optimisticValue}
      />
    </label>
  );
}
