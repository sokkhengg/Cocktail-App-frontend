import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CocktailCard from "./CocktailCard";
import PulseLoader from "react-spinners/PulseLoader";

function MyCocktailList({ currentUser }) {
  const [myCocktails, setMyCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedAction, setLikedAction] = useState(false);
  const [likedCocktails, setLikedCocktails] = useState([]);

  useEffect(() => {
    fetch(`/my-custom-cocktails/?id=${currentUser.id}`)
      .then((r) => r.json())
      .then((r) => {
        setMyCocktails(r);
        setLoading(false);
      });
  }, [currentUser.id]);

  useEffect(() => {
    fetch(`/user_cocktails/${currentUser.id}`)
      .then((r) => r.json())
      .then((r) => setLikedCocktails(r));
  }, [likedAction, currentUser.id]);

  const likedCocktailsIdArray = likedCocktails.map((c) => c.cocktail.id);

  return (
    <div>
      {loading ? (
        <Container className="fill">
          <Row>
            <Col></Col>
            <Col className="text-center">
              <PulseLoader color={"#d3a526"} loading={loading} size={50} />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      ) : (
        <>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                You can make {myCocktails.length} cocktails! 🥂
              </Card.Title>
            </Card.Body>
          </Card>

          <Container>
            <Row xs={1} md={3} className="d-flex justify-content-center">
              {myCocktails.map((cock) => (
                <CocktailCard
                  key={cock.id}
                  cocktail={cock}
                  currentUser={currentUser}
                  liked={likedCocktailsIdArray.includes(cock.id)}
                  setLikedAction={setLikedAction}
                  likedAction={likedAction}
                />
              ))}
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default MyCocktailList;
