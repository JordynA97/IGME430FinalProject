const handleGame = (e) => {
    e.preventDefault();

    $("#gameMessage").animate({width:'hide'}, 350);

    if($("#gameName").val() == '' || $("#gameStatus").val() == '' || $("#gameRating").val() == '' || $("#gameReview").val() == ''){
        handleError("Make sure all fields are filled!");
        return false;
    }

    sendAjax('POST', $("#gameForm").attr("action"), $("#gameForm").serialize(), function(){
        loadGamesFromServer();
    });

    return false;
};

//make form for games
const GameForm = (props) => {
    return (
        <form id="gameForm" onSubmit={handleGame}
        name="gameForm" action="/library"
        method="POST" className="gameForm">

            <div className="gameField">
            <label htmlFor="name">Name: </label>
            <input id="gameName" type="text" name="name" placeholder="Game Name"/>
            </div>

            <div className="gameField">
            <label htmlFor="status">Status:</label>
            <select id="gameStatus" name="status" placeholder="Game Status">
                <option selected>Want to Play</option>
                <option>Playing</option>
                <option>Completed</option>
            </select>
            </div>

            <div className="gameField">
            <label htmlFor="rating">Rating: (out of 5) </label>
            <select id="gameRating" name="rating" placeholder="Game Rating">
                <option selected>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            </div>

            <div className="gameField">
            <label htmlFor="review">Review: </label>
            <input id="gameReview" type="text" name="review" placeholder="Game Review"/>
            </div>
            
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makeGameSubmit" type="submit" value="Make Game"/>

        </form>
    );
};

//list of games
const GameList = function(props) {
    if(props.games.length === 0){
        return (
            <div className="gameList">
                <h3 className="emptyGame">No Games Yet</h3>
            </div>
        );
    }

    const gameNodes = props.games.map(function(game) {
        return (
            <div key={game._id} className="game">
                <h3 className="gameName"> Name: {game.name} </h3>
                <h3 className="gameStatus"> Status: {game.status} </h3>
                <h3 className="gameRating"> Rating: {game.rating} </h3>
                <h3 className="gameReview"> Review: {game.review} </h3>
            </div>
        );
    });

    return (
        <div className="gameList">
            {gameNodes} 
        </div>
    );
};

//load all games 
const loadGamesFromServer = () => {
    sendAjax('GET', '/getGames', null, (data) => {
        ReactDOM.render(
            <GameList games={data.games} />, 
            document.querySelector("#games")
        );
    });
};

//fill in section tags in handlebars
const setup = function(csrf){
    ReactDOM.render(
        <GameForm csrf={csrf} />,
        document.querySelector("#makeGame")
    );
    ReactDOM.render(
        <GameList games={[]} />, 
        document.querySelector("#games")
    );

    loadGamesFromServer();
}

const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});