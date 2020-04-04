import * as types from './types'

import covidService from '../../service/covidService'


/**
 * @description action encargada de ejecutar servicio para listar covid
 */
export const getCovid = () => {
    return dispatch => {
        covidService.getListCovid().then(response => {
            let itemsTotalesFormateados =
            {
              "confirmed": response.data.confirmed,
              "deaths": response.data.deaths,
              "recovered": response.data.recovered 
            };
            dispatch(addListCovid(itemsTotalesFormateados))
        }).catch(err => {

        })
    }
}


export function addListCovid(response) {
    return { type: types.GET_COVID, response }
}