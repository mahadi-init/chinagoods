import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DropdownSelect({
  style,
  placeholder,
  items,
  selectedItem,
  setSelectedItem,
  action,
}: {
  style?: string;
  placeholder?: string;
  items: readonly { title: string; icon: JSX.Element }[];
  selectedItem?: string;
  setSelectedItem: (item: string) => void;
  action?: <T>(value: T) => void;
}): JSX.Element {
  return (
    <Select
      value={selectedItem}
      onValueChange={(value) => {
        setSelectedItem(value);
        if (action) {
          action(value);
        }
      }}
    >
      <SelectTrigger className={style ?? "w-32"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, index) => {
            return (
              <SelectItem key={index} value={item.title}>
                <div className="flex items-center gap-2 text-xs font-medium">
                  {item.icon}
                  {item.title}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
