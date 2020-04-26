"use strict";

var handleGame = function handleGame(e) {
  e.preventDefault();
  $("#gameMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#gameName").val() == '' || $("#gameStatus").val() == '' || $("#gameRating").val() == '') {
    handleError("Make sure all fields are filled!");
    return false;
  }

  sendAjax('POST', $("#gameForm").attr("action"), $("#gameForm").serialize(), function () {
    loadGamesFromServer();
  });
  return false;
};

var GameForm = function GameForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "gameForm",
      onSubmit: handleGame,
      name: "gameForm",
      action: "/library",
      method: "POST",
      className: "gameForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "gameName",
      type: "text",
      name: "name",
      placeholder: "Game Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "status"
    }, "Status: "), /*#__PURE__*/React.createElement("input", {
      id: "gameStatus",
      type: "text",
      name: "status",
      placeholder: "Game Status"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "rating"
    }, "Rating: "), /*#__PURE__*/React.createElement("input", {
      id: "gameRating",
      type: "text",
      name: "rating",
      placeholder: "Game Rating"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeGameSubmit",
      type: "submit",
      value: "Make Game"
    }))
  );
};

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
      }, " Rating: ", game.rating, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "gameList"
    }, gameNodes)
  );
};

var loadGamesFromServer = function loadGamesFromServer() {
  sendAjax('GET', '/getGames', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(GameList, {
      games: data.games
    }), document.querySelector("#games"));
  });
};

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
