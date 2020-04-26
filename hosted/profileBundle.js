"use strict";

var UserProfilePage = function UserProfilePage(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "userProfile"
    }, /*#__PURE__*/React.createElement("p", null, "Username: ", props.username))
  );
};

var setup = function setup() {
  var username = document.querySelector("#userProfilePage").dataset.username;
  ReactDOM.render( /*#__PURE__*/React.createElement(UserProfilePage, {
    username: username
  }), document.querySelector("#userProfilePage"));
};

$(document).ready(setup());
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
