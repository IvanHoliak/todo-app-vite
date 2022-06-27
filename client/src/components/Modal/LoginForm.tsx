import { FC, useEffect, useRef } from "react";
import useAction from "../../hooks/useAction";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { fetchLogin } from "../../store/asyncActions";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormLogin {
    login: string;
    password: string;
}

const LoginForm: FC = () => {
    const {register, formState: {isDirty, isValid, errors}, setFocus, handleSubmit} = useForm<IFormLogin>({
        mode: "onChange"
    });

    const dispatch = useAppDispatch();
    const { setModalState } = useAction();
    const {error, isAuth} = useAppSelector(state => state.user);

    useEffect(() => {
        if(isAuth) {
            setModalState({isOpen: false, modalType: ""});
        };
    }, [isAuth]);

    useEffect(() => {
        setFocus("login");
    }, []);

    const onClickLogin: SubmitHandler<IFormLogin> = (data) => {
        const {login, password} = data;

        dispatch(fetchLogin({
            name: login, 
            password
        }));
    };

    return (
        <div 
            className="auth-wrapper__form-registration"
        >
            <form onSubmit={handleSubmit(onClickLogin)}>
                <input 
                    type="text" 
                    placeholder="Логин"
                    {...register("login", {
                        required: {
                            value: true,
                            message: "Обязательное поле"
                        },
                    })}
                />
                {errors?.login && <small>{errors.login.message}</small>}
                <input 
                    type="password" 
                    placeholder="Пароль"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Обязательное поле"
                        }
                    })}
                />
                {errors?.password && <small>{errors.password.message}</small>}
                {error && <small>{error}</small>}
                <button
                    type="submit"
                    disabled={!isDirty || !isValid}
                    className="modal-wrapper__content__auth-button"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
