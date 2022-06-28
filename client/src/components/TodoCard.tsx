import React, { FC, useState } from "react";
import { dragEndHandler, dragLeaveHandler, dragOverHandler, dragStartHandler, dropHandler } from "../helpers/drag";
import useAction from "../hooks/useAction";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import { ITodoCard } from "../interfaces";
import { fetchRemoveTask } from "../store/asyncActions";
import { fetchUpdateCategories } from "../helpers/fetchUpdateCategories";

const TodoCard: FC<ITodoCard> = ({task, category}) => {
    const {id, description, whom, importance} = task;
    const [onChangeDescription, setOnChangeDescription] = useState<boolean>(false);
    

    const {setCurrentState, setProjectCategories, setNewTaskDescription} = useAction();

    const { currentTask, currentCategory } = useAppSelector(state => state.drag);
    const dispatch = useAppDispatch();
    const project = useAppSelector(state => state.project);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setNewTaskDescription({taskId: id, categoryId: category.id, description: e.target.value});
    };

    const onUpdateDescription = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOnChangeDescription(false);
        if(project && project.categories) {
            fetchUpdateCategories(project.id, project.categories)
        };
    };

    const onClickRemoveHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(project){
            dispatch(fetchRemoveTask({
                projectId: project?.id,
                categoryId: category.id,
                taskId: task.id
            }));
        };
    };

    return (
        <div 
            className="todo-card"
            draggable={true}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, task, category, setCurrentState)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, task, category, currentTask, currentCategory, project, setProjectCategories)}
        >
            <div className="todo-card__header">
                <div
                    className="todo-card__header__importance-task"
                >
                    <div></div>
                    <div
                        style={importance >= 1 ? {background: "yellow"} : {background: "transparent"}}
                    ></div>
                    <div
                        style={importance >= 2 ? {background: "red"} : {background: "transparent"}}
                    ></div>
                </div>
                <button
                    className="todo-card__header__remove-button"
                    title="Remove task"
                    onClick={(e) => onClickRemoveHandler(e)}
                >
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>
            <div className="todo-card__content">
                <div className="todo-card__content__description">
                    {onChangeDescription ? (
                        <>
                            <textarea 
                                value={description}
                                onChange={onChangeHandler}
                                autoFocus={true}
                                wrap="soft"
                            />
                            <button
                                onClick={(e) => onUpdateDescription(e)}
                                title="OK"
                            >
                                <FontAwesomeIcon icon={faCheck}/>
                            </button>
                        </>
                    ) : (
                        <>
                            <p>
                                {description}
                            </p>
                            <button
                                onClick={() => setOnChangeDescription(true)}
                                title="Изменить описание"
                            >
                                <FontAwesomeIcon icon={faPencil}/>
                            </button>
                        </>
                    )}
                </div>
                <br/>
                <div className="todo-card__content__whom-tags">
                    {whom.map((name, _, arr) => (
                        <div
                            className="tag"
                            key={name}
                        >
                            {name}
                            {arr.length > 1 && (
                                <button
                                    className="tag__remove-button"
                                    title="Remove tag"
                                >
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button 
                    className="tag__add-button"
                    title="Add whom tag" 
                    disabled={true}
                >
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
        </div>

    );
};

export default TodoCard;
