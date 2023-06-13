const { validateJson } = require('./validateJson') 

async function fetchItinFromLLM(itinQuery) {
    // This schema uses the 'JSON Schema' which is used by Ajv https://ajv.js.org/guide/getting-started.html
    // We can use this for testing, and can pass this to chatGPT so it knows what format we want
    const itinerarySchema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          Title: { type: "string" },
          Description: { type: "string" },
          Latitude: { type: "number" },
          Longitude: { type: "number" },
          Website: { type: "string"},
          Category: { type: "string" }
        },
        required: ["Title", "Description", "Latitude", "Longitude", "Website", "Category"]
      }
    };

    const promptText = `
    Write me a list of travel ideas for: ${itinQuery.destination}
    My trip duration will be: ${itinQuery.duration}
    Time of departure: ${itinQuery.time_of_departure}
    Include these activities: ${itinQuery.activities}
    My budget is: ${itinQuery.budget}
    Additional information: ${itinQuery.additional_information}
    If you don't know the above information for an activity, don't include the activity.
    For each activity, include:
    Title - string
    Description - string
    Latitude - number (measured in degrees from N)
    Longitude  - number (measured in degrees from W) 
    Website - string
    Category - string (category of activity e.g. sightseeing, museuems, cafes). 
    Provide your response as JSON object, which meets the schema provided below: ${itinerarySchema}
    All property names must begin with a capital letter.
    Do not provide any additional levels, apart from what is stated in the schema.
    Only provide an array with nested objects as per the schema. The array shall be named TravelIdeas.
    Don't provide anything else with your response.
    `

    // For some reason, GPT insists on returning array within an object. Hence, wording above is not 100% consistent with schema, but seems to give consistent results.

    const apiUrl = 'https://api.openai.com/v1/chat/completions'

    const requestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [{ role: "user", content: promptText}] 
      };
    
    console.log('fetchingfromGPT...')

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.OPENAI_API_KEY 
         }, 
         body: JSON.stringify(requestBody)
    })
    const responseBody = await response.json()

    const itinResponse = responseBody.choices[0].message.content  || false
    const itinerary = JSON.parse(itinResponse)["TravelIdeas"] || false
    console.log('GPT response was:',itinerary)

    if (validateJson(itinerary, itinerarySchema)) {
        console.log('JSON schema passed')
        return itinerary
    }
    console.log('JSON schema not satified')
    return false

}

module.exports = { fetchItinFromLLM }

