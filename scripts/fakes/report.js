const fs = require('fs');

const values = [
  {
    group: 'social',
    labels: [
      'accommodation',
      'activities',
      'finances',
      'socialising',
      'marginalisation',
      'safeguarding',
    ],
  },
  {
    group: 'behaviour',
    labels: [
      'diet',
      'exercise',
      'weight',
      'substance use',
      'sexual health',
      'risky behaviours',
    ],
  },
  {
    group: 'genetic',
    labels: [
      'assessment',
      'review',
      'planning',
      'crisis/hospital',
      'medication',
      'specialist services',
    ],
  },
  {
    group: 'communication',
    labels: [
      'body/pain awareness',
      'communicating needs',
      'carers awareness',
      'carers reponse',
      'understand & choice',
    ],
  },
  {
    group: 'service quality',
    labels: [
      'organisation',
      'consent',
      'transiations',
      'screening & promotion',
      'primary & secondary care',
      'non health services',
    ],
  },
];

const data = values.map((value) => {
  const labels = value.labels.map((label) => {
    return {
      label,
      value: Math.floor(Math.random() * 5),
    };
  });

  return {
    ...value,
    total: Math.floor(
      labels.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0) / labels.length
    ),
    labels,
  };
});

const totals = [];

data.forEach((item, i) => {
  const output = `value: '${JSON.stringify(item)}'`;

  totals.push({ label: item.group, value: item.total });

  fs.writeFileSync(`../../site/_data/report_${i}.yml`, output);
});

fs.writeFileSync(
  `../../site/_data/totals.yml`,
  `value: '${JSON.stringify(totals)}'`
);
