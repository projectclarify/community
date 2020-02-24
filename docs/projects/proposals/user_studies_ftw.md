# User studies (for the win)

## Summary

### Goal

The development of ML-enabled user experiences that are able to improve users cognitive and/or emotional effectiveness - e.g. ML-enhanced meditation, EQ training, cognitive gaming, or supportive background feedback during work.

### Problem

Internal processes for developing these have involved reliance on individual intuition regarding what UX’s will be effective as well as expensive (~$100k) and protracted (~1y) periods of building an evaluation before seeing results indicative of the relative merits of alternatives. Further, some designs incur significant burden by requiring data to be collected on-site/in-person by study coordinators or by way of a model where devices with training applications are updated and installed each individually then manually distributed to participants. Further, holding the UX constant we may have various model designs to explore e.g. in regard to fairness or more generally to discover modes of reduced performance.

Thus a solution will address many or all of the (inter-related) issues of expense, time, reliance on intuition, space, personnel, and deployment issues.

### Solution summary

Data driven UX design and optimization provided data obtained from (fairly compensated) crowd-workers/remote who use and provide data on the usefulness of browser-based UX versions that auto deploy and trigger such studies on merges into protected `studies/*` branches; together with a UX development starting point that allows application-area developers to build only one component - forked from a template as opposed to a complete application and its operation.

## Requirements

- Makes it easy to develop new user experiences including those that require auth, database, or requests to served model api. An experienced javascript developer, provided visual design and description of functionality, can prototype a new ready-to-deploy UX in around one days work or less than $1,000 (two-orders reduction from previous baseline in cost and time).
  - PA: Developers provided template components spanning use categories to fork allowing them to focus exclusively on implementation of pre-specified interactivity and design without the need to interface with complex application.

- Makes it easy to obtain detailed characterization of the differences of UX or model variants in terms of their effectiveness (e.g. by design, model, user demographics, etc.) provided an existing UX implementation.
  - PA: Provided passing review, simply merge PR into protected branch to auto-deploy and auto-launch study.

- Support for crowd workers or other remote participants to join a study provided a join link or code without advance knowledge of their email address or other identifier

- Avoid the expense of full-time operations staff to operate system including on-call, daily patching, manual deployments and scaling, 
  - PA: Use managed services (e.g. Google Cloud Functions, Firestore, and Firebase Auth) wherever possible and robust auto-scaling systems components (e.g. KFServing on GKE with auto-upgrade) where not.

- Many distinctly different studies may be performed in parallel without peer conflict or undue manual operations.

- Support of a choice of UI framework but flexibility to support various.

- The ability for the ML program to version its own models API independent of study versions but still allowing studies to integration test against API versions.

- QA process (1) prevents new studies from breaking ongoing ones, (2) prevents new studies from not working in production as intended.
  - PA: Implemented in the form of (1) automated system, application, and unit testing, (2) automated analysis of test coverage of new code, and (3) manual review.

- Security review process ensures (1) user’s data remains secure and (2) service interruptions are prevented.
  - PA: This is typically achieved with a combination of automated security scanning and manual security review.

- Systems design prevents malicious side-effects of user-provided content (e.g. form input).
  - PA: Partitioning of system components by need for device access or elevated permissions and enforcement of restricted interface.
  - PA: Wherever applicable, sandboxing with gVizor or managed service equivalent.

- Front-end framework choices contribute to minimizing security risk
  - PA: By limiting surface and maximizing interpretability of application dynamics.

## Solution design

### User flow

1. Users navigate to provided URL and log in.
2. If a user has not already joined a study they paste a provided join code into a form.
3. While the join code is being checked, a loading view is displayed.
4. Once the code has been checked the UI either displays "waiting list", "thanks for participating", or loads study UI.
5. From study UI, user engages in training experience that are enhanced by predictions of model served from cloud.

### Issues and components

#### Access control via functions vs. database rules

Various operations need authentication including:

- Checking user-provided signup tokens and responding to valid ones with the correct updates to access claims
  - PA: Database rule specifies which section of a database to which a user can write an access code together with a Firestore Database trigger on that path for a consumer function to check the code an update a user's access.

- UI requesting study membership/registration related info on whether a user should be shown one of: "please register", "waiting list", "thanks for participating", or the primary study UI.
  - PA: UI simply reads section of Firestore DB that directly indicates the correct case.

- Making requests to the served model API.
  - PA: For simplicity, iniitally, all enrolled participants are permitted to call all model APIs. A single set of cloud functions are provided by the model API which simply verify a provided auth token as to whether the user is enrolled in a study. In the future, a registry of study-by-model permissions can be maintained and checked as well, if relevant.
