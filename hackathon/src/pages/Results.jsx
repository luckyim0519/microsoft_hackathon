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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const [recommendations, setRecommendations] = useState([]);
  const [finalLocations, setFinalLocations] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading animation
=======
  const [coords, setCoords] = useState([]);
>>>>>>> Stashed changes
=======
  const [coords, setCoords] = useState([]);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
        const locations = JSON.parse(locationsText);
        console.log(locations)

        setFinalLocations(locations);
=======
        const itineraryObj = JSON.parse(locationsText);
        setItinerary(itineraryObj);

        const coordinates = itineraryObj.map((day) =>
          day.locations.map((location) => ({
            lat: location.lat,
            lng: location.lng,
          }))
        );

        setCoords(coordinates.flat())
        console.log(coordinates)
>>>>>>> Stashed changes


<<<<<<< Updated upstream
        setItinerary(completion.choices[0].message.content);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching recommendations from OpenAI:', error);
        setLoading(false); // Ensure loading state is false even on error
=======
      } catch (error) {
        console.error("Error fetching recommendations from OpenAI:", error);
>>>>>>> Stashed changes
=======
        const itineraryObj = JSON.parse(locationsText);
        setItinerary(itineraryObj);

        const coordinates = itineraryObj.map((day) =>
          day.locations.map((location) => ({
            lat: location.lat,
            lng: location.lng,
          }))
        );

        setCoords(coordinates.flat())
        console.log(coordinates)


      } catch (error) {
        console.error("Error fetching recommendations from OpenAI:", error);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <div className='h-screen max-h-svh min-h-svh'>
      {loading ? ( // Display loading animation while fetching data
        <div className="flex flex-col gap-8 text-center m-auto pt-48">
          <h1 className="text-2xl font-semibold">
            AI is planning your itinerary
          </h1>
          <Lottie options={defaultOptions} width={500} />
        </div>
      ) : (
        <div>
          <h2>Recommendations:</h2>
          <p>This trip is powered by AI</p>
          <h1>Your trip to {response.destination} includes...</h1>
          <p>Activities: {response.activity.join(", ")}</p>
          <p>Vibe: {response.vibe.join(", ")}</p>
          <p>Budget: {response.budget.join(", ")}</p>
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
=======
=======
>>>>>>> Stashed changes
    <div>
      <div>
        {itinerary.length == 0 || coords.length == 0 ? (
          <div className="flex flex-col gap-8 text-center m-auto pt-48">
            <h1 className="text-2xl font-semibold">
              AI is planning your itinerary
            </h1>
            <Lottie options={defaultOptions} width={500} />
          </div>
        ) : (
          <div>
            <p>This trip is powered by AI</p>
            <h1 className="text-4xl font-bold">Your trip to {response.destination}</h1>
            <p>{history}</p>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            <div>
              <ul>
                {itinerary.map(function displayItinerary(day, index){
                  return (
                    <div key={index}>
                      <h3 className="text-xl font-bold">{`Day ${day.dayNumber}: ${day.dayTitle}`}</h3>
                      <p className="mb-4">{day.daySummary}</p>
                      <ul>
                        {day.locations.map((location, index) => {
                          return (
                            <li className="flex flex-row gap-8 items-start" key={index}>
                              <p>{index + 1}</p>
                              <div>
                                <h4 className="text-lg font-semibold">
                                  {location.name}
                                </h4>
                                <p>{location.desc}</p>
                                <p>{`${location.commute.time} minute ${location.commute.method == "walking" ? "walk" : "drive"}`}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </ul>
              <MapComponent
                google={window.google}
                locations={coords}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
