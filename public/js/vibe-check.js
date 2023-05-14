// MULTI-STEP-FORM //
/*let tab1 = document.querySelector(".tab1");
let tab2 = document.querySelector(".tab2");
let tab3 = document.querySelector(".tab3");
let input = document.querySelectorAll("input");

let nextBtn = document.querySelector("#nextBtn");
let prevBtn = document.querySelector("#prevBtn");

let currentTab = 0;

tab2.classList.add("hide");
tab3.classList.add("hide");
prevBtn.classList.add("hide");

nextBtn.addEventListener("click", () => {
  if (currentTab === 0) {
    // if (!validateForm()) return false;
  }
  if (currentTab < 2) {
    currentTab++;
    showTab(currentTab);
    if (currentTab === 2) {
      nextBtn.innerHTML = "Submit";
    }
  } else {
    document.querySelector("form").submit();
  }
});

prevBtn.addEventListener("click", () => {
  console.log(currentTab);
  if (currentTab > 0) {
    currentTab--;
    showTab(currentTab);
    if (currentTab === 0) {
      prevBtn.classList.add("hide");
    }
    if (currentTab === 1) {
      nextBtn.innerHTML = "Next";
    }
  }
});

//function takes the current postion of the tab
function showTab(num) {
  switch (num) {
    case 0:
      tab1.classList.remove("hide");
      tab2.classList.add("hide");
      tab3.classList.add("hide");
      break;
    case 1:
      tab1.classList.add("hide");
      tab2.classList.remove("hide");
      tab3.classList.add("hide");
      prevBtn.classList.remove("hide");
      break;
    case 2:
      tab1.classList.add("hide");
      tab2.classList.add("hide");
      tab3.classList.remove("hide");
      prevBtn.classList.remove("hide");
      break;
    default:
      break;
  }
}*/
document.getElementById("nextBtn").addEventListener("click", function() {
  var aloneOrNo = document.querySelector('input[name="aloneOrNo"]:checked').value;
  var setting = document.querySelector('input[name="setting"]:checked').value;
  var preferedWine = document.querySelector('input[name="preferedWine"]:checked').value;
  
  var vibeCategory = "";
  if (aloneOrNo === "alone" && setting === "vibing"&& preferedWine ==="impressSnob" ) {
    vibeCategory = "home-alone";
  } else if (aloneOrNo === "friends" && setting === "rocking"&& preferedWine ==="goodWine") {
    vibeCategory = "me-and-friends";
  } else if (aloneOrNo === "girls" && setting === "rocking"&& preferedWine ==="easyDrinking") {
    vibeCategory = "hot-girl-summer";
  } else if (aloneOrNo === "not-sure" && setting === "rocking"&& preferedWine ==="impressSnob") {
    vibeCategory = "me-and-friends";
  } else if (aloneOrNo === "alone" && setting === "spontaneous"&& preferedWine ==="impressSnob") {
    vibeCategory = "home-alone";
  } else if (aloneOrNo === "friends" && setting === "spontaneous"&& preferedWine ==="easyDrinking") {
    vibeCategory = "summer-party";
  } else if (aloneOrNo === "girls" && setting === "vibing"&& preferedWine ==="goodWine") {
    vibeCategory = "me-and-friends";
  } else if (aloneOrNo === "not-sure" && setting === "spontaneous"&& preferedWine ==="goodWine") {
    vibeCategory = "me-and-friends";
  } else if (aloneOrNo === "girls" && setting === "spontaneous"&& preferedWine ==="easyDrinking") {
    vibeCategory = "hot-girl-summer";
  } else if (aloneOrNo === "friends" && setting === "vibing"&& preferedWine ==="impressSnob") {
    vibeCategory = "me-and-friends";
  } else if (aloneOrNo === "girls" && setting === "rocking"&& preferedWine ==="girlyDrops") {
    vibeCategory = "hot-girl-summer";
  } else if (aloneOrNo === "not-sure" && setting === "vibing"&& preferedWine ==="impressSnob") {
    vibeCategory = "me-and-friends";
  } else {
    vibeCategory = "summer-party";
  }
  
  window.location.href = "/" + vibeCategory;
  
  showTab(currentTab += 1);
});
