# Summary

Welcome to the Github Repository Search App! This project was built with React and TypeScript and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This app consumes the free Github [API](https://docs.github.com/en/rest).

Watch a video walkthrough of the app [here](https://www.loom.com/share/bfeaa83c2e3747f3951bfbbf6e136bd1?sid=5fc0fda4-7bc5-4ae8-b997-54dfe828898e).

I added several third party libraries:

- [axios](https://axios-http.com/docs/intro) for making the API request
- [tailwindcss](https://tailwindcss.com/) for styling
- [classnames](https://www.npmjs.com/package/classnames) for conditional styling
- [jest](https://jestjs.io/) for testing

I implemented the following features:

- Form where user can enter username and select whether it belongs to a user or organization
- Return table of repositories belonging to that user upon submitting the form
- Paginate the table so that only 5 repositories are shown per page
- Ability to filter and sort the table
- Verify functionality with Jest unit tests

If I had more time, I would add the following features to make the app more performant and scalable and production-ready:

- Authentication & Rate Limiting

  - Implement OAuth authentication to access a higher rate limit for API requests — could use something like [Firebase](https://firebase.google.com/docs/auth) to let users log into their Github accounts and include authentication token in header of API request as recommended [here](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28).
  - Handle rate limiting in the UI by displaying error messages when rate limit has been exceeded, telling users to try again in a few minutes.

- Caching

  - Implement caching to store API responses or expensive computations temporarily
  - Utilize React caching features such as useMemo and useCallback

- Performance Optimization

  - Lazy loading components

- Scalability

  - Scaling state management with [MobX](https://mobx.js.org/README.html) or [Redux](https://redux.js.org/). For example, if we needed to fetch repositories in another component as well, I would create a repositories store and fetch and set the repositories there so that multiple components can access it instead of just the RepositorySearch component.

- Analytics

  - Use tools like [Amplitude](https://amplitude.com/) to analyze user behavior and enhance user experience

- Internationalization

  - If we wanted this app to be accessible to users around the world, use [i18n](https://www.npmjs.com/package/i18n) for supporting multiple languages.

- Automated Testing and CI/CD:
  - Write automated integration and end-to-end tests, not only unit tests.
  - Set up CI/CD for automated builds, tests, and deployments.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Runs the unit tests for the components.
