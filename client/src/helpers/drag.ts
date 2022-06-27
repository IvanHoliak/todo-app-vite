import { ICategory, ITask, ICurrentDragReducer, IProject } from "../interfaces";
import { fetchUpdateCategories } from "./fetchUpdateCategories";

export const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
};
export const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {

};
export const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    task: ITask, 
    category: ICategory, 
    setCurrentState: (obj: ICurrentDragReducer) => void
) => {
    setCurrentState({currentTask: task, currentCategory: category});
};
export const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {

};

export const dropHandler = (
    e: React.DragEvent<HTMLDivElement>, 
    task: ITask, 
    category: ICategory,
    currentTask: ITask | null,
    currentCategory: ICategory | null,
    project: IProject | null,
    setProjectCategories: (arr: ICategory[]) => void,
) => {
    e.preventDefault();
    e.stopPropagation();

    if(currentTask && currentCategory && project && project.categories){
        const currentIndex = currentCategory.tasks.indexOf(currentTask);
        const newCurrentCategory = JSON.parse(JSON.stringify(currentCategory));
        newCurrentCategory.tasks.splice(currentIndex, 1);
        const dropIndex = category.tasks.indexOf(task);
        const newCategory = JSON.parse(JSON.stringify(category));
        if(!newCategory.tasks.filter((task: ITask) => task.id === currentTask.id).length){
            newCategory.tasks.splice(dropIndex + 1, 0, currentTask);
        };

        const setNewCategory = project.categories.map(item => {
            if(item.id === category.id){
                return newCategory;
            };
            if(item.id === currentCategory.id){
                return newCurrentCategory;
            };
            return item;
        });
        setProjectCategories(setNewCategory);

        fetchUpdateCategories(project.id, setNewCategory);
    };
};
    
export const dropCategoryHandler = (
    e: React.DragEvent<HTMLDivElement>, 
    category: ICategory,
    currentTask: ITask | null,
    currentCategory: ICategory | null,
    project: IProject | null,
    setProjectCategories: (arr: ICategory[]) => void,
) => {
    e.preventDefault();

    if(currentTask && currentCategory && project && project.categories){
        const newCategory = JSON.parse(JSON.stringify(category));
        if(!newCategory.tasks.filter((task: ITask) => task.id === currentTask.id).length){
            newCategory.tasks.push(currentTask);
        };
        const currentIndex = currentCategory.tasks.indexOf(currentTask)
        const newCurrentCategory = JSON.parse(JSON.stringify(currentCategory));
        newCurrentCategory.tasks.splice(currentIndex, 1);

        const setNewCategory = project.categories.map(item => {
            if(item.id === category.id){
                return newCategory;
            };
            if(item.id === currentCategory.id){
                return newCurrentCategory;
            };
            return item;
        });

        setProjectCategories(setNewCategory);

        fetchUpdateCategories(project.id, setNewCategory);
    };
};