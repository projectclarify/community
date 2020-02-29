# User studies FTW

@gundralaa @siddarthasen @cwbeitel

## Summary

### Goal

The development of ML-enabled user experiences that are able to improve users cognitive and/or emotional effectiveness - e.g. ML-enhanced meditation, EQ training, cognitive gaming, or supportive background feedback during work.

### Problem

Internal processes for developing these have involved reliance on individual intuition regarding what UX’s will be effective as well as expensive (~$100k) and protracted (~1y) periods of building an evaluation before seeing results indicative of the relative merits of alternatives. Further, some designs incur significant burden by requiring data to be collected on-site/in-person by study coordinators or by way of a model where devices with training applications are updated and installed each individually then manually distributed to participants. Further, holding the UX constant we may have various model designs to explore e.g. in regard to fairness or more generally to discover modes of reduced performance.

Thus a solution will address many or all of the (inter-related) issues of expense, time, reliance on intuition, space, personnel, and deployment issues.

### Solution summary

Data driven UX design and optimization provided data obtained from (fairly compensated) crowd-workers/remote who use and provide data on the usefulness of browser-based UX versions that auto deploy and trigger such studies on merges into protected `studies/*` branches; together with a UX development starting point that allows application-area developers to build only one component - forked from a template as opposed to a complete application and its operation.

## Requirements

1. **UX prototyping under $1k and 24h:** Makes it easy to develop new user experiences including those that require auth, database, or requests to served model api. An experienced javascript developer, provided visual design and description of functionality, can prototype a new ready-to-deploy UX in around one days work or less than $1,000 (two-orders reduction from previous baseline in cost and time). Much of this can be accomplished by simply forking a well-established application and component library like airframe and application library like React.

2. **Automated characterization:** Experimenters need only furnish a UX version and the system takes care of deploying that, farming it out to users, collecting data, and notifying on completion. This makes comparing some UX designs as easy as pushing their code together with a config to a properly-configured GitHub repository.

3. **Crowd compatibility:** Compatibility to be used with crowd-sourcing e.g. where workers are sent a unique link or non-unique link together with a join code. Such an approach will allow us to get preliminary data about the efficacy of methods saving us the large amount of money spent in the process of on-site, user-**sequential** studies that require substantial space and personnel to conduct.

4. **No-ops:** Wherever possible, reduce operations costs that arise from cost of building, maintaining, powering, physically securing, and inevitably upgrading on-premises computing systems as well as deploying, upgrading, patching, manual scaling, on-call monitoring, etc. of deployments (whether prem or off-prem). All of this can easily be accomplished by using the managed services of any of a variety of cloud providers and for the small minority of components that need custom deployments make use of robust industry standards (e.g. KFServing on GKE for GPU acceleration of served models).

5. **Unlimited parallelism:** Do not impose a limit on the number of user studies that can be performed in parallel. Our center alone has a very large diversity of applications and UX’s and we would need to be able to test multiple variants of each of these potentially all at the same time (again as in 2 without operator support).

6. **Opinionated but flexible UI framework:** Initially, demonstrate with a best-practice choice of UI framework and supporting tooling but don’t paint the project into dependence on that particular framework, set of tools, or much less that particular UI.

7. **Healthy boundaries for UXR/MLR:** Allow the machine learning research program to proceed orthogonally to the UX research program, interfacing through a release-versioned served model API. Including the means to test continued integration with this interface. UX developers are consumers of well documented deployed models avoiding a JS developer being diluted into the realm of model serving, for example, or similarly an ML research specialist being diluted into the realm of UX development. 

8. **Industry-grade deployment QA and SA:** No experiment is run without it first passing many layers of testing, quality and security review, and automated security scanning. Can be accomplished by requiring PR review before merging into protected GitHub branch range that deploys-on-push via GitHub Actions or equivalent.
9. **Secure partitioning:** User input is securely partitioned from system resources such as by using managed services that run gVizor under the hood or when not applicable carefully controlling interface.

10. **Secure front-end:** Forkable front-end implements security best practices including minimizing dependencies, scanning and patching for new CVEs, and minimizing application complexity wherever possible.

## Design

### Provisional page structure

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

#### Database model

```bash
users/
  [uid-1234]/
    study-membership/
      [“study-12345”, ...] # the id of studies one belongs to are written here
    join-code-scratch: “...” # join codes are written here to trigger checking
    studies/
      study-12345/
        ur/
          … # users can read study-specific data here but not write
        urw/
          … # user can read or write study-specific data here

```

#### On-sign-in

If necessary, when a user signs in for the first time, a Google Cloud Function can be triggered by a Firebase Auth onCreate event that creates any database structure that is assumed.

#### Join code validation

When a join code is provided by the user, it is written to an indeed user-writable database section (users/uid-1234/join-code-scratch) that is configured to trigger a consumer function to check the validity of the code and if valid write the ID of the study it corresponds to to users/uid-1234/study-memebrship. 

#### Study membership UI response

The study UI displays one of serveral pages conditionally based on what value is present in the database in regard to (1) whether a user has access to the current study and (2) whether they have already attempted to provide a join code. Changes to database values trigger responses client-side via registration of an onSnapshot responder function that handles such change events (i.e. in this case simply updating client-side variable(s) that are the basis for the aforementioned state change logic. These states include those described above including “please register”, “waiting list”, “thanks for participating”, or the primary study UI.

#### Authenticated served model requests

For simplicity, initially, all enrolled participants are permitted to call all model APIs. A single set of cloud functions are provided by the model API which simply verify a provided auth token as to whether the user is enrolled in a study by (1) calling the firebase admin api to obtain the ID of the user for that token then (2) checking that token against a database section describing active membership. Even more simply, for prototyping purposes, we can use a Firestore database rule that requires a user has been enrolled in a study in order for the front-end to write data to a database section that is configured to trigger queries to the served model API. This may incur a latency cost in exchange for simplicity of implementation while still establishing several core components that would be needed for the downstream version that supports faster inference.

#### Forkable UI

Per the first requirement above, UX developers should be able to focus on extending one of a set of well-established UX components within a broader component ecosystem and well-established client-side application (that indeed further already supports the rest of the requirements above).

As this work is still in an exploratory phase there are several questions still to answer:
- Should our development fork an existing open source application or start from create-react-app?
- Should we use TypeScript?
- Toolchain choices (e.g. yarn)
- If we were to use react-airframe, is there a ui design kit to use e.g. for sketch or figma? Are there comparable alternatives where this is available?
- How do we feel about the test coverage of react-airframe vs alternatives?

##### Airframe experiment

Here's what the stock Airframe UI gives us (themed in indigo):

![airframeui](/react-airframe-fig.png)

There are a few initial prototyping steps that can be performed to obtain more info:
1. Obtain react-airframe and run it locally checking for jank and bugs
2. Attempt to deploy it to firebase hosting (and check for jank and bugs)
3. Integrate firebase auth and database (demo reads and writes) with react-airframe
4. Check for security warnings on setting up react-airframe and if these need to be fixed try to do so while maintaining desired functionality
