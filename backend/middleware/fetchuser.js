const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'Ajay_is_a_good_$boy';
//Always remember middleware takes 3 parameters ->req,res,next(to call next function)
const fetchuser = (req, res, next) => {
  //get the user's id from the user(sender's jwt token) and add it to req object for further operation...

  const token = req.header('auth-token');
  //if token is not present inside user's jwt token's header then access denied
  if (!token) {
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
  //else first verifying  the user's jwt-token using jwt.verify with the help of our signature
  try {
    //after verifying this will return me the user's payload(data)

    const data = jwt.verify(token, JWT_SECRET_KEY);

    //getting the user from the data variable using data.user and sending it for further process...
    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
};

module.exports = fetchuser;
