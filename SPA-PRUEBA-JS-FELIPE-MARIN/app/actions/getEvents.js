// Function that gets all the events registered
export default async function getEvents() {
  const URL_EVENTS = "http://localhost:3000/events"
  
  try {
    const res = await fetch(URL_EVENTS)

    if (!res.ok) {
      throw new Error("Error al conectar con el servidor")
    }

    const data = await res.json()
    return data
  } catch(err) {
    console.log(err)
  }
}