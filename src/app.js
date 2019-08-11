'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
     LAUNCH() {
         // Check if customer is signed in
         if (!this.$request.getAccessToken()){
             //Customer NOT signed in
             this.showAccountLinkingCard();
             if (this.isAlexaSkill()) {
                 this.$alexaSkill.tell("Please open the Alexa App to Link your Rora Smart Life account.");
             }
         } else {
             //customer signed in
             this.$speech.addText("Welcome to Rora. Would you like to know the Status of your Home? Check if any devices are off-line? Or see if you have any updated Scenes?")
             this.$reprompt.addText("Please say Check Status, Device update, or Are there any new scenes?")
             this.ask(this.$speech, this.$reprompt);
         }
     },

     ON_SIGN_IN() {
         if (this.$googleAction.getSignInStatus() === 'CANCELLED') {
             //User did not link their account
             this.showAccountLinkingCard();
         } else if (this.$googleAction.getSignInStatus() === 'OK') {
             //User linked their account
             this.toIntent("LAUNCH");
             this.tell(this.$speech);
         } else if (this.$googleAction.getSignInStatus() === 'ERROR') {
             //There was an error
             this.showAccountLinkingCard();
         }
     },

    homeStatusIntent() {
        let expectedhomeStatusPrompt = "Your Home Status is Home"
        let expectedaAwayStatusPrompt = "Your Home Status is Away"
        let homeStatus = this.$inputs.homeStatus.value
        if (homeStatus === "Home") {
            this.$speech.addText(expectedhomeStatusPrompt)
        }   else {
            this.$speech.addText(expectedaAwayStatusPrompt)
        }
        this.tell(this.$speech);
    },

    deviceStatusIntent() {
        let expectedOnlineStatusPrompt = "All Devices are Online."
        let expectedOfflineStatusPrompt = "You have two devices offline.  Check your App for more details."
        let deviceStatus = this.$inputs.deviceStatus.value
        if (deviceStatus === "Online") {
            this.$speech.addText(expectedOnlineStatusPrompt)
        }   else {
            this.$speech.addText(expectedOfflineStatusPrompt)
        }
        this.tell(this.$speech);
    },

    sceneLibraryStatusIntent() {
        let expectedCompleteSceneLibraryStatusPrompt = "Your Scene Library is up to date"
        let expectedUpdateSceneLibraryStatusPrompt = "You have two new supported Scenes you can add to your Library, goto your app to review and load."
        let sceneLibraryStatus = this.$inputs.sceneLibraryStatus.value
        if (sceneLibraryStatus === "Complete") {
            this.$speech.addText(expectedCompleteSceneLibraryStatusPrompt)
        }   else {
            this.$speech.addText(expectedUpdateSceneLibraryStatusPrompt)
        }
        this.tell(this.$speech);
    },
});

module.exports.app = app;
