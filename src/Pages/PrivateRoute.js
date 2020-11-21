import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {UserSession} from '../firebase/UserProvider'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {user, loading} = UserSession();

    return (
        <Route {...rest} render={props =>(
        !user ? <Redirect to={{
          pathname: "/auth",
          state: { from: props.match.params.id }
        }} /> : (<Component {...props} />)
      )}
    />
    )
}

export default PrivateRoute
