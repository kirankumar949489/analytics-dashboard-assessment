import Papa from 'papaparse';

export const loadCSVData = async (csvPath) => {
  try {
    const response = await fetch(csvPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });
    
    if (result.errors.length > 0) {
      console.warn('CSV parsing warnings:', result.errors);
    }
    
    return result.data;
  } catch (error) {
    console.error('Error loading CSV data:', error);
    throw error;
  }
};

export const processEVData = (rawData) => {
  const cleanData = rawData.filter(row => 
    row['Model Year'] && 
    row['Make'] && 
    row['Electric Vehicle Type']
  );

  return {
    totalVehicles: cleanData.length,
    
    // EV Type Distribution
    evTypeDistribution: getDistribution(cleanData, 'Electric Vehicle Type'),
    
    // Brand Distribution (Top 10)
    brandDistribution: getTopN(getDistribution(cleanData, 'Make'), 10),
    
    // Model Year Trends
    yearlyTrends: getYearlyTrends(cleanData),
    
    // County Distribution (Top 10)
    countyDistribution: getTopN(getDistribution(cleanData, 'County'), 10),
    
    // Electric Range Analysis
    rangeAnalysis: getRangeAnalysis(cleanData),
    
    // CAFV Eligibility
    cafvEligibility: getDistribution(cleanData, 'Clean Alternative Fuel Vehicle (CAFV) Eligibility'),
    
    // Top Models
    topModels: getTopModels(cleanData, 15),
    
    // Electric Utility Distribution
    utilityDistribution: getTopN(getUtilityDistribution(cleanData), 8),
    
    // Summary Stats
    stats: {
      totalVehicles: cleanData.length,
      uniqueBrands: new Set(cleanData.map(row => row['Make'])).size,
      uniqueModels: new Set(cleanData.map(row => row['Model'])).size,
      avgElectricRange: getAverageRange(cleanData),
      newestYear: Math.max(...cleanData.map(row => parseInt(row['Model Year']) || 0)),
      oldestYear: Math.min(...cleanData.map(row => parseInt(row['Model Year']) || 9999))
    }
  };
};

const getDistribution = (data, field) => {
  const counts = {};
  data.forEach(row => {
    const value = row[field] || 'Unknown';
    counts[value] = (counts[value] || 0) + 1;
  });
  
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
};

const getTopN = (distribution, n) => {
  return distribution.slice(0, n);
};

const getYearlyTrends = (data) => {
  const yearCounts = {};
  data.forEach(row => {
    const year = parseInt(row['Model Year']);
    if (year && year >= 2010 && year <= 2024) {
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });
  
  return Object.entries(yearCounts)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year);
};

const getRangeAnalysis = (data) => {
  const ranges = data
    .map(row => parseInt(row['Electric Range']) || 0)
    .filter(range => range > 0);
  
  if (ranges.length === 0) return { distribution: [], average: 0 };
  
  const rangeBuckets = {
    '0-50': 0,
    '51-100': 0,
    '101-150': 0,
    '151-200': 0,
    '201-250': 0,
    '251-300': 0,
    '300+': 0
  };
  
  ranges.forEach(range => {
    if (range <= 50) rangeBuckets['0-50']++;
    else if (range <= 100) rangeBuckets['51-100']++;
    else if (range <= 150) rangeBuckets['101-150']++;
    else if (range <= 200) rangeBuckets['151-200']++;
    else if (range <= 250) rangeBuckets['201-250']++;
    else if (range <= 300) rangeBuckets['251-300']++;
    else rangeBuckets['300+']++;
  });
  
  const distribution = Object.entries(rangeBuckets)
    .map(([range, count]) => ({ range, count }));
  
  const average = Math.round(ranges.reduce((sum, range) => sum + range, 0) / ranges.length);
  
  return { distribution, average };
};

const getTopModels = (data, n) => {
  const modelCounts = {};
  data.forEach(row => {
    const make = row['Make'] || 'Unknown';
    const model = row['Model'] || 'Unknown';
    const key = `${make} ${model}`;
    modelCounts[key] = (modelCounts[key] || 0) + 1;
  });
  
  return Object.entries(modelCounts)
    .map(([model, count]) => ({ model, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
};

const getUtilityDistribution = (data) => {
  const utilityCounts = {};
  data.forEach(row => {
    const utility = row['Electric Utility'] || 'Unknown';
    // Handle multiple utilities separated by |
    const utilities = utility.split('|').map(u => u.trim());
    utilities.forEach(u => {
      if (u && u !== 'Unknown') {
        utilityCounts[u] = (utilityCounts[u] || 0) + 1;
      }
    });
  });
  
  return Object.entries(utilityCounts)
    .map(([utility, count]) => ({ utility, count }))
    .sort((a, b) => b.count - a.count);
};

const getAverageRange = (data) => {
  const ranges = data
    .map(row => parseInt(row['Electric Range']) || 0)
    .filter(range => range > 0);
  
  if (ranges.length === 0) return 0;
  return Math.round(ranges.reduce((sum, range) => sum + range, 0) / ranges.length);
};
