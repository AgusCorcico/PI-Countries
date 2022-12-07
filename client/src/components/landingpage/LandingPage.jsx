import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landingpage.module.css';


function LandingPage() {
    return (
        <div className={styles.landingContainer}>
            <h1 className={styles.title}>Welcome to my individual proyect!</h1>
            <Link to='/home'>
                <button className={styles.btnLanding}>GET IN!</button>
            </Link>
        </div>
    )
}

export default LandingPage;