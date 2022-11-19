# Flight Footprint Calculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Description

The app uses the [API](https://api.goclimate.com/docs) provided by [GoClimate](https://www.goclimate.com/) to display to the user the CO2 emissions caused by flights.

Through a form, the user is able to enter origin and destination of the flight, choose the cabin class and the number of passengers of that flight.</br>
In a paragraph the submitted information will be displayed followed by the carbon footprint.

##
<img src="https://user-images.githubusercontent.com/98905459/202851117-78039f5f-97e0-436a-9d68-429520fc4ea6.png" alt="flight footprint at start" width="70%">

The origin and the destination of the flight shall be selected from the given list.</br>
<img src="https://user-images.githubusercontent.com/98905459/202851126-ad330572-3588-4239-a91d-eac02069da29.png" alt="flight footprint list of airports" width="70%">

If the text input by the user doesn't match any of the available airports then the list will be filled with a list item saying "No results found :(".</br>
<img src="https://user-images.githubusercontent.com/98905459/202851173-72c6cf92-30fe-4d98-8cb3-edbf9dfeb0b1.png" width="70%">

If the user does not select an airport from the list, they will be informed that the input is invalid with a message. </br>
<img src="https://user-images.githubusercontent.com/98905459/202851178-09d04203-9c5c-4e33-a79b-d239a9d4b6b5.png" width="70%">

The form will be invalid until all fields have a valid value.</br>
<img src="https://user-images.githubusercontent.com/98905459/202851188-820b852f-bfed-45a8-8f04-cbac46e99b19.png" width="70%">

If the form is valid then the "Go" button will be enabled and the form can be submitted.</br>
<img src="https://user-images.githubusercontent.com/98905459/202851192-94add602-65b2-456a-afa0-8134a2bcedbc.png" width="70%">

The result will be displayed. </br>
<img src="https://user-images.githubusercontent.com/98905459/202851198-bcbd8208-9202-4bbb-bbff-e64627e33b9b.png" width="70%">

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Links

You can try the app [here](https://flight-footprint-calculator.web.app/)!
