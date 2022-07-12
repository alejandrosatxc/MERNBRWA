# Bell-Ripper's Legal Document Generation Software

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The software is designed to automate client intake, document generation, storage, and delivery, as well as act as a market place for legal documents/services.

At the moment it is currently able to handle client intake.

## Architecture and Dependancies

The project foundation is built using a MERN stack:
  - MongoDB as a database
  - Express.js for the back-end/api
  - React for front-end development
  - Node as the platform
  - Heroku for app hosting and deployment 

There are other APIs/services that the project leverages for functionality:
  -Mongoose: a JS library to interface with MongoDB
  -Redux: for App state management and improving debugging from a developer perspective
  -Google Drive API: for storing legal document templates, autofilling, and handling downloads of those documents
  -Mandrill API : for automated email services and notifications for attorneys and clients
  
Later on the project will utilize the Stripe API to handle payments for the document marketplace

## Directories and app structure

The following describes how the app and it's files and directories are arranged and what they are for:

### routes/api

This directory contains 5 files that utilize Express.js to handle GET and POST requests from the client:

#### auth.js - Handles authentication for users like logins and requesting specific documents.
#### documents.js - Handles getting document templates stored in mongoDB and downloading finalized PDF documents from Google Drive 
#### survey.js - Handles retrieving surveys from MongoDB, stores user survey responses in MongoDB, sending emails notifications to clients and attorneys of completion/availabilty of forms, finalizing documents and uploading to google drive for storage and download later.
#### userSubmissions.js - Handles bringing in userSubmissions/responses into the app for viewing
#### users.js - Handles registration of new users.

### models

This directory contains several files that define the 'schema' of the objects that should be stored in the mongoDB database, which is basically the way they should be laid out and the various fields that each object should contain as well as defining types and auto-increment rules. It does this using mongoose Schema objects.

### middleware

Contains a single file, auth.js that is utilized in routes/api/auth.js, it is used as 'middleware' when handling GET requests to the api/auth/user endpoint

### email_templates

Currently this dir is empty, the idea was that email templates would be stored here.

### client 

This dir contains all of the code and details for the front-end of the app, this is the front-end bundle that the server will serve to the clients browser when the app is accessed. 

## Client-side

### actions

This directory contains various files that are used to handle Redux actions and the logic that needs to be run whenever one of those actions is 'dispatched'

### 

####

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
