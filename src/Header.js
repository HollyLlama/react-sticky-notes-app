import React from "react";

//change to explicit return
const Header = (props) => {
  // use e (event) and grab the target value
  const callSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <header>
      {/* {console.log(props)} */}
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button onClick={props.addNote} className="add-new">
          + New Note
        </button>

        <input
          className="search"
          type="text"
          placeholder="Type here to search..."
          value={props.searchText}
          onChange={callSearch}
        />
      </aside>
    </header>
  );
};

export default Header;
