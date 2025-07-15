// Important functions to work with
import {routes} from "./app/router/router.js"
import setUpLogin from "./app/actions/setUpLogin.js"
import setUpRegister from "./app/actions/setUpRegister.js"
import showEvents from "./app/components/showEvents.js"
import deleteEvent from "./app/actions/deleteEvent.js"
import addNewEvent from "./app/actions/addNewEvent.js"
import modifyEvent from "./app/actions/modifyEvent.js"
import getEnrollments from "./app/actions/getEnrollments.js"

// Function that start the page 
async function initApp() {
  let hash = window.location.hash || "#/login"

  const page = routes[hash] || "<h1>ERROR 404 - Page Not Found</h1>"
  const html = (await fetch(page)).text()
  const mainContent = document.getElementById("main__content")
  mainContent.innerHTML = await html

  // Validate the current hash of the page
  if (hash === "#/dashboard") await showEvents()
  if (hash === "#/login") await setUpLogin()
  if (hash === "#/register") await setUpRegister()
  if (hash === "#/create") await addNewEvent()
  if (hash === "#/enrollments") {
    const nameUser = localStorage.getItem("Name")
    const roleUser = localStorage.getItem("Role")

    const userInfoName = document.querySelector(".user__info--name")
    const userInfoRole = document.querySelector(".user__info--role")

    userInfoName.textContent = nameUser ? nameUser.toUpperCase() : "Guest";
    userInfoRole.textContent = roleUser ? roleUser.toUpperCase() : "Guest";

    const enrollments = await getEnrollments();

    const contentEnrollments = document.getElementById("content");
    contentEnrollments.innerHTML = "";

    if (enrollments.length === 0) {
      contentEnrollments.innerHTML = `<p class="no__enrollments">No tienes inscripciones</p>`;
      contentEnrollments.style.textAlign = "center";
      return
    }

    enrollments.forEach((enrollment) => {
      const enrollmentElement = document.createElement("div");
      enrollmentElement.classList.add("enrollment__item");
      enrollmentElement.innerHTML = `
        <div class="event__name">
          <img class="img__event" src="${enrollment.img}">
          <p class="event__name--text">${enrollment.name}</p>
        </div>
  
        <p>${enrollment.description}</p>

        <p>${enrollment.capacity}</p>
        
        <p>Registrado</p>
      `;
      contentEnrollments.appendChild(enrollmentElement);
    });
  }
  
}

// Detect each click of the user
document.addEventListener("click", (e) => {
  const modalModifyEvent = document.getElementById("modal__modify");

  if (e.target.matches("#trash__icon")) {
    const btn = e.target;
    const eventElement = btn.closest(".divEvent");
    const eventId = eventElement.getAttribute("id");

    if (eventId) {
      deleteEvent(eventId).then(() => {
        eventElement.remove();
      });
    }
  }

  if (e.target.matches("#pencil__icon")) {
    modalModifyEvent.classList.add("active");

    const btn = e.target;
    const eventElement = btn.closest(".divEvent");
    const eventId = eventElement.getAttribute("id");

    const formModifyEvent = document.getElementById("form__modify--event")
    const newName = document.getElementById("event__name--modify");
    const newDescription = document.getElementById("event__description--modify");
    const newCapacity = document.getElementById("event__capacity--modify");
    const newDate = document.getElementById("event__date--modify");

    fetch(`http://localhost:3000/events/${eventId}`)
      .then((res) => res.json())
      .then((event) => {
        newName.value = `${event.name}`;
        newDescription.value = `${event.description}`;
        newCapacity.value = `${event.capacity}`;
        newDate.value = `${event.date}`;
      });

    if (modalModifyEvent.classList.contains("active")) {
      formModifyEvent.addEventListener("submit", async (e) => {
        e.preventDefault();

        const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!newName.value.trim()) {
          alert("Debes ingresar un nombre valido.");
          return;
        }

        if (!newDescription.value.trim()) {
          alert("Debes ingresar una descripcion valida.");
          return;
        }

        if (!newCapacity.value.trim()) {
          alert("Debes ingresar una capacidad valida.");
          return;
        }

        if (!newDate.value) {
          alert("Debes ingresar una fecha valida.");
          return;
        }

        await modifyEvent(
          eventId,
          newName.value,
          newDescription.value,
          newCapacity.value,
          newDate.value
        );

        const updatedEventElement = document.getElementById(eventId);
        if (updatedEventElement) {
          const nameElem =
            updatedEventElement.querySelector(".event__name--text");
          if (nameElem) nameElem.textContent = newName.value;

          const descElem = updatedEventElement.querySelector(
            ".event__description"
          );
          if (descElem) descElem.textContent = newDescription.value;

          const capElem = updatedEventElement.querySelector(".event__capacity");
          if (capElem) capElem.textContent = newCapacity.value;

          const dateElem = updatedEventElement.querySelector(".event__date");
          if (dateElem) dateElem.textContent = newDate.value;
        }

        formModifyEvent.reset();
        modalModifyEvent.classList.remove("active");
      });
    }
  }

  if (e.target.matches(".btn__cancel")) {
    if (modalModifyEvent.classList.contains("active")) {
      modalModifyEvent.classList.remove("active");
    }
  }

  if (e.target.matches(".sidebar__logout--text")) {
    if (localStorage.getItem("Role")) {
      localStorage.setItem("Auth", "false")
      localStorage.removeItem("Name")
      localStorage.removeItem("Role")
    }
  }

  if (e.target.matches(".enroll__btn")) {
    const btn = e.target;
    const eventElement = btn.closest(".divEvent");
    const eventId = eventElement.getAttribute("id");

    fetch(`http://localhost:3000/events/${eventId}`)
      .then((res) => res.json())
      .then((event) => {
        const enrollmentData = {
          id: eventId,
          img: event.img,
          name: event.name,
          description: event.description,
          capacity: event.capacity,
        };

        fetch("http://localhost:3000/enrollments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrollmentData),
        })
        .then(() => {
          alert("Inscripción exitosa");
        })
        .catch((error) => {
          console.error("Error al inscribir:", error);
        });
      });
  }
})

// Function that detect when hash change
window.addEventListener("hashchange", initApp)

// Function to show the content once the page charged
window.addEventListener("DOMContentLoaded", initApp)

