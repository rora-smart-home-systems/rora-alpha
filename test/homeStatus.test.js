'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return the Home Status HOME at "homeStatusIntent"', async () => {
            const conversation = testSuite.conversation();

            const homeStatusRequest = await testSuite.requestBuilder.intent('homeStatusIntent', {homeStatus: 'Home'});
            const responsehomeStatusRequest = await conversation.send(homeStatusRequest);
            expect(
                responsehomeStatusRequest.isTell(expectedhomeStatusPrompt)
            ).toBe(true);

        });
        test('should return the Home Status AWAY at "homeStatusIntent"', async () => {
            const conversation = testSuite.conversation();

            const homeStatusRequest = await testSuite.requestBuilder.intent('homeStatusIntent', {homeStatus: 'Away'});
            const responsehomeStatusRequest = await conversation.send(homeStatusRequest);
            expect(
                responsehomeStatusRequest.isTell(expectedaAwayStatusPrompt)
            ).toBe(true);

        });
    });
}

let expectedhomeStatusPrompt = "Your Home Status is Home"
let expectedaAwayStatusPrompt = "Your Home Status is Away"

