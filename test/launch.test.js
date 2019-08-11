'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return a welcome message and ask for the System Status instructions at "LAUNCH"', async () => {
            const conversation = testSuite.conversation();

            const launchRequest = await testSuite.requestBuilder.launch();
            const responseLaunchRequest = await conversation.send(launchRequest);
            expect(
                responseLaunchRequest.isAsk(expectedLaunchPrompt, expectedLaunchReprompt)
            ).toBe(true);

        });
    });
}

let expectedLaunchPrompt = "Welcome to Rora. Would you like to know the Status of your Home? Check if any devices are off-line? Or see if you have any updated Scenes?"
let expectedLaunchReprompt = "Please say Check Status, Device update, or Are there any new scenes?"
