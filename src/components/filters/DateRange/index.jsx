import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './DateRange.css';

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    const lastIndex = this.props.dates.length - 1;
    const marksToShow = {};
    marksToShow[this.props.lowerBound] = this.props.dates[this.props.lowerBound];
    marksToShow[this.props.upperBound] = this.props.dates[this.props.upperBound];
    this.state = {
      marks: marksToShow,
      lastIndex,
      lowerBound: this.props.lowerBound,
      upperBound: this.props.upperBound,
    };
  }

  onAfterChange() {
    this.props.onAfterDrag(this.state.lowerBound, this.state.upperBound);
  }

  onChange(range) {
    this.setState((prevState) => {
      const lowerBound = prevState.lowerBound !== range[0] ? range[0] : prevState.lowerBound;
      const upperBound = prevState.upperBound !== range[1] ? range[1] : prevState.upperBound;
      const marksToShow = {};
      marksToShow[lowerBound] = this.props.dates[lowerBound];
      marksToShow[upperBound] = this.props.dates[upperBound];
      return {
        ...prevState,
        marks: marksToShow,
        lowerBound,
        upperBound,
      };
    });
  }

  render() {
    return (
      <div className='g3-date-filter'>
        { this.props.label
          && <p className='g3-date-filter__title'>{this.props.label}</p>}
        <Range
          min={0}
          max={this.state.lastIndex}
          marks={this.state.marks}
          step={1}
          onChange={(range) => { this.onChange(range); }}
          onAfterChange={(range) => { this.onAfterChange(range); }}
          defaultValue={[this.state.lowerBound, this.state.upperBound]}
        />
      </div>
    );
  }
}

DateRange.propTypes = {
  label: PropTypes.string,
  onAfterDrag: PropTypes.func.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string),
  lowerBound: PropTypes.number.isRequired,
  upperBound: PropTypes.number.isRequired,
};

DateRange.defaultProps = {
  label: '',
  dates: [],
};

export default DateRange;
