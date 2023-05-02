# PHW HEF Prototype

A prototype web application for the PHW HEF project by Social Finance. The application is built with the intention of being deployed to Github Pages for public web viewing. It is a Jekyll application with a small amount of vanilla JavaScript (TypeScript) to add interactivity.

## Getting started

The application has the following pre-requisites:

- Ruby (3.2.2 or similar)
- Jekyll
- Node (16 or later), in order to build the JS layer and sample data
- a Github account with rights for deployment

It is suggested that Ruby Version Manager be used to run the apppropriate Ruby version for Jekyll. To get the application building and visible locally, the following commands should work, after switching to a login shell (/bin/bash --login or similar)

```
cd site
rvm use 3.2.2
gem install jekyll bundler
jekyll serve -l -b /phw-hef-prototype
```

#### JavaScript

JS uses a separate process, with the Jekyll build automatically moving the bundled files into the appropriate folders:

```
cd js
yarn && yarn watch
```

The JS application layer is componentized and uses a small toolset for handling DOM access and hydration.

## Deployment

The application uses Github actions to invoke a build and release run onto Github pages. The action is located in the .github folder and is triggered on merge to main via PR
