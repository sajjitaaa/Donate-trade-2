/*eslint-disable*/

export const showAlert = (type, message) => {
  hideAlert();
  console.log('here');
  const markup = `<div class = "alert alert--${type}">This much food could feed ${message} people!</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  window.setTimeout(hideAlert, 3000);
};
