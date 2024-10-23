import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cocktail.css";

function CocktailDetail({ currentUser }) {
  const [cocktail, setCocktail] = useState({});
  const [currentUserIngredients, setCurrentUserIngredients] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/cocktails/${id}`)
      .then((r) => r.json())
      .then((cocktail) => {
        setCocktail(cocktail);
      });
  }, [id]);

  const {
    name,
    instructions,
    alcoholic,
    category,
    image,
    glass,
    iba,
    ingredient_1_name,
    ingredient_2_name,
    ingredient_3_name,
    ingredient_4_name,
    ingredient_5_name,
    ingredient_6_name,
    ingredient_1_id,
    ingredient_2_id,
    ingredient_3_id,
    ingredient_4_id,
    ingredient_5_id,
    ingredient_6_id,
    measure_1,
    measure_2,
    measure_3,
    measure_4,
    measure_5,
    measure_6,
  } = cocktail;

  useEffect(() => {
    fetch(`/user_ingredients/${currentUser.id}`)
      .then((r) => r.json())
      .then((r) => setCurrentUserIngredients(r));
  }, [currentUser.id]);

  const foundIngredients = [
    { name: ingredient_1_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_1_name), measure: measure_1 },
    { name: ingredient_2_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_2_name), measure: measure_2 },
    { name: ingredient_3_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_3_name), measure: measure_3 },
    { name: ingredient_4_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_4_name), measure: measure_4 },
    { name: ingredient_5_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_5_name), measure: measure_5 },
    { name: ingredient_6_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_6_name), measure: measure_6 },
  ];

  return (
    <div className="detail-container">
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <div className="container">
              <img className="cocktail-image" src={image} alt={name} />

              <div className="overlay" onClick={() => console.log("clicked", { cocktail })}>
                ♡
              </div>
            </div>

            <h1>
              {name} <br />
              <span className="alcoholic">{alcoholic}</span>
            </h1>
            <div className="border"></div>
            <br />
            <h6>Category: {category}</h6>

            {iba && <p>IBA: {iba}</p>}
            {glass && <p>Glass: {glass}</p>}
            <div className="border"></div>
            <div className="instructions">
              <br />
              <h6>Ingredients:</h6>
              <ul className="ingredient-list">
                {foundIngredients.map((ingredient, index) =>
                  ingredient.name ? (
                    <li key={index}>
                      {ingredient.measure} {ingredient.name}{" "}
                      {ingredient.found ? (
                        <span className="have">✅</span>
                      ) : (
                        <span className="need">Need</span>
                      )}
                    </li>
                  ) : null
                )}
              </ul>
              <p>{instructions}</p>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default CocktailDetail;
