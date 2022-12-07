import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetails } from '../../actions';
import { Link, useParams } from 'react-router-dom';

import styles from './details.module.css';



function Details() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector(state => state.details)


  useEffect(()=>{
    dispatch(getCountryDetails(id))
  },[dispatch,id]);


  return (
    <div className={styles.detailContainer}>
      {
        detail.name ? 
        <div key={detail.id}> 
          <div className={styles.name}>
            <hi><u>{detail.name}</u></hi>
          </div>
          <div>
            <img className={styles.img} src={detail.image} alt=''/>
          </div>
          <div>
            <hi><u>Id:</u> {detail.id}</hi>
          </div>
          <div>
            <h2><u>Continent:</u> {detail.continent}</h2>
            <h2><u>Capital:</u> {detail.capital}</h2>
            <h2><u>Subregion:</u> {detail.subregion}</h2>
            <h2><u>Area:</u> {detail.area} km2</h2>
            <h2><u>Population:</u> {detail.population}</h2>
          </div>
          <div>
            <h2><u>Activities:</u></h2>
            <div className={styles.containerActivities}>
            { detail.activities.length > 0? detail.activities.map(e=>{
              return (
                <div key={e.name} className={styles.detailActivity}>
                  <p>Name: {e.name}</p>
                  <p>Difficulty: {e.difficulty}</p>
                  <p>Duration: {e.duration}</p>
                  <p>Season: {e.season}</p>
                </div>
              )
            })
            :
            <h2>Without activities</h2>
            }
            </div>
          </div>
        </div>
        :
        <div>
          <h1>Loading...</h1>
        </div>
      }
      <Link to='/home'>
        <button className={styles.btnGoBack}>Go Back</button>
      </Link>
    </div>
  )
}

export default Details;