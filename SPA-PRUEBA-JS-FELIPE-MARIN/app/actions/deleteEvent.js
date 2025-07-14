// Function to delete a specific event
export default async function deleteEvent(eventId) {
  try {
    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Error al intentar eliminar el evento");
    }
  } catch (err) {
    alert(err);
  }
}