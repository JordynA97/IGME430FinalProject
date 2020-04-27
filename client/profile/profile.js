//create the profile page
const UserProfilePage = (props) => {
    return (
        <div id="userProfile">
            <h2>Username: {props.username}</h2>
            <h2 id="sub">Subscription: Basic</h2>
            <h2>Don't want Ads?
                <form>
                    <button type="submit" className="profileButtons" onClick=
                    {function(e) {
                        e.preventDefault();
                        document.getElementById("sub").innerHTML = "Subscripton: Premium";
                        }}>
                        Upgrade to Premium
                    </button>
                </form>
            </h2>
            <h2><button className="profileButtons"><a href="/password">Change Password</a></button></h2>
        </div>
    );
};

//place in profile.handlebars
const setup = () => {
    const username = document.querySelector("#userProfilePage").dataset.username;

    ReactDOM.render(
        <UserProfilePage username={username} />,
        document.querySelector("#userProfilePage")
    );
};

$(document).ready(setup());