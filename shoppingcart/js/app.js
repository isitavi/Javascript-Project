//Variables
const courses = document.querySelector("#courses-list"),
  shoppingCartCntnt = document.querySelector("#cart-content tbody"),
  clearallCourses = document.querySelector("#clear-cart");

//Listerners
loadEventListerners();

function loadEventListerners() {
  //Buy course is added to the course list
  courses.addEventListener("click", buyCourse);

  //Remove courses from shopping cart
  shoppingCartCntnt.addEventListener("click", removeCourse);

  //Remove all courses at a time by click on clear Button
  clearallCourses.addEventListener("click", clearCourses);

  //Load content from local storage and show in carts
  document.addEventListener("DOMContentLoaded", getFromLocalStorage);
}

//Functions
function buyCourse(evnt) {
  //Use delegation to find the course
  evnt.preventDefault();
  if (evnt.target.classList.contains("add-to-cart")) {
    const course = evnt.target.parentElement.parentElement;
    getCourseInfo(course);
  }
}

function getCourseInfo(course) {
  //Creat an object with course data
  const courseInfo = {
    image: course.querySelector("img").src,
    title: course.querySelector(".info-card h4").textContent,
    price: course.querySelector(".price span").textContent,
    id: course.querySelector("a").getAttribute("data-id")
  };
  //Insert courses into shopping cart
  addIntoCart(courseInfo);
}

//Display selected course into shopping cart
function addIntoCart(course) {
  const rowValue = document.createElement("tr");

  rowValue.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100px>
            </td>
            <td>
                ${course.title}
            </td>
            <td>
                ${course.price}
            </td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">x</a>
            </td>

        </tr>
    
    
    `;
  //Add value into the shopping cart
  shoppingCartCntnt.appendChild(rowValue);

  //Add course into local storage
  addLocalStrg(course);
}
//Add courses into local
function addLocalStrg(course) {
  let courses = getCourses();

  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
}

//Remove course from the dom
function removeCourse(evnt) {
  let course, courseID;
  //Remove from the DOM
  if (evnt.target.classList.contains("remove")) {
    evnt.target.parentElement.parentElement.remove();
    course = evnt.target.parentElement.parentElement;
    courseID = course.querySelector("a").getAttribute("data-id");
  }

  removeCourseLoS(courseID);
}

function removeCourseLoS(id) {
  //Retrive all list of courses from local storage
  let coursesLS = getCourses();
  //Loop through the index and remove specific course
  coursesLS.forEach((courseLS, index) => {
    if (courseLS.id === id) {
      coursesLS.splice(index, 1);
    }
  });
  console.log(coursesLS);

  //add the rest of the courses to the local storage
  localStorage.setItem("courses", JSON.stringify(coursesLS));
}

//Clear all courses from cart
function clearCourses() {
  //   shoppingCartCntnt.innerHTML = "";
  while (shoppingCartCntnt.firstChild) {
    shoppingCartCntnt.removeChild(shoppingCartCntnt.firstChild);
  }
  //Clear from local storage
  clearLocalStorage();
}

//Clear all records from local storage

function clearLocalStorage() {
  localStorage.clear();
}

//Loads when document is ready and print courses into shopping cart
function getFromLocalStorage() {
  let coursesLS = getCourses();

  //Loop through the courses and print into the cart
  coursesLS.forEach(course => {
    const rowValue = document.createElement("tr");

    //print the content

    rowValue.innerHTML = `
    <tr>
      <td>
          <img src="${course.image}" width=100px>
      </td>
      <td>
          ${course.title}
      </td>
      <td>
          ${course.price}
      </td>
      <td>
          <a href="#" class="remove" data-id="${course.id}">x</a>
      </td>

    </tr>
    `;
    shoppingCartCntnt.appendChild(rowValue);
  });
}

//Get  coursel from local storage
function getCourses() {
  let courses;
  if (localStorage.getItem("courses") === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem("courses"));
  }
  return courses;
}
