import { useNavigate } from "react-router-dom"
import Button from "../components/Button";
import hero from "../assets/hero.png"

function Home() {
    const navigate = useNavigate()

    return (
      <div className="max-h-screen flex flex-row gap-12 items-center">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex grow-0 flex-row items-center gap-2 text-sm outline outline-gray-400 px-3 py-2 rounded-full bg-white">
            <span>🤖</span>
            <p>Powered by AI</p>
          </div>
          <h1 className="text-7xl font-bold">Travel Made Seamless</h1>
          <p className="text-2xl text-gray-800">
            Plan your perfect itinerary in minutes with our AI-powered travel
            planner
          </p>
          <Button
            onClick={() => navigate("/form")}
            text={"Plan trip"}
            large={true}
          />
        </div>
        <div>
          <img className="max-w-xl" src={hero} alt="" />
        </div>
      </div>
    );
}

export default Home