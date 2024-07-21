import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import OpenAI from "openai";


// const url = process.env.REACT_APP_OPENAI_API;



function Results() {

  const { state: { response } = {} } = useLocation();

  const [itinerary, setItinerary] = useState("");

  console.log(response)

  useEffect(()=>{
    // const key = "";

    // const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

    // const message = `Help me plan a trip to ${response.destination}`;

    async function main() {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-4o-mini",
      });

      console.log(completion.choices[0]);
      setItinerary(completion.choices[0].message.content)
    }

    main();
  }, [])



  return (
    <div>
      <p>This trip is powered by AI</p>
      <h1>Your trip to </h1>
      <p>{itinerary}</p>
    </div>
  )
}

export default Results
