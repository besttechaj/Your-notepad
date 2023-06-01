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
    setNote({ title: '', description: '', tag: '' });
  };

  return (
    <div className='container my-3'>
      <h4>Add a note</h4>
      <form className='my-3' onSubmit={handleClick}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            value={note.title}
            onChange={onChange}
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
            id='description'
            name='description'
            value={note.description}
            onChange={onChange}
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
            id='tag'
            name='tag'
            value={note.tag}
            onChange={onChange}
            minLength={2}
            required
          />
        </div>
        {/* disabling the submit button if my note's tag,desc,title length is not meeting the required length */}
        <button
          disabled={
            note.title.length < 2 ||
            note.description.length < 2 ||
            note.tag.length < 2
          }
          type='submit'
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
