# Front-end application

(Heavy work in progress)

@gundralaa @siddarthasen @cwbeitel

## Context

Work is ongoing on the FTW platform for deploying user experiments. Currently this is being developed with highly simplified web components to provide a foil for the development of back end Cloud Functions and Firestore database rules.

We can build minimalist prototypes of the user experiences we would like with web components vis. the core objectives of Project Clarify but the needs of application-area developer-users typically require much more of an application.

## Requirements

These have a large overlap with those currently described in the [FTW proposal](https://docs.cl4rify.org/projects/proposals/user_studies_ftw.html#requirements).

## Planning

Initially, experiment with building a React application from an Airframe (https://github.com/0wczar/airframe-react) starting point.

FTW development will proceed in parallel, establishing means for study deployment and crowd dispatch as well as back-end functions and database rules with 100% compatibility / orthogonality to React dev.

As this work is still in an exploratory phase there are several questions still to answer:
- Should our development fork an existing open source application or start from create-react-app?
- Should we use TypeScript?
- Toolchain choices (e.g. yarn)
- If we were to use react-airframe, is there a ui design kit to use e.g. for sketch or figma? Are there comparable alternatives where this is available?
- How do we feel about the test coverage of react-airframe vs alternatives?

## Development

There are a few initial prototyping steps that can be performed to obtain more info:
1. Obtain react-airframe and run it locally checking for jank and bugs
2. Attempt to deploy it to firebase hosting (and check for jank and bugs)
3. Integrate firebase auth and database (demo reads and writes) with react-airframe
4. Check for security warnings on setting up react-airframe and if these need to be fixed try to do so while maintaining desired functionality
