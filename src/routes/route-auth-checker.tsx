import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AuthRouteChecker({ user, children }: any) {

    if (!user) {
        // redirect to login
        return <Navigate replace to="/login" />;
    }

    return (
        <>{children}</>
    );
}

/**
 * Redirect to dashboard if user is there
 * @param param0 
 * @returns 
 */
function UnAuthRouteChecker({ user, children }: any) {

    if (user) {
        // redirect to dashboard
        return <Navigate replace to="/dashboard" />;
    }

    return (
        <>{children}</>
    );
}

const stp = (state: any) => ({
    user: state.auth
})

export const AuthRoute = connect(stp)(AuthRouteChecker);
export const UnAuthRoute = connect(stp)(UnAuthRouteChecker);
