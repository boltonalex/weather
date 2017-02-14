import React, {Component} from 'react';
import TimeStamp from 'react-timestamp';
import {Grid, Row, Col} from 'react-bootstrap';
import './../CSS/Graph.css';

let weatherArray = [];

function newGraphLine(line, index) {
    let graphHeight = 45;
    let graphWidth = 50;
    let minData = weatherArray[0];
    let maxData = weatherArray[weatherArray.length - 1];
    let dataRange = (maxData - minData);
    let lowestPoint = minData;
    let graphUnit = (graphHeight / dataRange);
    // let lineHeight = Math.ceil(lineDifference * graphUnit) + lowestPoint + 'vh';
    let lineHeight = Math.ceil(((line - minData) * graphUnit ) + lowestPoint) + 'vh';
    let lineWidth = (graphWidth / weatherArray.length) - 2.5 + 'vw';
    let leftPos = index * 5 + 'vw';
    var LineStyle = {
        height: lineHeight,
        width: lineWidth,
        left: leftPos,
        marginLeft: 0.25 + 'vw'
    }

    return (
        <div className='line' style={LineStyle} key={index}>{line}&#8451;</div>
    )
}

function newGraphDate(date, index) {
    let arrayLength = weatherArray.length;
    let graphWidth = 50;
    let space = graphWidth / arrayLength;
    let leftPos = (space * index) + 0.5 + 'vw';
    var DateStyle = {
        left: leftPos
    };
    return (
        <div key={date} className='date' style={DateStyle}><TimeStamp time={date} format='full'/></div>
    )
}

function createArray(line, index) {
    weatherArray.push(line);
    function sortNumber(a, b) {
        return a - b;
    }
    weatherArray.sort(sortNumber);
}

class LineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = ({weather: props.data.weather, date: props.data.date});
        this.state.weather.map((line, index) => createArray(line, index));
    }

    render() {
        let NewGraph = '';
        let NewDate = '';
        if (this.state.weather) {
            NewGraph = this.state.weather.map((line, index) => newGraphLine(line, index));
            NewDate = this.state.date.map((date, index) => newGraphDate(date, index));
        } else {
            console.log('your forgot to send through the data');
        }
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={6} lg={6} lgOffset={6} xsOffset={6} mdOffset={6}>
                        <h1>The temperature in London for the past ten days.</h1>
                        <p className="small">
                            <a href="https://darksky.net/poweredby/" target="_blank">
                                Weather data kindly provided by DarkSky
                            </a>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6} lg={6} lgOffset={6} xsOffset={6} mdOffset={6}>
                        <div className='graph'>
                            {NewGraph}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6} lg={6} lgOffset={6} xsOffset={6} mdOffset={6} className="dateContainer">
                        <div className='graphDates'>
                            {NewDate}
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }

}
export default LineGraph;
