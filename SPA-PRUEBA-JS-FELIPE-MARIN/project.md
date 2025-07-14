# ✏️ SPA JS - Felipe Marin 

## 📃 Project Description

The project is based on a SPA that allows the user to register and log in. Once logged in, the dashboard will load and allow the user to perform certain types of actions depending on their role.

- Admin Role: The user with the admin role can add new events, modify them, and even delete them.

- Visitor Role: A user with the visitor role can only sign up for events and can also view the list of events they will attend.

## 🔱 Project Purpose

The purpose of this project is to put into practice all the concepts seen during the JavaScript module, emphasizing how a SPA is developed and how to apply the functionalities of a CRUD.

## 🗂️ Project Structure

- index.html (initial file that loads the project)
- index.js (file containing the logic to deploy the project.)
- components (file containing the logic to deploy the project.)
- views (folder containing the views available in the project)
- actions (Important CRUD actions that the user can perform)
- assets (folder that stores the project images)
- css (Folder containing the style.css file that loads the project's styles)
- router (This folder contains the routes.js file, which stores the project's available routes using an object.)
- package.json (JSON file containing all the project information, including Vite and JSON-Server dependencies.)
- node_modules (This folder contains the node modules and modules for vite and json-server.)
- db.json (This JSON file is responsible for simulating a backend, it contains user data and events.)

## 🏃‍➡️ How to run the SPA

- Option #1: You must stop at the index.html file, then right click and click on the option (Open with live server)

- Option #2 (**Recommended**): You must enter the terminal and execute the command **npm run dev**, Following this, the terminal will create a local server, you must enter the server URL (e.g.: http://localhost:5173) and once you enter the project will be loaded.

- Option #3: Just like in step #2, you should open console **(command ctrl + j)** and execute the following command **(json-server --watch db.json)**, the terminal will create a local server with the port (http://localhost:3000)

## Important Sections and Funcionalities
- Among the important sections of the project is the dashboard view that allows the user to perform the operations typical of a CRUD.

- Another very important and interesting feature of the project is the redirection of dynamic routes using the URL hash, which changes view depending on the route.

- Without a doubt, the functionality and basis of the project is the backend simulated with json-server, which allows data to be stored and CRUD operations to be performed correctly.

## Rights Deserved

**Juan Felipe Marin Molina** - Riwi Developer