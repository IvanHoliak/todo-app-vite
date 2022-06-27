import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    isHide: boolean;
    onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const MenuButton: FC<IProps> = ({isHide, onClickHandler}) => {
    return (
        <button 
            className="navigation__header-hide"
            onClick={onClickHandler}
        >
            <FontAwesomeIcon icon={isHide ? faBars : faArrowLeft} />
        </button>
    );
};

export default MenuButton;
