# DEVFINDER FRONTEND APP

## Functionality

Inspired by the simplicity of search engines like Google, this web app allows the users to search for devs across the Github platform. It leverages off Github API to query the developers on the platform and allows the user to view their recent activities. 

This is a very basic implementation that can be expanded on to not only query by user name but by other parameters as well as commit messages.  Another possible functionality that could be added to it is the ability to filter the users' different activities by various categories. 

Futhermore, there are placeholder functions in place that can be implemented with a backend to allow the user to bookmark profiles and access them offline. For this purpose, I structured the project in such a way that it could be scalable by separating concerns in my components as much as possible. 

## What can be improved on

The project can be further refactored with the use of custom hooks. Also the styling of the project can be refactored and will need to be worked on to be more responsive for mobile devices. There are some minor bugs with some functionality on the result list page which give rise to areas of improvement. The project can also be enhanced to gather more details from the GitHub api and finally controls need to be added to the user activities. The user activities need to be more intractable with. 

###Screenshots: 

![Alt text](./public/LandingPage.png?raw=false "Landing Page inspired by modern search engine interfaces.")

![Alt text](./public/SearchResultsList.png?raw=false "Search results page with filtering functionality.")

![Alt text](./public/UserActivities.png?raw=false "User Profile Page")




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
