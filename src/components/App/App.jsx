import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AddBeerPage from '../AddBeerPage/AddBeerPage';
import AboutPage from '../AboutPage/AboutPage';
import BeerDetails from '../BeerDetails/BeerDetails'
import EditBeerPage from '../EditBeerPage/EditBeerPage'
import HomePage from '../Homepage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import MyBeersPage from '../MyBeersPage/MyBeersPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import WantTroTryPage from '../WantToTryPage/WantToTryPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          
          {/* Don't need a redirect at this time. Keeping for reference */}
          {/* <Redirect exact from="/" to="/home" /> */}

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/home"
            // - else shows LoginPage at /
            exact
            path="/"
            authRedirect="/home"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/home"
            // - else shows RegisterPage at "/register"
            exact
            path="/register"
            authRedirect="/home"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Homepage else shows LoginPage
            exact
            path="/home"
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows details Page else shows LoginPage
            exact
            path="/details"
          >
            <BeerDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows My Beers Page else shows LoginPage
            exact
            path="/mybeers"
          >
            <MyBeersPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Want to try else shows LoginPage
            exact
            path="/wanttotry"
          >
            <WantTroTryPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows add beer page else shows LoginPage
            exact
            path="/addbeer"
          >
            <AddBeerPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows add beer page else shows LoginPage
            exact
            path="/editbeer"
          >
            <EditBeerPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* Might not use footer. Taking out for now */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
