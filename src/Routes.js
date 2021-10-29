import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';

const Routes = () => {
  return (
    <Router basename="/">
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  );
};

export default Routes;
