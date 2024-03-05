const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#userMessage');

// Function validating the filds

const showSuccessMessage = () =>{
  console.log('Inputs are ok')
  
}

function validate(inputId, inputType){
  let n = inputId; // get input id
  let nInvalidMessage = inputId.parentNode.querySelector('.invalid-message');

  function addError (errorText){
    nInvalidMessage.innerText = `${errorText}`;
    nInvalidMessage.classList.add('activeMessage');
    inputId.classList.add('input-invalid');
  }
  function removeError (){
    nInvalidMessage.classList.remove('activeMessage');
    inputId.classList.remove('input-invalid');
  }
   
  // Name validation
  if (inputType == "name"){
    if (inputId.value == "") {
      addError("Can't be blank");
      return false;
    } else{
      removeError();
      return true;
    }
  }
  // Email validation
  if (inputType == "email"){
    var rea = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.\w+$/;
    var Email = inputEmail.value;
    var x = rea.test(Email);

    if (inputId.value == "") {
      addError("Can't be blank");
      return false;
    } else if(!x){
      addError("Sorry, invalid format here");
      return false;
    }
    else{
      removeError();
      return true;
    }
  }
  // User Message validation
  if (inputType == "userMessage"){
    if (inputId.value == "") {
      addError("Can't be blank");
      return false;
    } else{
      removeError();
      return true;
    }
  }
  
}

function submitUserData(form){
  document.getElementById("message").textContent = "Submitting..";
  document.getElementById("message").style.display = "block";
  document.getElementById("submit-button").disabled = true;

  // Collect the form data
  var formData = new FormData(form);
  console.log(form);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  var formDataString = keyValuePairs.join("&");

  // Send a POST request to your Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycby5N6MqD7lcCgonLM_mfAyYFpsRrUV6bJ01SwYZskKZiDAmxzdwT74EzOJWgJ_GAk-rbA/exec",
    {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
    }
  )
    .then(function (response) {
      // Check if the request was successful
      if (response) {
        return response; // Assuming your script returns JSON response
      } else {
        throw new Error("Failed to send the message.");
      }
    })
    .then(function (data) {
      // Display a success message
      document.getElementById("message").textContent =
        "Thank you for contacting me!";
      document.getElementById("message").style.display = "block";
      document.getElementById("submit-button").disabled = false;
      document.getElementById("form").reset();

      setTimeout(function () {
        document.getElementById("message").textContent = "";
        document.getElementById("message").style.display = "none";
      }, 2600);
    })
    .catch(function (error) {
      // Handle errors, you can display an error message here
      console.error(error);
      document.getElementById("message").textContent =
        "An error occurred while ssending the message.";
      document.getElementById("message").style.display = "block";
    });
}
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  let isValidName = validate(inputName, 'name');
  let isValidEmail = validate(inputEmail, 'email');
  let isValidUserMessage = validate(inputMessage, 'userMessage');

  // If all the fiealds are valid - show success message
  if(isValidName && isValidEmail && isValidUserMessage){
    showSuccessMessage();
    submitUserData(this);
  }

});


// Scroll icons animation

window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  //console.log(window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);

// Scroll project image animation

gsap.registerPlugin(ScrollTrigger);

let masks = document.querySelectorAll('.mask');

masks.forEach( mask => {
    let image = mask.querySelector('img');

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: mask,
            toggleActions: "restart none none reset"
        }
    });

    tl.set(mask, {autoAlpha: 1});

    tl.from(mask, 1.5, {
        xPercent: -100,
        ease: Power2.out
    });
    tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out
    });
})
