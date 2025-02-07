import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import './styles.css';

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const colorPalettes = {
  taskPie: ['#36A2EB','#FF6384'],
  projectPie: ['#36A2EB','#FF6384'],
  taskBar: ['#4BC0C0'],
  projectBar: ['#B5EAD7'],
};

function Chart({ type, title, data, chartKey }) {

  const chartColors = colorPalettes[chartKey]; 

  const formattedData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        backgroundColor: chartColors, 
        borderColor: chartColors.map((color) => `${color}AA`), 
        borderWidth: 1,
      },
    ],
  };

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return <Pie data={formattedData} />;
      case 'line':
        return <Line data={formattedData} />;
      case 'bar':
        return <Bar data={formattedData} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="chart-card-item">
      <h3>{title}</h3>
      {renderChart()}
    </div>
  );
}

export default Chart;
