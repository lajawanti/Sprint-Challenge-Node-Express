# Review Questions

## What is Node.js?
-->     Node.js is a runtime environment, a platform used to execute JavaScript  applications outside the browser(like `create-react-app` which works outside browser. 
        Node is popular to build servers.

## What is Express?
-->     Express is a lightweight, JavaScript library for building servers on Node.js.

## Mention two parts of Express that you learned about this week.
-->     Middleware

## What is Middleware?
-->     Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. 
        These functions are used to modify req and res objects for tasks like parsing request bodies, adding response headers, etc.

## What is a Resource?
-->     A resource is everything inside a Restful Web API that can be accessed by a UNIQUE URL.

## What can the API return to help clients know if a request was successful?
-->     status code (200) or (2XX) depending on REQUEST.

## How can we partition our application into sub-applications?
-->     Using express routing.

## What is express.json() and why do we need it?
-->     express.json() :- This is a built-in middleware function in Express. It parses incoming requests with JSON payload.
