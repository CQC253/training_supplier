import React, { useEffect } from 'react';
import styles from './LoginPage.module.scss'

import { useDispatch } from 'react-redux';
import AccountAction from 'redux/account/action';
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from 'react-i18next';

function LoginPage() {
    const history = useHistory()
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        let token = localStorage.getItem("token");
        dispatch({
            type: AccountAction.ME_START,
            payload: token,
            validToken: (res) => {
                if(res.message === "OK" && res.success === true) {
                    return history.push('/')
                }
            },
            invalidToken: (res) => {
                if(!token || res.message === "Token is invalid." && res.success === false) {
                    return history.push('/login');
                }
            }
        });
    }, [])

    const onSubmit = (data) => {
        const getInfo = {
            email: data.email,
            password: data.password
        }
        handleSendDispatch(getInfo)
    };

    const handleError = (rs) => {
        if (rs && rs?.data?.access_token) {
            localStorage.setItem("token", rs.data.access_token)
            history.push('/');
        } else {
            if (rs && rs?.request?.status === 401) {
                toast.error(rs.response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    const handleSendDispatch = (info) => {
        if (!Object.keys(errors).length) {
            dispatch({
                type: AccountAction.LOGIN_START,
                payload: info,
                callBack: handleError,
            })
        }
    };

    return (
        <div className={styles['LoginPage']}>
            <ToastContainer
                position="top-right"
                className={styles['custom-toast-container']}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['div-login']}>
                    <div className={styles['div-header']}>
                        <h2>{t('login.header')}</h2>
                    </div>
                    <div className={styles['div-body']}>
                        <div className={styles['form-group']}>
                            <label>{t('login.body.email')}<span className={styles['span-required']}>*</span>:</label>
                            <div className={styles['div-input']}>
                                <input
                                    type="text"
                                    {...register('email', {
                                        required: `${t('login.body.err.email.required')}`,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: `${t('login.body.err.email.pattern')}`,
                                        },
                                    })}
                                    placeholder={t('login.body.placeholder.email')}
                                    autoComplete="email"
                                />
                                {errors.email && <span className={styles['error-msg']}>{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <label>{t('login.body.password')}<span className={styles['span-required']}>*</span>:</label>
                            <div className={styles['div-input']}>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: `${t('login.body.err.password.required')}`,
                                        minLength: {
                                            value: 6,
                                            message: `${t('login.body.err.password.minLength')}`,
                                        },
                                        // pattern: {
                                        //     value: /^(?=.*[A-Z])/,
                                        //     message: `${t('login.body.err.password.pattern')}`,
                                        // },
                                    })}
                                    placeholder={t('login.body.placeholder.password')}
                                    autoComplete={"current-password"}
                                />
                                {errors.password && <span className={styles['error-msg']}>{errors.password.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className={styles['div-footer']}>
                        <button
                            className={styles['btn-submit']}
                            type='submit'
                        >
                            {t('login.footer')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginPage;