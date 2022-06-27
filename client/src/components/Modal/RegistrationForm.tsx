import { FC, useEffect } from "react";
import useAction from "../../hooks/useAction";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { fetchRegistration } from "../../store/asyncActions";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormRegistration {
    login: string;
    password: string;
    confirmPassword: string;
};

const RegistrationForm: FC = () => {
    const { register, formState: { isDirty, isValid, errors }, setFocus, handleSubmit, watch } = useForm<IFormRegistration>({
        mode: "onChange"
    });
    
    const dispatch = useAppDispatch();
    const {setModalState} = useAction(); 
    const {error, isAuth} = useAppSelector(state => state.user);

    useEffect(() => {
        if(isAuth) {
            setModalState({isOpen: false, modalType: ""});
        };
    }, [isAuth]);

    useEffect(() => {
        setFocus("login");
    }, []);

    const onClickRegistration: SubmitHandler<IFormRegistration> = (data) => {
        const {login, password} = data;

        dispatch(fetchRegistration({
            name: login, 
            password
        }));
    };

    return (
        <div
            className="auth-wrapper__form-login"
        >
            <form onSubmit={handleSubmit(onClickRegistration)}>
                <input 
                    type="text" 
                    placeholder="Логин"
                    {...register("login", {
                        required: {
                            value: true,
                            message: "Обязательное поле"
                        }, 
                        minLength: {
                            value: 4,
                            message: "Обязательная длинна от 4 до 16 символов"
                        }, 
                        maxLength: {
                            value: 16,
                            message: "Обязательная длинна от 4 до 16 символов"
                        }
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
                        }, 
                        minLength: {
                            value: 8,
                            message: "Минимальная длинна 8 символов"
                        },  
                    })}
                />
                {errors?.password && <small>{errors.password.message}</small>}
                <input 
                    type="password" 
                    placeholder="Подтвердите пароль"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Подтвердите пароль"
                        },
                        validate: (value: string) => {
                            if(watch("password") !== value){
                                return "Пароль не совпадает"
                            };
                        }
                    })}
                />
                {errors?.confirmPassword && <small>{errors.confirmPassword.message}</small>}
                {error && <small>{error}</small>}
                <button
                    type="submit"
                    disabled={!isDirty || !isValid}
                    className="modal-wrapper__content__auth-button"
                >
                    Registration
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
