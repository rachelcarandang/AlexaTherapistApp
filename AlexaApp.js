'use strict';

const alexaSkillKit = require('alexa-skill-kit')
const SentimentAnalyzer = require('./SentimentAnalyzer');
const Mood = require('./Mood');

/**
 * This is the main function that runs whenever Alexa receives an input phrase from the customer.
 * @param input The information Alexa received from the customer.
 */
exports.handler = function (event, context) {
  alexaSkillKit((event, context, input) => {
    if (input.intent.name === 'MoodIntent') {
      const phrase = input.intent.slots.phrase.value;

      console.log(`Received phrase: [ ${phrase} ]`);
      const moodAnalyzer = new SentimentAnalyzer();

      return moodAnalyzer.getMood(phrase)
        .then(moodInfo => {
          const response = getAlexaResponse(moodInfo.mood, moodInfo.score);
          return response;
        })
        .catch(error => function() {
          console.log('Error obtaining results: ' + error);
          return 'How can I help';
        });
    }
    // return fetchSomethingFromTheServer()
    //   .then(result => doSomethingWithTheResult(result))
    //   .then(processedResult => {
    //     return `Here's an info from the server: ${processedResult}`
    //   })
  });
};

/**
 * Return the response that Alexa will say, for example, 'Don't worry, it will be alright.'
 * @param mood - Mood.POSITIVE, Mood.NEGATIVE, or Mood.NEUTRAL
 * @param score - a whole number between 0 - 100 indicating how strong the mood is
 */
function getAlexaResponse(mood, score) {
  if (mood === Mood.POSITIVE) {
    return "What a positive statement!";
  } else if (mood === Mood.NEGATIVE) {
    return "I'm sorry to hear that.";
  } else {
    return "Sounds complicated. Let's talk about it.";
  }
}

// const moodAnalyzer = new SentimentAnalyzer();
// const SAD = 'i had a bad day';
// const HAPPY = 'i\'m doing great';
//
// const response = moodAnalyzer.getMood(HAPPY)
//   .then(moodInfo => {
//     const message = getAlexaResponse(moodInfo.mood, moodInfo.score);
//     console.log('message ', message);
//   })
//   .catch(error => console.log('Error obtaining results: ' + error));
//
