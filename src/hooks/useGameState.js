import { useState, useEffect } from "react";

import utils from "../utils";

// Custom Hook
function useGameState() {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            // Sets up a new timer after every re-render
            const timerId = setTimeout(() => { setSecondsLeft(secondsLeft - 1) }, 1000);
            // Cleans the timer after every re-render
            // Important for not creating a setTimeout after every re-render, without cleaning the previous one
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums); // Updates candidate Nums if not correct yet
        } else { // correct answer
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n) // Filters available numbers (removes correct nums)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9)); // Reset stars
            setAvailableNums(newAvailableNums); // updates available numbers
            setCandidateNums([]); // Reset Candidates
        }
    }

    return { stars, availableNums, candidateNums, secondsLeft, setGameState };
}

export default useGameState;