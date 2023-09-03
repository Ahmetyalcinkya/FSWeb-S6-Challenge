import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Karakterler from "./components/Karakterler";
import Pagination from "./components/Paging";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const changeHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    setSearch(value);
  };
  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/" + activePage)
      .then((res) => {
        console.log(res.data);
        setNumberOfPages(Math.ceil(res.data.count / res.data.results.length));
        const searchResults = res.data.filter((item) => {
          return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.hair_color.toLowerCase().includes(search.toLowerCase())
          );
        });
        setCharacters(searchResults);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [search, activePage]);

  const pageHandler = (page) => {
    console.log(page);
    if (page === "previous") {
      page = activePage - 1 < 1 ? 1 : activePage - 1;
    } else if (page === "next") {
      page = activePage + 1 > numberOfPages ? numberOfPages : activePage + 1;
    }
    setActivePage(page);
  };
  // Fetch characters from the API in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  return (
    <div className="App">
      <Header search={search} changeHandler={changeHandler} />
      <Karakterler characters={characters} />
      <Pagination pageHandler={pageHandler} numberOfPages={numberOfPages} />
    </div>
  );
};

export default App;
