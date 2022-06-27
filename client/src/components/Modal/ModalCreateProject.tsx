import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState, useRef, useEffect } from "react";
import useAction from "../../hooks/useAction";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { IUsers } from "../../interfaces";
import { fetchCreateProject } from "../../store/asyncActions";

const ModalCreateProject: FC = () => {
    const [title, setTitle] = useState<string>("");
    const { user } = useAppSelector(state => state.user);
    const users = useAppSelector(state => state.users);
    const {setModalState} = useAction();
    const dispatch = useAppDispatch();
    const focusRef = useRef<HTMLInputElement>(null);
    const [valueSelect, setValueSelect] = useState<string>("Access");
    const [usersAccess, setUsersAccess] = useState<IUsers[]>([])

    useEffect(() => {
        if(user && user.id){
            setUsersAccess([...usersAccess, {id: user.id, name: user.name}])
        };
        focusRef.current?.focus();
    }, []);

    const onClickCreateProject = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(fetchCreateProject({title, access: usersAccess}));
        setModalState({isOpen: false, modalType: ""});
    };

    const onChangeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setValueSelect(e.target.value);
        const findUser = users.find(user => user.id === e.target.value);
        if(findUser) {
            setUsersAccess(prev => [...prev, findUser])
        };
    };

    const onClickRemoveTagHandler = (e: React.MouseEvent<HTMLButtonElement>, user: IUsers) => {
        e.preventDefault();
        setUsersAccess(prev => prev.filter(item => item.id !== user.id));
    };
    
    return (
        <div className="modal-wrapper__content">
            <input 
                ref={focusRef}
                type="text" 
                placeholder="Название проекта"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <select 
                name="Select user"
                onChange={onChangeSelectHandler}
                value={valueSelect}
            >
                <option value="Access" disabled>Choose a user</option>
                {users.map(item => (
                    <option 
                        key={item.id}
                        value={item.id}
                        disabled={
                            usersAccess.filter(userAccess => userAccess.id === item.id).length
                            || user.id === item.id ? true : false
                        }
                    >
                        {item.name}
                    </option>
                ))}
            </select>
            <div className="modal-wrapper__content__selected-users-tags">
                {usersAccess.map((userAccess, index) => (
                    <div
                        className="tag"
                        key={userAccess.id}
                    >
                        {userAccess.name}
                        {index != 0 && <button
                            className="tag__remove-button"
                            title="Remove tag"
                            onClick={(e) => onClickRemoveTagHandler(e, userAccess)}
                        >
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>}    
                    </div>
                ))}
            </div>
            <button
                className="modal-wrapper__content__create-button"
                onClick={onClickCreateProject}
            >
                Create
            </button>
        </div>
    );
};

export default ModalCreateProject;
