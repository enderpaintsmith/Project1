# Project1
# Shortly URL Shortener

## Project Overview

For this project, I built a responsive URL shortening application based on the Frontend Mentor Shortly challenge. The goal was to recreate the provided design while developing a functional application that allows users to shorten URLs using the Bitly API.

I focused on making the application easy to use, visually consistent, and responsive across different screen sizes. I also wanted to strengthen my understanding of JavaScript, API integration, and how the frontend communicates with a backend service.

## Technologies Used

I used HTML5, CSS3, and JavaScript to build the application. I integrated the Bitly API through Netlify Functions to handle URL shortening requests and keep the API token separate from the frontend code. I also worked with localStorage, Git, GitHub, and Netlify throughout the development process.

## Features and Functionality

The application allows users to enter a URL and generate a shortened link. JavaScript handles form validation, displays error messages when necessary, and updates the page dynamically when a new link is generated.

I also implemented a Copy button that allows users to copy shortened URLs to their clipboard. The layout adjusts for desktop and mobile screens, including a responsive navigation menu for smaller devices.

I added localStorage functionality to save shortened links so they can remain available after refreshing the page.

## Development Process

I started by organizing the project files and building the HTML structure based on the supplied design references. From there, I worked on the CSS styling and responsive layout, making adjustments to ensure the different sections displayed properly across screen sizes.

Once the layout was in place, I moved on to JavaScript functionality, including form validation, event handling, DOM manipulation, and displaying shortened links.

The next step was integrating the Bitly API. I used a Netlify serverless function to handle requests rather than exposing the API token directly in the browser.

## Challenges and What I Learned

One of the biggest challenges was getting the Bitly API and Netlify configuration working together. I ran into issues with environment variables, local server ports, and connecting the different parts of the application.

Troubleshooting these problems required me to spend more time working in the terminal, reviewing error messages, and testing individual parts of the application to determine where the issues were coming from.

This project gave me more hands-on experience with asynchronous JavaScript, API requests, error handling, and working with serverless functions. It also helped reinforce concepts I've been learning throughout the course, particularly responsive web design, DOM manipulation, and debugging.

## Running the Project Locally

To run the project locally, clone the repository and open the project folder in VS Code. Create a `.env` file containing a valid Bitly API access token using the variable name `BITLY_ACCESS_TOKEN`.

With the Netlify CLI available, run `npx netlify dev` from the project directory and open the local address provided in the terminal.

The application requires a valid Bitly API token to generate shortened URLs.

## Future Improvements

With more time, I would like to continue improving the application's functionality and overall user experience. This could include better feedback during API requests, additional options for managing saved links, and further improvements to the code structure.

## Acknowledgments

This project is based on the Frontend Mentor Shortly URL Shortening API challenge. The original design references and assets were provided as part of the challenge.