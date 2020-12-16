# Fantasy Football App

For Milestone 4, we dedicated most of our time refactoring some of the changes we made previously that weren't fully developed due to not having an API working. After finally
getting the ESPN Fantasy API working, we stored all current NFL players in our database. A manager can now use that list to add players to their team.The rest of the information (points scored, position, fp total) is fetched through the API. This is important because it not only saves storage space on our own end, we also don't need to be updating player scores often. Hypothetically, a user's stats are calculated at the end of every week to determine if their performance was achievement-worthy. Right now, that calculation and matchup system is not setup due to time constraints.

We were also not able to deploy the application on AWS. The errors that occured in the logs were puzzling and despite our best efforts, we were not able to figure out why the deploys failed.

The file that had the most significant changes up for review is [DraftPage.js](https://github.com/wsu-cpts489-fa20/bp-football/blob/master/client/src/components/DraftPage.js). Other files were touched up to add functionality elsewhere, however DraftPage was essentially redone entirey.
