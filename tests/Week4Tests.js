import { Selector } from "testcafe";

fixture`Week 4 Interactions`.page`http://localhost:8081/`;

test("OutOfRange", async (t) => {
  await t
    .click("#googleBtn")
    .expect(Selector("#feedModeDiv").visible)
    .eql(true)
    .click("#menuBtn")
    .expect(Selector("#userID").visible)
    .eql(true);
});
