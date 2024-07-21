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
      // Generate suggestions based on input value
      if (value.trim() === '') {
        setSuggestions([]);
      } else {
        const filteredSuggestions = cities.filter(city =>
          city.toLowerCase().startsWith(value.trim().toLowerCase())
        );
          setSuggestions(filteredSuggestions);
      }
  };
  const handleSelectSuggestion = (value) => {
    setResponse({
      ...response,
      destination: value
    });
    setSuggestions([]); // Clear suggestions after selection
  };

  function handleChip(field, value){
    let arr = response[field].slice();
    var idx = arr.indexOf(value);
    if (idx === -1) {
      arr.push(value);
    } else {
      arr.splice(idx, 1);
    }
    handleChange(field, arr)
  };
  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 
    'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington', 
    'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City', 
    'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 
    'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 
    'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs', 
    'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 
    'Minneapolis', 'Tulsa', 'Wichita', 'Arlington', 'New Orleans', 
    'Bakersfield', 'Tampa', 'Honolulu', 'Anaheim', 'Aurora', 
    'Santa Ana', 'St. Louis', 'Riverside', 'Corpus Christi', 'Lexington', 
    'Pittsburgh', 'Anchorage', 'Stockton', 'Cincinnati', 'St. Paul', 
    'Greensboro', 'Toledo', 'Newark', 'Plano', 'Henderson', 
    'Lincoln', 'Orlando', 'Jersey City', 'Chula Vista', 'Buffalo', 
    'Fort Wayne', 'Chandler', 'St. Petersburg', 'Laredo', 'Durham', 
    'Irvine', 'Madison', 'Norfolk', 'Lubbock', 'Gilbert', 
    'Reno', 'Winston-Salem', 'Glendale', 'Hialeah', 'Garland', 
    'Scottsdale', 'Irving', 'Chesapeake', 'North Las Vegas', 'Fremont', 
    'Baton Rouge', 'Richmond', 'Boise', 'San Bernardino', 'Spokane', 
    'Birmingham', 'Modesto', 'Des Moines', 'Rochester', 'Tacoma', 
    'Fontana', 'Oxnard', 'Moreno Valley', 'Fayetteville', 'Aurora', 
    'Glendale', 'Yonkers', 'Huntington Beach', 'Montgomery', 'Amarillo', 
    'Little Rock', 'Akron', 'Columbus', 'Augusta', 'Grand Rapids', 
    'Shreveport', 'Salt Lake City', 'Huntsville', 'Mobile', 'Tallahassee', 
    'Grand Prairie', 'Overland Park', 'Knoxville', 'Port St. Lucie', 'Worcester', 
    'Brownsville', 'Tempe', 'Santa Clarita', 'Newport News', 'Cape Coral', 
    'Providence', 'Fort Lauderdale', 'Chattanooga', 'Rancho Cucamonga', 'Oceanside', 
    'Santa Rosa', 'Garden Grove', 'Vancouver', 'Sioux Falls', 'Ontario', 
    'McKinney', 'Elk Grove', 'Jackson', 'Pembroke Pines', 'Salem', 
    'Springfield', 'Corona', 'Eugene', 'Fort Collins', 'Hayward', 
    'Lancaster', 'Alexandria', 'Salinas', 'Palmdale', 'Lakewood', 
    'Springfield', 'Sunnyvale', 'Hollywood', 'Pasadena', 'Clarksville', 
    'Pomona', 'Kansas City', 'Macon', 'Escondido', 'Paterson', 
    'Joliet', 'Naperville', 'Rockford', 'Torrance', 'Bridgeport', 
    'Savannah', 'Mesquite', 'Killeen', 'Syracuse', 'McAllen', 
    'Pasadena', 'Bellevue', 'Fullerton', 'Orange', 'Dayton', 
    'Miramar', 'Thornton', 'West Valley City', 'Olathe', 'Hampton', 
    'Warren', 'Midland', 'Waco', 'Charleston', 'Denton', 
    'Cedar Rapids', 'New Haven', 'Roseville', 'Gainesville', 'Visalia', 
    'Coral Springs', 'Thousand Oaks', 'Elizabeth', 'Stamford', 'Concord', 
    'Surprise', 'Lafayette', 'Kent', 'Topeka', 'Simi Valley', 
    'Santa Clara', 'Murfreesboro', 'Hartford', 'Athens', 'Victorville', 
    'Abilene', 'Vallejo', 'Berkeley', 'Norman', 'Allentown', 
    'Evansville', 'Odessa', 'Fargo', 'Beaumont', 'Independence', 
    'Ann Arbor', 'El Monte', 'Round Rock', 'West Jordan', 'Clearwater', 
    'Temecula', 'Carrollton', 'Westminster', 'West Covina', 'Murrieta', 
    'South Bend', 'Richmond', 'Norwalk', 'Daly City', 'Burbank', 
    'Green Bay', 'Wichita Falls', 'College Station', 'Palm Bay', 'Centennial'
  ];
  

  const [suggestions, setSuggestions] = useState([]);
  return (
    
    <div>
      <h1 className="text-3xl font-bold mb-4">Tell me about your trip</h1>
      <form className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <label>Where are you going?</label>
          <div className="px-4 flex flex-row items-center gap-2 text-sm outline outline-gray-300 rounded-lg">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
            <input
              className="py-2 w-full focus:outline-none"
              type="search"
              placeholder="Search destination"
              value={response.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-b-lg shadow-lg">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectSuggestion(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label>What activities are you interested in?</label>
          <ul className="flex flex-row gap-2">
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
          <label>What kind of trip are you looking forward to?</label>
          <ul className="flex flex-row gap-2">
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
          <label>What is your budget?</label>
          <ul className="flex flex-row gap-2">
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