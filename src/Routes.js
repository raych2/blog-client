import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import PostDetail from './components/PostDetail';

const Routes = () => {
  return (
    <Router basename="/">
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/posts/:id" component={PostDetail} />
      </Switch>
    </Router>
  );
};

export default Routes;
