import React from "react";

// change this to an explicit return because you are returning more thatn the li block of code
const Note = (props) => {
  // console.log(props);
  // use e (event) and grab the target value
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    //grab the unique id of the note to edit it
    const editMeId = props.note.id;
    //output the new title value as a prop to pass on Change
    props.onType(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
  };

  //delete note function
  const clickDelete = () => {
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      {/* {console.log(props)} */}
      {/* add the props to value property, note is grabbing 1 object from the notes array of objects */}
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span onClick={clickDelete} className="note__delete">
        X
      </span>
    </li>
  );
};

export default Note;
