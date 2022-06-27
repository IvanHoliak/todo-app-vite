import React from "react";
import useAction from "../hooks/useAction";
import useAppSelector from "../hooks/useAppSelector";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import TodoCategory from "./TodoCategory";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchRemoveProject } from "../store/asyncActions";

const TodosSection = () => {
    const project = useAppSelector(state => state.project);
    const { user, isAuth, error } = useAppSelector(state => state.user);
    const { setModalState, removeProject } = useAction();
    const dispatch = useAppDispatch();

    const onClickCreateCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModalState({isOpen: true, modalType: "create_category"});
    };

    const onClickRemoveProject = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const confirmResult = confirm("Вы действительно хотите удалить проект?");
        if(confirmResult && user?.id && project?.id){
            dispatch(fetchRemoveProject({
                userid: user.id, 
                projectid: project.id
            }));

            removeProject();
        };
    };

    const convertDate = (date: number) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <section className="todos-section">
            {project && isAuth && (
                <>
                    <header className="todos-section__header">
                        <h2>{project.title}</h2>
                        <p
                            title="Created date"
                        >
                            <FontAwesomeIcon icon={faClock}/>
                            {convertDate(project.createdTime)}
                        </p>
                        <p
                            title="Last changed date"
                        >
                            <FontAwesomeIcon icon={faClock}/>
                            {convertDate(project.changedTime)}
                        </p>
                        <p>{project?.access && project.access.join(", ")}</p>
                        <button 
                            className="todos-section__header__remove-project"
                            title="Remove Project"
                            onClick={onClickRemoveProject}
                        >   
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                    </header>
                    <div className="todos-section__categories">
                        {project?.categories && project.categories.map((category, index) => (
                            <TodoCategory 
                                key={category.id} 
                                category={category}
                                createTask={index === 0}
                            />
                        ))}
                        <div className="todos-section__categories__create-category todo-category">
                            <header className="todo-category__header">
                                <h4>Create category</h4>
                            </header>
                            <button 
                                className="todo-category__create-btn"
                                onClick={onClickCreateCategory}
                            >
                                Create
                            </button>
                        </div>  
                    </div>  
                </>   
            )}
        </section>
    );
};

export default TodosSection;
