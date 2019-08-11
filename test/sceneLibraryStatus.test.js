'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return the Scene Status UP-TO-DATE at "sceneLibraryStatusIntent"', async () => {
            const conversation = testSuite.conversation();

            const sceneLibraryStatusRequest = await testSuite.requestBuilder.intent('sceneLibraryStatusIntent', {sceneLibraryStatus: 'Complete'} );
            const responsesceneLibraryStatusRequest = await conversation.send(sceneLibraryStatusRequest);
            expect(
                responsesceneLibraryStatusRequest.isTell(expectedCompleteSceneLibraryStatusPrompt)
            ).toBe(true);

        });
        test('should return the Scene Library Status UPDATES AVAILABLE at "sceneLibraryStatusIntent"', async () => {
            const conversation = testSuite.conversation();

            const sceneLibraryStatusRequest = await testSuite.requestBuilder.intent('sceneLibraryStatusIntent', {sceneLibraryStatus: 'Update'} );
            const responsesceneLibraryStatusRequest = await conversation.send(sceneLibraryStatusRequest);
            expect(
                responsesceneLibraryStatusRequest.isTell(expectedUpdateSceneLibraryStatusPrompt)
            ).toBe(true);

        });
    });
}

let expectedCompleteSceneLibraryStatusPrompt = "Your Scene Library is up to date"
let expectedUpdateSceneLibraryStatusPrompt = "You have two new supported Scenes you can add to your Library, goto your app to review and load."

