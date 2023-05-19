//performing routing for user's authentication using express.Router()

const express = require('express');
const router = express.Router();

//requiring bcryptjs
const bcrypt = require('bcryptjs');

//requiring jsonwebtoken
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'Ajay_is_a_good_$boy';

//fetching middleware
const fetchuser = require('../middleware/fetchuser');

//requiring validator
const { body, validationResult } = require('express-validator');

//require user's data model/collection
const User = require('../models/User');

//ROUTE-01 -> create a user using : POST METHOD --> http://localhost:3000/api/auth/createuser .No login required
router.post(
  '/createuser',
  //performing validation using express-validator below
  [
    body('name', 'Should have minimum length 3').isLength({ min: 3 }),
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Should have minimum length 3').isLength({ min: 3 }),
  ],
  async (req, res) => {
    //finds the validation errors in this request and wraps them in an object with handy function [below validation code logic is pre-defined]
    const errors = validationResult(req);

    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check whether the given email exist or not
      let user = await User.findOne({ email: req.body.email });
      //if user with given email already exist then do ...
      if (user) {
        res
          .status(400)
          .json({ error: 'Sorry a User with this email already exist' });
      }

      //securing password before storing it into our database using bcryptjs in the form of hash.

      //generating salt -> this salt is concat with your registered password to make it more secure
      const salt = await bcrypt.genSalt(10);
      //concatenating password with salt and generating a hash value.
      let securedPassword = await bcrypt.hash(req.body.password, salt);

      //if email is unique then do ...
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });
      const payLoad = {
        user: {
          id: user._id,
        },
      };
      //generating a token for user using user's id and secret key
      const authToken = jwt.sign(payLoad, JWT_SECRET_KEY);
      console.log(authToken);
      res.send({ user, authToken });
      console.log({ user, authToken });
    } catch (error) {
      res.status(500).send(error);
      console.log('error occurs during user creation via post method' + error);
    }
    //we are using async await hence we are not utilizing .then().catch()
    // .then(() => {
    //   res.send(req.body);
    // })
    // .catch((err) => {
    //   res.send(err);
    //   console.log('error occurs during user creation via post method' + err);
    // });
  }
);

//ROUTE-02 -> Authenticate a User and generating a auth token for user : POST METHOD --> http://localhost:3000/api/auth/login .

router.post(
  '/login', //performing validation using express-validator below
  [
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Should have minimum length 3').isLength({ min: 3 }),
  ],
  async (req, res) => {
    //finds the validation errors in this request and wraps them in an object with handy function [below validation code logic is pre-defined]
    const errors = validationResult(req);

    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check wether the user's provided email is exist or not
      //USING object DESTRUCTURING WE CAN WRITE THE BELOW CODE:
      //const {email,password}=req.body;
      //that simply means -> email=req.body.email,password=req.body.password
      const user = await User.findOne({ email: req.body.email });
      //if user exist then...
      if (user) {
        console.log(`email matched`);

        //Match the password..

        //comparing the password using bcrypt.compare()
        const givenPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!givenPassword) {
          console.log(`password is not matching`);
          res.status(401).json({ msg: 'please enter a valid password' });
        } else {
          console.log(`password matched`);
          //if the password got matched, getting the user's if from database and using this id generating a jsonwebtoken...
          const payload = {
            user: {
              id: user._id,
            },
          };
          //generating a token for the user using user's id and secret key(my signature)
          const authToken = jwt.sign(payload, JWT_SECRET_KEY);
          console.log(`Generated authToken for user is: `, authToken);
          console.log(user);
          //display the home page
          res.status(200).send('welcome to the index page.....');
        }
      } else {
        console.log(`Sorry user with such Email doesn't exist`);
        res.status(401).json({ msg: "email doesn't exist" });
      }
    } catch (error) {
      console.log(`error occurs during user's login`);
    }
  }
);

//ROUTE-03 -> Get logged-in User's details using: POST method "http://localhost:3000/api/auth/getuser". Already login required

//we are passing a middle ware which will fetch the user's id from the jwt which is sent by the user to the server.
//Always remember  middleware takes 3 parameters ie. req,res,next(to call next function after completion of its function process),hence it will call next async(function...)
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    //you will get a jwt token from the user then fetch the user's id from the auth-token
    const userId = req.user.id; //req.user(getting the user's data from middleware and adding .id so to fetch only the user's if from the received user's payload )
    //using user's id get all details of the user except password
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
