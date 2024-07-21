import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "./map"; // Adjust the path as needed
import OpenAI from "openai";
import Lottie from "react-lottie";
import preloader from "../assets/preloader.json";

function Results() {
  const { state: { response } = {} } = useLocation();
  const [itinerary, setItinerary] = useState([]);
  const [history, setHistory] = useState("");
  const [coords, setCoords] = useState([])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: preloader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const openai = new OpenAI({
      apiKey: "sk-None-LzkASTDUaEkaIMYZdKhDT3BlbkFJWGAGvI4TnJSw2hZiL1qi",
      dangerouslyAllowBrowser: true,
    });

    async function fetchRecommendations() {
      try {
        const message = `Help me plan a trip to ${
          response.destination
        }. I like ${response.activity.join(
          ", "
        )} activities, with a ${response.vibe.join(
          ", "
        )} vibe, and my budget is ${response.budget.join(
          ", "
        )} out of $$$$. Give me a full day of itinerary as an array of objects in this format: [{dayNumber: number, dayTitle: string, daySummary: string, locations = [{"desc": string (two line description of location), "lat": number (latitude), "lng": number (longitude), "name": string (location name), "address": string (location address), "commute": {"method": string (walking or driving), "time": number (commute time from previous location)})}]}]. Do not include additional text in unspecified format. Please generate three days.`;
        
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: message }],
          model: "gpt-4o-mini",
        });

        const responseText = completion.choices[0].message.content;
        const startIndex = responseText.indexOf("[");
        const endIndex = responseText.lastIndexOf("]");
        const locationsText = responseText.substring(startIndex, endIndex + 1);

        const itineraryObj = JSON.parse(locationsText);
        setItinerary(itineraryObj);

        const coordinates = itineraryObj.map((day) =>
          day.locations.map((location) => ({
            lat: location.lat,
            lng: location.lng,
          }))
        );

        setCoords(coordinates.flat())
      } catch (error) {
        console.error("Error fetching recommendations from OpenAI:", error);
      }
    }

    async function fetchHistory() {
      try {
        const histCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Tell me a little about ${response.destination}. Keep this to three sentences.`,
            },
          ],
          model: "gpt-4o-mini",
        });

        setHistory(histCompletion.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching history from OpenAI:", error);
      }
    }

    fetchRecommendations();
    fetchHistory();
    
  }, []);

  return (
    <div className="h-screen max-h-svh min-h-svh">
      {itinerary.length == 0 || coords.length == 0 ? ( // Display loading animation while fetching data
        <div className="flex flex-col gap-8 text-center m-auto pt-48">
          <h1 className="text-2xl font-semibold">
            AI is planning your itinerary
          </h1>
          <Lottie options={defaultOptions} width={500} />
        </div>
      ) : (
        <div className="flex flex-row">
          <div>
            <div>
            <p className="text-sm mb-2">This trip is powered by AI</p>
            <h1 className="text-4xl font-bold mb-4">
              Your trip to {response.destination}
            </h1>
            <p className="mb-4">{history}</p>
              <ul>
                {itinerary.map(function displayItinerary(day, index) {
                  return (
                    <div key={index} className="mb-8">
                      <h3 className="text-xl font-bold mb-2">{`Day ${day.dayNumber}: ${day.dayTitle}`}</h3>
                      <p className="mb-4">{day.daySummary}</p>
                      <ul>
                        {day.locations.map((location, index) => {
                          return (
                            <li
                              className="flex flex-row gap-8 items-start mb-4"
                              key={index}
                            >
                              <p>{index + 1}</p>
                              <div>
                                <h4 className="text-lg font-semibold">
                                  {location.name}
                                </h4>
                                <p>{location.desc}</p>
                                <p>{`${location.commute.time} minute ${
                                  location.commute.method == "walking"
                                    ? "walk"
                                    : "drive"
                                }`}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </ul>
            </div>
          <MapComponent google={window.google} locations={coords} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
