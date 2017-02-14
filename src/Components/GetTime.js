import React, {Component} from 'react';
// import Timestamp from 'react-timestamp';

class GetTime extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dateArray: [],
            now: Math.floor((Date.now()) / 1000)
        })
    }
    
    static defaultProps = {
        numberOfDays: 10,
        aDay: 86400
    }

    componentWillMount() {




        for (let i = 1; i <= this.props.numberOfDays; i++) {
            this.setState((state) => ({
                dateArray: state.dateArray.concat([this.state.now - (this.props.aDay * i)])
            }))
        }


    }

    render() {
        return (
            <div>
                <p>now: {this.state.now}</p>
                <p>number of days: {this.props.numberOfDays}</p>
                <p>aDay: {this.props.aDay}</p>
                <p>dateArray: {this.state.dateArray[29]}</p>
            </div>
        );
    }
}

export default GetTime;
