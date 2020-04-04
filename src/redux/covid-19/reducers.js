import * as types from './types'

const INITIAL_STATE = {
    confirmed:'',
    deaths:'',
    recovered:''
};

/**
 * @description reducer de covid
 * @param {*} state Estado inicial 
 * @param {*} action action del reducer
 */
export const covidReducer = (state = INITIAL_STATE, action = null / undefined) => {
    switch (action.type) {
        case types.GET_COVID:
            return action.response 
        default:
            return { ...state }
    }
}
