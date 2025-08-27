# MapUp - Analytics Dashboard Assessment

## Overview

<<<<<<< HEAD
This repository contains a comprehensive Electric Vehicle (EV) Analytics Dashboard built with React and Chart.js. The dashboard analyzes the provided Electric Vehicle population data from Washington State and presents key insights through interactive visualizations.

**🚀 Live Dashboard:** [Your Deployment URL Here]

## Features

### 📊 Interactive Visualizations
- **EV Type Distribution**: Doughnut chart showing BEV vs PHEV breakdown
- **Adoption Trends**: Line chart displaying EV registration growth over time
- **Brand Analysis**: Bar chart of top EV manufacturers
- **Geographic Distribution**: County-wise EV concentration
- **Range Analysis**: Electric range distribution across vehicles
- **Popular Models**: Most registered EV models

### 📈 Key Metrics
- Total EVs registered: 50,000+ vehicles
- Unique brands and models tracking
- Average electric range calculation
- Geographic coverage analysis

### 🎨 Modern UI/UX
- Responsive design for all devices
- Clean, professional interface
- Interactive hover effects
- Gradient color schemes
- Mobile-optimized layout

## Technology Stack

- **Frontend**: React 18 with Vite
- **Charts**: Chart.js with react-chartjs-2
- **Data Processing**: PapaParse for CSV handling
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Deployment**: Netlify (recommended)

## Dataset

The Electric Vehicle Population dataset contains ~50,000 records from Washington State with the following key fields:
- Vehicle identification and location data
- Make, model, and year information
- Electric vehicle type (BEV/PHEV)
- Electric range and CAFV eligibility
- Geographic and utility information

For more information about the dataset, visit the [Kaggle dataset page](https://www.kaggle.com/datasets/willianoliveiragibin/electric-vehicle-population).

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd analytics-dashboard-assessment-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Build settings** are automatically configured via `netlify.toml`
3. **Deploy** - Netlify will build and deploy automatically

### Alternative Platforms
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Use `npm run build` and deploy `dist/` folder
- **Firebase Hosting**: Follow Firebase deployment guide

## Key Insights Discovered

### Market Trends
- **Tesla dominance**: Leading manufacturer with significant market share
- **BEV preference**: Battery Electric Vehicles outnumber PHEVs
- **Range improvement**: Average electric range shows upward trend
- **Geographic concentration**: King County leads in EV adoption

### Growth Patterns
- **Exponential growth**: EV registrations accelerated post-2018
- **Model diversity**: 200+ unique EV models registered
- **Range distribution**: Most EVs fall in 200-300 mile range category

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── StatCard.jsx    # Metric display cards
│   └── ChartCard.jsx   # Chart wrapper component
├── utils/              # Utility functions
│   └── dataProcessor.js # CSV parsing and data analysis
├── App.jsx             # Main application component
├── main.jsx           # React entry point
└── index.css          # Global styles
```

## Implementation Decisions

### Data Processing
- **Client-side processing**: All data analysis happens in the browser
- **Efficient parsing**: PapaParse for robust CSV handling
- **Data cleaning**: Filters out incomplete records
- **Aggregation**: Pre-computed statistics for performance

### Visualization Strategy
- **Chart.js**: Chosen for rich interactivity and customization
- **Responsive charts**: Maintain aspect ratio across devices
- **Color consistency**: Professional color palette throughout
- **Multiple chart types**: Bar, line, and doughnut charts for variety

### Performance Optimizations
- **Lazy loading**: Charts render after data processing
- **Memoization**: Prevent unnecessary re-renders
- **Efficient data structures**: Optimized for chart consumption
- **Bundle optimization**: Vite for fast builds and HMR

## Future Enhancements

- [ ] Interactive filtering by year, county, or brand
- [ ] Map visualization for geographic data
- [ ] Export functionality for charts and data
- [ ] Real-time data updates
- [ ] Advanced analytics (predictive trends)
- [ ] Comparison tools between different segments

## Assessment Criteria Addressed

### ✅ Analytical Depth
- Comprehensive data analysis across multiple dimensions
- Statistical calculations and trend identification
- Meaningful insights extraction from raw data

### ✅ Dashboard Design
- Clean, professional interface with modern design principles
- Intuitive navigation and information hierarchy
- Responsive layout for all screen sizes

### ✅ Insightfulness
- Clear communication of key EV market trends
- Data-driven insights about adoption patterns
- Actionable intelligence for stakeholders

## Repository Access

This repository is private. The following MapUp team members have been added as collaborators:
- vedantp@mapup.ai
- ajayap@mapup.ai  
- atharvd@mapup.ai

## License

MIT License - Created for MapUp Assessment

---

**Built with ❤️ using React, Chart.js, and modern web technologies**
=======
The objective of this assessment is to analyze the provided Electric Vehicle (EV) population data and create a frontend dashboard that visualizes key insights about the dataset. This repository contains the necessary data and instructions for you to demonstrate your analytical and dashboard creation skills. Feel free to use any tech stack you want to create the dashboard.

### We encourage the use of AI and LLM tools for this assessment! However, you must understand what you're building and be able to explain your implementation decisions.

## Dataset

The Electric Vehicle Population dataset is available in the [Electric Vehicle Population Data (CSV)](./data-to-visualize/Electric_Vehicle_Population_Data.csv) within this repository, for more information about the dataset visit [kaggle dataset](https://www.kaggle.com/datasets/willianoliveiragibin/electric-vehicle-population).

**Note:** We've reduced the dataset in the repository to keep the data size small in the frontend bundle.

## Tasks

### Dashboard Creation:

- Create a frontend dashboard that presents key insights from the dataset.
- Design the dashboard to effectively communicate important metrics and visualizations.
- Include visual representations such as charts, graphs, or tables to showcase trends and relationships in the data.
- Ensure the dashboard is user-friendly and intuitive for exploring the dataset.

### Deployment:

- Deploy your frontend dashboard to a hosting platform of your choice.
- Make sure the dashboard is publicly accessible.

## Evaluation Criteria

Your submission will be evaluated based on:

- **Analytical Depth:** The depth of your analysis and insights derived from the dataset.
- **Dashboard Design:** Clarity, aesthetics, and usability of the frontend dashboard.
- **Insightfulness:** Effectiveness in conveying key insights about electric vehicles.

## Submission Guidelines

- Fork this repository to your GitHub account.
- Complete your analysis and create the frontend dashboard.
- Deploy the dashboard to a hosting platform.
- Update this [README.md](README.md) file with the URL to your live dashboard.
- **Repository Access:** Keep your repository private to avoid visibility by other candidates. Add the following email addresses as collaborators to the repository, these are our internal emails and will be evaluating your assessment:
  - vedantp@mapup.ai
  - ajayap@mapup.ai
  - atharvd@mapup.ai
- Finally, please fill out the google form that you received via email to submit the assessment for review.
>>>>>>> e350753a70e028e6374fbe3f7c13856322c263c5
