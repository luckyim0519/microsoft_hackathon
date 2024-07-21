import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapComponent from './map'; // Adjust the path as needed
import OpenAI from "openai";

function Results() {
  const { state: { response } = {} } = useLocation();
  const [itinerary, setItinerary] = useState("");
  const [history, setHistory] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [finalLocations, setFinalLocations] = useState([]);

  useEffect(() => {
    const openai = new OpenAI({ apiKey: "sk-None-LzkASTDUaEkaIMYZdKhDT3BlbkFJWGAGvI4TnJSw2hZiL1qi", dangerouslyAllowBrowser: true });

    async function fetchRecommendations() {
      try {
        const message = `Help me plan a trip to ${response.destination}. I like ${response.activity.join(", ")} activities, with a ${response.vibe.join(", ")} vibe, and my budget of ${response.budget.join(", ")}. Fill in this list with locations: locations = [{"lat": number, "lng": number, "name": string, "address": string}]`;
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: message }],
          model: "gpt-4o-mini",
        });

        const responseText = completion.choices[0].message.content;
        const startIndex = responseText.indexOf("[");
        const endIndex = responseText.indexOf("]");
        const locationsText = responseText.substring(startIndex, endIndex + 1);

        const locations = JSON.parse(locationsText);
        setFinalLocations(locations);

        const recommendationText = responseText.substring(endIndex + 1).trim();
        const parsedRecommendations = JSON.parse(recommendationText);
        setRecommendations(parsedRecommendations);

        setItinerary(completion.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching recommendations from OpenAI:', error);
      }
    }

    async function fetchHistory() {
      try {
        const histCompletion = await openai.chat.completions.create({
          messages: [{ role: "system", content: `Tell me a little about ${response.destination}` }],
          model: "gpt-4o-mini",
        });

        setHistory(histCompletion.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching history from OpenAI:', error);
      }
    }

    fetchRecommendations();
    fetchHistory();
  }, [response.destination, response.activity, response.vibe, response.budget]);

  return (
    <div>
      <p>This trip is powered by AI</p>
      <h1>Your trip to {response.destination} includes...</h1>
      <p>Activities: {response.activity.join(', ')}</p>
      <p>Vibe: {response.vibe.join(", ")}</p>
      <p>Budget: {response.budget.join(", ")}</p>
      <h2>Recommendations:</h2>
      {recommendations.map((recommendation, index) => (
        <div key={index}>
          <RecommendationDetails recommendation={recommendation} />
        </div>
      ))}
      <h2>History:</h2>
      <p>{history}</p>
      <h2>Itinerary:</h2>
      <p>{itinerary}</p>
      {finalLocations.length > 0 && (
        <div>
          <h2>Recommended Locations:</h2>
          {finalLocations.map((location, index) => (
            <div key={index}>
              <LocationDetails location={location} />
            </div>
          ))}
          <MapComponent google={window.google} locations={finalLocations} />
        </div>
      )}
    </div>
  );
}

function RecommendationDetails({ recommendation }) {
  return (
    <div>
      <h3>{recommendation.title}</h3>
      <p>{recommendation.description}</p>
    </div>
  );
}

function LocationDetails({ location }) {
  return (
    <div>
      <h3>{location.name}</h3>
      <p>Address: {location.address}</p>
    </div>
  );
}

export default Results;
