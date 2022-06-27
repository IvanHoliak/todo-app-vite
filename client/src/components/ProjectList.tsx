import { FC } from "react";
import useAction from "../hooks/useAction";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchProject } from "../store/asyncActions";

const ProjectList: FC = () => {
    const {projects} = useAppSelector(state => state.user);
    const project = useAppSelector(state => state.project);
    const dispatch = useAppDispatch();
    
    const {setModalState} = useAction();

    const onClickCreateProject = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModalState({isOpen: true, modalType: "create_project"});
    };

    const onClickGetProject = (e: React.MouseEvent<HTMLParagraphElement>, id: string) => {
        if(project?.id !== id){
            dispatch(fetchProject(id))
        }
    };

    return (
        <>
            <div className="navigation__create-project">
                <button
                    className="navigation__create-project__btn"
                    onClick={onClickCreateProject}
                >
                    Create project
                </button>
            </div>
            <div className="navigation__project-lists">
                {projects.length ? (
                    projects.map(({id, title}) => (
                        <p 
                            key={id}
                            className={project?.id === id ? "navigation__project-lists__project active" : "navigation__project-lists__project"}
                            onClick={(e) => onClickGetProject(e, id)}
                            title={title}
                        >
                            {title}
                        </p>
                    ))
                ) : (
                    <p>Список проектов пуст</p>
                )}
            </div>
        </>
    );
};

export default ProjectList;
