'use strict';

const alexaSkillKit = require('alexa-skill-kit')
const MoodAnalyzer = require('./MoodAnalyzer');
const Mood = require('./Mood');

/**
 * This is the main function that runs whenever Alexa receives an input phrase from the customer.
 * @param input The information Alexa received from the customer.
 */
exports.handler = function (event, context) {
  alexaSkillKit(event, context, input => {
    const intentName = input.intent.name;
    if (intentName === 'MoodIntent') {
      const phrase = input.intent.slots.phrase.value;

      console.log(`Received phrase: [ ${phrase} ]`);

      const moodAnalyzer = new MoodAnalyzer();
      return moodAnalyzer.getMood(phrase)
        .then(moodInfo => {
          const response = createResponse(moodInfo.mood, moodInfo.score);
          return response;
        })
        .catch(error => function() {
          console.log('Error obtaining results: ' + error);
          return 'Sorry, I missed that.';
        });
    } else {
      return 'Mood Reader here to help.';
    }
  });
};

/**
 * Create the response that Alexa will say, for example, 'Don't worry, it will be alright.'
 * @param mood - Mood.POSITIVE, Mood.NEGATIVE, or Mood.NEUTRAL
 * @param score - a whole number between 0 - 100 indicating how strong the mood is
 */
function createResponse(mood, score) {
  if (mood === Mood.POSITIVE) {
    return `${mood} ${score} Yasss! That's awesome! Let's celebrate.`;
  } else if (mood === Mood.NEGATIVE) {
    return `${mood} ${score} I'm sorry to hear that. I hope things get better.`;
  } else {
    return `${mood} ${score} Sounds complicated. Let's talk about it.`;
  }
}

//
// if you say something negative, alexa should say something nice, remove negative statment
// for fun, play around with it

// const moodAnalyzer = new MoodAnalyzer();
// moodAnalyzer.getMood('i am so happy')
//   .then(moodInfo => {
//     const response = createResponse(moodInfo.mood, moodInfo.score);
//     console.log(response);
//   })
//   .catch(error => function() {
//     console.log('Error obtaining results: ' + error);
//     return 'Sorry, I missed that.';
//   });