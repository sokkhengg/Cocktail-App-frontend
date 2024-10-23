import "./App.css";
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignupForm from "./components/User/SignupForm";
import Header from "./components/Header/Header";
import Form from "./components/User/Form";
import CocktailList from "./components/Cocktails/CocktailList";
import MyCocktailList from "./components/Cocktails/MyCocktailList";
import CocktailForm from "./components/Cocktails/CocktailForm";
import MyLiquorCabinet from "./components/User/MyLiquorCabinet";
import CocktailDetail from "./components/Cocktails/CocktailDetail";
import Carousel from "./components/Home/Carousel";
import { API_BASE_URL } from './config';

// import PopularCocktails from "./components/Cocktails/PopularCocktails";

function App() {
  // state for the current logged in use, set in the useEffect & fetch below
  const [currentUser, setCurrentUser] = useState("");

  const [ingredients, setIngredients] = useState([]);

  // auth keeps the user logged in as they move through the app (doesn't work if the page is refreshed!)
  useEffect(() => {
    fetch(`${API_BASE_URL}/auth`)
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => setCurrentUser([user]));
        }
      })
      .catch((error) => {
        console.error('Error fetching auth:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/ingredients`)
      .then((r) => r.json())
      .then((ingredients) => setIngredients(ingredients))
      .catch((error) => {
        console.error('Error fetching ingredients:', error);
      });
  }, []);


  //console.log(cocktails)

  return (
    <div className="App">
      <Header currentUser={currentUser} />

      <Switch>
        <Route
          path="/cocktails/:id"
          component={() => <CocktailDetail currentUser={currentUser} />}
        />

        <Route
          path="/signup"
          component={() => (
            <SignupForm
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          )}
        />

        <Route
          path="/login"
          component={() => (
            <Form setCurrentUser={setCurrentUser} currentUser={currentUser} />
          )}
        />

        <Route
          path="/cocktail-list"
          component={() => <CocktailList currentUser={currentUser} />}
        />

        <Route
          path="/my-cocktail-list"
          component={() => <MyCocktailList currentUser={currentUser} />}
        />

        <Route
          path="/new-cocktail"
          component={() => <CocktailForm ingredients={ingredients} />}
        />

{/* <Route
          path="/popular-cocktails"
          component={() => <PopularCocktails currentUser={currentUser} />}
        /> */}

        <Route
          path="/my-liquor-cabinet"
          component={() => (
            <MyLiquorCabinet
              ingredients={ingredients}
              currentUser={currentUser}
            />
          )}
        />

        <Route
          path="/"
          component={() => (
              <Carousel />
          )}
        />

      </Switch>
     
    </div>
  );
}

export default App;
