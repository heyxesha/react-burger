import { useState, useRef, useEffect, RefObject, FormEvent } from 'react';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Cookies from 'universal-cookie';

import { useSelector, useDispatch } from '../../store';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { getUser, updateUser } from '../../services/actions/user';
import { updateToken } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';
import ProfilePageWrapper from '../../components/profile-page-wrapper/profile-page-wrapper';

import { TRootState } from '../../store';
import IActionResponseData from '../../interfaces/action-response-data';

import styles from './profile.module.css';

const ProfilePage = () => {
    const { isLogoutLoading } = useSelector(state => state.auth);
    const { name, email, password } = useSelector((state: TRootState) => state.user);
    const [state, setState] = useState({
        nameReadOnly: true,
        showButtons: true,
        saveButtonReadOnly: true
    });
    const inputRef: RefObject<HTMLInputElement> = useRef(null);
    const dispatch = useDispatch();
    const { values, handleChange, setValues } = useForm({
        name,
        email,
        password
    });

    const onNameIconClick = () => {
        if (state.nameReadOnly) {
            setState({
                ...state,
                nameReadOnly: false
            });
            setTimeout(() => inputRef.current?.focus(), 0);
        } else {
            setState({
                ...state,
                nameReadOnly: true
            });
        }
    };

    const onNameBlur = () => {
        setState({
            ...state,
            nameReadOnly: true
        });
    };

    const dispatchUpdateUser = (token: string) => {
        dispatch(updateUser(
            token,
            values.name,
            values.email,
            values.password ? values.password : undefined
        )).then((res: IActionResponseData) => {
            if (res.success) {
                setState({
                    ...state,
                    showButtons: false
                });
            } else {
                alert(res.error);
            }
        }).catch((error: Error) => alert(error));
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const cookies = new Cookies();
        const accessToken: string | undefined = cookies.get('accessToken');
        if (accessToken) {
            dispatchUpdateUser(accessToken);
        } else {
            dispatch(updateToken(cookies.get('refreshToken'))).then((res: IActionResponseData) => {
                if (res.success && res.accessToken) {
                    dispatchUpdateUser(res.accessToken);
                } else {
                    alert(res.error);
                }
            }).catch((error: Error) => alert(error));
        }
    };

    const onCancelButtonClick = () => {
        setValues({
            ...values,
            name,
            email,
            password
        });
        setState({
            ...state,
            nameReadOnly: true,
            showButtons: false
        });
    };

    useEffect(() => {
        const cookies = new Cookies();
        const accessToken: string | undefined = cookies.get('accessToken');
        if (accessToken) {
            dispatch(getUser(accessToken)).catch((error: Error) => alert(error));
        } else {
            dispatch(updateToken(cookies.get('refreshToken'))).then((res: IActionResponseData) => {
                if (res.success && res.accessToken) {
                    dispatch(getUser(res.accessToken));
                } else {
                    alert(res.error);
                }
            }).catch((error: Error) => alert(error));
        }
    }, []);

    useEffect(() => {
        setValues({
            ...values,
            name,
            email
        });
        setState({
            ...state,
            nameReadOnly: true
        });
    }, [name, email]);

    useEffect(() => {
        const saveButtonReadOnly =
            !values.name
            || !isValidEmail(values.email)
            || (!!values.password && !isValidPassword(values.password));
        const showButtons = values.name !== name || values.email !== email || values.password !== password;
        setState({
            ...state,
            saveButtonReadOnly,
            showButtons
        });
    }, [values.name, values.email, values.password, setState]);

    return (
        <ProfilePageWrapper
            activeTab="profile"
            showLoadingIndicator={ isLogoutLoading }>
            <form className={ styles.Inputs } onSubmit={ onSubmit }>
                <Input
                    ref={ inputRef }
                    placeholder="Имя"
                    name="name"
                    value={ values.name }
                    icon="EditIcon"
                    autoFocus={ true }
                    disabled={ state.nameReadOnly }
                    onIconClick={ onNameIconClick }
                    onBlur={ onNameBlur }
                    onChange={ handleChange } />
                <EmailInput
                    extraClass="mt-6"
                    placeholder="Логин"
                    value={ values.email }
                    name="email"
                    isIcon={ true }
                    onChange={ handleChange } />
                <PasswordInput
                    extraClass="mt-6"
                    placeholder="Пароль"
                    value={ values.password }
                    icon="EditIcon"
                    name="password"
                    onChange={ handleChange }/>
                {
                    state.showButtons &&
                    <div className={ `${ styles.Buttons } mt-7` }>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="small"
                            disabled={ state.saveButtonReadOnly }>
                            Сохранить
                        </Button>
                        <Button
                            htmlType="reset"
                            type="secondary"
                            size="small"
                            extraClass={ styles.ResetButton }
                            onClick={ onCancelButtonClick }>
                            Отменить
                        </Button>
                    </div>
                }
            </form>
        </ProfilePageWrapper>
    );
};

export default ProfilePage;