import{
    GET_COUNTRIES,
    GET_COUNTRY_DETAILS,
    GET_BY_NAME,
    GET_ACTIVITIES,
    POST_ACTIVITY,
    FILTER_BY_ACTIVITY,
    FILTER_BY_CONTINENT,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
} from '../actions';


const initialState = {
    countries:[],
    activities:[],
    allCountries:[],
    details:[],
} 

function rootReducer(state = initialState, action){


    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }


        case GET_COUNTRY_DETAILS:
            return{
                ...state,
                details: action.payload
            }


        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }


        case GET_BY_NAME:
            return{
                ...state,
                countries: action.payload
            }


        case POST_ACTIVITY:
            return{
                ...state
            }


        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            //el valor del select llega a la action por payload. Si es all devuelvo todos los paises, sino filtro por el continente que recibo.
            //importante => el value tiene que ser igual al value que me traigo de la api.
            const filterByContinent = action.payload === 'All' 
                ? allCountries
                : allCountries.filter(c=>c.continent === action.payload); 
            return{
                ...state,
                countries: filterByContinent 
            }


        case FILTER_BY_ACTIVITY:
            const all = state.allCountries;
            const filterByActivity = action.payload === 'AllActivities'
                ? all
                : all.filter(c=>c.activities.find(e=>e.name === action.payload));
            return{
                ...state,
                countries: filterByActivity
            }


        case ORDER_BY_NAME:
            let orderCountries = action.payload === 'AtoZ'
                ? state.countries.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1;
                    }
                    return 0;
                })
                : state.countries.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                countries: orderCountries
            }


        case ORDER_BY_POPULATION:
            let orderByPopulation = action.payload === 'Asc'
            ? state.countries.sort(function(a,b){
                if(a.population > b.population){
                    return -1;
                }
                if(b.population > a.population){
                    return 1;
                }
                return 0;
            })
            : state.countries.sort(function(a,b){
                if(a.population > b.population){
                    return 1;
                }
                if(b.population > a.population){
                    return -1;
                }
                return 0;
            });
            return{
                ...state,
                countries: orderByPopulation
            }

            
        default: return state;
    }
    
}

export default rootReducer;