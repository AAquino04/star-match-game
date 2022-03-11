import { useState } from "react";

import utils from "../utils";
import PlayAgain from "./PlayAgain";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";

function App() {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameIsDone = availableNums.length === 0;

    const resetGame = () => {
        setStars(utils.random(1, 9));
        setAvailableNums(utils.range(1, 9));
        setCandidateNums([]);
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
        if (currentStatus === 'used') {
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
                    {gameIsDone ? (
                        <PlayAgain onClick={resetGame} />
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
                Time Remaining: 10
            </div>
        </div>
    )
}

export default App;
