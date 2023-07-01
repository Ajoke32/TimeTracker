import "./buttons.css"
const GoogleButton = () => {
    return (
        <div>
            <button className="google-btn__large"><img src={require("../../../assets/images/google_logo.png")} alt="Google"/>Continue with Google</button>
        </div>
    );
};

export default GoogleButton;