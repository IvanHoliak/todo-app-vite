import React, { FC } from "react";
import { createPortal } from "react-dom";
import useAction from "../../hooks/useAction";

import useAppSelector from "../../hooks/useAppSelector";
import ModalContent from "./ModalContent";

const modalRoot = document.querySelector("#modal");

const Modal: FC = () => {
    const { isOpen, modalType } = useAppSelector(state => state.modal);
    const {setModalState} = useAction();

    const onClickCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if(((e.target) as HTMLElement).className === "modal-wrapper"){
            setModalState({isOpen: false, modalType: ""});
        };
    };

    const ModalWrapper: FC<{children: React.ReactNode}> = ({children}) => (
        <div 
            className="modal-wrapper"
            onClick={(e) => onClickCloseModal(e)}
        >
            {children}
        </div>
    );

    if(modalRoot && isOpen){
        return createPortal(
            <ModalWrapper>
                <ModalContent modalType={modalType}/>
            </ModalWrapper>,
            modalRoot
        );
    };

    return null;
};

export default Modal;
