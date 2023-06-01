//useRef Hook-> consider one MODAL example:
/*
importing ref 
import  {useRef} from 'react'
const refClose=useRef(null);

I WANT TO CLOSE THE MODAL WHENEVER I CLICK ON SUBMIT BUTTON OR CLOSE BUTTON
const handleClick=(e)=>{
e.preventDefault();

SINCE REF BELONGS TO ANOTHER ELEMENT BUT HERE WE ARE USING REF INSIDE ANOTHER ELEMENT'S ATTRIBUTE EVENT FUNCTION I.E. handleClick()
refClose.current.click();
}

<form>
 <>BODY OF THE FORM<>
 
 HERE ref BELONGS TO CLOSE BUTTON ELEMENT, whenever we want to perform some operation on a element we need to declare  javascript's onClick event attribute event inside that specific element but here we are using ref(belongs to another element attribute) and performing the operation by calling the ref inside another's element function.  
      <button   ref= { refClose }  >Close button</button>
        <button onClick={handleClick}>Submit button</button>
</form>
*/

import React, { useContext, useEffect, useRef, useState } from 'react';
//importing context
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  let navigate = useNavigate();

  const { showAlert } = props;

  //importing use context
  const context = useContext(noteContext);

  //const notes=context.notes , const addNote=context.addNote ... can be written using destructure property as :
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    //if user has a valid authtoken then display the notes else redirect user to the login page
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
    //eslint-disable-next-line
  }, []);

  //initial value of ref will be blank
  const ref = useRef(null);
  const refClose = useRef(null);

  //declaring update note function
  const updateNote = (currentNote) => {
    ref.current.click();
    //when a user clicked on any note's edit button then open a modal and display current note in it.
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  //content regarding edit form

  //defining use state initial state's value
  const [note, setNote] = useState({
    id: '',
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
  const handleClick = () => {
    console.log('note has been updated');

    //passing the values to editNote function
    editNote(note.id, note.etitle, note.edescription, note.etag);

    //using the refClose inside another method
    refClose.current.click();

    showAlert('success', 'note has been successfully edited');
  };
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type='button'
        //giving class d-none which means display:none , we are hiding the button
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        //giving ref to this element

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
                    minLength={2}
                    required
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
                    minLength={2}
                    required
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
                    minLength={2}
                    required
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                //giving ref to this element
                ref={refClose}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleClick}
                disabled={
                  note.etitle.length < 2 ||
                  note.edescription.length < 2 ||
                  note.etag.length < 2
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* displaying the add a note components in home page */}
      <AddNote showAlert={showAlert} />

      <div>
        {/* displaying all the user existing note */}
        <div className='row mx-3'>
          <h4>Your note</h4>
          <div className='container'>
            {notes.length === 0 && 'No Notes to display'}
          </div>
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                note={note}
                updateNote={updateNote}
                showAlert={showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
