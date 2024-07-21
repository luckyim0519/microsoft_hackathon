import { act, useState } from "react"
import Button from "../components/Button";
import Chip from "../components/Chip";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Form() {
  const navigate = useNavigate()
  const activity = ["Art", "Cultural", "Historic", "Outdoor", "Shopping", "Workshops", "Nightlife", "Entertainment"]
  const budget = ["$", "$$", "$$$", "$$$$"]
  const vibe = ["Adventurous", "Relaxing", "Romantic", "Kid-friendly"]
  const [response, setResponse] = useState({
    destination: "",
    departure: "",
    return: "",
    activity: [],
    vibe: [],
    budget: [],
  });

  function handleChange(field, value){
    setResponse({
      ...response,
      [field]: value
    });
  }

  function handleChip(field, value){
    let arr = response[field].slice();
    var idx = arr.indexOf(value);
    if (idx === -1) {
      arr.push(value);
    } else {
      arr.splice(idx, 1);
    }
    handleChange(field, arr)
  }

  return (
    <div className="max-w-lg pt-12">
      <h1 className="text-4xl font-bold mb-6">Tell me about your trip</h1>
      <form className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-2">
            Where are you going?
          </label>
          <div className="px-4 flex flex-row items-center gap-2 text-sm outline outline-gray-300 rounded-lg">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
            <input
              className="py-2 w-full focus:outline-none"
              type="search"
              placeholder="Search destination"
              onChange={(e) => handleChange("destination", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="font-semibold text-base">
            What activities are you interested in?
          </label>
          <ul className="flex flex-row gap-2 mt-2 flex-wrap">
            {activity.map((option) => (
              <Chip
                value={option}
                onClick={() => handleChip("activity", option)}
                selected={response["activity"].indexOf(option)}
              />
            ))}
          </ul>
        </div>
        <div>
          <label className="font-semibold text-base">
            What kind of trip are you looking forward to?
          </label>
          <ul className="flex flex-row gap-2 mt-2 flex-wrap">
            {vibe.map((option) => (
              <Chip
                value={option}
                onClick={() => handleChip("vibe", option)}
                selected={response["vibe"].indexOf(option)}
              />
            ))}
          </ul>
        </div>
        <div>
          <label className="font-semibold text-base">
            What is your budget?
          </label>
          <ul className="flex flex-row gap-2 mt-2 flex-wrap">
            {budget.map((option) => (
              <Chip
                value={option}
                onClick={() => handleChip("budget", option)}
                selected={response["budget"].indexOf(option)}
              />
            ))}
          </ul>
        </div>
      </form>
      <Button
        text={"Generate Itinerary"}
        onClick={() => navigate("/results", { state: { response: response } })}
      />
    </div>
  );
}

export default Form