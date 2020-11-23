import { Selector } from 'testcafe';

fixture `Draft Tests`
    .page `http://localhost:8081`;

test('DraftPageShowsWithContent', async t => {
    await t
        .typeText('#emailInput', 'messi@gmail.com')
        .typeText('#passwordInput', 'Sep131998')
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