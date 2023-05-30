import React, { useContext, useEffect, useRef, useState } from 'react';
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
    //eslint-disable-next-line
  }, []);

  //initial value of ref will be blank
  const ref = useRef(null);

  //declaring update note function
  const updateNote = (currentNote) => {
    ref.current.click();
    //when a user clicked on any note's edit button then open a modal and display current note in it.
    setNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  //content regarding edit for

  //defining use state initial state's value
  const [note, setNote] = useState({
    etitle: '',
    edescription: '',
    etag: '',
  });

  //handle onChange handler ...
  const onChange = (e) => {
    //update the state -> {...first take my original state, [targeted input's name]:matched targeted value's name}
    // setNote({ ...note, [e.target.name]: e.target.value });

    //storing the input's value inside a variable
    let value = e.target.value;

    //taking the name from the input form which is in currently use.

    let name = e.target.name;

    //  storing the value inside  the matched name
    setNote({ ...note, [name]: value });
  };

  //handle submit button function ...
  const handleClick = (e) => {
    console.log('note has been updated');
    e.preventDefault();
    //since we have fetched the add note hence we can pass the new note to it
    // editNote(note.title, note.description, note.tag);
  };
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type='button'
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit Note
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form className='my-3'>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etitle'
                    name='etitle'
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='edescription'
                    name='edescription'
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='tag' className='form-label'>
                    Tag
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etag'
                    name='etag'
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* displaying the add a note components in home page */}
      <AddNote />

      <div>
        {/* displaying all the user existing note */}
        <div className='row mx-3'>
          <h4>Your note</h4>
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
