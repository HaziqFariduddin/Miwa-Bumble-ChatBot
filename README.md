# Description
This repository contains the source code for the Miwa Bumble ChatBot, a React-based AI chatbot that emulates the personality of its creator, Farid. Designed for engaging and supportive conversations, Miwa is capable of handling a wide range of tasks and answering various questions. The chatbot utilizes OpenAI's GPT-3.5 Turbo model for text generation and task assistance, and the Eleven Labs API for text-to-speech functionality.

# Features
Engaging and supportive conversation style
Mimics the voice of the creator, Farid
Powered by OpenAI's GPT-3.5 Turbo model
Text-to-speech functionality using the Eleven Labs API
User-friendly interface built with React and Material-UI
Backend server using Express and Node.js
Deployed on Heroku


# How to Use

Clone this repository to your local machine:
<pre>
git clone https://github.com/yourusername/Miwa-Bumble-ChatBot.git
</pre>

Change your working directory to the cloned repository:
<pre>
cd Miwa-Bumble-ChatBot
</pre>

Install dependencies for the project:
<pre>
npm install
</pre>

Create a .env file in the root directory of the project and add the following environment variables:
<pre>
REACT_APP_VOICE_API_KEY=your_voice_api_key
</pre>
Replace your_voice_api_key with your Eleven Labs API key and OpenAI API key, respectively.

Start the development server:
<pre>
npm start
</pre>

This will open the chatbot in your default web browser at http://localhost:3000.

To build the project for production, run:

<pre>
npm run build
</pre>

# Functionality
The chatbot handles user input and processes it using OpenAI's GPT-3.5 Turbo model. It can:

- Answer questions
- Generate text
- Assist with tasks
- Provide loving and supportive responses, as per its design
- Redirect users to Farid's WhatsApp for more information
- Additionally, Miwa Bumble ChatBot uses the Eleven Labs API to convert generated text into speech, mimicking Farid's voice.

# Contributing
Feel free to contribute to this project by submitting issues, pull requests, or reaching out to the creator.
