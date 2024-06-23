import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsUpDown, Eye, Trash } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

const PatternTable = ({ patterns, expandedPattern, handleExpandClick }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPatterns = patterns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderMarkdown = (markdown) => {
    return <ReactMarkdown>{markdown}</ReactMarkdown>;
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pattern Name</TableHead>
            <TableHead>Short Summary</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPatterns.map((pattern, index) => (
            <TableRow key={pattern.id}>
              <TableCell>{pattern.file_name}</TableCell>
              <TableCell>
                {pattern.patterns.split(" ").slice(0, 10).join(" ")}
              </TableCell>
              <TableCell className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronsUpDown className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[60%] h-[60vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>{pattern.file_name}</DialogTitle>
                      <DialogDescription>
                        {renderMarkdown(pattern.patterns)}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalItems={patterns.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PatternTable;
