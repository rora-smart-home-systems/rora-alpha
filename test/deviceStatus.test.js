'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return the Device Status ONLINE at "deviceStatusIntent"', async () => {
            const conversation = testSuite.conversation();

            const deviceStatusRequest = await testSuite.requestBuilder.intent('deviceStatusIntent', {deviceStatus: 'Online'});
            const responseDeviceStatusRequest = await conversation.send(deviceStatusRequest);
            expect(
                responseDeviceStatusRequest.isTell(expectedOnlineStatusPrompt)
            ).toBe(true);

        });
        test('should return the Device Status OFFLINE at "deviceStatusIntent"', async () => {
            const conversation = testSuite.conversation();

            const deviceStatusRequest = await testSuite.requestBuilder.intent('deviceStatusIntent', {deviceStatus: 'Offline'});
            const responsedeviceStatusRequest = await conversation.send(deviceStatusRequest);
            expect(
                responsedeviceStatusRequest.isTell(expectedOfflineStatusPrompt)
            ).toBe(true);

        });
    });
}

let expectedOnlineStatusPrompt = "All Devices are Online."
let expectedOfflineStatusPrompt = "You have two devices offline.  Check your App for more details."

