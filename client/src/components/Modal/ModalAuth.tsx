import React, { FC, useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const ModalAuth: FC = () => {
    const [authType, setAuthType] = useState<string>("login");

    return (
        <div className="modal-wrapper__content">
            <div className="auth-wrapper">
                <div className="auth-wrapper__btns">
                    <button 
                        className={authType === "login" ? "auth-wrapper__btn active" : "auth-wrapper__btn"}
                        onClick={() => setAuthType("login")}
                    >
                        Login
                    </button>
                    <button 
                        className={authType === "registration" ? "auth-wrapper__btn active" : "auth-wrapper__btn"}
                        onClick={() => setAuthType("registration")}
                    >
                        Registration
                    </button>
                </div>
                <div className="auth-wrapper__form">
                    {authType === "login" && <LoginForm />}
                    {authType === "registration" && <RegistrationForm />}
                </div>
            </div>
        </div>
    );
};

export default ModalAuth;
