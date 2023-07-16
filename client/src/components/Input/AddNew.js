import React from "react";

const AddNew = () => {
  return (
    <form>
      <select className='select select-bordered w-full max-w-xs'>
        <option disabled selected>
          choisire une voiture
        </option>
        <option>dacia sandero</option>
        <option>dacia duster</option>
      </select>
      <input
        type='number'
        placeholder='kilometrage'
        className='input input-bordered w-full max-w-xs'
      />
      <input type='date' placeholder='date' className='input input-bordered w-full max-w-xs' />
    </form>
  );
};

export default AddNew;
