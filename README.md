# Fantasy Football App

For Milestone 2, we decided to work the feature to add a new league with team managers. We got most of the functionality
working, allowing a user to upload a .csv file that consists of the offline draft results for each manager. The goal was
to use an API to retrieve football player information, but we had trouble with their API. Hopefully we can figure out how
to use either ESPN's API or Yahoo!'s. There was also an issue with one of our routs to the backend. We were able to update the database using Postman to insert data, but when we tried our dev site, there would be a 400 error. That isn't a difficult fix, however, and it will be fixed shortly in the next couple days.

We created a Draft.js component that handles the league creation, and added supplementary code to the SideMenu and CoursesPage, which will eventually be refactored into a LeaguePage.
