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
import CreateFarm from '../pages/CreateFarm'
import Farm from '../pages/Farm'
import ProjectPage from '../pages/ProjectPage'
import ProjectList from '../pages/ProjectList'
import DiscussionBoardPage from '../pages/DiscussionBoardPage';
import TodoPage from '../pages/TodoPage'

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
            <RouteWrapper path="/create-farm" exact isPrivate component={CreateFarm} />
            <RouteWrapper path="/load-farm" exact isPrivate component={Farm} />
            <RouteWrapper path="/load-project" exact isPrivate component={ProjectPage} />
            <RouteWrapper path="/load-projectlist" exact isPrivate component={ProjectList} />
            <RouteWrapper path="/discussion-board" exact isPrivate component={DiscussionBoardPage} />
            <RouteWrapper path="/todo" exact isPrivate component={TodoPage} />
            <RouteWrapper component={Signin}/>
        </Switch>
        
    )
}

export default Routes

