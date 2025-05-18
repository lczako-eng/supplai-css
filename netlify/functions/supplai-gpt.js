// netlify/functions/supplai-gpt.js

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: completion.choices[0].message.content,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: `⚠️ SupplAi Error: ${error.message}`,
      }),
    };
  }
};
