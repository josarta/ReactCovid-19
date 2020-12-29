import { combineReducers } from 'redux'

//reducers 
import {covidReducer} from './covid-19/reducers'
import {covidCountryReducer} from './covid-19Country/reducers'

export default combineReducers({
   covid:covidReducer,
   covidCountry:covidCountryReducer
})