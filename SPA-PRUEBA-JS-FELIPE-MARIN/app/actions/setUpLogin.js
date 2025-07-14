import getUsers from "./getUsers.js"

// Function to set the login from the user
export default async function setUpLogin() {
  const formLogin = document.getElementById("form__login")
  const users = await getUsers()

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const userEmail = document.getElementById("input__email--login").value
    const userPassword = document.getElementById("input__password--login").value

    // Validations for each input of the form
    if (!userEmail || !userPassword) {
      alert("!Debes llenar ambos campos del formulario")
      return 
    }

    const foundUser = users.find(user => user.email === userEmail && user.password === userPassword)

    // Set the user registered and redirect to the dashboard
    if (foundUser) {
      localStorage.setItem("Auth", "true")
      localStorage.setItem("Name", foundUser.name)
      localStorage.setItem("Role", foundUser.role)
      window.location.hash = "#/dashboard"
    }
  })
}