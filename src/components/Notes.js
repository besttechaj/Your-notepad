import React, { useContext } from 'react';
//importing context
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
  //importing use context
  const context = useContext(noteContext);

  //const notes=context.notes , const setNotes=context.setNotes can be written using destructure property as :
  const { notes, setNotes } = context;
  return (
    <div>
      <div className='row mx-3'>
        <h4>Your note</h4>
        {notes.map((note) => {
          return <NoteItem note={note} />;
        })}
      </div>
      ;
    </div>
  );
};

export default Notes;
