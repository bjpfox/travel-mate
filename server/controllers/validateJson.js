// Takes an object which was parsed from a JSON string
// and checks whether it matches our itinerary schema
function validateJson(jsonObject, schema) {
    const Ajv = require("ajv")
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    return validate(jsonObject)
}

module.exports = { validateJson } 
