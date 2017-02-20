import React, {Component} from 'react';
import TimeStamp from 'react-timestamp';
import {Grid, Row, Col, Tooltip, OverlayTrigger} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../CSS/Graph.css';

let weatherArray = [];
let dateArray = [];

function newGraphLine(line, index) {
    const graphHeight = 60;
    const graphWidth = 50;
    let minData = weatherArray[0];
    let maxData = weatherArray[weatherArray.length - 1];
    let dataRange = (maxData - minData);
    let graphUnit = (graphHeight / dataRange);
    let minPoint = minData + 1;
    let lineHeight = Math.ceil(((line - minData) * graphUnit) + minPoint) + 'vh';
    let lineWidth = (graphWidth / weatherArray.length);
    let arrayLength = weatherArray.length;
    let space = graphWidth / arrayLength;
    let leftPosOff = lineWidth / 2;
    let leftPos = ((space * index) * 2) + leftPosOff;
    var LineStyle = {
        height: lineHeight,
        width: lineWidth + '%',
        left: leftPos + '%'
    }
    const tip = (
        <Tooltip id="tooltip">{line}&#8451;<br/><TimeStamp time={dateArray[index]} format='date'/>
        </Tooltip>
    );
    return (
        <div key={index}>
            <OverlayTrigger placement="top" overlay={tip} trigger={['hover', 'focus']}>
                <div className='line' style={LineStyle}></div>
            </OverlayTrigger>
        </div>
    )
}

function createArray(line, index) {
    if (weatherArray.length !== 10) {
        weatherArray.push(line);
        function sortNumber(a, b) {
            return a - b;
        }
        weatherArray.sort(sortNumber);
    }
}

function createDateArray(date, index) {
    dateArray.push(date);
}

class LineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = ({weather: props.data.weather, date: props.data.date});
        this.state.weather.map((line, index) => createArray(line, index));
        this.state.date.map((date, index) => createDateArray(date, index));
    }

    render() {
        let NewGraph = '';
        if (this.state.weather) {
            NewGraph = this.state.weather.map(function(line, index) {
                return (newGraphLine(line, index))
            });
        } else {
            console.log('your forgot to send through the data');
        }
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={6} lg={6} xsOffset={3} lgOffset={3}>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6} lg={6} xsOffset={3} lgOffset={3}>
                        <p>
                            This graph is created using custom logic<br/>to display the data collected daily at noon from&nbsp;
                            <a href="https://darksky.net/poweredby/" target="_blank">DarkSky</a>.
                        </p>
                    </Col>
                </Row>
                <Row>
                  <Col xs={10} md={10} lg={10} xsOffset={1} lgOffset={1}>
                    {/* <p>Temperature in London for the past ten days.</p> */}

                    <div className='graph'>
                      {NewGraph}
                    </div>
                  </Col>
                </Row>
            </Grid>
        )
    }
}
export default LineGraph;
