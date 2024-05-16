document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.getElementById("personal-info-form");

  // Add submit event listener to the form
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Reset previous errors
    clearErrors();

    // Validate inputs
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const country = document.getElementById("country").value.trim();
    const date = document.getElementById("date").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const zipCode = document.getElementById("zipCode").value.trim();

    // Check for errors
    const errors = [];

    if (!firstName) {
      errors.push("First name is required.");
    }

    if (!lastName) {
      errors.push("Last name is required.");
    }

    if (!email || !isValidEmail(email)) {
      errors.push("Please enter a valid email address.");
    }

    if (!mobileNumber || !isValidMobileNumber(mobileNumber)) {
      errors.push("Please enter a valid 10-digit mobile number.");
    }

    if (!address) {
      errors.push("Address is required.");
    }

    if (!city) {
      errors.push("City is required.");
    }

    if (!state) {
      errors.push("State is required.");
    }

    if (!country) {
      errors.push("Country is required.");
    }

    if (!date) {
      errors.push("Date is required.");
    }

    if (!gender) {
      errors.push("Gender is required.");
    }

    if (!zipCode) {
      errors.push("Zip code is required.");
    }

    // Display errors
    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    // Alert all details if no errors
    alert(
      "Form submitted Successfully"
    );

    if(errors.length==0){
      form.reset();
    }

    // Optionally, you can submit the form to a server here if needed
    // form.submit();
  });


// Add event listener to the Discard button to reset the form
document.getElementById("discard-btn").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default form submission behavior
  form.reset(); // Reset the form
  clearErrors(); // Clear any displayed errors
});
form.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
  }
});

  // Function to check if email is in proper format
  function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to check if mobile number is 10 digits
  function isValidMobileNumber(mobileNumber) {
    // Regular expression for 10-digit mobile number validation
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNumber);
  }

  // Function to display errors in toasts, with a limit of 3, and append any additional errors
  function showErrors(errors) {
    const toastContainer = document.getElementById("toast-container");

    // Show first 3 toasts
    const displayedErrors = errors.slice(0, 3);
    displayedErrors.forEach((error, index) => {
      setTimeout(() => {
        const toast = createToast(error);
        toastContainer.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = "1";
        }, 100);
      }, index * 500); // Show each toast with a delay of 500 milliseconds
    });

    // Remove and add remaining errors
    setTimeout(() => {
      const removeInterval = setInterval(() => {
        if (errors.length > 3) {
          toastContainer.removeChild(toastContainer.firstElementChild);
          const nextError = errors.splice(3, 1)[0];
          const toast = createToast(nextError);
          toastContainer.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = "1";
          }, 100);
        } else {
          clearInterval(removeInterval);
        }
      }, 500); // Remove and add toasts every 500 milliseconds
    }, 3 * 500); // Wait for initial 3 toasts to be displayed
  }

  // Function to create a toast element
  function createToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    return toast;
  }

  // Function to clear errors
  function clearErrors() {
    const toastContainer = document.getElementById("toast-container");
    while (toastContainer.firstChild) {
      toastContainer.removeChild(toastContainer.firstChild);
    }
  }
});