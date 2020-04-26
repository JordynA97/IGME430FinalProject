const UserProfilePage = (props) => {
    return (
        <div id="userProfile">
            <p>Username: {props.username}</p>
        </div>
    );
};

const setup = () => {
    const username = document.querySelector("#userProfilePage").dataset.username;

    ReactDOM.render(
        <UserProfilePage username={username} />,
        document.querySelector("#userProfilePage")
    );
};

$(document).ready(setup());