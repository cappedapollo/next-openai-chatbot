const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = req.body;
  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    res.status(200).json(result.data.choices[0].text);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "An error occurred while processing the request.",
      error: error.message,
    });
  }
}
