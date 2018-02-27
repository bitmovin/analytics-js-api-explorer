# Bitmovin Analytics API-Explorer

This application provides a Playground for you to test out Bitmovin Analytics queries using the [Bitmovin Javascript API Client](https://github.com/bitmovin/bitmovin-javascript). 

To see it in action and play around with the API please visit the API-Explorer: 

[https://demo.bitmovin.com/public/analytics/api-explorer/](https://demo.bitmovin.com/public/analytics/api-explorer/)

Documentation on what queries to run and the Bitmovin Analytics API can be found in our [Developer Section](https://developer.bitmovin.com/hc/en-us/categories/115000141074-Analytics)

*Note: The API-Explorer requires an active Bitmovin API Key to work - you can sign up for free [here](https://dashboard.bitmovin.com/signup). Please also read our [Getting Started Guide](https://developer.bitmovin.com/hc/en-us/articles/115004395493-Getting-started-with-Bitmovin-Analytics)*

## Run it

To install the application, clone this repository, open the project directory in your terminal and run

```
npm install
```

Once all dependencies are installed, start the application with

```
npm start
```

If you're using the [Yarn](https://yarnpkg.com/lang/en/) package manager, run `yarn install` and `yarn start` instead.

The application will pop up in your browser where you're asked for your Bitmovin API key. Once you've entered it, the dashboard will load your analytics data.

## Technologies used

This example dashboard is built with [React](https://reactjs.org/), [Moment.js](https://momentjs.com/) and [React Bootstrap](https://react-bootstrap.github.io/).
