# Fantasy Football App

For Milestone 3, we dedicated most of our time on refactoring the backend schemas to add the feature of looking at a user's benched and active players. We finally got the
ESPM Fantasy API working. In our database, all we need to store is a list of names of the players on your team. The rest of the information (points scored, position, fp total)
is fetched through the API. This is important because it not only saves storage space on our own end, we also don't need to be updating player scores often. Now that we have
this setup, we might go back and revise our drafting system, if we have time. We also established a profile page that lists any achievements a user has earned in their career.
Hypothetically, a user's stats are calculated at the end of every week to determine if their performance was achievement-worthy. Right now, that calculation is not setup, however
we hope it can be implemented in time by next milestone.

The file that had the most significant changes up for review is [https://github.com/wsu-cpts489-fa20/bp-football/blob/development/client/src/components/FeedPage.js](FeedPage.js). Other files were touched up to add functionality elsewhere, however FeedPage was essentially redone entirey.
