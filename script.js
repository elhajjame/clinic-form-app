const fullNameEL = document.querySelector('.fullName');
const phoneNumberEL = document.querySelector('.phone-number');
const emailEL = document.querySelector('.email');
const motifEL = document.querySelector('.motif');
const visitDateEL = document.querySelector('.date');

const submitBtn = document.querySelector('.submit-btn');

const formCon = document.querySelector('.form-contianer');

const checkInputs = function (e) {
    e.preventDefault();
    const fullName = fullNameEL.value.trim();
    const phoneNumber = phoneNumberEL.value.trim();
    const email = emailEL.value.trim();
    const motif = motifEL.value.trim();
    const visitDate = visitDateEL.value.trim();

    //====================== checking the input and displaying error message ======================
    let emptyField = false;
    if (!fullName) {
        fullNameEL.style.borderColor = 'red';
        emptyField = true;
    }

    if (!phoneNumber) {
        phoneNumberEL.style.borderColor = 'red';
        emptyField = true;
    }

    if (!email) {
        emailEL.style.borderColor = 'red';
        emptyField = true;
    }

    if (!motif) {
        motifEL.style.borderColor = 'red';
        emptyField = true;
    }

    if (!visitDate) {
        visitDateEL.style.borderColor = 'red';
        emptyField = true;
    }

    if (emptyField) {
        errorMessage('Please fill all the fields');
        return;
    }

    let saveData = JSON.parse(localStorage.getItem('saveData')) || [];

    // ------------- pushing data into localStorage----------------
    saveData.push({
        name: fullName,
        phone: phoneNumber,
        email: email,
        motif: motif,
        visitDate: visitDate
    });

    localStorage.setItem('saveData', JSON.stringify(saveData));
    errorMessage('appointment has been registered');

    renderAppointment();
    formCon.reset();
}

formCon.addEventListener('submit', checkInputs);

function renderAppointment() {
    const tbody = document.querySelector('.tbody-con');
    let saveData = JSON.parse(localStorage.getItem('saveData')) || [];

    tbody.innerHTML = "";

    if (saveData.length === 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="6"> No appointment at the moment</td>
        </tr>
        `
    } else {
        saveData.forEach((element, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <tr>
              <td>${element.name}</td>
              <td>${element.phone}</td>
              <td>${element.email}</td>
              <td>${element.motif}</td>
              <td>${element.visitDate}</td>
        
              <th>
                <span 
                    class="material-symbols-outlined delete-btn"
                    onClick="deleteItem(${index})"
                    >
                    delete
                    </span>
              </th>
            `
            tbody.appendChild(tr);
        });
    }
}
function deleteItem(index) {
    let saveData = JSON.parse(localStorage.getItem('saveData')) || [];
    saveData.splice(index, 1);
    localStorage.setItem('saveData', JSON.stringify(saveData));
    renderAppointment()
}
renderAppointment();

function errorMessage(message) {
    const errorMessageEL = document.querySelector('.error-message');
    errorMessageEL.innerHTML = '';
    errorMessageEL.textContent = message;
    errorMessageEL.classList.add('show');
    setTimeout(() => { errorMessageEL.classList.remove('show') }, 3000);
};
