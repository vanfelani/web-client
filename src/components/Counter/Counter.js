import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Counter.css";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.intervalId = null;
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.state = {
      value: this.props.min
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.increment(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  increment() {
    let value = this.state.value + 1;
    this.setState({ value: value <= this.props.max ? value : this.props.min });
  }

  decrement() {
    let value = this.state.value - 1;
    this.setState({ value: value >= this.props.min ? value : this.props.max });
  }

  render() {
    return (
      <div className="hello">
        <button onClick={this.decrement}>-</button>
        <span>{this.state.value}</span>
        <button onClick={this.increment}>+</button>
        {this.state.value == this.props.min && <span> This is min value</span>}
      </div>
    );
  }
}

Counter.defaultProps = {
  min: 0,
  max: 60
};

Counter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};

export default Counter;
