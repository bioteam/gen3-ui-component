import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SingleSelectFilter from '../src/components/filters/SingleSelectFilter';
import RangeFilter from '../src/components/filters/RangeFilter';
import DateRange from '../src/components/filters/DateRange';
import FilterSection from '../src/components/filters/FilterSection';
import FilterList from '../src/components/filters/FilterList';
import FilterGroup from '../src/components/filters/FilterGroup';

const projectOptions = [
  { text: 'big-number', filterType: 'singleSelect', count: 123456789 },
  { text: 'ndh-CHARLIE', filterType: 'singleSelect', count: 123 },
  { text: 'ndh-dait-microbiome', filterType: 'singleSelect', count: 123 },
  { text: 'ndh-dmid-LMV', filterType: 'singleSelect', count: 123 },
  { text: 'ndh-vir-simulation', filterType: 'singleSelect', count: 123 },
  { text: 'ndh-test', filterType: 'singleSelect', count: 123 },
];

const dateOptions = [
  { filterType: 'dateRange', dates: ['2021-01-01', '2021-02-01', '2021-03-01', '2021-04-01', '2021-05-01', '2021-06-01', '2021-07-01', '2021-08-01', '2021-09-01', '2021-10-01', '2021-11-01', '2021-12-01'] },
];

const studyOptions = [
  { text: 'MACS', filterType: 'singleSelect', count: 123 },
  { text: 'WIHS', filterType: 'singleSelect', count: 123 },
];

const genderOptions = [
  { text: 'Male', filterType: 'singleSelect', count: 123 },
  { text: 'Female', filterType: 'singleSelect', count: 123 },
];

const raceOptions = [
  { text: 'White', filterType: 'singleSelect', count: 123 },
  { text: 'Black', filterType: 'singleSelect', count: 123 },
  {
    text: 'American Indian or Alaskan Nativ',
    filterType: 'singleSelect',
    count: 123,
  },
  { text: 'Asian/Pacific Islander', filterType: 'singleSelect', count: 123 },
  { text: 'Multiracial', filterType: 'singleSelect', count: 123 },
  { text: 'Other', filterType: 'singleSelect', count: 123 },
];

const guidOptions = [];
const NUM_GUID_OPTIONS = 5000;
for (let i = 0; i < NUM_GUID_OPTIONS; i += 1) {
  guidOptions.push({
    text: `guid-${i}`,
    filterType: 'singleSelect',
    count: i,
    accessible: true,
  });
}

const ethnicityOptions = [
  {
    text: 'Hispanic or Latino', filterType: 'singleSelect', count: 123, accessible: true,
  },
  {
    text: 'Not Hispanic or Latino', filterType: 'singleSelect', count: 123, accessible: false,
  },
  {
    text: 'Unknown', filterType: 'singleSelect', count: 123, accessible: true,
  },
  {
    text: 'Not Specified', filterType: 'singleSelect', count: -1, accessible: true,
  },
  {
    text: 'Test Value', filterType: 'singleSelect', count: -1, accessible: false,
  },
];

const consentCodeOptions = [
  {
    text: 'ABC', filterType: 'singleSelect', count: 15, accessible: true,
  },
  {
    text: '123', filterType: 'singleSelect', count: 7, accessible: false,
  },
  {
    text: 'HAL', filterType: 'singleSelect', count: 2, accessible: true,
  },
  {
    text: 'IRS', filterType: 'singleSelect', count: 1, accessible: true,
  },
  {
    text: 'SOS', filterType: 'singleSelect', count: -1, accessible: false,
  },
];

const ageOptions = [
  { min: 2, max: 97, filterType: 'range' },
];

const fileTypeOptions = [
  { text: 'mRNA Array', filterType: 'singleSelect', count: 123 },
  { text: 'Unaligned Reads', filterType: 'singleSelect', count: 123 },
  { text: 'Lipidomic MS', filterType: 'singleSelect', count: 123 },
  { text: 'Proteomic MS', filterType: 'singleSelect', count: 123 },
  { text: 'Metabolomic MS', filterType: 'singleSelect', count: 123 },
];

const fileCountOptions = [
  { min: 2, max: 97, filterType: 'range' },
];

const projectSections = [
  { title: 'Project', options: projectOptions },
  { title: 'Study', options: studyOptions },
  { title: 'Collection Date', options: dateOptions },
];

const subjectSections = [
  { title: 'Empty', options: [] },
  { title: 'Gender', options: genderOptions },
  { title: 'Race', options: raceOptions },
  { title: 'Ethnicity', options: ethnicityOptions },
  { title: 'Age', options: ageOptions },
  { title: 'Date', options: dateOptions },
  { title: 'Big List', options: guidOptions },
];

const fileSections = [
  { title: 'File Types', options: fileTypeOptions },
  { title: 'File Counts', options: fileCountOptions },
];

const projectSectionsWithTooltips = [
  { title: 'Project', options: projectOptions, tooltip: 'Project name' },
  { title: 'Study', options: studyOptions, tooltip: 'Study name' },
];

const subjectSectionsWithTooltips = [
  { title: 'Gender', options: genderOptions, tooltip: 'Gender of subject' },
  { title: 'Race', options: raceOptions, tooltip: 'Race of subject' },
  { title: 'Ethnicity', options: ethnicityOptions, tooltip: 'Ethnicity of subject' },
  { title: 'Age', options: ageOptions, tooltip: 'Age at visit' },
];

