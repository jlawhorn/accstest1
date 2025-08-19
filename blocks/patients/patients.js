/* eslint-disable import/no-unresolved */
import {
  Button, Input, provider as UI,
} from '@dropins/tools/components.js';

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

const addPatientRenderer = `<form class="add-patient-form" method="POST">
  <div class="field-set">
    <div class="field field-firstname mb-4"></div>
    <div class="field field-lastname mb-4"></div>
    <div class="field field-age mb-4"></div>
    <div class="button-set buttonset-add-patient"></div>
  </div>
</form>`;

const blockContent = `<div class="patients-container">
  ${existingPatientListRenderer(existingPatientsList)}
  <button class="add-patient-button btn">Add New Patient</button>
  <div class="add-patient-form hidden my-4">
    ${addPatientRenderer}
  </div>
  <div class="add-patient__message message hidden"></div>
</div>`;

const bindAddPatientButton = () => {
  const addButton = document.querySelector('.add-patient-button');
  const addForm = document.querySelector('.add-patient-form');

  if (addButton && addForm) {
    addButton.addEventListener('click', () => {
      addForm.classList.toggle('hidden');
      if (!addForm.classList.contains('hidden')) {
        const addFormMessage = document.querySelector('.add-patient__message');
        if (addFormMessage) {
          addFormMessage.classList.add('hidden');
          addFormMessage.innerHTML = '';
        }
      }
    });
  }
};

const bindAddPatientSubmitForm = () => {
  const addForm = document.querySelector('.add-patient-form');
  const addFormMessage = document.querySelector('.add-patient__message');
  if (addForm) {
    addForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const firstName = addForm.querySelector('input[name="firstName"]');
      const lastName = addForm.querySelector('input[name="lastName"]');
      const age = addForm.querySelector('input[name="age"]');

      if (addFormMessage) {
        addFormMessage.classList.remove('success', 'error', 'hidden');
      }

      if (firstName && lastName && age) {
        addForm.classList.add('hidden');
        document.querySelector('.add-patient-button').classList.remove('hidden');
        firstName.value = '';
        lastName.value = '';
        age.value = '';
        if (addFormMessage) {
          const message = `<p class="m-0">Patient ${firstName.value} ${lastName.value} added successfully!</p>`;
          addFormMessage.classList.add('success');
          addFormMessage.innerHTML = message;
        }
      } else {
        const message = '<p class="m-0">Something terrible happened</p>';
        addFormMessage.classList.add('error');
        addFormMessage.innerHTML = message;
      }
    });
  }
};

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = CUSTOMER_LOGIN_PATH;
  } else {
    /* eslint-disable-next-line no-console */
    block.innerHTML = blockContent;
    const elFirstNameField = document.querySelector('.field-firstname');
    const elLastNameField = document.querySelector('.field-lastname');
    const elAgeNameField = document.querySelector('.field-age');
    const elAddPatientSubmit = document.querySelector('.buttonset-add-patient');

    UI.render(
      Input,
      {
        type: 'text',
        name: 'firstName',
        placeholder: 'First Name',
        floatingLabel: 'First Name',
        required: true,
        value: '',
      },
    )(elFirstNameField);

    UI.render(
      Input,
      {
        type: 'text',
        name: 'lastName',
        placeholder: 'Last Name',
        floatingLabel: 'Last Name',
        required: true,
        value: '',
      },
    )(elLastNameField);

    UI.render(
      Input,
      {
        type: 'number',
        name: 'age',
        placeholder: 'Age',
        floatingLabel: 'Age',
        required: true,
        value: '',
      },
    )(elAgeNameField);

    UI.render(
      Button,
      {
        variant: 'primary',
        className: 'testies',
        children: 'Add Message',
        type: 'submit',
        enabled: true,
        size: 'medium',
        disabled: false,
      },
    )(elAddPatientSubmit);

    bindAddPatientButton();
    bindAddPatientSubmitForm();
  }
  return block;
}
