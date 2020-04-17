import React, {Component} from "react";

class GoogleAuth extends Component {
    state = {
        isSignedIn: null
    };

    componentDidMount() {
        // Connecting google OAuth
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: "605749438307-uj55cvaqqkg7q9r58m8hf4llb7ech394.apps.googleusercontent.com",
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()})
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick}
                        className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick}
                        className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            )
        }
    };

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

export default GoogleAuth