import React from 'react';
//importing context
import Notes from './Notes';
const Home = (props) => {
  //destructing props
  const { showAlert } = props;
  return (
    <div>
      {/* displaying all fetched notes of a user in home page*/}
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
