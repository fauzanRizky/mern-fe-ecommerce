import React, { useEffect } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
  const { pagination } = useLoaderData();
  const { page, totalPage } = pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChanges = (number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    console.log("Current Page:", page);
  }, [page]);

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className="join">
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChanges(pageNumber)}
          className={`join-item btn ${
            pageNumber === page ? "btn-disabled" : ""
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
