import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {Grid, Row, Col} from 'react-bootstrap';
import moment from 'moment';

class WeatherGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: this.props.data.weather,
            dateUnix: this.props.data.date,
            dateNorm: []
        }
    }
    componentDidMount() {
        let tempArr = [];
        for (let i = 0; i < this.state.dateUnix.length; i++) {
            var newDate = moment(this.state.dateUnix[i] * 1000).format('DD/MM/YYYY');
            tempArr.push(newDate);
        }
        this.setState({dateNorm: tempArr})
    }
    render() {
        const data = {
            labels: this.state.dateNorm,
            datasets: [
                {
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 20,
                    data: this.state.weather
                }
            ]
        }
        const options = {
            title: {
                display: false
            },
            animation: {
                duration: 0
            },
            legend: {
                display: false
            },
            layout: {
                padding: 50
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }

        }
        return (
            <Grid>
                <Row>
                    <Col xs={10} md={10} lg={10} xsOffset={1} lgOffset={1}>
                        <p>This graph is created using&nbsp;
                            <a href="http://www.chartjs.org/" target="_blank">Graph.Js</a>
                            <br/>
                            to display the data collected daily at noon from&nbsp;
                            <a href="https://darksky.net/poweredby/" target="_blank">DarkSky</a>.</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} md={10} lg={10} xsOffset={1} lgOffset={1}>
                        <Line data={data} options={options}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default WeatherGraph;
