const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const apiKey = "";
const apiKey = process.env.API_KEY;

const configuration = new Configuration({
  organization: "org-5OJOeUXAYacvdSHYYEAHrSSX",
  apiKey: apiKey,
});
const openAi = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log();
  res.json({
    // data: response.data,
    // check

    message: response.data.choices[0].text,
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
