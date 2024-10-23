import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CocktailCard from "./CocktailCard";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";

function CocktailList({ currentUser }) {
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCocktails, setTotalCocktails] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(48);
  const [likedCocktails, setLikedCocktails] = useState([]);
  const [likedAction, setLikedAction] = useState(false);
  const [cocktailSearch, setCocktailSearch] = useState("");

  useEffect(() => {
    fetch(`/cocktails?per_page=${resultsPerPage}&page=${currentPage}`)
      .then((r) => r.json())
      .then((cocktails) => {
        setCocktails(cocktails);
      });

    fetch(`/cocktail-total`)
      .then((r) => r.json())
      .then((r) => setTotalCocktails(r));

    fetch(`/user_cocktails/${currentUser.id}`)
      .then((r) => r.json())
      .then((r) => setLikedCocktails(r));
  }, [currentPage, resultsPerPage, likedAction, currentUser.id]);

  const likedCocktailsIdArray = likedCocktails.map((c) => c.cocktail.id);

  const totalPages = Math.ceil(totalCocktails / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const cocktailsToDisplay = cocktails.filter((cocktail) =>
    cocktail.name.toLowerCase().includes(cocktailSearch.toLowerCase())
  );

  return (
    <>
      <Container>
        <Row className="align-items-center mb-3">
          <Col xs={2}>
            <Form.Select aria-label="Results per page" onChange={handleResultsPerPage}>
              <option value="24">Results per page</option>
              <option value="24">24 per page</option>
              <option value="48">48 per page</option>
              <option value="72">72 per page</option>
            </Form.Select>
          </Col>
          <Col xs={8} className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by cocktail..."
              onChange={(e) => setCocktailSearch(e.target.value)}
            />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row xs={1} md={3} className="g-4 d-flex justify-content-center">
          {cocktailsToDisplay.map((cock) => (
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

      <Container>
        <Row>
          <Col></Col>
          <Col xs={10} className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );

  function handleResultsPerPage(e) {
    setResultsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  }
}

export default CocktailList;
