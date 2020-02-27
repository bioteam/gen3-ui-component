import React from 'react';
import { mount } from 'enzyme';
import FilterSection from '.';

describe('FilterSection', () => {
  const singleSelectOptions = [
    { text: 'test1', filterType: 'singleSelect' },
    { text: 'test2', filterType: 'singleSelect' },
    { text: 'test3', filterType: 'singleSelect' },
    { text: 'test4', filterType: 'singleSelect' },
  ];

  const mixedOptions = [
    { text: 'test1', filterType: 'singleSelect' },
    {
      text: 'test2',
      filterType: 'range',
      min: 0,
      max: 100,
    },
    {
      text: 'test3',
      filterType: 'range',
      min: 0,
      max: 100,
    },
    { text: 'test4', filterType: 'singleSelect' },
  ];

  const onDrag = jest.fn();
  const onSelect = jest.fn();
  const component = mount(
    <FilterSection
      title='Section Title'
      options={singleSelectOptions}
      onSelect={onSelect}
      onAfterDrag={onDrag}
      hideZero={false}
    />,
  );

  it('renders', () => {
    expect(component.find(FilterSection).length).toBe(1);
  });

  it('picks the right kind of filter to display', () => {
    expect(component.find('.g3-single-select-filter').length).toBe(singleSelectOptions.length);
    expect(component.find('.g3-range-filter').length).toBe(0);
    const mixedFilterComponent = mount(
      <FilterSection
        title='Section Title'
        options={mixedOptions}
        onSelect={onSelect}
        onAfterDrag={onDrag}
        hideZero={false}
      />,
    );
    expect(mixedFilterComponent.find('.g3-single-select-filter').length).toBe(2);
    expect(mixedFilterComponent.find('.g3-range-filter').length).toBe(2);
  });
});
