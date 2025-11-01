
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";



interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const handlePageChange = (selectedItem: { selected: number }) => {
        onPageChange(selectedItem.selected + 1);
    };



    return (
        <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage - 1}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            containerClassName={css.pagination}
            activeClassName={css.activePage}
            previousLabel="<"
            nextLabel=">"
        />
    );
}