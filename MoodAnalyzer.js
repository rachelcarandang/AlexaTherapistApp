'use strict';

const request = require('request');
const Mood = require('./Mood');

class MoodAnalyzer {

  constructor() {
  }

  getMood(phrase) {
    const self = this;
    return new Promise((resolve, reject) => {
      request.post({url: 'http://text-processing.com/api/sentiment/', formData: {text: phrase}},
        function optionalCallback(error, httpResponse, body) {
          if (error) {
            console.log('upload failed:', error);
            reject(error);
          }
          console.log('Upload successful!  Server responded with:', body);
          const sentimentResponse = self.createMoodInfo(JSON.parse(body));
          resolve(sentimentResponse);
        });
    });
  }

  createMoodInfo(body) {
    const label = body.label;
    const probability = body.probability[label];
    const score = Math.round(probability * 100);
    if (label === 'pos') {
      return this.moodInfo(Mood.POSITIVE, score);
    } else if (label === 'neg') {
      return this.moodInfo(Mood.NEGATIVE, score);
    } else {
      return this.moodInfo(Mood.NEUTRAL, score);
    }
  }

  moodInfo(mood, score) {
    return {
      mood: mood,
      score: score,
    };
  }
};

module.exports = MoodAnalyzer;