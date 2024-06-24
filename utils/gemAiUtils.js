
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("api key is --->>>",process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function gemAiUtils(promData,paragraph) {
const prompt = `${promData} ${paragraph}`
  // console.log("promt in code is  >>" , prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    if(text){
        return text
    }
    else{
        return "API is not Working"
    }
  }

  module.exports = gemAiUtils;
  
 