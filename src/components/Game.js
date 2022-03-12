import useGameState from "../hooks/useGameState";

import utils from "../utils";
import PlayAgain from "./PlayAgain";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";

function Game(props) {
    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState
    } = useGameState(); // Gets data from custom hook

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active';

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

        setGameState(newCandidateNums);
    };

    return (
        <div className="game">
            <header className="help">
                Pick 1 or more numbers that sum to the number of stars
            </header>

            <main className="body">
                <aside className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
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

export default Game;
