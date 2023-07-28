import '@babel/polyfill';
// import { mapbox } from './mapbox';
import { login, logout, singUp } from './login';
import { updateUserData } from './updattedSettings';
import { bookTour } from './stripe';

const map = document.getElementById('map');
const form = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');
// const bookBtn = document.getElementById('book-tour');
const signUpForm = document.querySelector('.form--singup');

if (map) {
  const locations = JSON.parse(map.dataset.locations);

  // mapbox(locations);
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // showAlert('error', 'ggg');
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (updateForm) {
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateUserData(form, 'data');
  });
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateUserData(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'Save password';
  });
}

// if (bookBtn) {
//   bookTour.addEventListener('click', (e) => {
//     e.target.textContent = 'PROCESING...';
//     const { tourId } = e.target.dataset;

//     bookTour(tourId);
//   });
// }

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    document.getElementById('name').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('password').disabled = true;
    document.getElementById('passwordConfirm').disabled = true;

    const btn = document.querySelector('.btn-singup');

    btn.disabled = true;
    btn.textContent = 'Loading...';

    singUp(name, email, password, passwordConfirm);
  });
}
