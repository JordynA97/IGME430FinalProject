"use strict";

var handlePassChange = function handlePassChange(e) {
  e.preventDefault();
  $.ajax({
    cache: false,
    type: 'POST',
    url: $('#passwordForm').attr("action"),
    data: $('#passwordForm').serialize(),
    dataType: 'json',
    success: redirect
  });
}; //create the form for updating users password


var ChangePassForm = function ChangePassForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "passwordForm",
      action: "/password",
      method: "POST",
      onSubmit: handlePassChange
    }, /*#__PURE__*/React.createElement("div", {
      className: "newPassDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "newPass"
    }, "New Password: "), /*#__PURE__*/React.createElement("input", {
      name: "newPass",
      type: "password",
      id: "newPass"
    })), /*#__PURE__*/React.createElement("div", {
      className: "newPass2Div"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "newPass2"
    }, "Confirm New Password: "), /*#__PURE__*/React.createElement("input", {
      name: "newPass2",
      type: "password",
      id: "newPass2"
    })), /*#__PURE__*/React.createElement("div", {
      className: "newPassSubmit"
    }, /*#__PURE__*/React.createElement("input", {
      id: "passSubmit",
      type: "submit",
      value: "Change Password"
    })), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }))
  );
}; //setup the page


var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePassForm, {
    csrf: csrf
  }), document.querySelector(".passForm"));
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
