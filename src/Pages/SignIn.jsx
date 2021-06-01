import React, { PureComponent } from "react";
// Router
import { withRouter, Link } from "react-router-dom";
// Firebase
import * as firebaseui from "firebaseui";
import { Container } from "../Components/Basics";
import { ArrowLeftIcon } from "@heroicons/react/outline";

class SignInPage extends PureComponent {
  componentDidMount() {
    let ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.props.firebase.auth());
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        {
          provider: this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
        this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          return true;
        },
      },
      signInFlow: "popup",
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    });
  }

  render() {
    return (
      <div className="mt-40">
        <Container>
          <div className="text-center">
            <div id="firebaseui-auth-container" className="mb-10" />
            <Link to="/">
              <ArrowLeftIcon className="h-6 w-6 m-auto" />
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(SignInPage);
