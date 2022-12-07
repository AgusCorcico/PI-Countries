import React from 'react'
import{ useState, useEffect } from 'react';
import{ useSelector, useDispatch } from 'react-redux';
import {
  getCountries,
  getActivities,
  filterByContinent,
  filterByActivity,
  orderByName,
  orderByPopulation
} from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../card/Card';
import Pagination from '../paginate/Pagination';
import SearchBar from '../searchbar/SearchBar';

import styles from './home.module.css';

function Home() {

  const dispatch = useDispatch();
  const allCountries = useSelector(state=> state.countries);
  const allActivities = useSelector(state=> state.activities);

  //Paginado
  const[currentPage, setCurrentPage] = useState(1);
  const [ordered, setOrdered] = useState(false);
  const countriesPerPage = 10;
  const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
/* 	const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry); */
  const currentCountries = currentPage === 1 ? allCountries.slice(0,9)
  : currentPage===26?allCountries.slice(249,allCountries.length)
  : allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  function pagination(pageNumber){
		setCurrentPage(pageNumber)
	};

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);  //Si alguno de estos valores cambia, se vuelve a ejecutar

  useEffect(()=> {
    dispatch(getActivities());
  }, [dispatch]); 

  function handleClickGetCountries(e){
    e.preventDefault();
    dispatch(getCountries());
  };

  function handleFilterByContinent(e){
    e.preventDefault();
    //la action se ejecuta tomando como payload al e.target.value => el valor que le asigné a las distintas options de los select
    dispatch(filterByContinent(e.target.value));
  };

  function handleFilterByActivity(e){
    e.preventDefault();
    dispatch(filterByActivity(e.target.value));
  };

  function handleSortByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    //sin el setOrdenByName no tengo modificaciones en el renderizado, 
    ordered ? setOrdered(false) : setOrdered(true);
  };

  function handleSortByPopulation(e){
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1);
    ordered ? setOrdered(false) : setOrdered(true);
  }


  return (
    <div className={styles.home}>
    <div className={styles.homeContainer}>
      <div className={styles.title}>
        <h1>HENRY COUNTRIES</h1>
      </div>      
      <nav className={styles.navbar}>
        <li className={styles.liNav}>
          <div className={styles.marginLi}>
            <Link to='/'>
              <button className={styles.btnNavBar}>LandingPage</button>
            </Link>
          </div>
          <div className={styles.marginLi}>
            <Link to='/activity'>
              <button className={styles.btnNavBar}>Crear actividad</button>
          </Link>
          </div>
          <div className={styles.marginLi}>
            <button className={styles.btnNavBar} onClick={handleClickGetCountries}>Refresh countries</button>
          </div>
          <div className={styles.marginLi}>
            <Link to='/about'>
              <button className={styles.btnNavBar} type="button">About</button>
            </Link>
          </div>
          <div className={styles.searchBar}>
            <SearchBar/>
          </div>
        </li>
      </nav>
      <div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          pagination={pagination}
        />
      </div>
      <div className={styles.selectsAndCards}>
      <div className={styles.selectContainer}>
        <select className={styles.selectBtn} onChange={handleSortByName}>
          <option value="Alpha" key="Alpha">Alphabetically Sort</option>
          <option value="AtoZ" key="Asc">Sort: A - Z</option>
          <option value="ZtoA" key="Desc">Sort: Z - A</option>
        </select>
        <br />
        <select className={styles.selectBtn} onChange={handleSortByPopulation}>
          <option value="Population" key="Population">Population Sort</option>
          <option value="Asc" key="Asc">Sort: Max population</option>
          <option value="Desc" key="Desc">Sort: Min population</option>
        </select>
        <br />
        <select className={styles.selectBtn} onChange={handleFilterByContinent}>
          <option value="All" key="All">All Continents</option>
          <option value="Africa" key="Africa">Africa</option>
          <option value="Antarctica" key="Antarctica">Antartica</option>
          <option value="Asia" key="Asia">Asia</option>
          <option value="Europe" key="Europe">Europe</option>
          <option value="North America" key="North America">North America</option>
          <option value="South America" key="South America">South America</option>
          <option value="Oceania" key="Oceania">Oceania</option>
        </select>
        <br/>
        <select className={styles.selectBtn} onChange={handleFilterByActivity}>
          <option value="AllActivities" key="AllActivities">All Activities</option>
          {
            allActivities.map(e=> (
              <option value={e.name} key={e.name}>{e.name}</option>
            ))
          };
        </select>
      </div>
      <div className={styles.homeCardContainer}>
        {
          currentCountries && currentCountries.map(e=>(
            <div>
              <Link to={/home/+e.id}>
                <Card image={e.image} name={e.name} continent={e.continent}/>
              </Link>
            </div>
          ))
        }
      </div>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          pagination={pagination}
        />
      </div>
    </div>
    </div>
  )
}

export default Home;