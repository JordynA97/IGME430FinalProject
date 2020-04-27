"use strict";

//create the profile page
var UserProfilePage = function UserProfilePage(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "userProfile"
    }, /*#__PURE__*/React.createElement("h2", null, "Username: ", props.username), /*#__PURE__*/React.createElement("h2", {
      id: "sub"
    }, "Subscription: Basic"), /*#__PURE__*/React.createElement("h2", null, "Don't want Ads?"), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "profileButtons",
      onClick: function onClick(e) {
        e.preventDefault();
        document.getElementById("sub").innerHTML = "Subscripton: Premium";
      }
    }, "Upgrade to Premium")), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("button", {
      className: "profileButtons",
      onClick: function onClick(e) {
        window.location.href = "/password";
      }
    }, /*#__PURE__*/React.createElement("div", {
      "class": "navlink"
    }, "Change Password"))))
  );
}; //place in profile.handlebars


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
