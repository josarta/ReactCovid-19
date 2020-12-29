

import axios from "axios";

class covidService {

    static getListCovid = () => {
        return axios({
            method: 'get',
            url: "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief",
        }).then(response => {return response})
    }

    static getListCovidCountry = (valueIso) => {
        return axios({
            method: 'get',
            url: `https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso3=${valueIso}`
        }).then(response => { return response })
    }

}

export default covidService