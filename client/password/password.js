const handlePassChange = (e) => {
    e.preventDefault();

    //send ajax
    $.ajax({
        cache: false,
        type: 'POST',
        url: $("#passwordForm").attr("action"),
        data: $("#passwordForm").serialize(),
        dataType: "json",
        success: redirect,
    });
};

//create the form for updating users password
const ChangePassForm = (props) => {
    return (
        <form id="passwordForm" action="/password" method="POST" onSubmit={handlePassChange}>
            <div className="newPassDiv">
                <label htmlFor="newPass">New Password: </label>
                <input name="newPass" type="password" id="newPass"></input>
            </div>

            <div className="newPass2Div">
                <label htmlFor="newPass2">Confirm New Password: </label>
                <input name="newPass2" type="password" id="newPass2"></input>
            </div>

            <div className="newPassSubmit">
                <input type="submit" value="Change Password"/>
            </div>

            <input type="hidden" name="_csrf" value={props.csrf}/>
        </form>
    );
};

//setup the page
const setup = (csrf) => {
    ReactDOM.render(
        <ChangePassForm csrf={csrf}/>,
        document.querySelector(".passForm")
    );
};

const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});