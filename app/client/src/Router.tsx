import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import { Error } from './utils/Error';

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/secludednightmarket" component={App}/>
            <Route path="/" component={Error}/>
        </Switch>
    </BrowserRouter>
)