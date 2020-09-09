import React from 'react';
import {InputBase, Paper, InputAdornment} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';
import styled from 'styled-components';

const Search = ({searchString, handleSearchChange}) => {
    return (
        <div>
            <p>Movie title</p>
            <StyledPaper component="form">
                <StyledInputBase
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    placeholder="Search for a movie..." 
                    onChange={handleSearchChange} 
                    type="text" 
                    name="search" 
                    value={searchString} />
            </StyledPaper>
        </div>
    )
}

const StyledPaper = styled(Paper)`
    padding: 0 5px;
`;

const StyledInputBase = styled(InputBase)`
    width: 100%;
`;

export default Search;