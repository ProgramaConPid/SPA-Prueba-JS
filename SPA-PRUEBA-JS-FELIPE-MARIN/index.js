// Important functions to work with
import {routes} from "./app/router/router.js"
import setUpLogin from "./app/actions/setUpLogin.js"
import setUpRegister from "./app/actions/setUpRegister.js"
import showEvents from "./app/components/showEvents.js"
import deleteEvent from "./app/actions/deleteEvent.js"
import addNewEvent from "./app/actions/addNewEvent.js"
import modifyEvent from "./app/actions/modifyEvent.js"

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
})

// Function that detect when hash change
window.addEventListener("hashchange", initApp)

// Function to show the content once the page charged
window.addEventListener("DOMContentLoaded", initApp)

