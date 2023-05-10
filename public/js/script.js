// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("wine-vibes-main JS imported successfully!");
});


const button = document.querySelector(".button");

button.addEventListener("click", () => {

  fetch("/checkout", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items:[
        {id: 1, quantity:2},
        {id: 2, quantity:1}
      ]
    })
  }).then(res => {
    if(res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
  }).then(({url}) => {
    window.location = url
    // console.log(url);
  }).catch(e => {
    console.log(e.error);
  })
})

Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});


