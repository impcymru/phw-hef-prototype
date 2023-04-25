import { render, BindingProps } from '@sfdl/blep';

import Chart, { ChartConfiguration, ChartItem, Colors } from 'chart.js/auto';

const BarChart = (props: BindingProps) => {
  const data = JSON.parse(props.data);

  const datasets = [
    {
      label: '',
      data: data.labels.map((label: any) => label.value),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ];

  if (data.labels[0].compare) {
    datasets.push({
      label: '',
      data: data.labels.map((label: any) => label.compare),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    });
  }

  const init = {
    labels: data.labels.map((label: any) => label.label),
    datasets,
  };

  Chart.register(Colors);

  const config: ChartConfiguration = {
    type: 'bar',
    data: init,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const el = render(props.domElement, document.createElement('canvas'));

  new Chart(el.querySelector('canvas') as ChartItem, config);
};

export default BarChart;
