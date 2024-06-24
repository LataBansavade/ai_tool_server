const gemAiUtils = require("../utils/gemAiUtils");

const summaryController =async(req,res)=>{
    // console.log('aiSummrize api is running');
    const {content} = req.body;
    // console.log("content>>",content);
    try {
      const summary = await gemAiUtils("summarize this paragraph in very short",content);
      // console.log("summary is" , summary);
      res.send({summary});
    } catch (error) {
      res.send({error: error})
      console.log("error while getting summary" , error);
    }
}

const codeController = async(req,res)=>{
      const {quesInput,language} = req.body;
      try {
        const ansCode = await gemAiUtils(`write only code in ${language} for`,`${quesInput}`);
        res.send({ansCode});
      //   console.log("answewr code is>>>" , ansCode)
      } catch (error) {
        res.send({error: error})
        console.log("error while getting code from AI");
      }
}



module.exports ={summaryController,codeController}