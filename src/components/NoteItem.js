import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
  const context = useContext(noteContext);

  //fetching delete note from context
  const { deleteNote } = context;

  const { note, updateNote } = props;
  return (
    <div className='col-md-3 my-3 mx-4'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{note.title}</h5>
          <p className='card-text'> {note.description}</p>
          <p className='card-text'>{note.tag}</p>
          <div className='d-flex align-items-center'>
            <i
              className='fa-sharp fa-solid fa-trash mx-2'
              onClick={() => {
                deleteNote(note._id);
                props.showAlert('success', 'Note has been deleted');
              }}
            ></i>
            <i
              className='fa-solid fa-pen-to-square mx-2'
              //here we are passing a function with argument hence declaration inside anonymous function
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
