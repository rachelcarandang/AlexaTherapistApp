#!/bin/sh

claudia create --region us-west-2 --handler AlexaApp.handler --version skill
claudia allow-alexa-skill-trigger --version skill
