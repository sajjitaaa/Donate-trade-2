/*eslint-disable*/
import '@babel/polyfill';
import axios from 'axios';
import showAlert from './alert';

const button = document.getElementById('button');
const send_alert = document.getElementById('send_alert');

if(button){
document.getElementById('button').addEventListener('click',(e) => {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('pass').value;
  var Repassword = document.getElementById('repass').value;
  
 
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  const success = async (pos) => {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    var Latitude = crd.latitude;
    var Longitude = crd.longitude;
    console.log(`More or less ${crd.accuracy} meters.`);

    try {
      const res = await axios.post('/api/v1/users/register', {
        name,
        email,
        password,
        Repassword,
        Latitude,
        Longitude
      });
  
      if(res.data.status === 'success'){
        window.location.replace('/');
      }
    } catch (error) {
      showAlert('error', error.response.data.message);
    }




  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);








  

});
}
if(send_alert){
  

 document.getElementById('send_alert').addEventListener('click', async(e) => {
   e.preventDefault();
  console.log('hello');
   const amount = document.getElementById('amount').value 
  const address = document.getElementById('address').value;
   const phone = document.getElementById('phone').value;
   const feed = Math.round(amount/2.5);
   console.log(feed);

   try {
    const res = await axios.post('/api/v1/users/email', {
      amount,
      address,
      phone
    });

    if(res.data.status === 'success'){
      
        const markup = `<div class = "alert alert--success">Alert sent to all NGOs nearby!</div>`;
        document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(()=> {
          const el = document.querySelector('.alert');
          if (el) el.parentElement.removeChild(el);
          window.location.replace('/overview')
        }, 5000);

        ;
      
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }





 });
}