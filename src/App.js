import React, { useState, useEffect } from "react";
import {useStatePersist} from 'use-state-persist';
import { Paper, Grid, Typography, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";

import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import Pagination from "./components/Pagination";
import Nominations from "./components/Nominations";

import axios from "axios";
import "./App.css";

const OMDB_URL = process.env.REACT_APP_OMDB_URL || "http://www.omdbapi.com";
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY || "8b5bad04";

function App() {
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  // const [nominations, setNominations] = useState({});
  const [nominations, setNominations] = useStatePersist("nominations", {});
  const [searchResults, setSearchResults] = useState({
    Response: "False",
    Search: [],
    totalResults: "0",
  });
  const [open, setOpen] = useStatePersist("snackbar", false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchString.length > 2 && !loading) {
      setLoading(true);
      axios
        .get(
          `${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${searchString}&type=movie&${
            page > 0 ? `page=${page}` : ""
          }`
        )
        .then((res) => {
          setLoading(false);
          if (res.data.Response === "True") {
            setSearchResults({
              ...res.data,
            });
          } else {
            setSearchResults(res.data);
          }
        })
        .catch((err) => {
          console.error(err.message);
          setLoading(false);
        });
    }
  }, [searchString, page, setLoading]);

  useEffect(() => {
    if(Object.keys(nominations).length > 4){
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [nominations, setOpen])

  const addNominee = (id, title) => {
    const newNominations = {...nominations};
    newNominations[id] = title;
    setNominations(newNominations);
  }

  const removeNominee = (id) => {
    const newNominations = {...nominations};
    delete newNominations[id];
    setNominations(newNominations);
  }

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };
  return (
    <div className="App">
    <Snackbar open={open}>
      <Alert variant="filled" severity="warning">You've already selected 5 nominations</Alert>
    </Snackbar>
      <Typography style={{marginBottom: '15px'}} variant="h3" component="h1">The Shoppies</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <Search
              handleSearchChange={handleSearchChange}
              searchString={searchString}
            />
          </StyledPaper>
        </Grid>
        <Grid item sm={12} md={6}>
          <StyledPaper minheight="200">
            <SearchResults open={open} nominations={nominations} addNominee={addNominee} searchResults={searchResults} searchString={searchString} />
            <Pagination
              totalItems={Number(searchResults.totalResults)}
              setPage={setPage}
              currentPage={page}
            />
          </StyledPaper>
        </Grid>
        <Grid item sm={12} md={6}>
          <StyledPaper minheight="200">
            <Nominations removeNominee={removeNominee} nominations={Object.entries(nominations)} />
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
}

const StyledPaper = styled(Paper)`
  padding: 15px;
  min-height: ${(props) => props.minheight}px;
`;

export default App;
