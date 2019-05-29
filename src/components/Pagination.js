import React from 'react';
import styled from 'styled-components';
import { Box, Button } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Pagination({ currentPage, numOfPages, setPage }) {
  if (numOfPages === 0) return <></>;

  return (
    <Box mt={2} clone>
      <PaginationContainer>
        <Button
          disabled={currentPage === 0}
          onClick={() => setPage(currentPage - 1)}
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          disabled={currentPage === numOfPages - 1}
          onClick={() => setPage(currentPage + 1)}
        >
          Next
          <ChevronRight />
        </Button>
      </PaginationContainer>
    </Box>
  );
}

export default Pagination;
