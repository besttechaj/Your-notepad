import React from 'react';

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className='col-md-3 my-3'>
      <div class='card' style={{ width: '18rem' }}>
        <div class='card-body'>
          <h5 class='card-title'>{note.title}</h5>
          <p class='card-text'> {note.description}</p>
          <i class='fa-sharp fa-solid fa-trash mx-2'></i>
          <i class='fa-solid fa-pen-to-square mx-2'></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
