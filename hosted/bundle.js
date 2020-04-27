"use strict";

var handleGame = function handleGame(e) {
  e.preventDefault();
  $("#gameMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#gameName").val() == '' || $("#gameStatus").val() == '' || $("#gameRating").val() == '' || $("#gameReview").val() == '') {
    handleError("Make sure all fields are filled!");
    return false;
  }

  sendAjax('POST', $("#gameForm").attr("action"), $("#gameForm").serialize(), function () {
    loadGamesFromServer();
  });
  return false;
}; //make form for games


var GameForm = function GameForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "gameForm",
      onSubmit: handleGame,
      name: "gameForm",
      action: "/library",
      method: "POST",
      className: "gameForm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "gameField"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "gameName",
      type: "text",
      name: "name",
      placeholder: "Game Name"
    })), /*#__PURE__*/React.createElement("div", {
      className: "gameField"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "status"
    }, "Status:"), /*#__PURE__*/React.createElement("select", {
      id: "gameStatus",
      name: "status",
      placeholder: "Game Status"
    }, /*#__PURE__*/React.createElement("option", {
      selected: true
    }, "Want to Play"), /*#__PURE__*/React.createElement("option", null, "Playing"), /*#__PURE__*/React.createElement("option", null, "Completed"))), /*#__PURE__*/React.createElement("div", {
      className: "gameField"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "rating"
    }, "Rating: (out of 5) "), /*#__PURE__*/React.createElement("select", {
      id: "gameRating",
      name: "rating",
      placeholder: "Game Rating"
    }, /*#__PURE__*/React.createElement("option", {
      selected: true
    }, "1"), /*#__PURE__*/React.createElement("option", null, "2"), /*#__PURE__*/React.createElement("option", null, "3"), /*#__PURE__*/React.createElement("option", null, "4"), /*#__PURE__*/React.createElement("option", null, "5"))), /*#__PURE__*/React.createElement("div", {
      className: "gameField"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "review"
    }, "Review: "), /*#__PURE__*/React.createElement("input", {
      id: "gameReview",
      type: "text",
      name: "review",
      placeholder: "Game Review"
    })), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeGameSubmit",
      type: "submit",
      value: "Make Game"
    }))
  );
}; //list of games


var GameList = function GameList(props) {
  if (props.games.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "gameList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyGame"
      }, "No Games Yet"))
    );
  }

  var gameNodes = props.games.map(function (game) {
    return (/*#__PURE__*/React.createElement("div", {
        key: game._id,
        className: "game"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "gameName"
      }, " Name: ", game.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "gameStatus"
      }, " Status: ", game.status, " "), /*#__PURE__*/React.createElement("h3", {
        className: "gameRating"
      }, " Rating: ", game.rating, " "), /*#__PURE__*/React.createElement("h3", {
        className: "gameReview"
      }, " Review: ", game.review, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "gameList"
    }, gameNodes)
  );
}; //load all games 


var loadGamesFromServer = function loadGamesFromServer() {
  sendAjax('GET', '/getGames', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(GameList, {
      games: data.games
    }), document.querySelector("#games"));
  });
}; //fill in section tags in handlebars


var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(GameForm, {
    csrf: csrf
  }), document.querySelector("#makeGame"));
  ReactDOM.render( /*#__PURE__*/React.createElement(GameList, {
    games: []
  }), document.querySelector("#games"));
  loadGamesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#gameMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#gameMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
