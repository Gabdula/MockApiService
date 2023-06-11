import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import '../OffsetStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../../components/Tooltip/Tooltip';
import { useInput, inputArrayErrors  } from '../../hooks/ValidationField'
import { setModalInfo } from '../../store/ModalInfoReducer';
import { accountLogin } from '../../store/Actions/ActionCreator';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const login = useInput('', { isEmpty: true});
  const password = useInput('', { isEmpty: true});
  const [regSuccess, setRegSuccess] = useState(false)
  const [validLogin, setValidLogin] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  // Отрисовка модального окна ошибки
  const { isErrorFetch, isSuccess } = useSelector((state) => state.userStore);
  useEffect(() => {
    if (isErrorFetch !== undefined) {
      dispatch(setModalInfo(isErrorFetch));
    }
    if (isSuccess !== undefined){
      dispatch(setModalInfo(isSuccess));
    }
  }, [isErrorFetch, isSuccess, dispatch]);

  const { isAuth } = useSelector((state) => state.userStore);
  useEffect(() => {
    navigation('/')
  }, [isAuth]);

  useEffect(() => {
    if(login.isChange || regSuccess === true){
      setValidLogin(inputArrayErrors(login).valid);
    }
    if(password.isChange || regSuccess === true){
      setValidPassword(inputArrayErrors(password).valid);
    }
  }, [password, login]);

  const checkFieldsOnClick = () => {
    setRegSuccess(true)
    if (validLogin && validPassword) {
      dispatch(accountLogin(login.value, password.value));
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <div className="logo">
            <img src="image/logo-site.png" alt="logo" width={70} height={70} />
            <span>Template</span>
          </div>
        </div>
        <div className="auth-container">
          <div className="auth-block">
            <div className="auth-block__padding">
              <p className="auth-block__title">Authorization</p>
              <div className="auth-block__input">
                <div className={validLogin || login.isDirty ? '' : 'input-dirty'}>
                  <div className="auth-block__input__tooltip">
                    <p>Login</p>
                    <Tooltip tooltip={inputArrayErrors(login).errors}>
                        {validLogin ? (
                          ''
                        ) : (
                          <img src="image/validateAlert.svg" alt="info" width={15} />
                        )}
                    </Tooltip>
                  </div>
                  <input
                    onChange={(e) => login.onChange(e)}
                    onBlur={(e) => login.onBlur(e)}
                    onFocus={(e) => login.onFocus(e)}
                    value={login.value}
                    name="login"
                    type="text"
                    placeholder="login123"
                  />
                </div>
                <div className={validPassword || password.isDirty ? '' : 'input-dirty'}>
                  <div className="auth-block__input__tooltip">
                    <p>Password</p>
                    <Tooltip tooltip={inputArrayErrors(password).errors}>
                      {validPassword ? (
                        ''
                      ) : (
                        <img src="image/validateAlert.svg" alt="info" width={15} />
                      )}
                    </Tooltip>
                  </div>
                  <input
                    onChange={(e) => password.onChange(e)}
                    onBlur={(e) => password.onBlur(e)}
                    onFocus={(e) => password.onFocus(e)}
                    value={password.value}
                    name="password"
                    type="password"
                    placeholder="•••••••"
                  />
                </div>
              </div>
              <p className="auth-block__forget">forgot password?</p>
              <div className="auth-block__button__bottom">
                <div className="auth-block__button">
                  <button onClick={() => checkFieldsOnClick()}>Sign In</button>
                </div>
                <p className="auth-block__signup" onClick={() => navigation('/registration')}>Sign Up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
