import   React from "react";
import   Home from "../Pages/Home";
import { Switch,
         Route,
         useLocation
       } from 'react-router-dom';

const Routes:React.FC = () => {
    const location = useLocation()
    return (
        <Switch location={location}>
            <Route exact path="/" component={Home}/>
        </Switch>
    )
}

export default Routes;