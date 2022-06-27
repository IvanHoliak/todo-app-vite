import { FC } from "react";
import ModalAuth from "./ModalAuth";
import ModalCreateCategory from "./ModalCreateCategory";
import ModalCreateProject from "./ModalCreateProject";
import ModalCreateTask from "./ModalCreateTask";

interface IModalContent {
    modalType: string;
};

const ModalContent: FC<IModalContent> = ({modalType}) => {
    return (
        <>
            {modalType === "create_project" && <ModalCreateProject />}
            {modalType === "create_category" && <ModalCreateCategory />}
            {modalType === "create_task" && <ModalCreateTask />}
            {modalType === "auth" && <ModalAuth />}
        </>
    );
};

export default ModalContent;
