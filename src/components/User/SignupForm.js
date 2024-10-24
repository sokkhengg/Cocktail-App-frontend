// SignupForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Error from "./Error";

function SignupForm({ setCurrentUser }) {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory(); // Initialize useHistory

  function handleSignupSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    const user_object = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    fetch("/signup", {
      // Hits the users#create endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_object),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            setCurrentUser(user);
            history.push("/my-liquor-cabinet"); // Redirect after signup
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(["Network error. Please try again."]);
      });
  }

  return (
    <>
      <Container>
        <Row>&nbsp;</Row>
        <Row>
          <Col></Col>
          <Col className="text-center">
            <img src="logo192.png" alt="logo" height="50px" id="form-logo" />
            <h4>Sign up</h4>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <Form onSubmit={handleSignupSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
              <FloatingLabel
  controlId="floatingUsernameSignup"
  label="Username"
  className="mb-3"
>
  <Form.Control
    type="text"
    placeholder="Enter username"
    required
    id="floatingUsernameSignup"
  />
</FloatingLabel>

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
  controlId="floatingPasswordSignup"
  label="Password"
  className="mb-3"
>
  <Form.Control
    type="password"
    placeholder="Password"
    required
    id="floatingPasswordSignup"
  />
</FloatingLabel>

              </Form.Group>

              <Row>
                <Col></Col>
                <Col className="text-center">
                  <Button variant="primary" type="submit" id="signup-button">
                    {isLoading ? "Loading..." : "Sign Up"}
                  </Button>
                </Col>
                <Col></Col>
              </Row>

              {errors.length > 0 && (
                <Container className="text-center">
                  <br />
                  {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                  ))}
                </Container>
              )}
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Row>&nbsp;</Row>
        <Row>&nbsp;</Row>
      </Container>
    </>
  );
}

export default SignupForm;
