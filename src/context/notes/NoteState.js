import React, { useState } from 'react';

import NoteContext from './noteContext';
const NoteState = (props) => {
  //Fetched current user notes
  let initialNotes = [
    {
      _id: '6461f3cc5820896f131dafee',
      user: '645c273681d7555ececde6b2',
      title: 'my first note',
      description: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      tag: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      date: '2023-05-15T08:56:44.951Z',
      __v: 0,
    },
    {
      _id: '6461f41fe608eb9721c3bf61',
      user: '645c273681d7555ececde6b2',
      title: 'my second note',
      description: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      tag: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      date: '2023-05-15T08:58:07.838Z',
      __v: 0,
    },
    {
      _id: '6461f45f86b2b34dc084c1f1',
      user: '645c273681d7555ececde6b2',
      title: 'my second note',
      description: 'sdaa BEING CHANdasdasdsaGE ISdasdasda GOOD FOR OURRSELVES',
      tag: 'sdaa BEING CHANdasdasdsaGE ISdasdasda GOOD FOR OURRSELVES',
      date: '2023-05-15T08:59:11.014Z',
      __v: 0,
    },
    {
      _id: '6461f3cc5820896f131dafee',
      user: '645c273681d7555ececde6b2',
      title: 'my first note',
      description: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      tag: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      date: '2023-05-15T08:56:44.951Z',
      __v: 0,
    },
    {
      _id: '6461f41fe608eb9721c3bf61',
      user: '645c273681d7555ececde6b2',
      title: 'my second note',
      description: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      tag: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      date: '2023-05-15T08:58:07.838Z',
      __v: 0,
    },
    {
      _id: '6461f45f86b2b34dc084c1f1',
      user: '645c273681d7555ececde6b2',
      title: 'my second note',
      description: 'sdaa BEING CHANdasdasdsaGE ISdasdasda GOOD FOR OURRSELVES',
      tag: 'sdaa BEING CHANdasdasdsaGE ISdasdasda GOOD FOR OURRSELVES',
      date: '2023-05-15T08:59:11.014Z',
      __v: 0,
    },
    {
      _id: '6461f3cc5820896f131dafee',
      user: '645c273681d7555ececde6b2',
      title: 'my first note',
      description: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      tag: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      date: '2023-05-15T08:56:44.951Z',
      __v: 0,
    },
    {
      _id: '6461f41fe608eb9721c3bf61',
      user: '645c273681d7555ececde6b2',
      title: 'my second note',
      description: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      tag: 'SOMETIME BEING CHANGE IS GOOD FOR OURRSELVES',
      date: '2023-05-15T08:58:07.838Z',
      __v: 0,
    },
    {
      _id: '6461f45f86b2b34dc084c1f1',
      user: '645c273681d7555ececde6b2',
      title: 'my second note',
      description: 'sdaa BEING CHANdasdasdsaGE ISdasdasda GOOD FOR OURRSELVES',
      tag: 'sdaa BEING CHANdasdasdsaGE ISdasdasda GOOD FOR OURRSELVES',
      date: '2023-05-15T08:59:11.014Z',
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(initialNotes);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
