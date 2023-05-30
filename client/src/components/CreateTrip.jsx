import { useState } from "react";
import { Navigate, redirect } from "react-router-dom"

const CreateTrip = () => {
  const [fields, setFields] = useState({
    text: "",
    })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields);
    const sendPostTweetRequest = async() => {
            const res = await fetch(`/api/toots`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(fields),
            })
            console.log(res)
        }
    sendPostTweetRequest()
    return redirect("/view-my-tweets") // TODO - not working properly - debug this
        //return false
    }

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a trip</h1>
      <input
        type="text"
        name="destination"
        placeholder="Where? e.g. London"
        value={fields.destination}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="time_of_departure"
        placeholder="When? e.g. Summer 2024"
        value={fields.time_of_departure}
        onChange={handleChange}
      />

      <input
        type="text"
        name="duration"
        placeholder="How Long? e.g. 3 weeks"
        value={fields.duration}
        onChange={handleChange}
      />
      <input
        type="text"
        name="activities"
        placeholder="Activities (optional) e.g. sightseeing, Wimbledon"
        value={fields.activities}
        onChange={handleChange}
      />
      <input
        type="text"
        name="budget"
        placeholder="Budget (optional) e.g. 100 pounds per day"
        value={fields.budget}
        onChange={handleChange}
      />
      <br />
      <textarea
        type="text"
        name="additional_information"
        placeholder="Additional information (optional) e.g. include at least one museum"
        value={fields.additional_information}
        onChange={handleChange}
      />
      <br />
      <input type="submit" />
    </form>
  );
};

export default CreateTrip
