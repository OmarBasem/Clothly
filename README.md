# Clothly React Native App

[![Build Status](https://app.bitrise.io/app/b508e6c83c5cf07a/status.svg?token=UPOJq4k9mG8XT24dv58YcA&branch=master)](https://app.bitrise.io/app/b508e6c83c5cf07a)

This is a demo eCommerce mobile app that I have built in 3 days.

* iOS build: https://app.bitrise.io/artifact/133058262/p/dbffc3e244e38cea97599fea30feaa86
* Android build: https://app.bitrise.io/artifact/133058259/p/bc8bf93dff99269ba3731e2edf71bbdf

## Technologies Used

* Framework: <b>React Native</b>
* Programming Language: <b>TypeScript</b>
* React Style: <b>Functional Components + Hooks</b>
* State Management: <b>RTK (Redux Toolkit) + Redux-Saga</b>
* Unit & Integration Testing: <b>Jest</b>
* End-to-End Testing: <b>Detox</b>
* CI/CD: <b>Bitrise</b>

The following steps show the build process of the app.

## STEP 1

* Created multiple tabs, screens and components for the app to be functional.
* Created the ProductScreen as the UI in ./ProductScreen.png. 
* The needed data is stored in a variable in /app/data.json without the use of redux or API request as required for step 1.
* Also created a HomeScreen to display the list of product items. 

## STEP 2

* The app now has a state management library (redux) and is reading the data from the redux store instead of the local JSON file.

## STEP 3

* The data now comes from a JSON file stored in AWS S3.
* As soon as the app starts it makes an API request to download the JSON file, and then dispatch the data in the redux store.
* An ActivityIndicator is displayed while the data is downloading.

## STEP 4

* Created profile screen
* User data is fetched from the Rick and Morty API, and is persisted in the redux store
* Now all elements of the layout in ./ProductScreen.png are functional
* The user can change the category (MEN, WOMEN)
* As the process of creating JSON files is repetitive, for the other categories a message will be displayed to the user saying "We ran out of {category} products" 
* Added functionality to filter items on the HomeScreen by typing into the search bar
* The product image can be viewed in full screen
* The user can change the selected size and color


## STEP 5

* Carried out unit testing using Jest for the different components, screens, actions and reducers. Jest tests can be found under the '__ tests __' directory.
* Carried out end-to-end testing using Detox for all the implemented functionalities in the app. Detox tests can be found under the 'e2e' directory.


## STEP 6

* Added app icons
* Firstly, I built the app locally and tested it for the following: ios-debug-simulator, ios-debug-device, ios-release-simulator, ios-release-device, android-debug-emulator, android-debug-device, android-release-emulator, android-release-device
* Integrated the GitHub repo with Bitrise
* Built, signed and deployed iOS and Android builds using Bitrise
* iOS build: https://app.bitrise.io/artifact/133058262/p/dbffc3e244e38cea97599fea30feaa86
* Android build: https://app.bitrise.io/artifact/133058259/p/bc8bf93dff99269ba3731e2edf71bbdf

## STEP 7

* Rewrote the app from JavaScript to TypeScript
* Migrated from Redux to the new Redux Toolkit
* Migrated from Redux-Thunk to Redux-Saga
* Added integration tests of Sagas and Reducers

---------

## INSTALLATION

* run `git clone https://github.com/OmarBasem/Clothly.git`
* run `cd Clothly && npm install`

### iOS
* run `cd ios && pod install && cd ..`
* run `react-native run-ios`


### Android

* Open Android studio and make sure JDK 11 or higher is set for the project
* Start an emulator
* run `react-native run-android`

### Running tests

Jest tests: run `npm test`


Detox tests:

* Make sure <a href="https://wix.github.io/Detox/docs/introduction/getting-started">Detox</a> is set up on your machine

---> iOS

* Start a simulator (iPhone 13 Pro) and run the app on it
* Build iOS detox tests: `detox build --configuration ios.sim.debug`
* Run iOS detox tests: `detox test --configuration ios.sim.debug`

---> Android

* Start an emulator (Pixel 4 API 30) and run the app on it
* Build Android detox tests: `detox build --configuration android.emu.debug`
* Run Android detox tests: `detox test --configuration android.emu.debug`



