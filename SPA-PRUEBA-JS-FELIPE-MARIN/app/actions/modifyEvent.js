// Function to update an existent event
export default async function modifyEvent(id, name, description, capacity, date) {
  try {

    // Event modified data
    const newEvent = {
      id: id,
      img: "../assets/event__img.jpg",
      name: name,
      description: description,
      capacity: capacity,
      date: date
    }
    
    const event = await fetch(`http://localhost:3000/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
    })

    if (!event.ok) {
      throw new Error("Error al conectar con el servidor")
    }
  } catch(err) {
    alert(err)
  }
}