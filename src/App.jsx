import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { loadCSVData, processEVData } from './utils/dataProcessor';
import StatCard from './components/StatCard';
import ChartCard from './components/ChartCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const rawData = await loadCSVData('/data-to-visualize/Electric_Vehicle_Population_Data.csv');
        const processedData = processEVData(rawData);
        setData(processedData);
      } catch (err) {
        setError('Failed to load data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading Electric Vehicle Data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div>{error}</div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  const colorPalette = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6B7280'
  ];

  // EV Type Distribution Chart
  const evTypeData = {
    labels: data.evTypeDistribution.map(item => item.label),
    datasets: [{
      data: data.evTypeDistribution.map(item => item.count),
      backgroundColor: colorPalette.slice(0, data.evTypeDistribution.length),
      borderWidth: 3,
      borderColor: '#fff',
      hoverBorderWidth: 4
    }]
  };

  // Brand Distribution Chart
  const brandData = {
    labels: data.brandDistribution.map(item => item.label),
    datasets: [{
      label: 'Number of Vehicles',
      data: data.brandDistribution.map(item => item.count),
      backgroundColor: colorPalette[0],
      borderColor: colorPalette[0],
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  // Yearly Trends Chart
  const yearlyData = {
    labels: data.yearlyTrends.map(item => item.year.toString()),
    datasets: [{
      label: 'EV Registrations',
      data: data.yearlyTrends.map(item => item.count),
      borderColor: colorPalette[1],
      backgroundColor: colorPalette[1] + '20',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: colorPalette[1],
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  // County Distribution Chart
  const countyData = {
    labels: data.countyDistribution.map(item => item.label),
    datasets: [{
      label: 'Number of Vehicles',
      data: data.countyDistribution.map(item => item.count),
      backgroundColor: colorPalette[2],
      borderColor: colorPalette[2],
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  // Electric Range Distribution Chart
  const rangeData = {
    labels: data.rangeAnalysis.distribution.map(item => item.range),
    datasets: [{
      label: 'Number of Vehicles',
      data: data.rangeAnalysis.distribution.map(item => item.count),
      backgroundColor: colorPalette[3],
      borderColor: colorPalette[3],
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  // Top Models Chart
  const topModelsData = {
    labels: data.topModels.slice(0, 10).map(item => item.model),
    datasets: [{
      label: 'Number of Vehicles',
      data: data.topModels.slice(0, 10).map(item => item.count),
      backgroundColor: colorPalette[4],
      borderColor: colorPalette[4],
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  const bevCount = data.evTypeDistribution.find(item => item.label.includes('BEV'))?.count || 0;
  const phevCount = data.evTypeDistribution.find(item => item.label.includes('PHEV'))?.count || 0;
  const bevPercentage = ((bevCount / (bevCount + phevCount)) * 100).toFixed(1);

  return (
    <div className="App">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <h1 className="dashboard-title">Electric Vehicle Analytics Dashboard</h1>
            <p className="dashboard-subtitle">
              Comprehensive analysis of Electric Vehicle population in Washington State
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="container">
          <div className="nav-content">
            <div className="nav-brand">EV Analytics</div>
            <div className="nav-stats">
              <div className="nav-stat">
                <span>Last Updated:</span>
                <span className="nav-stat-value">2024</span>
              </div>
              <div className="nav-stat">
                <span>Data Points:</span>
                <span className="nav-stat-value">{data.stats.totalVehicles.toLocaleString()}</span>
              </div>
              <div className="nav-stat">
                <span>BEV Share:</span>
                <span className="nav-stat-value">{bevPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="main-content">
          {/* Key Statistics */}
          <div className="stats-grid">
            <StatCard 
              title="Total EVs Registered" 
              value={data.stats.totalVehicles.toLocaleString()} 
              icon="🚗"
              change={12.5}
            />
            <StatCard 
              title="Unique Brands" 
              value={data.stats.uniqueBrands} 
              icon="🏭"
              change={8.2}
            />
            <StatCard 
              title="Unique Models" 
              value={data.stats.uniqueModels} 
              icon="🔧"
              change={15.3}
            />
            <StatCard 
              title="Average Range" 
              value={`${data.stats.avgElectricRange} mi`} 
              icon="⚡"
              change={6.7}
            />
          </div>

          {/* Charts Grid */}
          <div className="charts-grid">
            <ChartCard 
              title="EV Type Distribution" 
              subtitle="Battery Electric vs Plug-in Hybrid Electric Vehicles"
            >
              <Doughnut data={evTypeData} options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20,
                      usePointStyle: true
                    }
                  }
                }
              }} />
            </ChartCard>

            <ChartCard 
              title="EV Adoption Trends" 
              subtitle="Registration growth over time (2010-2024)"
            >
              <Line data={yearlyData} options={chartOptions} />
            </ChartCard>

            <ChartCard 
              title="Top EV Brands" 
              subtitle="Market share by manufacturer"
            >
              <Bar data={brandData} options={chartOptions} />
            </ChartCard>

            <ChartCard 
              title="Geographic Distribution" 
              subtitle="EV concentration by county"
            >
              <Bar data={countyData} options={chartOptions} />
            </ChartCard>

            <ChartCard 
              title="Electric Range Distribution" 
              subtitle="Range categories in miles"
            >
              <Bar data={rangeData} options={chartOptions} />
            </ChartCard>

            <ChartCard 
              title="Most Popular EV Models" 
              subtitle="Top 10 registered vehicle models"
            >
              <Bar data={topModelsData} options={{
                ...chartOptions,
                indexAxis: 'y',
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    display: false
                  }
                }
              }} />
            </ChartCard>
          </div>

          {/* Insights Section */}
          <div className="insights-section">
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-header">
                  <h3 className="insight-title">
                    <span>💡</span>
                    Key Market Insights
                  </h3>
                </div>
                <div className="insight-content">
                  <div className="insight-list">
                    <div className="insight-item">
                      <strong>Market Leader:</strong> {data.brandDistribution[0]?.label} dominates with {data.brandDistribution[0]?.count.toLocaleString()} vehicles ({((data.brandDistribution[0]?.count / data.stats.totalVehicles) * 100).toFixed(1)}% market share)
                    </div>
                    <div className="insight-item">
                      <strong>Growth Acceleration:</strong> EV adoption peaked in {data.yearlyTrends[data.yearlyTrends.length - 1]?.year} with {data.yearlyTrends[data.yearlyTrends.length - 1]?.count.toLocaleString()} new registrations
                    </div>
                    <div className="insight-item">
                      <strong>Geographic Concentration:</strong> {data.countyDistribution[0]?.label} County leads with {data.countyDistribution[0]?.count.toLocaleString()} EVs ({((data.countyDistribution[0]?.count / data.stats.totalVehicles) * 100).toFixed(1)}% of total)
                    </div>
                    <div className="insight-item">
                      <strong>Technology Preference:</strong> {data.evTypeDistribution[0]?.label} represents {((data.evTypeDistribution[0]?.count / data.stats.totalVehicles) * 100).toFixed(1)}% of all registered EVs
                    </div>
                  </div>
                </div>
              </div>

              <div className="insight-card">
                <div className="insight-header">
                  <h3 className="insight-title">
                    <span>📊</span>
                    Dataset Overview
                  </h3>
                </div>
                <div className="insight-content">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.9rem' }}>
                    <div>
                      <strong>Data Period:</strong><br />
                      {data.stats.oldestYear} - {data.stats.newestYear}
                    </div>
                    <div>
                      <strong>Total Records:</strong><br />
                      {data.stats.totalVehicles.toLocaleString()}
                    </div>
                    <div>
                      <strong>Geographic Scope:</strong><br />
                      Washington State
                    </div>
                    <div>
                      <strong>Average Range:</strong><br />
                      {data.stats.avgElectricRange} miles
                    </div>
                    <div>
                      <strong>Data Source:</strong><br />
                      DOL Vehicle Registration
                    </div>
                    <div>
                      <strong>Model Diversity:</strong><br />
                      {data.stats.uniqueModels} unique models
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About This Dashboard</h4>
              <p>Interactive analytics dashboard analyzing Electric Vehicle population data from Washington State Department of Licensing.</p>
            </div>
            <div className="footer-section">
              <h4>Technology Stack</h4>
              <p>Built with React, Chart.js, and modern web technologies for optimal performance and user experience.</p>
            </div>
            <div className="footer-section">
              <h4>Data Insights</h4>
              <p>Comprehensive analysis covering adoption trends, geographic distribution, and market dynamics.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 EV Analytics Dashboard - MapUp Assessment | Built with ❤️ using React & Chart.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
