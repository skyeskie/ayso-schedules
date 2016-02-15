See Github issues for major milestones
Remove items if added as Github issue

DAOs

- [ ] Finalize DAO update operation
- [ ] Persist lastUpdate in HTTP initializer
- [x] LocalStorage DAOs
    - [x] Settings
    - [ ] WeekCache
    - [ ] ?Teams
    - [ ] ?Games
- [ ] SQL storage DAOs
    - [ ] Games
    - [ ] Teams
    - [ ] ?WeekCache

Add pipes

- [x] Name swap (Last, First => First Last)
      Alternatively handle in Coach->Team transform
- [ ] Color favorites (2-team list view)
- [x] Format team in 1-team: at/vs/bye
- [ ] Add custom DatePipe

TODO:

- [x] default week to current week in WeekView
- [x] Handle last update
- [x] Keep region ID numeric
- [x] Better loading handle
- [ ] Have single configuration class
- [ ] re-use angular isBlank() ?
- [ ] Make sure service calls are in ngOnInit instead of in the constructor

- [ ] Navigate UP instead of just to Home
- [ ] Adjust backend to use same data models

Typing

- [x] Change all Number,String,etc to primitives
- [x] Make sure everything is typed
    - note: done as much as possible for now

Error handling

- [x] Create logging environment
- [x] Add different error types
- [ ] ?Switch to use Angular's parseInt
- [ ] Global error handling display
    - Option to show console messages?
    - Offline info (update) or error (twitter, google, init)
- [ ] Make sure can remove logging in prod (at least some levels)

View

- [ ] Handle no coach (TBD)
- [ ] Show field better; perhaps in config?
- [ ] Hide region if default?

Bugs:

- [ ] If URL to /init already has GET, keep those
- [x] Region filter doesn't work for /teams
- [ ] Field/directions don't work for /game/:id
