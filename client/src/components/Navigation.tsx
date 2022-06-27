import React, { useState } from "react";

import MenuButton from "./MenuButton";
import Auth from "./Auth";

const Navigation = () => {
    const [isHide, setIsHide] = useState<boolean>(false);

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsHide(!isHide);
    };

    return (
        <nav className={isHide ? "navigation hide" : "navigation show"}>
            <header className="navigation__header">
                <h1 className="navigation__header-title">ToDoVite</h1>
                <MenuButton isHide={isHide} onClickHandler={onClickHandler}/> 
            </header>
            <Auth />
        </nav>
    );
};

export default Navigation;
