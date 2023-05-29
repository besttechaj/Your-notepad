import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
const AddNote = () => {
  //importing use context
  const context = useContext(noteContext);

  //const addNote=context.addNote ... can be written using destructure property as :
  const { addNote } = context;

  //defining use state initial state's value
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
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
    e.preventDefault();
    //since we have fetched the add note hence we can pass the new note to it
    addNote(note.title, note.description, note.tag);
  };

  return (
    <div
      className='container my-3'
      style={{
        backgroundColor: 'violet',
        borderRadius: '20px',
        padding: '5px',
      }}
    >
      <h4>Add a note</h4>
      <form className='my-3'>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            type='text'
            className='form-control'
            id='description'
            name='description'
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='tag' className='form-label'>
            Tag
          </label>
          <input
            type='text'
            className='form-control'
            id='tag'
            name='tag'
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-primary' onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
