import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function Paging(props) {
  const { numberOfPages, pageHandler } = props;
  return (
    <div>
      <Pagination>
        <PaginationItem>
          <PaginationLink
            first
            onClick={() => {
              pageHandler(1);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              pageHandler("previous");
            }}
            previous
          />
        </PaginationItem>
        {[...Array(numberOfPages)].map((item, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink
              onClick={() => {
                pageHandler(index + 1);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              pageHandler("next");
            }}
            next
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              pageHandler(numberOfPages);
            }}
            last
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
}
