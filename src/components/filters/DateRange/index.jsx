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
    };
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
          onChange={(e) => { this.props.onDrag(e); }}
          onAfterChange={(e) => { this.props.onAfterDrag(e); }}
          defaultValue={[0, this.state.lastIndex]}
        />
      </div>
    );
  }
}

DateRange.propTypes = {
  label: PropTypes.string,
  onDrag: PropTypes.func.isRequired,
  onAfterDrag: PropTypes.func.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string),
};

DateRange.defaultProps = {
  label: '',
  dates: [],
};

export default DateRange;
