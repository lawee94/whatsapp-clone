import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../Logic/StateProvider";
import { actionTypes } from "../Logic/reducer";

import "./Login.css";

const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) =>
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            )
            .catch((error) => alert(error));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="./logo.png" alt="" />
                <h1> Signin to Whatsapp</h1>

                <Button onClick={signIn}>Signin with google</Button>
            </div>
        </div>
    );
};

export default Login;
