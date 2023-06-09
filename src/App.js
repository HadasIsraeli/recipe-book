// import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './components/Create';
import RecipeDetails from './components/RecipeDetails';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Update from './components/Update';
import Register from './components/Register';
import LogInApp from './components/LogInApp';
import { LoggedContextWrapper } from './LoggedInUser';
import UsersPage from './components/UsersPage';
import UserDetails from './components/UserDetails';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <LoggedContextWrapper>

    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
          <Route exact path="/Login">
              <LogInApp />
            </Route>
            <Route exact path="/Register">
              <Register />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/users">
              <UsersPage />
            </Route>
            <Route path="/UserProfile">
              <UserProfile />
            </Route>
            <Route path="/recipes/:id">
              <RecipeDetails />
            </Route>
            <Route path="/update/:id">
              <Update />
            </Route>
            <Route path="/user/:id">
              <UserDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
    </LoggedContextWrapper>

  );
}

export default App;
