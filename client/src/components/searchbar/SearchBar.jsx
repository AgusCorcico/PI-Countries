import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCountriesByName } from '../../actions';

import styles from './searchbar.module.css';



function SearchBar() {

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(getCountriesByName(name));
    setName(''); //para limpiar el buscador
  };



  return (
    <div>
      <div className={styles.searchBarContainer}>
        <div>
          <input
            className={styles.inputSearch}
            type='text'
            placeholder='Search Country...'
            value={name}
            onChange={handleInputChange}
            autocomplete="off"
          />
        </div>
        <button className={styles.btnNavBar} type='submit' onClick={handleSubmit}>Search</button>
      </div>
    </div>
  )
}

export default SearchBar;