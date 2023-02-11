import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Cookies from 'universal-cookie';

import { isValidEmail, isValidPassword } from '../../utils/validators';
import { getUser, updateUser } from '../../services/actions/user';
import { updateToken } from '../../services/actions/auth';
import ProfilePageWrapper from '../../components/profile-page-wrapper/profile-page-wrapper';

import styles from './profile.module.css';

const ProfilePage = () => {
    const { isLogoutLoading } = useSelector(state => state.auth);
    const { name, email, password } = useSelector(state => state.user);
    const [state, setState] = useState({
        name,
        email,
        password,
        nameReadOnly: true,
        showButtons: true,
        saveButtonReadOnly: true
    });
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const onNameIconClick = () => {
        if (state.nameReadOnly) {
            setState({
                ...state,
                nameReadOnly: false
            });
            setTimeout(() => inputRef.current.focus(), 0);
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

    const onNameChange = (event) => {
        const name = event.target.value;
        if (state.name !== name) {
            setState({
                ...state,
                name
            });
        }
    };

    const onEmailChange = (event) => {
        const email = event.target.value;
        if (state.email !== email) {
            setState({
                ...state,
                email
            });
        }
    };

    const onPasswordChange = (event) => {
        const password = event.target.value;
        if (state.password !== password) {
            setState({
                ...state,
                password
            });
        }
    };

    const dispatchUpdateUser = (token) => {
        dispatch(updateUser(
            token,
            state.name,
            state.email,
            state.password ? state.password : undefined
        )).then((res) => {
            if (res.success) {
                setState({
                    ...state,
                    showButtons: false
                });
            } else {
                alert(res.error);
            }
        }).catch(error => alert(error));
    };

    const onSaveButtonClick = (event) => {
        const cookies = new Cookies();
        const accessToken = cookies.get('accessToken');
        if (accessToken) {
            dispatchUpdateUser(accessToken);
        } else {
            dispatch(updateToken(cookies.get('refreshToken'))).then((res) => {
                if (res.success) {
                    dispatchUpdateUser(res.accessToken);
                } else {
                    alert(res.error);
                }
            }).catch(error => alert(error));
        }
    };

    const onCancelButtonClick = (event) => {
        setState({
            ...state,
            name,
            email,
            password,
            nameReadOnly: true,
            showButtons: false
        });
    };

    useEffect(() => {
        const cookies = new Cookies();
        const accessToken = cookies.get('accessToken');
        if (accessToken) {
            dispatch(getUser(accessToken)).catch(error => alert(error));
        } else {
            dispatch(updateToken(cookies.get('refreshToken'))).then((res) => {
                if (res.success) {
                    dispatch(getUser(res.accessToken));
                } else {
                    alert(res.error);
                }
            }).catch(error => alert(error));
        }
    }, []);

    useEffect(() => {
        setState({
            ...state,
            name,
            email,
            nameReadOnly: true
        });
    }, [name, email]);

    useEffect(() => {
        const saveButtonReadOnly =
            !state.name
            || !isValidEmail(state.email)
            || (state.password && !isValidPassword(state.password));
        const showButtons = state.name !== name || state.email !== email || state.password !== password;
        setState({
            ...state,
            saveButtonReadOnly,
            showButtons
        });
    }, [state.name, state.email, state.password, setState]);

    return (
        <ProfilePageWrapper
            activeTab="profile"
            showLoadingIndicator={ isLogoutLoading }>
            <div className={ styles.Inputs }>
                <Input
                    ref={ inputRef }
                    placeholder="Имя"
                    value={ state.name }
                    icon="EditIcon"
                    autoFocus={ true }
                    disabled={ state.nameReadOnly }
                    onIconClick={ onNameIconClick }
                    onBlur={ onNameBlur }
                    onChange={ onNameChange } />
                <EmailInput
                    extraClass="mt-6"
                    placeholder="Логин"
                    value={ state.email }
                    icon="EditIcon"
                    isIcon={ true }
                    errorText="Пожалуйста, введите корректный e-mail."
                    onChange={ onEmailChange } />
                <PasswordInput
                    extraClass="mt-6"
                    placeholder="Пароль"
                    errorText="Пароль должен быть не короче 6 символов."
                    value={ state.password }
                    icon="EditIcon"
                    isicon="true"
                    onChange={ onPasswordChange }/>
                {
                    state.showButtons &&
                    <div className={ `${ styles.Buttons } mt-7` }>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="small"
                            onClick={ onSaveButtonClick }
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
            </div>
        </ProfilePageWrapper>
    );
};

export default ProfilePage;