const fileSectionsWithTooltips = [
  { title: 'File Types', options: fileTypeOptions, tooltip: 'File type of the data' },
  { title: 'File Counts', options: fileCountOptions, tooltip: 'File counts of the subjects' },
];

const tabs = [
  <FilterList key={0} sections={projectSections} tierAccessLimit={1000} />,
  <FilterList key={1} sections={subjectSections} tierAccessLimit={1000} />,
  <FilterList key={2} sections={fileSections} tierAccessLimit={1000} />,
];

const tabsWithTooltips = [
  <FilterList key={0} sections={projectSectionsWithTooltips} tierAccessLimit={1000} />,
  <FilterList key={1} sections={subjectSectionsWithTooltips} tierAccessLimit={1000} />,
  <FilterList key={2} sections={fileSectionsWithTooltips} tierAccessLimit={1000} />,
];

const filterConfig = {
  tabs: [{
    title: 'Project',
    fields: [
      'project',
      'study',
      'dates',
    ],
  },
  {
    title: 'Subject',
    fields: [
      'race',
      'ethnicity',
      'gender',
      'age',
    ],
  },
  {
    title: 'File',
    fields: [
      'file_type',
      'file_count',
    ],
  }],
};

storiesOf('Filters', module)
  .add('SingleSelectFilter', () => (
    <div>
      <SingleSelectFilter label='Male' onSelect={action('checked')} count={1} accessible />
      <SingleSelectFilter label='Female' onSelect={action('checked')} count={2} accessible />
      <SingleSelectFilter label='Option3' onSelect={action('checked')} count={-1} accessible tierAccessLimit={1000} />
      <SingleSelectFilter label='Option4' onSelect={action('checked')} count={4} accessible={false} />
      <SingleSelectFilter label='Option5' onSelect={action('checked')} count={-1} accessible={false} tierAccessLimit={1000} />
      <SingleSelectFilter label='Option6' onSelect={action('checked')} count={123456789} accessible />
      <SingleSelectFilter label='Option7' onSelect={action('checked')} count={-1} accessible tierAccessLimit={123456789} />
      <SingleSelectFilter label='Option8' onSelect={action('checked')} count={123456789} accessible={false} />
    </div>
  ))
  .add('DateRange', () => (
    <div>
      <DateRange
        dates={['04-03-1993', '03-02-1999', '03-03-2000', '03-02-2022']}
        onDrag={() => {}}
        onAfterDrag={() => {}}
      />
    </div>
  ))
  .add('RangeFilter', () => (
    <div>
      <RangeFilter
        label='Ranger slider from 0-100 with step 1'
        onAfterDrag={action('range change')}
        min={0}
        max={100}
      />
      <RangeFilter
        label='Range slider from 0.00000000001 to 99.9999999999, with default fixed precision(2), and rangeStep=0.1'
        onAfterDrag={action('range change')}
        min={0.00000000001}
        max={99.9999999999}
        rangeStep={0.1}
      />
      <RangeFilter
        label='Range slider Big Numbers'
        onAfterDrag={action('range change')}
        min={0}
        max={2000000}
        rangeStep={10}
      />
    </div>
  ))
  .add('FilterSection', () => (
    <FilterSection
      title={'Ethnicity'}
      options={ethnicityOptions}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
      tierAccessLimit={1000}
    />
  ))
  .add('FilterSection With Date Range Filter', () => (
    <FilterSection
      title={'Date Range Selector'}
      options={dateOptions}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
      tierAccessLimit={1000}
    />
  ))
  .add('FilterSection for array-type field', () => (
    <FilterSection
      title={'Consent Codes'}
      options={consentCodeOptions}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
      onCombineOptionToggle={action('combine mode change')}
      tierAccessLimit={1000}
      isArrayField
    />
  ))
  .add('SearchFilter', () => (
    <FilterSection
      title={'File GUIDs'}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
      tierAccessLimit={1000}
      isSearchFilter
      onSearchFilterLoadOptions={(searchString, offset = 0) => {
        const pageSize = 20;
        if (!searchString) {
          return {
            options: guidOptions
              .slice(offset, offset + pageSize)
              .map((option) => ({ value: option.text, label: option.text })),
            hasMore: guidOptions.length > offset + pageSize,
          };
        }
        const filteredOptions = guidOptions.filter(
          (option) => option.text.indexOf(searchString) !== -1,
        );
        return {
          options: filteredOptions
            .slice(offset, offset + pageSize)
            .map((option) => ({ value: option.text, label: option.text })),
          hasMore: filteredOptions.length > offset + pageSize,
        };
      }}
    />
  ))
  .add('FilterList', () => (
    <FilterList
      sections={subjectSections}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
      tierAccessLimit={1000}
    />
  ))
  .add('FilterList Hide Empty', () => (
    <FilterList
      sections={subjectSections}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
      tierAccessLimit={1000}
      hideEmptyFilterSection
    />
  ))
  .add('FilterList with icon tooltips', () => (
    <FilterList
      sections={subjectSections}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
      tierAccessLimit={1000}
      lockedTooltipMessage='locked'
      disabledTooltipMessage='disabled'
    />
  ))
  .add('FilterGroup', () => (
    <FilterGroup
      tabs={tabs}
      filterConfig={filterConfig}
      onFilterChange={action('filter change')}
    />
  ))
  .add('FilterGroup with tooltips', () => (
    <FilterGroup
      tabs={tabsWithTooltips}
      filterConfig={filterConfig}
      onFilterChange={action('filter change')}
    />
  ));
