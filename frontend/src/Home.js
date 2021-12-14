import React, { useState, useRef } from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';

const Home = ({writePrompt, updateCounter, accounts, connectMetamask}) => {
  const [prompt, setPrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if(prompt && prompt !== "") {
      setLoading(true);
      const resStatus = await writePrompt(prompt);
      setPrompt(undefined);
      formRef.current.reset();
      setLoading(false);
      if(resStatus) {
        alert("Prompt minted successfully");
        await updateCounter();
      } else {
        alert("Prompt failed");
      }
    }
  }

  const updatePrompt = (e) => {
    const prompt = e.target.value;
    setPrompt(prompt);
  }

    return (
      <Container className="text-center">
        {
          accounts.length === 0 ?
          <Card className="shadow-lg p-3 bg-white rounded text-center" style={{ width: 'auto' }}>
            <h3>Welcome to Crypto Prompts!</h3>
            <br/>
            <h4>Click on <i>FEED</i> and enjoy the reading. Don't mind Marcus, he is a good boy, doesn't bite...</h4>
            <br/>
            <h4>If you want to create your own Literary NFTs:</h4>
            <h4><a href="https://metamask.io/">install Metamask</a> + <a href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844">connect it to Polygon</a> + <a href='#' onClick={() => connectMetamask()}>connect to this site</a> + be a writer!</h4>
            <br/>
            <h2><i>"What we write in life, echoes in eternity."</i></h2><h5>- Marcus de Fox</h5>
          </Card>
          :
          <Card className="shadow-lg p-3 bg-white rounded text-center" style={{ width: 'auto' }}>
            <h3>Welcome to Crypto Prompts!</h3>
            <br/>
            <h4>Click on <i>FEED</i> and enjoy the reading. Don't mind Marcus, he is a good boy, doesn't bite...</h4>
            <br/>
            <h4>If you want to create your own Literary NFTs:</h4>
            <h4>Click on <i>NEW</i> and create a prompt from scratch OR branch an existing prompt on <i>FEED</i>...</h4>
            <br/>
            <h2><i>"What we write in life, echoes in eternity."</i></h2><h5>- Marcus de Fox</h5>
          </Card>
        }
      </Container>
    )
};

export default Home;