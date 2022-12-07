import React from 'react';
import styles from './pagination.module.css';

function Pagination({currentPage, setCurrentPage, countriesPerPage, allCountries, pagination}) {

  const pageNumbers = [];

  const max = allCountries/countriesPerPage;

  function prevPage(){
    setCurrentPage(currentPage - 1)
  }

  function nextPage(){
    setCurrentPage(currentPage + 1)
  }

  for(let i = 1; i<= Math.ceil(max); i++){
    pageNumbers.push(i);
  };
  return (
    <div className={styles.containerPag}>
      <nav>
        <ul className={styles.ulPag}>
          <button className={styles.number} disabled={currentPage === 1 || currentPage < 1} onClick={prevPage}>{'<'}</button>
          {
            pageNumbers &&pageNumbers.map(number=>
              <li className={styles.ilPag}>
                <a onClick={()=>pagination(number)} href className={styles.number}>{number}</a>
              </li>)
          }
          <button className={styles.number} disabled={currentPage === Math.ceil(max) || currentPage > Math.ceil(max)} onClick={nextPage}>{'>'}</button>  
        </ul>
      </nav>
    </div>
  )
}

export default Pagination;