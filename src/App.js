import React, {Component} from 'react';
import axios from 'axios';
// var customData = require('http://boltonalex.com/weather/cron/Data/Weather.json');
import LineGraph from './Components/LineGraph';
import loader from './IMG/loader.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = ({date: ''})
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
    render() {
      let makeLineGraph = <img alt="loader" src={loader}/>
        if (this.state.weather) {
            makeLineGraph = <LineGraph data={this.state}/>;
        }
        return (
            <div className="App">
                {makeLineGraph}
            </div>
        );
    }
}
export default App;
