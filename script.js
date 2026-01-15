const fullNameEL = document.querySelector('.fullName');
const phoneNumberEL = document.querySelector('.phone-number');
const emailEL = document.querySelector('.email');
const motifEL = document.querySelector('.motif');
const visitDateEL = document.querySelector('.date');

const submitBtn = document.querySelector('.submit-btn');

const formCon = document.querySelector('.form-contianer');

formCon.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = fullNameEL.value.trim();
    const phoneNumber = phoneNumberEL.value.trim();
    const email = emailEL.value.trim();
    const motif = motifEL.value.trim();
    const visitDate = visitDateEL.value.trim();

 

    let saveData = JSON.parse(localStorage.getItem('saveData')) || [];

// ------------- here checking the inputs before pushing to localStorage----------------
    if(fullName && phoneNumber && email && motif && visitDate ){
        saveData.push({
            name: fullName,
            phone: phoneNumber,
            email: email,
            motif: motif,
            visitDate: visitDate
        });
    };

    localStorage.setItem('saveData', JSON.stringify(saveData));

    //====================== checking the input =================
      if (!fullName) return errorMessage('you should add the full name');
      if (!phoneNumber) return errorMessage('you should add the phone number');
      if (!email) return errorMessage('you should add the email');
      if (!motif) return errorMessage('you should add the motif');
      if (!visitDate) return errorMessage('you should add visit date');
    renderAppointment();

    formCon.reset();

});

function renderAppointment() {
    const tbody = document.querySelector('.tbody-con');
    let saveData = JSON.parse(localStorage.getItem('saveData')) || [];

    tbody.innerHTML = "";

    if (saveData.length === 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="6" id="test">No appointment at the moment</td>
        </tr>
        `
    } else {
        saveData.forEach(element => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <tr>
              <td>${element.name}</td>
              <td>${element.phone}</td>
              <td>${element.email}</td>
              <td>${element.motif}</td>
              <td>${element.visitDate}</td>
        
              <th>
                <span class="material-symbols-outlined delete-btn">
                  delete
                </span>
              </th>
            `
            tbody.appendChild(tr);
        });
    }


}

renderAppointment();

function errorMessage(message) {
    const errorMessageEL = document.querySelector('.error-message');
    errorMessageEL.innerHTML = '';
    errorMessageEL.textContent = message;
    errorMessageEL.classList.add('show');
    setTimeout(()=>{errorMessageEL.classList.remove('show')},3000);
}

