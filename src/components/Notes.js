import React, { useContext, useEffect } from 'react';
//importing context
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
  //importing use context
  const context = useContext(noteContext);

  //const notes=context.notes , const addNote=context.addNote ... can be written using destructure property as :
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      {/* displaying the add a note components in home page */}
      <AddNote />
      <div style={{ border: '2px solid green', padding: '5px' }}>
        {/* displaying all the user existing note */}
        <div className='row mx-3'>
          <h4>Your note</h4>
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
