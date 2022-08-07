import React, { Component } from "react";
/* import Component to turn functional app component to a class-based component */
import Header from "./Header.js";
import NotesList from "./NotesList.js";

/* turn functional component to class-based component */
class App extends Component {
  /* add state to handle data */
  state = {
    /* add notes & searchText properties to hold data */
    notes: [
      /* notes data type is an array of objects */
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
    /* searchText data type is a  string */
  };

  /* this method adds new note to the array above, don't forget to pass it as a prop to Header in the below return */
  addNote = (notes) => {
    /* create new note */
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    /* add new note to current array and use the "spread" operator to copy the existing array */
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  /* this method updates the state and returns all of the notes exactly the same except for the one that the user types in */
  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId == id of note that is edited
    // updateKey == title or description field
    //updatedValue == value of title or desctiption
    const updatedNotes = this.state.notes.map((note) => {
      //check if id matches the one that is being edited
      if (note.id !== editMeId) {
        return note; //if id doesn't match then return note as is, no changes
      } else {
        if (updatedKey === "title") {
          // if the update is for title update it
          note.title = updatedValue;
          return note;
        } else {
          // if the update isn't the title, it's the description so update it
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  //search method that recieves text
  onSearch = (text) => {
    //put text in lower case so its easier to match
    const newSearchText = text.toLowerCase();
    // map over teh array of notes and for every note check a few things
    const updatedNotes = this.state.notes.map((note) => {
      // check if there is no text in the search field and return all notes
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        // put title and description text in lower case
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        //check if the title and description includes what was typed into the search field
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  //remove note method
  removeNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  //stringify all the notes and save to local
  componentDidUpdate() {
    const stringifyedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifyedNotes);
  }
  // when page rerenders, unstringify all the notes and render them
  componentDidMount() {
    const stringifyedNotes = localStorage.getItem("savedNotes");
    if (stringifyedNotes) {
      const savedNotes = JSON.parse(stringifyedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  /* add render method and return for class-based components */
  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
