import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function CocktailForm({ ingredients }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorNewCocktail, setErrorNewCocktail] = useState("");

  const [ingredient1, setIngredient1] = useState("");
  const [ingredient1Id, setIngredient1Id] = useState("");

  const [ingredient2, setIngredient2] = useState("");
  const [ingredient2Id, setIngredient2Id] = useState("");

  const [ingredient3, setIngredient3] = useState("");
  const [ingredient3Id, setIngredient3Id] = useState("");

  const [ingredient4, setIngredient4] = useState("");
  const [ingredient4Id, setIngredient4Id] = useState("");

  const [ingredient5, setIngredient5] = useState("");
  const [ingredient5Id, setIngredient5Id] = useState("");

  const [ingredient6, setIngredient6] = useState("");
  const [ingredient6Id, setIngredient6Id] = useState("");

  const ingredientsOptions = ingredients.map((ingredient) => ({
    value: ingredient.id,
    label: ingredient.name,
  }));

  function handleCocktailSubmit(e) {
    e.preventDefault();

    const cocktail_object = {
      name: e.target.elements.name.value,
      category: e.target.elements.category.value,
      image: e.target.elements.image.value,
      glass: e.target.elements.glass.value,
      instructions: e.target.elements.instructions.value,
      ingredient_1_name: ingredient1,
      ingredient_1_id: ingredient1Id,
      measure_1: e.target.elements.measure_1.value,
      ingredient_2_name: ingredient2,
      ingredient_2_id: ingredient2Id,
      measure_2: e.target.elements.measure_2.value,
      ingredient_3_name: ingredient3,
      ingredient_3_id: ingredient3Id,
      measure_3: e.target.elements.measure_3.value,
      ingredient_4_name: ingredient4,
      ingredient_4_id: ingredient4Id,
      measure_4: e.target.elements.measure_4.value,
      ingredient_5_name: ingredient5,
      ingredient_5_id: ingredient5Id,
      measure_5: e.target.elements.measure_5.value,
      ingredient_6_name: ingredient6,
      ingredient_6_id: ingredient6Id,
      measure_6: e.target.elements.measure_6.value,
    };

    fetch("/cocktails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cocktail_object),
    }).then((r) => {
      if (r.ok) {
        r.json().then((success) => {
          setSuccessMessage(success);
        });
      } else {
        r.json().then((err) => setErrorNewCocktail(err));
      }
    });
  }

  return (
    <Container>
      {successMessage ? (
        <>
          <Link to={`/cocktails/${successMessage}`}>
            <Button onClick={() => setSuccessMessage("")}>
              Check out your cocktail!
            </Button>
          </Link>
          <br />
          <br />
          <Button onClick={() => setSuccessMessage("")}>
            Add another cocktail!
          </Button>
        </>
      ) : (
        <Form onSubmit={handleCocktailSubmit}>
          <h4>Add a New Cocktail</h4>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Cocktail Name:</Form.Label>
              <Form.Control type="text" placeholder="Cocktail Name" required />
            </Form.Group>

            <Form.Group as={Col} controlId="image">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control type="text" placeholder="Image URL" />
            </Form.Group>

            <Form.Group as={Col} controlId="glass">
              <Form.Label>Glass Type:</Form.Label>
              <Form.Control type="text" placeholder="Glass Type" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="instructions">
              <Form.Label>Instructions:</Form.Label>
              <Form.Control as="textarea" placeholder="Instructions" rows={3} />
            </Form.Group>

            <Form.Group as={Col} controlId="category">
              <Form.Label>Category:</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option value="">Choose Category...</option>
                <option value="Beer">Beer</option>
                <option value="Cocktail">Cocktail</option>
                <option value="Cocoa">Cocoa</option>
                <option value="Coffee / Tea">Coffee / Tea</option>
                <option value="Homemade Liqueur">Homemade Liqueur</option>
                <option value="Milk / Float / Shake">Milk / Float / Shake</option>
                <option value="Ordinary Drink">Ordinary Drink</option>
                <option value="Other">Other</option>
                <option value="Punch / Party Drink">Punch / Party Drink</option>
                <option value="Shot">Shot</option>
                <option value="Soft Drink / Soda">Soft Drink / Soda</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Row className="mb-3" key={num}>
              <Form.Group as={Col} controlId={`ingredient_${num}`}>
                <Form.Label>Ingredient {num}:</Form.Label>
                <Select
                  options={ingredientsOptions}
                  onChange={(e) => {
                    eval(`setIngredient${num}(e.label)`);
                    eval(`setIngredient${num}Id(e.value)`);
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder={`Measure ${num}`}
                  name={`measure_${num}`}
                />
              </Form.Group>
            </Row>
          ))}

          <Button variant="primary" type="submit">
            Add Cocktail
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default CocktailForm;
