// Function to obtain all the users registered
export default async function getUsers() {
  const URL_USERS = "http://localhost:3000/users"
  
  try {
    const res = await fetch(URL_USERS)

    if (!res.ok) {
      throw new Error("Error al conectar con el servidor")
    }

    const data = await res.json()

    // Return all the users from db.json
    return data
  } catch(err) {
    console.log(err)
  }
}