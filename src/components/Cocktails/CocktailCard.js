import React, { useEffect, useState } from "react";
import "./Cocktail.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiMinusCircle } from "react-icons/fi";

function CocktailCard({ cocktail, currentUser, liked, setLikedAction, likedAction }) {
  const [currentUserIngredients, setCurrentUserIngredients] = useState([]);

  const {
    id,
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

  function handleLikeClick(cocktail, liked) {
    const cocktailLiked = {
      cocktail_id: cocktail.id,
      user_id: currentUser.id,
      like: !liked,
    };
    fetch(`/user_cocktails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cocktailLiked),
    }).then(() => setLikedAction(!likedAction));
  }

  function handleHiddenClick(cocktail) {
    const cocktailHidden = {
      cocktail_id: cocktail.id,
      user_id: currentUser.id,
    };
    alert("This will hide your drink");

    fetch(`/hidden_cocktails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cocktailHidden),
    }).then((r) => {
      if (r.ok) {
        r.json().then((success) => {
          console.log(success);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  const foundIngredients = [
    { name: ingredient_1_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_1_name), measure: measure_1 },
    { name: ingredient_2_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_2_name), measure: measure_2 },
    { name: ingredient_3_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_3_name), measure: measure_3 },
    { name: ingredient_4_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_4_name), measure: measure_4 },
    { name: ingredient_5_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_5_name), measure: measure_5 },
    { name: ingredient_6_name, found: currentUserIngredients.find((i) => i.ingredient.name === ingredient_6_name), measure: measure_6 },
  ];

  return (
    <Card style={{ width: "19rem", margin: "12px", marginBottom: "25px" }}>
      <Link to={`/cocktails/${id}`}>
        <Card.Img
          className="card-image-top"
          variant="top"
          style={{ width: "100%", borderRadius: "50%", padding: "15px" }}
          src={image}
        />
      </Link>
      <div
        className="overlay"
        data-liked={liked}
        data-cid={id}
        onClick={() => handleLikeClick(cocktail, liked)}
      >
        {liked ? "♥" : "♡"}
      </div>

      {/* Hidden button */}
      <div className="hidden" onClick={() => handleHiddenClick(cocktail)}>
        <FiMinusCircle className="minus" />
      </div>

      <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <Card.Title className="text-center">
            {name} <br />
            <span className="alcoholic">{alcoholic}</span>
          </Card.Title>
          <div className="border"></div>
          <Card.Text>
            <ul className="card-list">
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
          </Card.Text>
        </div>

        <div>
          <Card.Footer style={{ backgroundColor: "#fff" }}>
            <Row>
              <Col></Col>
              <Col xs={12} className="text-center">
                <Link className="make" to={`/cocktails/${id}`}>
                  <Button variant="success" id="make-button" className="text-center">
                    Make the {name}
                  </Button>
                </Link>
              </Col>
              <Col></Col>
            </Row>
          </Card.Footer>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CocktailCard;
