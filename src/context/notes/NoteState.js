import React, { useState } from 'react';

//importing a pre-build context
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:5000';

  ///////////////////////////////////////////////////////////////////

  //Fetched current user notes
  let initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  //creating a function to get all notes
  const getNotes = async () => {
    //TODO : api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YzI3MzY4MWQ3NTU1ZWNlY2RlNmIyIn0sImlhdCI6MTY4MzkyMjc5NX0.YjSYk6fJ4Zv9qzhlYBI3h4AFtIIUvOPqzh11XrgiW-M',
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };
  ////////////////////////////////////////////////////////////////////

  //creating a function to add a note
  const addNote = async (title, description, tag) => {
    console.log('adding a new note');
    //TODO : api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YzI3MzY4MWQ3NTU1ZWNlY2RlNmIyIn0sImlhdCI6MTY4MzkyMjc5NX0.YjSYk6fJ4Zv9qzhlYBI3h4AFtIIUvOPqzh11XrgiW-M',
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json();
    console.log(json);

    //logic to add

    const note = {
      _id: '6461f3cc5820896sddf12131dafee',
      user: '645c273681d7555ececde6b2',
      title: title,
      description: description,
      tag: tag,
      date: '2023-05-15T08:56:44.951Z',
      __v: 0,
    };
    // .concat will always return a new array while updating the old array
    setNotes(notes.concat(note));
  };

  ///////////////////////////////////////////////////////////////

  //creating a function to delete the note
  const deleteNote = async (id) => {
    //TODO: API CALL

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YzI3MzY4MWQ3NTU1ZWNlY2RlNmIyIn0sImlhdCI6MTY4MzkyMjc5NX0.YjSYk6fJ4Zv9qzhlYBI3h4AFtIIUvOPqzh11XrgiW-M',
      },
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    console.log(`deleting the current note whose id is ${id}`);
    let newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    //TODO
    //this logic is not working??doubt
    // setNotes((prevNotes) => {
    //   prevNotes.filter((element) => {
    //     return element._id !== id;
    //   });
    // });
  };

  ////////////////////////////////////////////////////////////////

  //creating a function to edit the note
  const editNote = async (id, title, description, tag) => {
    //TODO:API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YzI3MzY4MWQ3NTU1ZWNlY2RlNmIyIn0sImlhdCI6MTY4MzkyMjc5NX0.YjSYk6fJ4Zv9qzhlYBI3h4AFtIIUvOPqzh11XrgiW-M',
      },

      //A common use of JSON is to exchange data to/from a web server.When sending data to a web server, the data has to be a string.Convert a JavaScript object into a string with JSON.stringify().
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    // const json = await response.json();
    // console.log(json);

    //displaying the previous notes state
    // console.log(`previous client notes are`, notes);

    //METHOD -01(LOGIC TO UPDATE FRONT-END/CLIENT SIDE NOTE)
    //displaying the updated notes state
    //fetching all the notes after update at backend side and setting the setNotes with the new fetched notes and displaying it on client side.
    getNotes();

    /*
    METHOD -02(CREATING ANOTHER LOGIC TO UPDATE THE FRONT-END NOTE)
    JSON.PARSE()-> A common use of JSON is to exchange data to/from a web server.When receiving data from a web server, the data is always a string.Parse the data with JSON.parse(), and the data becomes a JavaScript object.

    let newNotes = JSON.parse(JSON.stringify(notes)); //DOUBT??USE
    console.log(`edited notes fetched from database are`, newNotes);
    

    .map returns a new array
    let newarray = newNotes.map((element) =>
      element._id === id
        ? { ...element, title: title, description: description, tag: tag }
        : element
    );
    console.log(`solution`, newarray);
    setNotes(newarray);
    */
  };

  return (
    <NoteContext.Provider
      value={{
        notes: notes,
        addNote: addNote,
        deleteNote: deleteNote,
        editNote: editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
