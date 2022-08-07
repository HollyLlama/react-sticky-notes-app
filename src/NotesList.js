import React from "react";
import Note from "./Note.js";

/* change into an explicit return */
const NotesList = (props) => {
  // console.log(props.notes);
  //keepSearchMatches will evaluate each note to a true or false boolean and add to filtered array if true
  const keepSearchMatches = (note) => note.doesMatchSearch;
  // filter method
  const searchMatches = props.notes.filter(keepSearchMatches);
  /* for each note return a Note component with it's own note prop which is = to entire note object */
  /* because this in an array we need to add a key as well so react can update as efficiently as possible */
  const renderNote = (note) => (
    <Note
      removeNote={props.removeNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  );
  /* map over the array to pass props(notes is the array of objects in the notes property of state in app.js) */
  const noteElements = searchMatches.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
