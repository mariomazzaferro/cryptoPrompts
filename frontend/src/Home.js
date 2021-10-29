import React from 'react';
import { Container } from 'react-bootstrap';

const Home = () => {
  
  return (
    <Container>
      <br/>

      <h4>Welcome to Frankenstein Texts!</h4>
      
      <br/>

      <h5>This is a writing game where you contribute with random people to elaborate a text, and gain the right to title and mint it as a unique Frankenstein Text NFT.</h5>

      <br/>

      <h5>There are no restrictions on what you can write. The text can be a story, a dissertation, a letter, a poem, a recipe… you name it! The important thing to keep in mind is that someone else has to understand what's going on with the text and be able to continue it in a interesting way.</h5>

      <br/>

      <h5>Each text has a fixed amount of 5 co-writers, and each one of them will have 2 hours to write their contribution.</h5>

      <br/>

      <h5>There are two ways to interact with the game:</h5>

      <h5>1-Write: users request a random text to contribute, and have 2 hours to write and submit their contribution.</h5>

      <h5>2-Mint: users have access to their list of finalized Frankenstein Texts, which they have the right to title and mint only once during the entire week after the fifth contribution is submitted. The finalized Frankenstein Texts are called Untitled, because… well they have no title yet! You can access your Untitleds through their ids, which start from 0 (your first Untitled text) and increase until your most recent Untitled.</h5>
    </Container>
  )
};

export default Home;