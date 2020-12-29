import * as types from './types'

import covidService from '../../service/covidService'


/**
 * @description action encargada de ejecutar servicio para listar covid en el respectivo país
 */
export const getCovidCountry = (covid) => {
    return dispatch => {
       covidService.getListCovidCountry(covid).then(response => {
        let dataListCovid ={
        "confirmed":  response.data[0].confirmed,
        "deaths": response.data[0].deaths,
        "recovered":response.data[0].recovered,
        "nameCountry":response.data[0].countryregion,
        }
           dispatch(addListCovid(dataListCovid))
       })
    }
}


export function addListCovid(response) {
    return { type: types.GET_COVID_COUNTRY, response }
}