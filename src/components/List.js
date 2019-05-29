import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Typography,
  Box
} from '@material-ui/core';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  position: relative;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff8;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ItemList({ items, loading }) {
  return (
    <>
      <StyledPaper>
        {loading && (
          <LoadingOverlay>
            <CircularProgress />
          </LoadingOverlay>
        )}

        <List component="ul">
          {items && items.length ? (
            <>
              {items.map(item => {
                const officialName = item.resource.name.filter(
                  name => name.use === 'official'
                )[0];

                return (
                  <ListItem
                    button
                    key={item.fullUrl}
                    onClick={() => console.log(item.fullUrl)}
                  >
                    <ListItemText
                      primary={`${officialName.given} ${officialName.family}`}
                    />
                  </ListItem>
                );
              })}
            </>
          ) : (
            <Box p={2} clone>
              <Typography>Results with such phrase don't exist</Typography>
            </Box>
          )}
        </List>
      </StyledPaper>
    </>
  );
}

export default ItemList;
