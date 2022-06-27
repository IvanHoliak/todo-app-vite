import React, { FC, useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { ITodoCategory } from "../interfaces";
import { dragOverHandler, dropCategoryHandler } from "../helpers/drag";

import TodoCard from "./TodoCard";
import useAppSelector from "../hooks/useAppSelector";
import useAction from "../hooks/useAction";
import { fetchUpdateCategories } from "../helpers/fetchUpdateCategories";

const TodoCategory: FC<ITodoCategory> = ({category, createTask}) => {
    const {title, tasks} = category;
    const [onChangeTitle, setOnChangeTitle] = useState<boolean>(false);
    const refInput = useRef<HTMLInputElement | null>(null)

    const {setModalState, setProjectCategories, setNewTitle} = useAction();

    const { currentTask, currentCategory } = useAppSelector(state => state.drag);
    const project = useAppSelector(state => state.project);

    const onClickCreateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModalState({isOpen: true, modalType: "create_task"});
    };

    const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewTitle({id: category.id, title: e.target.value});
    };

    const onUpdateCategory = () => {
        setOnChangeTitle(false);
        if(project && project.categories) {
            fetchUpdateCategories(project.id, project.categories)
        };
    };

    useEffect(() => {
        if(onChangeTitle){
            refInput.current?.focus();
        };
    }, [onChangeTitle]);

    const onClickTitleHandler = () => {
        setOnChangeTitle(true);
    };

    return (
        <div 
            className="todo-category"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCategoryHandler(e, category, currentTask, currentCategory, project, setProjectCategories)}
        >
            <header className="todo-category__header">
                {onChangeTitle ? (
                    <input 
                        ref={refInput}
                        type="text" 
                        value={title}
                        onBlur={onUpdateCategory}
                        onChange={onChangeTitleHandler}
                    />
                ) : (
                    <h4
                        onClick={onClickTitleHandler}
                    >{title}</h4>
                )}
            </header>
            <div className="todo-category__tasks">
                {tasks.map(task => (
                    <TodoCard 
                        key={task.id} 
                        task={task}
                        category={category}
                    />
                ))}
            </div>
            {createTask && (
                <div className="todo-category__addTask">
                    <button 
                        className="todo-category__addTask-btn"
                        title="Add Task"
                        onClick={onClickCreateTask}    
                    >
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default TodoCategory;
