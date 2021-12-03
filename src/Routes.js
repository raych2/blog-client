import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import PostDetail from './components/PostDetail';

const Routes = () => {
  return (
    <Router basename="/">
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/posts/:id" component={PostDetail} />
        <Redirect exact from="/posts" to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
