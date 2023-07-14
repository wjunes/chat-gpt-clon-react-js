const inputPrompt = require("../models/input-prompt")
const { OpenAIApi } = require("openai")
const openai = require("../config/openai")

module.exports = {
    async sendText(req, res){
        const opemaiAPI = openai.configuration()
        const inputModel = new inputPrompt(req.body)

        try {
            const response = await openaiAPI.createCompletion(
                openai.textcompletion(inputModel)
            )
            
            return res.status(200).json({
                sucess:true,
                data: response.data.choices[0].text
            })

        } catch (error){
          return res.status(400).json({
            sucess: false,
            error: error.response ? error.response.data:
            "there was an inssue on the server"
          })
        }

    }
}