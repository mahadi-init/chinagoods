import { XIcon } from "@/icons/Xicon";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import clsx from "clsx";

export function ChipInput({
  label,
  items,
  setItems,
  style,
}: {
  label?: string;
  items: string[];
  setItems: (arg0: string[]) => void;
  style?: string;
}) {
  const [input, setInput] = useState("");

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input) {
        setItems([...items, input]);
        setInput("");
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium leading-none" htmlFor="children">
        {label}
      </label>
      {items.length !== 0 && (
        <div className="flex flex-wrap items-center p-2 border rounded-md border-slate-200 dark:border-slate-800">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center px-2 py-1 mr-2 space-x-2 text-sm bg-blue-100 rounded"
            >
              <span>{item}</span>
              <button
                type="button"
                className="text-blue-500 focus:outline-none"
                onClick={() => setItems(items.filter((i) => i !== item))}
              >
                <XIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Textarea
        className={clsx(
          "flex-1 text-sm bg-gray-100 border-none ring-1 ring-slate-200",
          style,
        )}
        id="children"
        placeholder={items.length === 0 ? `Enter ${label}` : undefined}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      <p className="text-xs text-gray-500">
        press enter to add new {label?.toLowerCase()}
      </p>
    </div>
  );
}