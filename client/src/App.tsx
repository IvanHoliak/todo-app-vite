import { useEffect } from "react";
import Modal from "./components/Modal/Modal";
import Navigation from "./components/Navigation";
import TodosSection from "./components/TodosSection";
import useAppDispatch from "./hooks/useAppDispatch";
import useAppSelector from "./hooks/useAppSelector";
import { fetchAuthorization, fetchGetUsers } from "./store/asyncActions";
import "./styles/app.scss";


const App = () => {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(state => state.user);

    useEffect(() => {
        if(isAuth){
            dispatch(fetchGetUsers());
        };
    }, [isAuth]);

    useEffect(() => {
        const userid = localStorage.getItem("todo_userid");

        if(userid){
            dispatch(fetchAuthorization(userid));
        };
    }, []);
    return (
        <div className="app">
            <Navigation />
            <TodosSection />
            <Modal />
        </div>
    );
};

export default App;
