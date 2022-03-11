import utils from "../utils";

function PlayNumber(props) {
    return (
        <button
            className="number"
            style={{ backgroundColor: utils.colors[props.status] }}
            onClick={() => props.handleClick(props.number, props.status)}
        >
            {props.number}
        </button>
    )
}

export default PlayNumber;