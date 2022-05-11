const percentageFormatter = (showPercentage) => (v) => (showPercentage ? `${v}%` : v);

const addPercentage = (v) => (percentageFormatter(true)(v));

const calculateChartData = (data, percentageFixedPoint) => {
  const sum = data.reduce((a, entry) => a + entry.value, 0);
  const max = data.reduce((a, entry) => Math.max(a, entry.value), -Infinity);
  return data.map((entry) => {
    let percentage;
    percentage = (entry.value * 100) / sum;
    percentage = Number(Number(percentage).toFixed(percentageFixedPoint));
    const widthPercentage = (entry.value * 100) / max;
    return { percentage, widthPercentage, ...entry };
  });
};

const getUniquePercentageLabels = (chartData, primaryKey) => {
  const keys = chartData.map((item) => item[primaryKey]);
  const uniqueKeys = new Set(keys);
  return [...uniqueKeys].sort();
};

const getPercentageData = (chartData, percentageFixedPoint, primaryKey) => {
  const result = {};
  const sum = chartData.reduce((a, entry) => a + entry.value, 0);
  let percentRemaining = 100;
  chartData.forEach((entry, index, array) => {
    let percentage;
    if (index < array.length - 1) {
      percentage = (entry.value * 100) / sum;
    } else {
      percentage = percentRemaining;
    }
    percentage = Number(Number.parseFloat(percentage).toFixed(percentageFixedPoint));
    percentRemaining -= percentage;
    const entryValue = result[entry[primaryKey]];
    if (entryValue == null) {
      result[entry[primaryKey]] = percentage;
    } else {
      result[entry[primaryKey]] = entryValue + percentage;
    }
  });
  return result;
};

const dateHasher = (
  chartData,
  primaryKey,
  secondaryKey,
) => {
  const dateHash = {};
  chartData.forEach((dataPoint) => {
    const variantHash = dateHash[dataPoint[secondaryKey]];
    const storedData = {};
    storedData[primaryKey] = dataPoint[primaryKey];
    storedData.value = dataPoint.value;
    if (variantHash == null) {
      dateHash[dataPoint[secondaryKey]] = [storedData];
    } else {
      dateHash[dataPoint[secondaryKey]] = [...variantHash, storedData];
    }
  });
  return dateHash;
};

const percentageMapper = (
  hashedDates,
  percentageFixedPoint,
  primaryKey,
  secondaryKey,
) => {
  const percentageMap = [];
  Object.keys(hashedDates).forEach((k) => {
    const pcts = getPercentageData(hashedDates[k], percentageFixedPoint, primaryKey);
    const hashKey = {};
    hashKey[secondaryKey] = k;
    percentageMap.push({ ...hashKey, ...pcts });
  });
  return percentageMap;
};

const mapData = (
  chartData,
  percentageFixedPoint,
  primaryKey,
  secondaryKey,
) => {
  if (secondaryKey === '') {
    const dat = getPercentageData(chartData, percentageFixedPoint, primaryKey);
    return [dat];
  }
  const dataSortedByDates = dateHasher(chartData, primaryKey, secondaryKey);
  const mappedData = percentageMapper(
    dataSortedByDates,
    percentageFixedPoint,
    primaryKey,
    secondaryKey,
  );
  return mappedData;
};

const categoricalColors = [
  '#3283c8',
  '#7ec500',
  '#ad91ff',
  '#f4b940',
  '#e74c3c',
  '#05b8ee',
  '#ff7abc',
  '#ef8523',
  '#26d9b1',
];
const getCategoryColor = (index) => (categoricalColors[index % categoricalColors.length]);

const getCategoryColorFrom2Colors = (index) => {
  const colors = [
    '#3283c8',
    '#e7e7e7',
  ];
  return colors[index % colors.length];
};

const getDataKey = (showPercentage) => (showPercentage ? 'percentage' : 'value');

const prettifyValueName = (name) => {
  if (name === '__missing__') {
    return 'No Data';
  }
  return name;
};

const transformArrangerDataToChart = (field, sqonValues) => {
  const chartData = [];
  field.buckets
    .filter((bucket) => (sqonValues === null || sqonValues.includes(bucket.key)))
    .forEach((bucket) => chartData.push({
      name: prettifyValueName(bucket.key),
      value: bucket.doc_count,
    }),
    );
  return chartData;
};

const transformArrangerDataToSummary = (field, chartType, title, sqonValues) => ({
  type: chartType,
  title,
  data: transformArrangerDataToChart(field, sqonValues),
});

const transformDataToCount = (field, label, sqonValues) => ({
  label,
  value: sqonValues ? Math.min(field.buckets.length, sqonValues.length) : field.buckets.length,
});

/**
 * Return an array of selected values in a given field
 * If no value selected, return null
 */
const getSQONValues = (sqon, field) => {
  if (!sqon || !sqon.content) return null;
  const sqonItems = sqon.content.filter((item) => item.content.field === field);
  if (!sqonItems || sqonItems.length !== 1) return null;
  const sqonValues = sqonItems[0].content.value;
  return sqonValues;
};

const getCharts = (data, dataExplorerConfig, sqon) => {
  const countItems = [];
  const summaries = [];
  const stackedBarCharts = [];
  const { arrangerConfig } = dataExplorerConfig;

  if (data && data[arrangerConfig.graphqlField].aggregations) {
    const fields = data[arrangerConfig.graphqlField].aggregations;
    Object.keys(fields).forEach((field) => {
      const fieldConfig = dataExplorerConfig.charts[field];
      const sqonValues = getSQONValues(sqon, field);
      if (fieldConfig) {
        switch (fieldConfig.chartType) {
          case 'count':
            countItems.push(transformDataToCount(fields[field], fieldConfig.title, sqonValues));
            break;
          case 'pie':
          case 'bar':
            summaries.push(
              transformArrangerDataToSummary(
                fields[field],
                fieldConfig.chartType,
                fieldConfig.title,
                sqonValues),
            );
            break;
          case 'stackedBar':
            stackedBarCharts.push(
              transformArrangerDataToSummary(
                fields[field],
                fieldConfig.chartType,
                fieldConfig.title,
                sqonValues),
            );
            break;
          default:
            break;
        }
      }
    });
  }
  return { summaries, countItems, stackedBarCharts };
};

const parseParamWidth = (width) => ((typeof width === 'number') ? `${width}px` : width);

const shouldHideChart = (data, lockValue) => data.find((item) => item.value === lockValue);

const helper = {
  percentageFormatter,
  addPercentage,
  calculateChartData,
  getPercentageData,
  getCategoryColor,
  getCategoryColorFrom2Colors,
  getDataKey,
  transformDataToCount,
  transformArrangerDataToChart,
  transformArrangerDataToSummary,
  getCharts,
  getSQONValues,
  parseParamWidth,
  categoricalColors,
  shouldHideChart,
  getUniquePercentageLabels,
  mapData,
};

export default helper;
