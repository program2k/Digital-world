import React, { memo, useEffect } from 'react';
import withBase from '../../HOCS/withBase';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { oauth2Login, getOauth2User } from '../../store/asyncUserAction';

const LoginSuccess = ({ dispatch }) => {
    const { oauth2Id, tokenLogin } = useParams();
    const { isLogin, current, token } = useSelector(state => state.userReducer);
    console.log(current, token)
    console.log(oauth2Id)

    useEffect(() => {
        dispatch(oauth2Login({oauth2Id, tokenLogin}));
        dispatch(getOauth2User(oauth2Id));
    }, []);

    return (
        <div>
            {isLogin ? <Navigate to={'/'} replace={true} /> : <h3>Yeu cau dang nhap</h3>}
        </div>
    );
};

export default withBase(memo(LoginSuccess));