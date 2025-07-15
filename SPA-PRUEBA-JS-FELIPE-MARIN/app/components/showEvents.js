// Function to show all the events registered
export default async function showEvents() {
  try {
    const res = await fetch("http://localhost:3000/events")
    
    if (!res.ok) {
      throw new Error("Error al conectar con el servidor")
    }
    
    const events = await res.json()
    const role = localStorage.getItem("Role")
    const userInfoName = document.querySelector(".user__info--name")
    const userInfoRole = document.querySelector(".user__info--role")

    // Validate the role of the user and show the respective content
    if (role === "admin") {
      events.forEach(event => {
        userInfoName.textContent = localStorage.getItem("Name").toUpperCase()
        userInfoRole.textContent = localStorage.getItem("Role").toUpperCase()

        const btnEnrollments = document.getElementById("enrollment__link")
        const dashboardEvents = document.getElementById("content")
        const divEvent = document.createElement("div")
        btnEnrollments.style.display = "none"
        divEvent.classList.add("divEvent")
        divEvent.id = `${event.id}`
        divEvent.innerHTML = `
          <div class="event__name">
            <img class="img__event" src="${event.img}">
            <p class="event__name--text">${event.name}</p>
          </div>
  
          <div class="event__info--info">
            <p class="event__description">${event.description}</p>
            <p class="event__capacity">${event.capacity}</p>
            <p class="event__date">${event.date}</p>
          </div>
  
          <div class="event__btns">
            <i class='bx bx-pencil' id="pencil__icon"></i> 
            <i class='bx bx-trash-alt' id="trash__icon"></i> 
          </div>
        `;
        dashboardEvents.appendChild(divEvent);
      });
    } else if (role === "visitor") {
      events.forEach(event => {
        userInfoName.textContent = localStorage.getItem("Name").toUpperCase()
        userInfoRole.textContent = localStorage.getItem("Role").toUpperCase()

        const btnAddEvent = document.getElementById("addNewEvent")
        btnAddEvent.style.display = "none"
        const dashboardEvents = document.getElementById("content")
        const divEvent = document.createElement("div")
        divEvent.classList.add("divEvent")
        divEvent.id = `${event.id}`
        divEvent.innerHTML = `
        <div class="event__name">
          <img class="img__event" src="${event.img}">
          <p class="event__name--text">${event.name}</p>
        </div>
  
        <div class="event__info--info">
          <p class="event__description">${event.description}</p>
          <p class="event__capacity">${event.capacity}</p>
          <p class="event__date">${event.date}</p>
        </div>
  
        <div class="event__btns">
          <button class="enroll__btn">Enroll</button>
        </div>
        `;
        dashboardEvents.appendChild(divEvent)
      })
    }
  } catch(err) {
    alert(err)
  }
}
