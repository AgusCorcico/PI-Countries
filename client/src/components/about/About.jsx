import React from 'react';
import { Link } from 'react-router-dom';
import styles from './about.module.css'


function About() {
  return(
    <div className={styles.aboutFather}>
    <div className={styles.about}>
        <h1>
          Henry Countries Proyect
        </h1>
        <div className={styles.aboutCont}>
        <p>
        This is an App in which you can find all the countries on earth with their respective relevant information,
          such as name, image, continent, population, subregion and area. To develop it I used an external API. 
          From it you can, among other things:
            </p>    
            <ul className={styles.list}>
            <li>Find countries.</li><br />
            <li>Filter / Sort them.</li><br />
            <li>Add new activities to them.</li><br />
            </ul>
        <p>
          The App was built with React.js and Redux for the frontend;
          Node.js and Sequalize for the backend, the database used was PostgresSQL. 
          CSS for styles.
        </p>
        <div>
            <Link to="/home">
                <button className={styles.btn} type="button">Go Back</button>
            </Link>
        </div>
        </div>
    </div>
    </div>
);
};

export default About;