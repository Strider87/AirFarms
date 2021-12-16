import React from 'react'
import { Switch } from "react-router-dom";
import Registration from '../pages/Registration'
import Signin from '../pages/Singin'
import Signout from '../pages/Signout'
import ResetPassword from '../components/ResetPassword'
import Home from '../pages/Home'
import RouteWrapper from './RouteWrapper';
import UserDashboard from '../pages/UserDashboard';
import UserProfilePage from '../pages/UserProfilePage'

function Routes() {
    return (
        <Switch>
            <RouteWrapper path="/" exact component={Home} />
            <RouteWrapper path="/profile" exact isPrivate component={UserProfilePage} />
            <RouteWrapper path="/signup" exact component={Registration} />
            <RouteWrapper path="/login" exact component={Signin} />
            <RouteWrapper path="/logout" exact isPrivate component={Signout} />
            <RouteWrapper path="/resetpassword" exact component={ResetPassword} />
            <RouteWrapper path="/user-dashboard" exact isPrivate component={UserDashboard} />
            <RouteWrapper component={Signin}/>
        </Switch>
        
    )
}

export default Routes

