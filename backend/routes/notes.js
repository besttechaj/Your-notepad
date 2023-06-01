//performing routing for user's notes using express.Router()

const express = require('express');
const router = express.Router();

//to get the user
const fetchuser = require('../middleware/fetchuser');

//importing Notes model/collection
const Note = require('../models/Note');

//requiring validator
const { body, validationResult } = require('express-validator');

//Routes 01 -> Get all the notes using GET REQ: "/api/notes/fetchallnotes" .Login required
//fetching the user using middleware function  before getting the notes of that specified user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    //getting the user id
    const user = req.user.id;
    //if specified user's ID exist get me the notes using user's id then
    const notes = await Note.find({ user });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Routes 02 -> creating notes  using POST REQ: "/api/notes/fetchallnotes" .Login required
//fetching the user using middleware function  before getting the notes of that specified user
//using express-validator -> validating a note befor storing it in our database
router.post(
  '/addnote',
  [
    body('title', 'Should have minimum length 1').isLength({ min: 2 }),
    body('description', 'Should have minimum length 2').isLength({ min: 2 }),
    body('tag', 'Should have minimum length 2').isLength({ min: 2 }),
  ],
  fetchuser,
  async (req, res) => {
    //finds the validation errors in this request and wraps them in an object with handy function [below validation code logic is pre-defined]
    const errors = validationResult(req);

    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //getting the user id from the middleware function file
      const user = req.user.id;
      //checking whether the user's ID Exist or not
      const userID = await Note.find({ user });
      // console.log(userID);//display all previous notes of that existing id
      if (userID) {
        const newNote = await Note.create({
          user: req.user.id,
          title: req.body.title,
          description: req.body.description,
          tag: req.body.tag,
        });
        console.log(`notes created successfully`);
        res.json(newNote);
      } else {
        res.json({
          error: 'Unable to process the request for new note creation ',
        });
        console.log(`user doesn't exist`);
      }
    } catch (error) {
      res.status(500).send(error);
      console.log('error occurs during note creation via post method' + error);
    }
  }
);

//Routes 03 -> update a note  using PUT REQ: "/api/notes/updatenote" .Login required
//fetching the user using middleware function  before getting the notes of that specified user
//using express-validator -> validating a note befor storing it in our database

//fetchuser -> middleware --> get me all the notes with corresponding specified user
//:id -> we are passing the note id inside params
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    //fetching title,description,tag from the body using object destructuring

    //here we are fetching the passed value and storing the updated title,description,tag inside some variable
    const { title, description, tag } = req.body;
    //the above line simply means that
    //const title=req.body.title
    //const description=req.body.description
    //const tag=req.body.tag

    //create a new Note object and later we can update the existing node with the newNote
    let newNote = {};

    //set the values inside new note
    newNote.title = title;
    newNote.description = description;
    newNote.tag = tag;

    //find the note to be updated and update it...

    //passing the note's id inside url and fetching that note id from url so that we can get the specified note

    //storing the note to be updated inside note variable

    let note = await Note.findById(req.params.id); //gives the note belonging to that note's id

    //checking whether the fetched note exist or not
    if (!note) {
      return res
        .status(404)
        .send(`note with specified note's id doesn't found`);
    }

    //checking whether the note belonging to the same user by matching the user's id present inside fetched note with the user's id present inside user's model/collection db.
    //note.user.toString() -> user's id present inside note model/collection
    //req.user.id-> user's id present inside user model/collection
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .send('unauthorized user, hence update is not allowed ');
    } else {
      //updating the existing note with the new note
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
      console.log(`note has been successfully updated `);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//Routes 04 -> delete an existing note  using DELETE REQ: "/api/notes/deletenote/:id" .Login required
//fetching the user using middleware function  before getting the notes of that specified user
//using express-validator -> validating a note before storing it in our database

//fetchuser -> middleware --> get me all the notes with corresponding specified user
//:id -> we are passing the note id inside params
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    //finding the note to be delete ...

    //passing the note's id inside url and fetching that note id from url so that we can get the specified note

    //storing the note to be updated inside note variable

    let note = await Note.findById(req.params.id); //gives the note belonging to that note's id

    //checking whether the fetched note exist or not
    if (!note) {
      return res.status(404).send(`note doesn't exist`);
    }

    //checking whether the note belonging to the same user by matching the user's id present inside fetched note with the user's id present inside user's model/collection db.
    //note.user.toString() -> user's id present inside note model/collection in the form of ObjectId hence we are using toString() to convert it back to string
    //req.user.id-> user's id present inside user model/collection
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .send('unauthorized user, hence note delete is not allowed ');
    } else {
      //updating the existing note with the new note
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({
        success: 'Note has been successfully deleted',
        deletednote: note,
      });
      console.log(`note has been successfully updated `);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
