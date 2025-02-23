import React from 'react';
import { storiesOf } from '@storybook/react';
import SummaryHorizontalBarChart from '../src/components/charts/SummaryHorizontalBarChart';
import SummaryPieChart from '../src/components/charts/SummaryPieChart';
import SummaryChartGroup from '../src/components/charts/SummaryChartGroup';
import PercentageStackedBarChart from '../src/components/charts/PercentageStackedBarChart';

const virusData = [
  { name: 'H1N1', value: 4000 },
  { name: 'VN1203', value: 3000 },
  { name: 'HIV', value: 2800 },
  { name: 'HuCoV_EMC', value: 2000 },
  { name: 'SARS_CoV', value: 2708 },
  { name: 'CA04', value: 1890 },
];

const pangoData = [
  { Collection_Date: '2020-05-15', Latest_Pango_Lineage: 'null', value: 1 },
  { Collection_Date: '2020-12-24', Latest_Pango_Lineage: 'null', value: 1 },
  { Collection_Date: '2021-07-21', Latest_Pango_Lineage: 'AY.25', value: 1 },
  { Collection_Date: '2021-08-27', Latest_Pango_Lineage: 'AY.25', value: 1 },
  { Collection_Date: '2021-08-27', Latest_Pango_Lineage: 'AY.44', value: 1 },
  { Collection_Date: '2021-09-20', Latest_Pango_Lineage: 'AY.5', value: 1 },
  { Collection_Date: '2021-11-30', Latest_Pango_Lineage: 'null', value: 1 },
  { Collection_Date: '2021-11-30', Latest_Pango_Lineage: 'AY.39.1', value: 1 },
  { Collection_Date: '2021-10-24', Latest_Pango_Lineage: 'AY.39', value: 1 },
  { Collection_Date: '2021-11-21', Latest_Pango_Lineage: 'AY.47', value: 1 },
  { Collection_Date: '2021-12-23', Latest_Pango_Lineage: 'BA.1', value: 1 },
  { Collection_Date: '2020-04-03', Latest_Pango_Lineage: 'B.1', value: 1 },
  { Collection_Date: '2020-11-10', Latest_Pango_Lineage: 'B.1.1.464', value: 1 },
  { Collection_Date: '2021-09-15', Latest_Pango_Lineage: 'AY.103', value: 1 },
  { Collection_Date: '2021-11-24', Latest_Pango_Lineage: 'null', value: 1 },
  { Collection_Date: '2021-12-12', Latest_Pango_Lineage: 'AY.25.1', value: 1 },
  { Collection_Date: '2021-12-27', Latest_Pango_Lineage: 'BA.1', value: 1 },
  { Collection_Date: '2022-01-12', Latest_Pango_Lineage: 'BA.1.1', value: 1 },
  { Collection_Date: '2022-01-13', Latest_Pango_Lineage: 'BA.1.1', value: 1 },
  { Collection_Date: '2021-05-10', Latest_Pango_Lineage: 'B.1.1.7', value: 1 },
];

const genderData = [
  { name: 'female', value: 400 },
  { name: 'male', value: 300 },
];

const birthData = [
  { name: '10-20', value: 400 },
  { name: '20-30', value: 300 },
  { name: '30-40', value: 300 },
];

const raceData = [
  { name: 'race1', value: 400 },
  { name: 'race2', value: 300 },
  { name: 'race3', value: 300 },
];

const speciesData = [
  { name: 'spicies1', value: 400 },
  { name: 'spicies2', value: 300 },
  { name: 'spicies3', value: 300 },
];

const bigSet = [];
const NUM_OPTIONS = 2000;
for (let i = 0; i < NUM_OPTIONS; i += 1) {
  bigSet.push({
    name: `item-${i}`,
    value: Math.random(),
  });
}

const summaries = [
  { type: 'bar', title: 'Gender', data: genderData },
  { type: 'pie', title: 'Birth-Year', data: birthData },
  { type: 'pie', title: 'Empty Pie', data: [] },
  { type: 'bar', title: 'Empty Bar', data: [] },
  { type: 'fullPie', title: 'Empty FullPie', data: [] },
  { type: 'fullPie', title: 'Species', data: speciesData },
  { type: 'bar', title: 'Race', data: raceData },
  { type: 'bar', title: 'Virus', data: virusData },
  { type: 'bar', title: 'Big Set', data: bigSet },
];

