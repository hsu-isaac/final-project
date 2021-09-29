# Hangouts

This is a web application for friends who want to hangout with each other!

This is a full-stack application that utilizes HTML, CSS, JavaScript, React.js in the front end and Node.js, Express.js, and postgresql in the back end. lodash, date.fns, and passport were also used throughout the application.

I originally wanted to make an app for athletes to organize local pickup games more easily, however as I made the app I discovered that it could be used for a more general purpose. I love playing sports and hanging out with my friends, hopefully this app can help encourage those activities!

## Live Deployment Link

Try the application at: https://lfz-hangouts.herokuapp.com/

## Stack

HTML, CSS, JavaScript, React.js, Node.js, Express.js, Postgresql, lodash, date-fns, AWS, mime, multer, multer-s3, Babel, Webpack, Passport

## Features
1. User can create an event at a location with event details, date/time, and image
2. User can view events in a list
3. User can view events on a map
4. User can invite friends to the event

## Stretch Features For the Future
1. User can accept/decline (RSVP) to events
2. User can see RSVP responses
3. User can edit events
4. User can delete events

## Preview

![final-project-login-demo](https://user-images.githubusercontent.com/85271794/134993240-08ce3c1e-cfba-4cdb-875a-09b872f3d1bd.gif)
![final-project-feature-demo](https://user-images.githubusercontent.com/85271794/134993594-085820f3-b95c-47a7-b28b-4314562d4ed0.gif)

## Requirements
- Node.js 10 or higher
- NPM 6 or higher
- MongoDB 4 or higher

## Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/hsuisaac/final-project.git
    cd final-project
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Start the postgresql server

    ```shell
    sudo service postgresql start
    ```
    
1. Import data

    ```shell
    npm run db:import
    ```

1. Start up the database

    ```shell
    pgweb --db=finalProject
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
