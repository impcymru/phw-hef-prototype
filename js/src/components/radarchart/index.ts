import { render, BindingProps } from 'dom-component-helper';

import Chart, { ChartConfiguration, ChartItem, Colors } from 'chart.js/auto';

const RadarChart = (props: BindingProps) => {
  const data = JSON.parse(props.data);

  const el = render(props.domElement, document.createElement('canvas'));

  const radarCTX = el.querySelector('canvas').getContext('2d');

  const hotGradient = radarCTX.createRadialGradient(
    300,
    100,
    0,
    200,
    100,
    216.23
  );
  hotGradient.addColorStop(0, 'rgba(37, 219, 72, 1)');
  hotGradient.addColorStop(0.4, 'rgba(255, 255, 0, 1)');
  hotGradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

  const init = {
    labels: data.map((item: any) => {
      return item.label;
    }),
    datasets: [
      {
        data: data.map((item: any) => item.value),
        fill: true,
        backgroundColor: hotGradient,
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const config: ChartConfiguration = {
    type: 'radar',
    data: init,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  };

  new Chart(radarCTX as ChartItem, config);
};

export default RadarChart;
