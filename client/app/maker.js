const handleGame = (e) => {
    e.preventDefault();

    $("#gameMessage").animate({width:'hide'}, 350);

    if($("#gameName").val() == '' || $("#gameStatus").val() == '' || $("#gameRating").val() == ''){
        handleError("Make sure all fields are filled!");
        return false;
    }

    sendAjax('POST', $("#gameForm").attr("action"), $("#gameForm").serialize(), function(){
        loadGamesFromServer();
    });

    return false;
};

const GameForm = (props) => {
    return (
        <form id="gameForm" onSubmit={handleGame}
        name="gameForm" action="/library"
        method="POST" className="gameForm">

            <label htmlFor="name">Name: </label>
            <input id="gameName" type="text" name="name" placeholder="Game Name"/>
            <label htmlFor="status">Status: </label>
            <input id="gameStatus" type="text" name="status" placeholder="Game Status"/>
            <label htmlFor="rating">Rating: </label>
            <input id="gameRating" type="text" name="rating" placeholder="Game Rating"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makeGameSubmit" type="submit" value="Make Game"/>

        </form>
    );
};

const GameList = function(props) {
    if(props.games.length === 0){
        return (
            <div className="gameList">
                <h3 className="emptyGame">No Games Yet!</h3>
            </div>
        );
    }

    const gameNodes = props.games.map(function(game) {
        return (
            <div key={game._id} className="game">
                <h3 className="gameName"> Name: {game.name} </h3>
                <h3 className="gameStatus"> Status: {game.status} </h3>
                <h3 className="gameRating"> Rating: {game.rating} </h3>
            </div>
        );
    });

    return (
        <div className="gameList">
            {gameNodes} 
        </div>
    );
};

const loadGamesFromServer = () => {
    sendAjax('GET', '/getGames', null, (data) => {
        ReactDOM.render(
            <GameList games={data.games} />, 
            document.querySelector("#games")
        );
    });
};

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