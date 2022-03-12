function PlayAgain(props) {
    return (
        <div className="game-done">
            <p
                className="message"
                style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
            >
                {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
            </p>
            <button onClick={props.onClick}>Play Again</button>
        </div>
    )
}


export default PlayAgain;