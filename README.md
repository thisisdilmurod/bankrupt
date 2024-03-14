![Logo](https://github.com/thisisdilmurod/bankrupt/assets/100064552/69961d36-2c21-4929-be62-8464b60b3aa5)

## About

- A web application to manage bank accounts securely
- It was developed using Express and EJS on Node.js

## Usage

<details>
<summary>Website</summary>
<ol>
<li>Open browser (Chrome, Safari, Edge, etc).</li>
<li>Go to <a href="https://bankrupt.onrender.com/">here</a>.</li>
</ol>
</details>

<details>
<summary>GitHub</summary>
<ol>
<li>Clone the <a href="https://github.com/thisisdilmurod/bankrupt">repository</a>.</li>
<li>Install the dependencies: <code>npm install</code>.</li>
<li>Run on the localhost: <code>npm start</code>.</li>
</ol>
</details>

<details>
<summary>Docker</summary>
<ol>
<li>Pull the Docker image: <code>docker pull thisisdilmurod/bankrupt</code>.</li>
<li>Run on the localhost: <code>docker run -p 3000:3000 thisisdilmurod/bankrupt</code>.</li>
<ol>
</details>

## Features

There are several capabilities that app offers:
- Authenticate to the application
- View previous saved accounts
- Create a new account record
- Edit the existing account data
- Delete previously created account

<i>All the dependencies are available under <b>package.json</b></i>.

## Structure

```
├───controllers
|   ├───authController.js
|   └───userController.js
├───db
|   ├───admins.json
|   └───db.json
├───node_modules
├───public
│   ├───css
│   ├───img
│   └───js
├───routes
|   ├───auth.js
|   ├───index.js
|   └───users.js
├───services
|   ├───authServices.js
|   └───userServices.js
├───views
|    └───partials
├───app.js
├───config.json
├───dockerfile
├───package-lock.json
├───package.json
├───README.md
└───utils.js
```

## Notes
- Folder structure might be a bit different from the suggested. It was done to simplify the process.
- Project was created as part of Web Technology coursework and does not represent any company.