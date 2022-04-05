import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './DateRange.css';

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    const lastIndex = this.props.dates.length - 1;
    const marksToShow = { 0: this.props.dates[0] };
    marksToShow[lastIndex] = this.props.dates[lastIndex];
    this.state = {
      marks: marksToShow,
      lastIndex,
      lowerBound: 0,
      upperBound: lastIndex,
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
          defaultValue={[0, this.state.lastIndex]}
        />
      </div>
    );
  }
}

DateRange.propTypes = {
  label: PropTypes.string,
  onAfterDrag: PropTypes.func.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string),
};

DateRange.defaultProps = {
  label: '',
  dates: [],
};

export default DateRange;
