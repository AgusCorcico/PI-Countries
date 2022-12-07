import React from 'react';
import styles from './card.module.css';

function Card({image, name, continent}) {

  return (
    <div className={styles.cardContainer}>
      <div className={styles.titleCard}>
        <h2 className={styles.titleDecoration}>{name}</h2>
      </div>
      <div className={styles.imgContainer}>
      <img className={styles.imgCard} src={image} alt="not found"/>
      </div>
      <div className={styles.divContinent}>
        <h3 className={styles.titContinent}>{continent}</h3>
      </div>

    </div>
  )
}

export default Card;