import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCountries, postActivity} from '../../actions';

import styles from './createactivity.module.css';



function CreateActivity() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countriesApi = useSelector((state)=> state.countries);
  const [errors, setErrors] = useState({});



  const [input, setInput] = useState({
    name:"",
    difficulty: "",
    duration: "",
    season: "",
    countries:[]
  });


  useEffect(()=>{
    dispatch(getCountries())
  },[dispatch]);

  
  function handleChange(e){
    setErrors({
      ...input,
      [e.target.name]: e.target.value
    })
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };




  function handleCountry(e){
    setErrors(validateInputs({
      ...input,
      countries:[...input.countries, e.target.value]
    }))
    setInput({
      ...input,
      countries: [...input.countries,  e.target.value]
    })
  };

  function handleSeason(e){
    setErrors(validateInputs({
      ...input,
      season: e.target.value
    }))
    setInput({
      ...input,
      season: e.target.value
    })
  };

  function handleDelete(e){
    setInput({
      ...input,
      countries: input.countries.filter(country=> country !== e)
    })
  }

  function validateInputs(input) {
    let errors = {}
    let expRegDifficulty =/[+-]?([0-9]*[.])?\b[0-5]{1,1}\b/; //regex 0-5 decimal inclusive
    let expRegSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/; //validacion solo letras

    if(!input.name){
      errors.name = 'Enter name of the activity'
    }else if(!expRegSoloLetras.test(input.name)){
      errors.letters = 'The name must have only letters'
    }else if(!input.difficulty){
      errors.difficulty = 'Enter difficulty of the activity'
    }else if(!expRegDifficulty.test(input.difficulty)){
      errors.ceroToFive = 'Enter a difficulty from 0 to 5'
    } else if(!input.duration){
      errors.duration = 'Enter duration of the activity(hours)'
    }else if(input.duration < 0 || input.duration > 100){
      errors.ceroToHundred = 'Enter a duration from 0 to 100 hours'
    }else if(input.season === null){
      errors.season = 'Select a season'
    }else if(!input.countries.length){
      errors.countries = 'Select one country at least'
    }
    return errors;
  };





  function handleSubmit(e){
    e.preventDefault();

    dispatch(postActivity(input))
    alert('Activity created successfully')
    setInput({
      name: '',
      difficulty:'',
      duration:'',
      season:'',
      countries:[]
    })

      navigate('/home')
    }




  const season = ['Winter', 'Spring', 'Autumn', 'Summer'];
  console.log(input.countries)
  return (
    <div className={styles.createCont}>
      <div className={styles.btnGoBackCont}>
        <Link to='/home'>
          <button className={styles.btnGoBack}>Go Back</button>
        </Link>
      </div>
      <h1 className={styles.title}>Create Activity</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
          <label><u>Name:</u></label>
          <input
            type='text'
            value={input.name}
            name='name'
            placeholder="Name..."
            onChange={(e)=>handleChange(e)}
            autocomplete="off"
          />
          <span>{errors.name && (<p>{errors.name}</p>)}</span>
          <span>{errors.letters && (<p>{errors.letters}</p>)}</span>
        <div>
          <label><u>Duration:</u></label>
          <input
            type='text'
            value={input.duration}
            name='duration'
            placeholder="Duration in hours..."
            onChange={(e)=>handleChange(e)}
            autocomplete="off"
          />
          <span>{errors.duration && (<p>{errors.duration}</p>)}</span>
          <span>{errors.ceroToHundred && (<p>{errors.ceroToHundred}</p>)}</span>
        </div>
        <div>
          <label><u>Difficulty:</u></label>
          <input
            type='number'
            value={input.difficulty}
            name='difficulty'
            placeholder="Difficulty..."
            onChange={(e)=>handleChange(e)}
            autocomplete="off"
          />
          <span>{errors.difficulty && (<p>{errors.difficulty}</p>)}</span>
          <span>{errors.ceroToFive && (<p>{errors.ceroToFive}</p>)}</span>
        </div>
        <div>
          <label><u>Season:</u></label>
          <select onChange={(e)=>handleSeason(e)}>
            <option value='' hidden>Select Season</option>
            {
              season.map(e=> (
                <option value={e} name='season'>{e}</option>
              ))
            }
          </select>
          <span>{errors.season && (<p>{errors.season}</p>)}</span>
        </div>
        <div>
        <label><u>Countries:</u></label>
        <select onChange={handleCountry}>
          <option>Select Countries</option>
          {
            countriesApi.map(e=>(
              <option value={e.name} name='countries' key={e.id}>{e.name}</option>
            ))
          }
        </select>
        <span>{errors.countries && (<p>{errors.countries}</p>)}</span>
        </div>
        <ul>
          <il>
            <div className={styles.deleteCont}>
            {input.countries.map(e=>
            <div className={styles.deleteCont2}>
              {e}
              <div>
                <button onClick={() => handleDelete(e)} type='button' className={styles.btnDelete}>X</button>
              </div>
            </div>)}
            </div>
          </il>
        </ul>
        <div>
          <button className={styles.btnActivity} type='submit'
          disabled={errors.name || errors.letters || errors.difficulty || errors.ceroToFive
            || errors.duration|| errors.ceroToHundred || errors.season||errors.countries ? true : false }
          >Create Activity</button>
        </div>
      </form>
    </div>
  )
};

export default CreateActivity;