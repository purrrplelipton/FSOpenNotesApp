import React from "react";

const Note = ( props ) => {
    const label = props.note.important ?
        "make not important" :
        "make important"
  
    return (
        <div className="note">
            <p>{props.note.content}</p>
            <button onClick={props.clicked}>
                {label}
            </button>
        </div>
    );
};
  
export default Note;