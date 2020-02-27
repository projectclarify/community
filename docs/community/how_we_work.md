# How we work

Our most fundamental intention in this project is derive solutions to grand challenge problems that provide great value to the world. This project is an experimental and iterative constructive process along multiple parallel threads not limited to the technical one but also that regarding our community process and values.

## Getting it right

Perhaps one of the most fundamental tenants of our process is that logic should be used to make decisions and that individuals should be provided the opportunity to engage in principled discourse about any aspect of the project - technically or organizationally, current or planned. We see this tenant as necessary and naturally derived from our intention to succeed in our core project.

This tenant is necessary for several reasons. One is that when an inefficient or incorrect strategy is either not identified or not permitted to be challenged as such (whether for lack of means or indeed outright suppression) or the process of challenging it is not a dispassionate, person-independent process of purely logical discourse - such sub-optimal strategies are allowed to be implemented or to continue operating at the expense of project objectives.

Another reason the reason tenant is necessary is to continue to make clear to our members that this community is a place for their free determination; that here no rules or instructions are dispensed to members that are not open for principled debate. Providing members with such agency is necessary both to attract (and train) thinkers of this type as well as so that better solutions are found more quickly.

So welcome, members, and let your voice be heard.

## Quarter flow

Our current engineering and research process has the primary phases of proposal, planning, rounds of sprints, and mid- and end-of-quarter status checks. We see this as a minimum standard practice and indeed as per the previous accept proposals for revisions of this.

- **Proposal period**: 4 weeks before the start of the quarter
- **Planning and prototyping period**: First two weeks of the quarter
- **Status check-ins**: Month 1, 2, and end of quarter.

### Proposal period

In the service of the reason tenant we conduct an open proposal and review process. This for example gives an opportunity for plans to be made further specific given expert input, for members to debate alternatives of high-level approach, and for high-level division of labor to be determined. The more specific a proposal can be about the technical plan that will be employed both (1) the easier it will be for reviewers to give helpful input on refining this as well as (2) lighten the burden of teams figuring this out on the fly during the quarter.

Project approval is equivalent to the merging of a PR that moves a proposal draft from community/projects/proposals into community/projects/current.

### Planning and prototyping period

During the first two weeks of the quarter, we engage in a process of translating high-level proposed work first into a set of quarter-level “epics” or measurable goals and members self-assign according to these epics and consistent with the general division of labor proposed and approved during the previous period. This is to occupy up to the first week of the quarter.

During the second week, these epic groups determine an initial draft of the set of tasks that will be necessary to accomplish those goals. These are recorded as GitHub issues as assigned priority and difficulty estimates and epic teams self-allocate and individually assign these for their first sprint period. This second week of the quarter is where the process moves from the community-level to the team level - wherein communication and other overhead are minimized but within the context of a process to maintain integration (see following). Minimal prototyping during the team-level planning period can be helpful for the refinement of alternatives of approach.

### Sprints and check-ins

Following the planning period, the quarter proceeds with a series of two-week “sprints” that give teams an opportunity to both set specific short-term goals as well as to periodically pause to re-assess. Teams conduct their sprints independently but make use of GitHub issues and ZenHub tools for tracking sprints so the broader community can be generally informed of their activities.

Status check-ins are performed at the one, two, and three (end of quarter) month marks. For each of these, teams update status narrative (and if relevant, strategy) sections of their respective project working document (in community/projects/current/). Both maintaining a single source of truth as well as repeatedly returning to these is designed to help maintain alignment between activities and plan as well as remind teams to continue to update these as plans evolve.

### End-of-quarter review

At the end of quarters, project status is reviewed in the process of reviewing proposed next-quarter extensions to existing projects or if relevant planned archiving of completed projects. A PR of a project from community/projects/current to community/projects/archive is an appropriate last step for a completed project. For existing projects, the same proposal process as for new projects applies (indeed for the same reasons of providing an opportunity for discourse).

### Quarter calendar summary

The following table summarizes these phases of the quarter flow in regard to periods demarcated in units of weeks from the start of the quarter (wfs).

| Begin (wfs) | End (wfs) | Title | Summary  |
|---|---|---|---|
| -4 | -2 | Proposals drafting, submission | Teams form and prepare proposals that are versioned in community/projects/proposals. Project leaders help in integrating diversity of interested contributors and in formulating plan. Proposals are submitted by PR of proposal from /proposals/ to /current/. |
| -2 | -1 | Review. | Proposals are reviewed by reviewers and either approved outright or returned with requests for revisions. |
| -1 | -0.5 | Revisions due. | Revisions are due |
| -0.5 | 0 | Final review. | Final review and approval is performed. |
| 0 | 1 | Community-level planning | Projects are translated into set of high-level epics/measurable goals that integrate well at the project-level. Members self-assign according to epic of interest approximately consistent with proposed division of labor. |
| 1 | 2 | Project-level planning | Project teams translate epics into issues and perform estimation and prioritization concluding with allocation of first sprint and initial sprint approximate division of labor. |
| (N%2==0) | (N%2==0) + 2 | Sprint | Teams engage in sprints, continuously updating status via GitHub issues and ZenHub and continuously integrating implementations with master branch. |
| NA | 4,8,12 | Mid-quarters | Teams update project docs (in /community/projects/) including status narratives, stratgy summaries, and any relevant key results. |
| -4 | -2 | Proposal drafting | Where applicable, teams propose strategies and specific methods for how projects will be extended into subsequent quarters. |

