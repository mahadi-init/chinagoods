import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

export default function TablePagination({
  index,
  setIndex,
  disableNext,
}: {
  index: number;
  setIndex: (arg0: number) => void;
  disableNext?: boolean;
}) {
  return (
    <div className="flex items-center justify-end py-4 space-x-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              size="sm"
              variant="outline"
              disabled={index === 1}
              onClick={() => {
                if (index > 1) {
                  setIndex(index - 1);
                }
              }}
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              disabled={disableNext}
              size="sm"
              variant="outline"
              onClick={() => setIndex(index + 1)}
            >
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
