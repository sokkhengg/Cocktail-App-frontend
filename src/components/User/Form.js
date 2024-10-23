// Form.js
import React from "react";
import { Redirect } from "react-router-dom"; // Import Redirect
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./User.css";

// Using React Bootstrap tabs for styling
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Form({ currentUser, setCurrentUser }) {
  if (currentUser) {
    return <Redirect to="/" />; // Use Redirect instead of Navigate
  }

  return (
    <div>
      <Container className="form-tabs">
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Tabs
              defaultActiveKey="login"
              id="login-signup"
              className="mb-3 form-border"
            >
              <Tab eventKey="login" title="Login" className="form-body">
                <LoginForm setCurrentUser={setCurrentUser} />
              </Tab>
              <Tab eventKey="signup" title="Sign up" className="form-body">
                <SignupForm setCurrentUser={setCurrentUser} />
              </Tab>
            </Tabs>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
