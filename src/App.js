import React, {Component} from 'react';
import axios from 'axios';
import {Navbar, Grid, Row, Col, Button} from 'react-bootstrap';
// var customData = require('http://boltonalex.com/weather/cron/Data/Weather.json');
import LineGraph from './Components/LineGraph';
import WeatherGraph from './Components/WeatherGraph';
import loader from './IMG/loader.svg';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({date: '', whichGraph: ''})
    }
    componentDidMount() {
        let _this = this;
        let TempWeatherArray = []
        let TempDateArray = []
        let selection = 10; //only take 10 from json document
        // axios.get('http://crossorigin.me/http://www.boltonalex.com/weather/cron/Data/Weather.json').then(function(response) {
        axios.get('./Data/Weather.json').then(function(response) {
            let customData = response.data;
            let newCustomData = customData.temperatures.slice(customData.temperatures.length - selection, customData.temperatures.length);
            for (let i = 0; i < 10; i++) {
                TempWeatherArray.push(Math.round(newCustomData[i].value));
                TempDateArray.push(newCustomData[i].time);
                if (i === 9) {
                    _this.setState({date: TempDateArray});
                    _this.setState({weather: TempWeatherArray});
                }
            }
        }).catch(function(error) {
            if (error) {
                console.log('oh dear... ' + error);
            }
        });
    }

    changeWhichGraph() {
        if (this.state.whichGraph) {
            this.setState({whichGraph: false});
        } else {
            this.setState({whichGraph: true});
        }
    }

    render() {

        let makeLineGraph = <img alt="loader" src={loader}/>
        if (this.state.weather) {
            if (this.state.whichGraph) {
                makeLineGraph = <WeatherGraph data={this.state}/>;
            } else {
                makeLineGraph = <LineGraph data={this.state}/>;
            }
        }
        return (
            <div className="App">
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                  Temperature at 12:00 (midday) in London, UK
                </Navbar.Brand>
                </Navbar.Header>
              </Navbar>
                <Grid>
                    <Row>
                        <Col lg={12} md={12}>
                            <Button onClick={this.changeWhichGraph.bind(this)}>Swap Graph Type</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} md={12}>
                            {makeLineGraph}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} md={12}>
                            <p>This project is on my&nbsp;
                                <a href="https://github.com/boltonalex/weather" target="_blank">
                                    gitHub
                                </a>
                                &nbsp;if you're interested...</p>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default App;
