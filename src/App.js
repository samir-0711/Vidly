import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./Components/customers";
import Movie from "./Components/movie";
import NotFound from "./Components/notFound";
import Rentals from "./Components/rentals";
import Navbar from "./Components/navbar";
import MovieForm from "./Components/movieForm";
import LoginForm from "./Components/loginFormClass";
import RegisterForm from "./Components/registrationForm";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movie} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