## PRs and QA

In order to successfully conduct a project as complex as ours we need to apply various standards to new code submissions to ensure they continue to uphold our standards for function, maintainability, usability, and security. The latter is especially relevant as some portions of the project are intended to handle clinical or otherwise private data. All of these are further relevant in that the accumulation of technical debt indeed can and will translate into a very high month-over-month dollar cost if the proper steps are not taken to prevent or mitigate it.

A preliminary set of these are verified using automated tooling:

| Purpose | Method |
|---|---|
| Maintain system-level integration | Systems-level integration testing |
| Ensure new code is included in testing | Instrument test coverage and automated enforcement of coverage differential |
| Code maintainability vis. docs | Instrument code documentation coverage and format |
| Consistency of style | Instrument consistency of code style with provided auto-formatting utility configurations (with limited tooling to auto-correct) |
| Security (auto) | Automated static analysis of security of browser code and automated notifications of CVEs in listed dependencies |

Indeed many standards are difficult to instrument and are enforced first by human peer-reviewers and lastly by a senior reviewer as indicated in repository subtree-specific owners files (i.e. indicating relevant peer reviewers and approvers for that subtree).

Each pull request should include a reference to the GitHub issues it either partly or fully addresses and in the latter case upon merging of the PR the referenced issue should be closed.

For some branches, merging PRs into those branches will trigger a deployment of a user interface, served model, or version of project documentation into production (a method known as GitOps). Most notably, formalizing the testing, review, and approval process for updates of production assets is an industry standard best practice.

## Meetings and communication

In the interest of efficiency we institute a clear protocol by which communications will be handled through layers of escalation to requiring scheduling meeting time. This practice is derived from an understanding of the experience of software engineers and the need for as much uninterrupted time for deep work as possible. Such an approach is more appropriate for those who are comfortable with the digital tools we use to do so but nevertheless indeed do prioritize developer effectiveness over saving those parties onboarding time vis. new communication tools.

The escalation process is as follows (steps following in succession, if necessary):

- Determine whether the issue, task, question etc. can be resolved by examining currently available information. Have you done a search in the appropriate places (e.g. contents of past discussions, GitHub issues, the codebase, available working docs, or if relevant Google or StackOverflow)?
- The former may result in you finding a relevant existing GitHub issue to comment on.
- Comment in Slack
  - Make an open comment in a Slack channel. Many people will see this and whoever is available first will answer.
  - If you don’t receive an answer, direct message the person you think might know. Do not be shy in direct-messaging project leads - they want to and expect to hear from you and if your question is misdirected they will help you direct it to the right recipient.
  - If a group discussion is relevant, we will try to have that asynchronously via Slack.
- The previous steps should elucidate the appropriate next step, if any - file or update an issue, add an agenda item to an existing recurring meeting, or if indeed necessary schedule an additional meeting.

We currently have five weekly meeting periods into which we can allocate discussion items as needed but that typically conclude as soon as all outstanding items have been covered - potentially in as little as 15min of a reserved 1h time slot. Please refer to the community calendar for updated information on the times for these.

## Remember the user(s)

Currently this project has three types of users. Other Project Clarify developers, external developer-users, and end-users. To disambiguate:

- **Contributor developer user**: A developer who is contributing directly to Project Clarify such as in the form of model or infrastructure improvements, improvements to our core studies platform, etc. For existing contributors - these are your peers. You should remember the need to write code and documentation in part from their perspective of potentially needing to understand and extend your work. This includes new developers that join the project that won’t have the same discussion context.
- **Non-contributor developer user**: A developer who is not contributing directly to Project Clarify but rather using our work in the process of doing other work such as in building and piloting machine learning enabled user experiences. They have sufficient technical skill to be able to follow clearly written software docs of the kind we will continue to maintain at [docs.cl4rify.org](https://docs.cl4rify.org).
- **End user**: A (potentially non-developer) user such as who is using a browser-based user experience we have built to improve their mental effectiveness. Needs it to just work and needs to be regularly polled as to the clarity and usefulness of that thing.

Properly serving all three types of users begins with the proposal process as described above both for informing the first type of user as well as by including a plan that considers the perspective of the latter two. This is further enacted when PR reviewers and approvers include these standards in that process. Documentation and consideration of various user perspectives are things to both plan and continuously maintain along with related software as opposed to something to be prepared or considered after the fact.
