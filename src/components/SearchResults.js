import React from "react";
import { Typography, Button } from "@material-ui/core";
import styled from "styled-components";

const SearchResults = ({
  searchResults,
  searchString,
  addNominee,
  nominations,
}) => {
    const searchItems = searchResults.Search
  if (searchResults.Error || searchString < 3) {
    return <div>No Results</div>;
  }

  if (searchString.length > 2) {
    return (
      <div>
        <Typography variant="body1" component="h6">
          Results for "{searchString}"
        </Typography>
        <UL>
          {searchItems.length > 0 &&
            searchItems.map((searchItem) => {
              return (
                <li key={searchItem.imdbID}>
                  {searchItem.Title} ({searchItem.Year})
                  <StyledButton
                    disabled={nominations[searchItem.imdbID] ? true : false}
                    disableElevation
                    size="small"
                    variant="contained"
                  >
                    <ButtonText
                      onClick={() =>
                        addNominee(
                          searchItem.imdbID,
                          `${searchItem.Title} (${searchItem.Year})`
                        )
                      }
                      variant="button"
                      component="p"
                    >
                      Nominate
                    </ButtonText>
                  </StyledButton>
                </li>
              );
            })}
        </UL>
      </div>
    );
  } else {
    return (
      <div>
        <Typography variant="body1" component="h6">
          Search Results
        </Typography>
      </div>
    );
  }
};

const UL = styled.ul`
  li {
    margin-bottom: 5px;
  }

  li button {
    margin-left: 5px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #f8f9fa;
  border: 1px solid rgb(73 73 73);
  padding: 0.5px;
`;

const ButtonText = styled(Typography)`
  font-size: 0.6rem;
`;

export default SearchResults;
