'use strict';

var alexaSkillKit = require('alexa-skill-kit');
var random = require('random-number');
var MoodAnalyzer = require('./MoodAnalyzer');
var Mood = require('./Mood');

/**
 * This is the main function that runs whenever Alexa receives an input phrase from the customer.
 * @param input The information Alexa received from the customer.
 */
exports.handler = function (event, context) {
  alexaSkillKit(event, context, input => {

    var defaultResponse = 'Mood Sidekick here to help.';
    var inputIsValid = isInputValid(input);

    if (!inputIsValid) {
      return defaultResponse;
    }

    const intentName = input.intent.name;
    if (intentName === 'MoodIntent') {
      var phrase = input.intent.slots.phrase.value;

      console.log(`Received phrase: [ ${phrase} ]`);

      var moodAnalyzer = new MoodAnalyzer();
      return moodAnalyzer.getMood(phrase)
        .then(moodInfo => {
          var response = createResponse(phrase, moodInfo.mood, moodInfo.score);
          console.log('Returning response: ' + response);
          return response;
        })
        .catch(error => function() {
          console.log('Error obtaining results: ' + error);
          return 'Sorry, could you try again?';
        });
    } else {
      return defaultResponse;
    }
  });
};

function isInputValid(input) {
  if (input === null) {
    return false;
  } else if (input.intent === null) {
    return false;
  } else {
    return true;
  }
}

var neutralResponses = [
  'I feel that.',
  'Wow how boring.',
  'Can you show some emotion?'
];

/**
* Return random number up between start and finish (including start and finish);
* start: lowest number you can return
* finish: highest number you can return
*/
function getRandomNumber(start, finish) {
  var options = {
    min:  start,
    max:  finish,
    integer: true
  }
  return random(options);
} 

function getRandomNeutralResponse() {
  var number = getRandomNumber(1, 3);

  return neutralResponses[number-1];
}

// function getRandomPositiveResponse() {
//   // put code here
// }

// function getRandomNegativeResponse() {
//   // put code here
// }

/**
 * Create the response that Alexa will say, for example, 'Don't worry, it will be alright.'
 * mood: indicates the user's mood, it can be Mood.POSITIVE, Mood.NEGATIVE, or Mood.NEUTRAL
 * score: a whole number between 0 - 100 indicating how strong the mood is
 */
function createResponse(phrase, mood, score) {
  if (mood === Mood.POSITIVE) {
    return "It sounds like you are happy.";
  } else {
    return "I don't know how to help you.";
  }
}
