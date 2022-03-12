import { useState, useEffect } from "react";

import utils from "../utils";
import PlayAgain from "./PlayAgain";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";

function App() {
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

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active';


    const resetGame = () => {
        setStars(utils.random(1, 9));
        setAvailableNums(utils.range(1, 9));
        setCandidateNums([]);
        setSecondsLeft(10);
    }

    const numberStatus = number => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }

        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNums.concat(number) // if available, mark as candidate
                : candidateNums.filter(cn => cn !== number); // filters clicked num, keeps others

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
    };

    return (
        <div className="game">
            <header className="help">
                Pick 1 or more numbers that sum to the number of stars
            </header>

            <main className="body">
                <aside className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={resetGame} gameStatus={gameStatus} />
                    ) : (
                        <StarsDisplay count={stars} />
                    )}
                </aside>

                <aside className="right">
                    {utils.range(1, 9).map(number => (
                        <PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            number={number}
                            handleClick={onNumberClick}
                        />
                    ))}
                </aside>
            </main>

            <div className="timer">
                Time Remaining: {secondsLeft}
            </div>
        </div>
    )
}

export default App;
