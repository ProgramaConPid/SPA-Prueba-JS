import getUsers from "./getUsers";

// Function to set up the registration of a new user
export default async function setUpRegister() {
  const users = await getUsers()

  const formRegister = document.getElementById("form__register")
  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault()

    const inputName = document.getElementById("input__name--register").value
    const inputEmail = document.getElementById("input__email--register").value
    const inputPassword = document.getElementById("input__password--register").value
    const inputConfirmPassword = document.getElementById("input__confirmPassword--register")

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validations for each input of the form
    if (!inputName) {
      alert("Debes ingresar un nombre valido.")
      return
    }

    if (!inputEmail || !regEx.test(inputEmail)) {
      alert("Debes ingresar un correo electronico valido.")
      return
    } 

    if (!inputPassword) {
      alert("Debes ingresar una contraseña valida.")
      return
    }

    if (!inputConfirmPassword) {
      alert("Debes ingresar una contraseña valida.")
      return
    }

    formRegister.reset()

    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const newId = maxId + 1;

    // New user registered data
    const newUser = {
      id: newId,
      name: inputName,
      email: inputEmail,
      password: inputPassword,
      role: "visitor"
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      }) 

      if (!res.ok) {
        throw new Error("Error al conectar con el servidor")
      }
    } catch(err) {
      alert(err)
    }
  })
}