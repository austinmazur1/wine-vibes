function verifyAge() {
    const age = document.getElementById("age-input").value;
    if (age >= 18) {
      // User is old enough, show content
      document.getElementById("age-verification-popup").style.display = "none";
      document.body.style.overflow = "auto";
    } else {
      // User is not old enough, show popup
      document.getElementById("age-verification-popup").style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }