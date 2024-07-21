import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapComponent from './map'; // Adjust the path as needed

import OpenAI from "openai";


// const url = process.env.REACT_APP_OPENAI_API;

function Results() {

  const { state: { response } = {} } = useLocation();

  const [itinerary, setItinerary] = useState("");
  const [history, setHistory] = useState("");
  const [finalLocation, setFinalLocation] = useState([])


  useEffect(()=>{
    const key = "";

    const openai = new OpenAI({ apiKey: "sk-None-LzkASTDUaEkaIMYZdKhDT3BlbkFJWGAGvI4TnJSw2hZiL1qi", dangerouslyAllowBrowser: true });

    const message = `Help me plan a trip to ${response.destination}. I like ${response.activity.join(",")} activities, with a ${response.vibe.join(",")} vibe, and my budget of ${response.budget.join(",")}
    Fill in this list with locations: locations = [{"lat": number, "lng": number, "name": string, "address": string}]
`;

    async function main() {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-4o-mini",
      });

      const hist = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Tell me a little about ${response.destination}` }],
        model: "gpt-4o-mini",
      });
      setHistory(hist.choices[0].message.content)

      const location = completion.choices[0].message.content
      const first = location.indexOf("[")
      const end = location.indexOf("]")
      const locationsText = location.substring(first, end + 1);

      const finalLocations = JSON.parse(locationsText);
      console.log(finalLocations);
      setFinalLocation(finalLocations)

      // console.log(completion.choices[0]);
      setItinerary(completion.choices[0].message.content)
    }

    main();
  }, [])



  return (
    <div>
      <p>This trip is powered by AI</p>
      <h1>Your trip to {response.destination} that has {response.activity.join(', ')} activities, with a {response.vibe.join(", ")} vibe, and fits the {response.budget.join(", ")} budget</h1>
      <h2>{history}</h2>
      <p>{itinerary}</p>
      {finalLocation.length > 0 && <MapComponent google={window.google} locations={finalLocation} />}
    </div>
  )
}

export default Results
