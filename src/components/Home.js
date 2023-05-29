import React from 'react';
//importing context
import Notes from './Notes';
const Home = () => {
  return (
    <div>
      {/* displaying all fetched notes of a user in home page*/}
      <Notes />
    </div>
  );
};

export default Home;
