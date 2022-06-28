import React, { FC, useEffect, useRef, useState } from "react";
import useAction from "../../hooks/useAction";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { fetchCreateCategory } from "../../store/asyncActions";

const ModalCreateCategory: FC = () => {
    const [title, setTitle] = useState<string>("");
    const project = useAppSelector(state => state.project);

    const {setModalState} = useAction();
    const dispatch = useAppDispatch();
    const focusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        focusRef.current?.focus();
    }, []);

    const onClickCreateCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(project){
            dispatch(fetchCreateCategory({id: project.id, title}))
        };
        setModalState({isOpen: false, modalType: ""});
    };
    
    return (
        <div className="modal-wrapper__content">
            <input 
                ref={focusRef}
                type="text" 
                placeholder="Название категории"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <button
                className="modal-wrapper__content__create-button"
                onClick={onClickCreateCategory}
                disabled={title.length > 0 ? false : true}
            >
                Create
            </button>
        </div>
    );
};

export default ModalCreateCategory;
