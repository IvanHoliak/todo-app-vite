import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import useAction from "../../hooks/useAction";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { fetchCreateTask } from "../../store/asyncActions";

const ModalCreateTask = () => {
    const [description, setDescription] = useState<string>("");
    const {setModalState} = useAction();
    const dispatch = useAppDispatch();
    const project = useAppSelector(state => state.project);
    const focusRef = useRef<HTMLInputElement>(null);

    const [usersWhom, setUsersWhom] = useState<string[]>([]);
    const [valueSelect, setValueSelect] = useState<string>("Whom");
    const [importance, setImportance] = useState<number>(0);

    useEffect(() => {
        focusRef.current?.focus();
    }, []);

    const onClickCreateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(project){
            dispatch(fetchCreateTask({id: project.id, description, whom: usersWhom, importance}));
        }
        setModalState({isOpen: false, modalType: ""});
    };

    const onChangeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setValueSelect(e.target.value);
        setUsersWhom(prev => [...prev, e.target.value]);
    };

    const onClickRemoveTagHandler = (e: React.MouseEvent<HTMLButtonElement>, user: string) => {
        e.preventDefault();
        setUsersWhom(prev => prev.filter(item => item !== user));
        setValueSelect("Whom");
    };

    const onChangeImportance = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImportance(+e.target.value);
    };
    
    return (
        <div className="modal-wrapper__content">
            <input 
                ref={focusRef}
                type="text" 
                placeholder="Описание задачи"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
            <label htmlFor="importance-range">Срочность:</label>
            <input 
                id="importance-range"
                type="range" 
                name="importance" 
                min={0} 
                max={2} 
                value={importance}
                onChange={onChangeImportance}
            />
            <ul>
                <li style={importance === 0 ? {"opacity": 1, "color": "black"} : {"opacity": 0}}>Так себе</li>
                <li style={importance === 1 ? {"opacity": 1, "color": "yellow"} : {"opacity": 0}}>Среднячек</li>
                <li style={importance === 2 ? {"opacity": 1, "color": "red"} : {"opacity": 0}}>Срочно</li>
            </ul>
            <select 
                name="select-whom"
                onChange={onChangeSelectHandler}
                value={valueSelect}
            >
                <option value="Whom" disabled>Choose a user</option>
                {project?.access && project.access.map(item => (
                    <option 
                        key={item}
                        value={item}
                        disabled={usersWhom.includes(item) ? true : false}
                    >
                        {item}
                    </option>
                ))}
            </select>
            <div className="modal-wrapper__content__selected-users-tags">
                {usersWhom.map((userWhom, index) => (
                    <div
                        className="tag"
                        key={userWhom}
                    >
                        {userWhom}
                        <button
                            className="tag__remove-button"
                            title="Remove tag"
                            onClick={(e) => onClickRemoveTagHandler(e, userWhom)}
                        >
                            <FontAwesomeIcon icon={faXmark}/>
                        </button> 
                    </div>
                ))}
            </div>
            <button
                className="modal-wrapper__content__create-button"
                onClick={onClickCreateTask}
                disabled={description.length > 0 && usersWhom.length > 0 ? false : true}
            >
                Create
            </button>
        </div>
    ); 
};

export default ModalCreateTask;
