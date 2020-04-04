import React from 'react';
import {
  MdSentimentSatisfied,
  MdPlace,
  MdEnhancedEncryption,
  MdWhatshot,
} from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { countryProgressTableData } from '../demos/dashboardCountry';


import MapWithBubbles from '../components/MapWithBubbles';
import Page from '../components/Page';
import CountryProgressTable from '../components/CountryProgressTable';
import { IconWidget, NumberWidget } from '../components/Widget';

import * as covidAction from '../redux/covid-19/actions'
import * as covidCountryAction from '../redux/covid-19Country/actions'


/**
 * @description clase principal del proyecto
 */
class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombrePaisActual:"Colombia",
      paisItemsOrdenados: [],
      paisItems: {},
      iso2: "CO",
      iso3: "COL",
    };
  }

  /**
   * @description ciclo de vida del proyecto
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.getCovid()
    this.props.actions.getCovidCountry("COL")
    this.ordenarAscTable(countryProgressTableData, 'countryregion', 'asc');
  }

  /**
   * @description handler encargado de buscar por país
   * @param {Object} countrycode objeto con el código para buscar el país 
   */
  findCovidCountry = (countrycode) => {
    this.props.actions.getCovidCountry(countrycode.iso3)
  }


  ordenarAscTable(data, key, orden) {
    return data.sort(function (a, b) {
      var x = a[key],
        y = b[key];

      if (orden === 'asc') {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }

      if (orden === 'desc') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

  /**
   * @description handle de errores
   * @param {Object} response 
   */
  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }
  
  handleError(error) {
    console.log(error.message);
  }


  render() {
    const { covid,covidCountry } = this.props 
    return (
      <Page
        className="DashboardPage"
        title={covidCountry.nameCountry + ' - ' + 'Seguimiento de coronavirus'}
        breadcrumbs={[{ name: 'Mapa', active: true }]}
      >
        <Row>
          <Col lg={4} md={6} sm={6} xs={12}>
            <IconWidget
              bgColor='primary'
              icon={MdEnhancedEncryption}
              iconProps={{ size: 50 }}
              title={'Total : '}
              valor={covidCountry.confirmed}
              subtitle="Total confirmados"
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <IconWidget
              bgColor='danger'
              icon={MdWhatshot}
              iconProps={{ size: 50 }}
              title={'Total : '}
              valor={covidCountry.deaths}
              subtitle="Total muertes"
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <IconWidget
              bgColor='success'
              icon={MdSentimentSatisfied}
              iconProps={{ size: 50 }}
              title={'Total : '}
              valor={covidCountry.recovered}
              subtitle="Total recuperados"
            />
          </Col>
        </Row>

        <Row>
          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total confirmados"
              subtitle="Casos globales"
              number={covid.confirmed}
              color="primary"
              progress={{
                value: Number.parseFloat((covidCountry.confirmed * 100) / parseInt(covid.confirmed)).toFixed(4)
                ,
                label: 'Casos ' + covidCountry.nameCountry
                  + ' % Casos globales',

              }}
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Muertes totales"
              subtitle="Casos globales"
              number={covid.deaths}
              color="danger"
              progress={{
                value: (Number.parseFloat(covidCountry.deaths * 100) / covid.deaths).toFixed(4),
                label: 'Casos ' + covidCountry.nameCountry
                  + ' % Casos globales',
              }}
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total  recuperados"
              subtitle="Casos globales"
              number={covid.recovered}
              color="success"
              progress={{
                value: (Number.parseFloat(covidCountry.recovered * 100) / covid.recovered).toFixed(4),
                label: 'Casos ' + covidCountry.nameCountry
                  + ' % Casos globales',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Casos confirmados acumulados
              </CardHeader>
              <CardBody>
                <MapWithBubbles nombrePaisActual={covidCountry.nameCountry} />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>Seleccione un país</CardHeader>
            <CardBody  >
              <CountryProgressTable
                headers={[
                  'Pais',
                  <MdPlace size={25} />,
                ]}
                countryData={countryProgressTableData}
                parentCallback={this.findCovidCountry}
              />
            </CardBody>
          </Card>
        </Col>
        </Row>
      </Page>
    );
  }
}


function mapStateToProps(state) {
  console.log(state)
  return {
    covid:state.covid,
    covidCountry:state.covidCountry
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators({  ...covidAction,...covidCountryAction }, dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);
