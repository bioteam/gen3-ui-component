import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './DateRange.css';

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: { ...this.props.dates },
    };
  }

  render() {
    return (
      <div className='g3-date-filter'>
        { this.props.label
          && <p className='g3-date-filter__title'>{this.props.label}</p>}
        <Range
          min={0}
          max={this.props.dates.length - 1}
          marks={this.state.marks}
          step={1}
          onChange={(e) => { this.props.onDrag(e); }}
          onAfterChange={(e) => { this.props.onAfterDrag(e); }}
          defaultValue={[0, this.props.dates.length - 1]}
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