const lockedVirus = [
  { name: 'H1N1', value: -1 },
  { name: 'VN1203', value: 3000 },
  { name: 'HIV', value: 2800 },
  { name: 'HuCoV_EMC', value: 2000 },
  { name: 'SARS_CoV', value: 2708 },
  { name: 'CA04', value: 1890 },
];

const lockedBirth = [
  { name: '10-20', value: -1 },
  { name: '20-30', value: 300 },
  { name: '30-40', value: 300 },
];

const lockedSummaries = [
  { type: 'bar', title: 'Gender', data: genderData },
  { type: 'pie', title: 'Birth-Year', data: lockedBirth },
  { type: 'pie', title: 'Species', data: speciesData },
  { type: 'bar', title: 'Race', data: raceData },
  { type: 'bar', title: 'Virus', data: lockedVirus },
];

const summariesWithOneEmpty = [
  {
    type: 'bar', title: 'Gender', data: [],
  },
  { type: 'pie', title: 'Birth-Year', data: lockedBirth },
  { type: 'pie', title: 'Species', data: speciesData },
  { type: 'bar', title: 'Race', data: raceData },
  { type: 'bar', title: 'Virus', data: virusData },
];

const customizedColorMap = [
  '#c02f42',
  '#175676',
  '#59CD90',
  '#F2DC5D',
  '#40476D',
  '#FFA630',
  '#AE8799',
  '#1A535C',
  '#462255',
];

storiesOf('Chart', module)
  .add('SummaryHorizontalBarChart', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' showPercentage={false} />
  ))
  .add('SummaryHorizontalBarChart with single color and percentage', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' color='#3283c8' />
  ))
  .add('SummaryHorizontalBarChart with customized colors', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' showPercentage={false} useCustomizedColorMap customizedColorMap={customizedColorMap} />
  ))
  .add('SummaryPieChart', () => (
    <SummaryPieChart data={virusData} title='pie chart title' showPercentage />
  ))
  .add('SummaryPieChart with customized colors', () => (
    <SummaryPieChart data={virusData} title='pie chart title' showPercentage useCustomizedColorMap customizedColorMap={customizedColorMap} />
  ))
  .add('SummaryFullPieChart', () => (
    <SummaryPieChart data={virusData} title='pie chart title' innerRadius={0} showPercentage />
  ))
  .add('SummaryChartGroup', () => (
    <SummaryChartGroup summaries={summaries} width={1010} />
  ))
  .add('SummaryChartGroup with only showing 2 at first', () => (
    <SummaryChartGroup summaries={summaries} width={1010} maximumDisplayItem={2} />
  ))
  .add('SummaryChartGroup with a Locked Chart', () => (
    <SummaryChartGroup summaries={lockedSummaries} width={1010} lockValue={-1} lockMessage='This chart is locked!' />
  ))
  .add('SummaryChartGroup with an Empty Chart', () => (
    <SummaryChartGroup summaries={summariesWithOneEmpty} width={1010} chartEmptyMessage='This chart is empty!' />
  ))
  .add('PercentageStackedBarChart', () => (
    <PercentageStackedBarChart data={virusData} title='percentage stacked bar chart title' />
  ))
  .add('PercentageStackedBarChart with Dates', () => (
    <PercentageStackedBarChart
      data={pangoData}
      primaryKey='Latest_Pango_Lineage'
      secondaryKey='Collection_Date'
      title='percentage stacked bar chart date'
    />
  ))
  .add('PercentageStackedBarChart with customized colors', () => (
    <PercentageStackedBarChart
      data={virusData}
      title='percentage stacked bar chart title'
      useCustomizedColorMap
      customizedColorMap={customizedColorMap}
    />
  ))
  .add('PercentageStackedBarChart Locked', () => (
    <PercentageStackedBarChart data={lockedVirus} title='percentage stacked bar chart title' />
  ));
