import { Selector } from 'testcafe';

fixture `Draft Tests`
    .page `http://localhost:8081`;

test('ProfilePageShowsWithContent', async t => {
    await t
        .typeText('#emailInput', 'asd@asd.com')
        .typeText('#passwordInput', '123')
        .click('#loginBtn')
        
        .wait(1000)

        .click('#menuBtn')

        //test Draft page - just input field
        .click('#importDraftBtn')
        .expect(Selector('#addPersonalDataDiv').visible).eql(true)
        .typeText('#leagueName', 'Diwash Fantasy League')
        .typeText('#leagueFormat', 'Full PPR')
        //.click('#SubmitTeamBtn')

        .wait(1000)

});