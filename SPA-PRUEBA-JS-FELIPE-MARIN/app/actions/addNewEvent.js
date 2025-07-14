import getEvents from "./getEvents"

// Function to add a new event
export default async function addNewEvent() {
  const events = await getEvents()
  const formNewEvent = document.getElementById("form__create--event")
  const userInfoName = document.querySelector(".user__info--name")
  const userInfoRole = document.querySelector(".user__info--role")

  userInfoName.textContent = localStorage.getItem("Name").toUpperCase()
  userInfoRole.textContent = localStorage.getItem("Role").toUpperCase()

  formNewEvent.addEventListener("submit", async (e) => {
    e.preventDefault()
    const eventName = document.getElementById("event__name").value
    const eventDescription = document.getElementById("event__description").value
    const eventCapacity = document.getElementById("event__capacity").value
    const eventDate = document.getElementById("event__date").value

    // Validations for each input of the form
    if (!eventName) {
      alert("Debes ingresar un nombre valido.")
      return
    }

    if (!eventDescription) {
      alert("Debes ingresar una descripcion valida.")
      return
    }

    if (!eventCapacity || eventCapacity < 1) {
      alert("Debes ingresar una capacidad valida")
      return
    }

    if (!eventDate) {
      alert("Debes ingresar una fecha valida")
      return
    }

    const maxId = events.length > 0 ? Math.max(...events.map((u) => u.id)) : 0;
    const newId = maxId + 1;

    const newEvent = {
      id: String(newId),
      img: "../assets/event__img.jpg",
      name: eventName,
      description: eventDescription,
      capacity: eventCapacity,
      date: eventDate
    }

    formNewEvent.reset()

    window.location.hash = "#/dashboard"

    try {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      }) 
      if (!res.ok) {
        throw new Error("Error al conectar con el servidor")
      }
    } catch(err) {
      alert(err)
    }
  })
}
