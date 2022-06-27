import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAction from "../hooks/useAction";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import ProjectList from "./ProjectList";


const Auth = () => {
    const { isAuth, user } = useAppSelector(state => state.user);
    const { logout} = useAction();
    const { setModalState, removeProject } = useAction();

    const onClickLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModalState({isOpen: true, modalType: "auth"});
    };

    const onClickLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        logout();
        removeProject();
    };

    return (
        <>
            {isAuth ? (
                <>
                    <div className="navigation__auth">
                        <FontAwesomeIcon icon={faUser}/>
                        <span>{user.name}</span>
                        <button 
                            className="navigation__auth-logout"
                            onClick={onClickLogout}
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                        </button>
                    </div>
                    <ProjectList />
                </>
            ) : (
                <div className="navigation__auth">
                    <button 
                        className="navigation__auth-login"
                        onClick={onClickLogin}
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                        <span>Войти</span>
                    </button>
                </div>
            )}
        </>
    );
};

export default Auth;
