var newContactForm = document.getElementById('newContact');

var postalCodeInput = document.getElementById('postalcode');
var postalCodeError = document.getElementById('postalcodeerror');

var phoneNumberInput = document.getElementById('phonenumber');
var phoneNumberError = document.getElementById('phonenumbererror');

var informationContainer = document.getElementById('contactInformation');

var addContactButton = document.getElementById('addContact');
var searchButton = document.getElementById('searchButton');

var contactList = document.getElementById('contactList');
var removeContactButton = document.getElementById('removeContact');
var goHomeButton = document.getElementById('goHome');

if (addContactButton) {
  addContactButton.addEventListener('click', function () {
    addContact();
  });
}

if (newContactForm) {
  postalCodeInput.addEventListener('change', function () {
    let postalCodeRegExp = new RegExp('^[A-Za-z][0-9][A-Za-z][ ][0-9][A-Za-z][0-9]$');
    if (!postalCodeRegExp.test(this.value)) {
      postalCodeError.style.display = 'block';
    } else {
      postalCodeError.style.display = 'none';
    }
  });

  phoneNumberInput.addEventListener('change', function () {
    let phoneNumberRegExp = new RegExp('^([0-9]{3}[-]|[(][0-9]{3}[)])?[0-9]{3}[-][0-9]{4}$');
    if (!phoneNumberRegExp.test(this.value)) {
      phoneNumberError.style.display = 'block';
    } else {
      phoneNumberError.style.display = 'none';
    }
  });

  newContactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let Error =
      (postalCodeError.style.display === 'block') |
      (phoneNumberError.style.display === 'block');
    if (Error) {
      return;
    }

    let firstName = this.firstname.value,
      lastName = this.lastname.value,
      itemName = (firstName + lastName).toLowerCase(),
      Address = this.address.value,
      City = this.city.value,
      Province = this.province.value,
      postalCode = this.postalcode.value,
      phoneNumber = this.phonenumber.value,
      Email = this.email.value,
      Notes = this.notes.value

    let contactInfo = {
      firstName: firstName,
      lastName: lastName,
      Address: Address,
      City: City,
      Province: Province,
      postalCode: postalCode,
      Phone: phoneNumber,
      Email: Email,
      Notes: Notes
    }

    if (typeof (Storage) === 'undefined') {
      alert("Sorry, Your browser doesn't support local storage!");
      return;
    }
    localStorage.setItem(itemName, JSON.stringify(contactInfo));

    let linkUrl = new URL(window.location.origin);
    linkUrl.pathname = 'information.html';
    linkUrl.searchParams.set('contact', itemName);

    let linkText =
      `Name: ${firstName} ${lastName} <br>
     Address: ${Address}, ${City}, ${Province}, ${postalCode} <br>
     Phone Number: ${phoneNumber} <br>
     Email: ${Email} <br>
     Notes: ${Notes}`;

    let hyperLink = `<a href="${linkUrl}">${linkText}</a>`;
    newContactForm.innerHTML = hyperLink;
  });
}

if (informationContainer) {
  let urlString = window.location.href;
  let Url = new URL(urlString);
  let contactId = Url.searchParams.get('contact');

  if (contactId) {
    let Contact = JSON.parse(localStorage.getItem(contactId));
    if (!Contact) {
      alert('Contact not found!');
      goHome();
    }
    let fullName = `${Contact.firstName} ${Contact.lastName}`;
    let Address = `${Contact.Address}, ${Contact.City}, ${Contact.Province}, ${Contact.postalCode}`;

    let contactFullName = document.getElementById('fullName');
    contactFullName.innerHTML = fullName;

    let contactAddress = document.getElementById('Address');
    contactAddress.innerHTML = Address;

    let contactPhone = document.getElementById('phoneNumber');
    contactPhone.innerHTML = Contact.Phone;

    let contactEmail = document.getElementById('Email');
    contactEmail.innerHTML = Contact.Email;

    let contactNotes = document.getElementById('Notes');
    contactNotes.innerHTML = Contact.Notes;
  }
}

if (searchButton) {
  searchButton.addEventListener('click', function () {
    showContacts();
  });
}

if (contactList) {
  // let Contact = JSON.parse(localStorage.getItem(contactId));
  let Contacts = Object.keys(localStorage);
  let i = Contacts.length;
  while (i--) {
    let tempData = JSON.parse(localStorage.getItem(Contacts[i]));
    let tempContact = `<span class="contact">
      <p>Name: <i>${tempData.firstName} ${tempData.lastName}</i></p>
      <p>Address: <i>${tempData.Address}, ${tempData.City}, ${tempData.Province}, ${tempData.postalCode}</i></p>
      <p>Phone: <i>${tempData.Phone}</i></p>
      <p>Email: <i>${tempData.Email}</i></p>
      <p>Notes: <i>${tempData.Notes}</i></p>
      </span>`;

    contactList.innerHTML += tempContact;
  }

}

if (removeContactButton) {
  removeContactButton.addEventListener('click', function () {
    let urlString = window.location.href;
    let Url = new URL(urlString);
    let contactId = Url.searchParams.get('contact');
    window.localStorage.removeItem(contactId);
    goHome();
  });
}

if (goHomeButton) {
  goHomeButton.addEventListener('click', function () {
    goHome();
  });
}

function addContact() {
  contactList.style.display = 'none';
  newContactForm.style.display = 'block';
  addContactButton.classList.add('active');
  searchButton.classList.remove('active');
}

function showContacts() {
  contactList.style.display = 'block';
  newContactForm.style.display = 'none';
  addContactButton.classList.remove('active');
  searchButton.classList.add('active');
}

function goHome() {
  let Url = new URL(window.location.origin);
  window.location.replace(Url);
}