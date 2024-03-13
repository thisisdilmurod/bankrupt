// Put a photo of bankrupt

## Bankrupt

- A web application to manage bank accounts securely
- It was developed using Express and EJS

## Usage

<details>
<summary>Website</summary>
1. Open browser (Chrome, Safari, Edge, etc).
2. Go to <a href="https://bankrupt.onrender.com/">here</a>.
</details>

<details>
<summary>GitHub</summary>
1. Clone the <a href="https://github.com/thisisdilmurod/bankrupt">repository</a>.
2. Install the dependencies: <code>npm install</code>.
3. Run on the localhost: <code>npm start</code>.
</details>

<details>
<summary>Docker</summary>
1. Pull the Docker image: <code>docker pull thisisdilmurod/bankrupt</code>.
2. Run on the localhost: <code>docker run -p 3000:3000 thisisdilmurod/bankrupt</code> .
</details>

## Features

There are several fundamental features that Bankrupt offers:
- Authenticate to the application;
- View previous saved accounts;
- Create a new account record;
- Edit the existing account data;
- Delete previously created account;

* <i>All the dependencies are available under <b>package.json</b></i>.

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
├───.dockerignore
├───.gitignore
├───app.js
├───config.json
├───dockerfile
├───package-lock.json
├───package.json
├───README.md
└───utils.js
```

## Note
- Bankrupt was created as part of Web Technology coursework and does not represent an actual company.