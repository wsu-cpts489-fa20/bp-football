import { Selector } from 'testcafe';

fixture `Week 4 Tests`
    .page `http://localhost:8081/`;

const qbOption = Selector('#qb').find('option');
const rbOption = Selector('#rb').find('option');
const wrOption = Selector('#wr').find('option');
const teOption = Selector('#te').find('option');
const kOption = Selector('#k').find('option');

// // Connection URL
// const url = 'mongodb+srv://admin:cs489fantasy@football.10xoz.mongodb.net/Football?retryWrites=true&w=majority';

// // Database Name
// const dbName = 'Football';

// function findTeamPlayers (db) {
//     return new Promise((resolve, reject) => {
//         const collection = db.collection('Football');

//         // Find some documents
//         collection.find({'id': "diwashi@gmail.com"}).toArray(function(err, docs) {
//             if (err)
//                 return reject(err);
//             console.log("Found the following in the database");
//             console.log(docs);
//             resolve(docs);
//         });
//     });
// }

test('DraftPageTests', async t => {
    await t
        .typeText('#emailInput', 'diwashi@gmail.com')
        .typeText('#passwordInput', 'Kent@2020')
        .click('#loginBtn')
        
        .wait(1000)

        .click('#hamburgerBtn')

        //go to draft page
        .click('#draftBtn')

        .wait(5000)

        .click(qbOption.withText('Rusell Wilson'))
        .expect(qbOption.value).eql('Rusell Wilson')

        .click(rbOption.withText('Derrick Henry'))
        .expect(rbOption.value).eql('Derrick Henry')

        .click(wrOption.withText('DK Metcalf'))
        .expect(wrOption.value).eql('DK Metcalf')

        .click(teOption.withText('George Kittle'))
        .expect(teOption.value).eql('George Kittle')

        .click(kOption.withText('Jason Myers'))
        .expect(kOption.value).eql('Jason Myers')

        .click('#draftTeamBtn');

        
});