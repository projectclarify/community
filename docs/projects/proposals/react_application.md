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

## Airframe screenshots

Here's what the stock Airframe UI gives us (themed in indigo):

![airframeui](/react-airframe-fig.png)


## Development

There are a few initial prototyping steps that can be performed to obtain more info:
1. Obtain react-airframe and run it locally checking for jank and bugs
2. Attempt to deploy it to firebase hosting (and check for jank and bugs)
3. Integrate firebase auth and database (demo reads and writes) with react-airframe
4. Check for security warnings on setting up react-airframe and if these need to be fixed try to do so while maintaining desired functionality

## Provisional page structure

How we might structure the application with a focus on mental training activities and in the future review of stats in this regard (as well as background-acquired stats):

- Sign in with Google (for now the landing page)
- Sign up wizard
  - (in the future) Possibly several survey steps
  - Code entry, validation, and confirmation (single page that changes state instead of step change)
    - Please provide a code
    - Confirming code (loading animation)
    - Code confirmed, continuing to dashboard
- Dashboard (for now defaults to the one available session view)
  - Session view showing a series of cards, accordion, list etc. that correspond to a series of steps to perform
    - (in the future) Nest the session view inside the navigation structure of the sessions view that shows many available sessions. Upon clicking on one probably page change to that session but maybe modal (followed by second modal for activity? prob not)
  - (in the future) A user data view if that becomes relevant e.g. figures of your state or cog performance over time?
  - (in the future) User profile and settings view if it becomes relevant
- Full screen activity modal that is launched by clicking on one of the session steps
  - Activities have the wizard structure but where step icons are very minimal (possibly just progress bars)
- You are now logged out (log back in)
- You're on the waiting list (for invalid join code)

