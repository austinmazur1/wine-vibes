function showPopup() {
  var ageVerified = localStorage.getItem('ageVerified');
  if (!ageVerified) {
    document.querySelector('.popup').style.display = 'block';
  }
}
function verifyAge() {
  var age = document.getElementById('age-input').value;
  if (age >= 18) {
    localStorage.setItem('ageVerified', true);
    window.location.href = '/home';
  } else {
    alert('You must be 18 or older to access this website.');
  }
}