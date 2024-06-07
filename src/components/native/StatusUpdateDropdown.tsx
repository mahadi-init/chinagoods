import { ResetIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function StatusUpdateDropdown({
  options,
  status,
  action,
}: {
  options: string[];
  status: string;
  action: <T>(value: T) => void;
}) {
  const [option, setOption] = useState(status);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
      {showOptions ? (
        <div className="flex items-center gap-2">
          {/* <NonIconDropdownSelect
            items={options}
            selectedItem={option}
            setSelectedItem={setOption}
            action={action}
          /> */}
          <a className="cursor-pointer" onClick={() => setShowOptions(false)}>
            <ResetIcon color="black" />
          </a>
        </div>
      ) : (
        <a className="h-32 cursor-pointer" onClick={() => setShowOptions(true)}>
          {/* <OrderStatusIndicator status={status as OrderStatusType} /> */}
        </a>
      )}
    </div>
  );
}
