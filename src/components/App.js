import { useState } from "react";
import Game from "./Game";

function App() {
    const [gameId, setGameId] = useState(1)
    return (
        <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
        // Unmounts the component, clearing all side effects and states
        // Then mount a new clean component
    )
}

export default App;
