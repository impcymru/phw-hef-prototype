const fs = require('fs');
const { faker } = require('@faker-js/faker');
const moment = require('moment');

const total = 100;

const output = {
  headers: [
    { label: 'ID', key: 'patient_id' },
    { label: 'Name', key: 'patient_name', width: '200px' },
    { label: 'Birthdate', key: 'birthdate' },
    { label: 'Last Score', key: 'latest_score' },
    { label: 'Practitioner', key: 'practitioner' },
    { label: 'Last Assessment', key: 'last_assessment_date' },
  ],
  rows: [],
};

const makePatient = () => {
  const output = {
    patient_id: `P101`,
    patient_name: `Elin Roberts`,
    birthdate: '21/Mar/2005',
    latest_score: faker.random.numeric(2),
    practitioner: 'Gwen',
    last_assessment_date: moment(
      faker.date.between('2022-01-01T00:00:00.000Z', '2023-03-01T00:00:00.000Z')
    ).format('DD/MMM/YYYY'),
  };

  return output;
};

for (let i = 0; i < total; i++) {
  output.rows.push(makePatient());
}

const writeVal = `patients: '${JSON.stringify(output).replaceAll("'", '’')}'`;

fs.writeFileSync('../../site/_data/patient.yml', writeVal);
