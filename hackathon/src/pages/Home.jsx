import { useNavigate } from "react-router-dom"
import Button from "../components/Button";

function Home() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Let AI handle your itinerary</h1>
            <Button 
                onClick={() => navigate("/form")} 
                text={"Generate Itinerary"} 
            />
        </div>
    );
}

export default Home