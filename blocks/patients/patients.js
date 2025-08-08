/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CUSTOMER_LOGIN_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/account.js';

const existingPatientsList = [
  {
    name: 'John Doe',
    age: 30,
    lastVisit: '2023-10-01',
  },
  {
    name: 'Jane Smith',
    age: 25,
    lastVisit: '2023-09-15',
  },
];

const existingPatientRenderer = (patient) => {
  if (patient) {
    return `<li class="patient-item">
      <span class="patient-name">${patient.name}</span>
      <span class="patient-age">${patient.age} years old</span>
      <span class="patient-last-visit">Last visit: ${patient.lastVisit}</span>
    </li>`;
  }
  return '';
};

const existingPatientListRenderer = (patientArray) => {
  if (patientArray.length) {
    const patientListHtml = `<ul class="patients-list">${patientArray.map((patient) => existingPatientRenderer(patient)).join('')}</ul>`;
    return patientListHtml;
  }
  return '';
};

const addPatientRenderer = `<form class="add-patient-form">
  <div class="field">
    <label for="patient-name">Name:</label>
    <input type="text" id="patient-name" name="patient-name" required />
  </div>
  <div class="field">
    <label for="patient-age">Age:</label>
    <input type="number" id="patient-age" name="patient-age" required />
  </div>
  <div class="button-set">
    <button class="btn" type="submit">Add Patient</button>
  </div>
</form>`;

const bindAddPatientButton = () => {
  const addButton = document.querySelector('.add-patient-button');
  const addForm = document.querySelector('.add-patient-form');

  if (addButton && addForm) {
    addButton.addEventListener('click', () => {
      addForm.style.display = 'block';
      addButton.style.display = 'none';
    });
  }
};

const blockContent = `<div class="patients-container">
  ${existingPatientListRenderer(existingPatientsList)}
  <button class="add-patient-button btn">Add Patient</button>
  <div class="add-patient-form" style="display: none;">
    ${addPatientRenderer}
  </div>
</div>`;

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = CUSTOMER_LOGIN_PATH;
  } else {
    /* eslint-disable-next-line no-console */
    console.log('render', blockContent);
    block.innerHTML = blockContent;
    bindAddPatientButton();
  }
  return block;
}
