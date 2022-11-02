# Flight Footprint Calculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Description

The app uses the [API](https://api.goclimate.com/docs) provided by [GoClimate](https://www.goclimate.com/) to display to the user the CO2 emissions caused by flights.

Through a form, the user is able to enter origin and destination of the flight, choose the cabin class and the number of passengers of that flight.</br>
In a paragraph the submitted information will be displayed followed by the carbon footprint.

<img src="https://user-images.githubusercontent.com/98905459/199572395-45c0c6db-8812-4ad7-828e-ac21c825ea2b.png" alt="flight footprint at start" width="70%">

The origin and the destination of the flight have to be chosen from the given list.
<img src="https://user-images.githubusercontent.com/98905459/199572416-980a4336-3897-4eb9-8c42-b0988e05300f.png" alt="flight footprint list of airports" width="70%">

If the text doesn't much any of the available airports then the list will be filled with a list item saying "No results found :(".
<img src="https://user-images.githubusercontent.com/98905459/199573255-70a36cd5-b558-48fb-9319-14360669d0a1.png" width="70%">

The user will be informed that the input is invalid with a message
<img src="https://user-images.githubusercontent.com/98905459/199572435-5a2f5750-d5d5-4303-9194-b409c9724143.png" width="70%">

If the form is valid then the "Go" button will be enabled and the form can be submitted.
<img src="https://user-images.githubusercontent.com/98905459/199572596-f775479a-fc51-4370-8ca3-efb771805e64.png" width="70%">

The result will be displayed and the form will be reset
<img src="https://user-images.githubusercontent.com/98905459/199572607-554656a4-059f-4456-88af-3bd5f9d210da.png" width="70%">

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Links

You can try the app [here](https://flight-footprint-calculator.web.app/)!
