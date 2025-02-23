import React from 'react';
import PropTypes from 'prop-types';
import FilterSection from '../FilterSection';
import './FilterList.css';

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    let initialFilterStatus = props.sections
      .map(() => ({}));
    if (props.filterStatusFromParent && props.filterStatusFromParent.length > 0) {
      initialFilterStatus = props.filterStatusFromParent.map((x) => ({ ...x }));
    }
    this.state = {
      /**
       * Current selected status for filters,
       * filterStatus[sectionIndex] = { [field]: true/false/[upperBound,lowerBound]}
       */
      filterStatus: initialFilterStatus,
    };
    this.sectionRefs = props.sections.map(() => React.createRef());
  }

  handleSectionToggle(sectionIndex, newExpanded) {
    this.props.onToggle(sectionIndex, newExpanded);
  }

  handleSectionClear(sectionIndex) {
    this.setState((prevState) => {
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[sectionIndex] = {};
      return {
        filterStatus: newFilterStatus,
      };
    });
    this.props.onClear(sectionIndex);
  }

  handleSelectSingleFilter(
    sectionIndex,
    singleFilterLabel,
  ) {
    this.setState((prevState) => {
      const newFilterStatus = prevState.filterStatus.slice(0);
      const oldSelected = newFilterStatus[sectionIndex][singleFilterLabel];
      const newSelected = typeof oldSelected === 'undefined' ? true : !oldSelected;
      newFilterStatus[sectionIndex][singleFilterLabel] = newSelected;
      return {
        filterStatus: newFilterStatus,
      };
    });
    this.props.onSelect(sectionIndex, singleFilterLabel);
  }

  handleSelectCombineOptionToggle(
    sectionIndex,
    fieldName,
    value,
  ) {
    this.setState((prevState) => {
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[sectionIndex][fieldName] = value;
      return {
        filterStatus: newFilterStatus,
      };
    });
    this.props.onCombineOptionToggle(sectionIndex, fieldName, value);
  }

  handleDragRangeFilter(sectionIndex, lowerBound, upperBound, minValue, maxValue, rangeStep) {
    this.setState((prevState) => {
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[sectionIndex] = [lowerBound, upperBound];
      return {
        filterStatus: newFilterStatus,
      };
    });
    this.props.onAfterDrag(sectionIndex, lowerBound, upperBound, minValue, maxValue, rangeStep);
  }

  handleDateRangeDragFilter(sectionIndex, lowerBound, upperBound) {
    this.setState((prevState) => {
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[sectionIndex] = [lowerBound, upperBound];
      return {
        filterStatus: newFilterStatus,
      };
    });
    const selectedDates = [];
    this.props.sections[sectionIndex].options[0].dates.forEach((date, index) => {
      if (index >= lowerBound && index <= upperBound) {
        selectedDates.push((date));
      }
    });
    this.props.onAfterDateRangeDrag(sectionIndex, selectedDates, lowerBound, upperBound);
  }

  toggleFilters(openAll) {
    this.sectionRefs.forEach((ref) => {
      ref.current.toggleSection(openAll);
    });
  }

  render() {
    // Takes in parent component's filterStatus or self state's filterStatus
    const filtersInProps = this.props.filterStatusFromParent
      ? this.props.filterStatusFromParent.map((x) => Object.keys(x)).flat() : [];

    const filterStatus = filtersInProps.length > 0
      ? this.props.filterStatusFromParent : this.state.filterStatus;

    const filterSectionToShow = [];
    this.props.sections.forEach((section, index) => {
      if (this.props.hideEmptyFilterSection && section.options.length === 0) {
        return;
      }
      filterSectionToShow.push(
        <FilterSection
          key={index}
          index={index}
          ref={this.sectionRefs[index]}
          title={section.title}
          tooltip={section.tooltip}
          options={section.options}
          isSearchFilter={section.isSearchFilter}
          isArrayField={section.isArrayField}
          onSearchFilterLoadOptions={section.onSearchFilterLoadOptions}
          expanded={this.props.expandedStatus[index]}
          onToggle={(newExpanded) => this.handleSectionToggle(index, newExpanded)}
          onClear={() => this.handleSectionClear(index)}
          filterStatus={filterStatus[index]}
          onSelect={
            (singleFilterLabel) => this.handleSelectSingleFilter(
              index,
              singleFilterLabel,
            )
          }
          onCombineOptionToggle={
            (combineModeFieldName, combineModeValue) => this.handleSelectCombineOptionToggle(
              index,
              combineModeFieldName,
              combineModeValue,
            )
          }
          onAfterDrag={
            (...args) => this.handleDragRangeFilter(index, ...args)
          }
          onAfterDateRangeDrag={
            (...args) => this.handleDateRangeDragFilter(index, ...args)
          }
          hideZero={this.props.hideZero}
          tierAccessLimit={this.props.tierAccessLimit}
          lockedTooltipMessage={this.props.lockedTooltipMessage}
          disabledTooltipMessage={this.props.disabledTooltipMessage}
        />,
      );
    });
    // if no filters in tab add message
    if (filterSectionToShow.length === 0) {
      filterSectionToShow.push(
        <div key='g3-filter-list-empty' className='g3-filter-list-empty g3-filter-section'>
          <h4>
            Selected Data Does NOT Include
            <br />
            These Filters
          </h4>
        </div>,
      );
    }
    return (
      <div className='g3-filter-list'>
        {filterSectionToShow}
      </div>
    );
  }
}

FilterList.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    tooltip: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      filterType: PropTypes.oneOf(['singleSelect', 'range', 'dateRange']),

      // for single select filter
      count: PropTypes.number,
      hideZero: PropTypes.bool,
      accessible: PropTypes.bool,
      disabled: PropTypes.bool,

      // for range filter
      min: PropTypes.number,
      max: PropTypes.number,

      // for date range
      dates: PropTypes.arrayOf(PropTypes.string),
    })),
  })).isRequired,
  expandedStatus: PropTypes.arrayOf(PropTypes.bool),
  onToggle: PropTypes.func,
  onClear: PropTypes.func,
  filterStatusFromParent: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.number),
  ])),
  onSelect: PropTypes.func,
  onCombineOptionToggle: PropTypes.func,
  onAfterDrag: PropTypes.func,
  onAfterDateRangeDrag: PropTypes.func,
  hideZero: PropTypes.bool,
  hideEmptyFilterSection: PropTypes.bool,
  tierAccessLimit: PropTypes.number,
  lockedTooltipMessage: PropTypes.string,
  disabledTooltipMessage: PropTypes.string,
};

FilterList.defaultProps = {
  expandedStatus: [],
  onToggle: () => {},
  onClear: () => {},
  filterStatusFromParent: undefined,
  onSelect: () => {},
  onCombineOptionToggle: () => {},
  onAfterDrag: () => {},
  onAfterDateRangeDrag: () => {},
  hideZero: true,
  hideEmptyFilterSection: false,
  tierAccessLimit: undefined,
  lockedTooltipMessage: '',
  disabledTooltipMessage: '',
};

export default FilterList;
