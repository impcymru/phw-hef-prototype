const fs = require('fs');
const { faker } = require('@faker-js/faker');
const moment = require('moment');

const total = 100;

const output = {
  headers: [
    { label: 'ID', key: 'patient_id' },
    {
      label: 'Name',
      key: 'patient_name',
      width: '200px',
      link: 'patient/create.html',
      linkVal: 'patient_id',
    },
    { label: 'Practitioner', key: 'practitioner' },
    {
      label: 'Edit Draft',
      key: 'edit_draft',
      link: 'patient/create.html',
      linkVal: 'patient_id',
    },
  ],
  rows: [],
};

const makePatient = () => {
  const output = {
    patient_id: `P${faker.random.numeric(3)}`,
    patient_name: `${faker.name.firstName()} ${
      faker.name.lastName().split(' ')[0]
    }`, //this split removes any randomly generated generation number "Thomas Mapother Cruise IV" etc
    practitioner: 'Gwen',
    edit_draft: 'Edit draft',
  };

  return output;
};

for (let i = 0; i < total; i++) {
  output.rows.push(makePatient());
}

const writeVal = `patients: '${JSON.stringify(output).replaceAll("'", '’')}'`;

fs.writeFileSync('../../site/_data/drafts.yml', writeVal);
