import * as types from './types'

const INITIAL_STATE = {};

/**
 * @description reducer de covid por país
 * @param {*} state Estado inicial 
 * @param {*} action action del reducer
 */
export const covidCountryReducer = (state = INITIAL_STATE, action = null / undefined) => {
    switch (action.type) {
        case types.GET_COVID_COUNTRY:
            return action.response
        default:
            return { ...state }
    }
}
