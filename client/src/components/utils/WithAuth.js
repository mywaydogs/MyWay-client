import React, { useContext, useEffect } from 'react';
import { checkAuth } from '../../utils/Auth';
import UserContext from '../UserContext';

function withAuth(WrappedComponent) {
    return function (props) {
        useEffect(() => checkAuth('/login', false), [])

        const userContext = useContext(UserContext);
        if (userContext.user.isAuthenticated) {
            return <WrappedComponent {...props} />
        }
        else {
            return <></>
        }
    }
}

export default withAuth;