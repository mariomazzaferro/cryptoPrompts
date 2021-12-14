import React, { useState, useRef } from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';
import metamaskLogo from './metamask.png';

const WritePrompt = ({writePrompt, updateCounter, accounts}) => {
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

  if(
    accounts.length === 0
  ) {
    return (
      <div className="my-5 text-center">
        <h1>Welcome to Crypto Prompts!</h1>
        <br/>
        <h3>Click on FEED and enjoy the reading...</h3>
        <img src={metamaskLogo} width="150" class="mb-4" alt=""/>
        <h3>If you want to create your own Literary NFTs:</h3>
        <h3><a href="https://metamask.io/">install Metamask</a> + <a href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844">connect it to Polygon</a> + get some MATIC token + be a writer!</h3>
        <br/>
        <h3>0x...What we write in Crypto Prompts, echoes in eternity.</h3>
      </div>
    )
  }

  return (
    <Container>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
      <Card.Text>
      <Form ref={formRef} onSubmit={(e) => submit(e)}>
        <Form.Group>
        <Form.Control
          as="textarea" rows="13"
          placeholder='Write your prompt...   the "0x..." standard will be added automatically : )'
          onChange={e => updatePrompt(e)}
        ></Form.Control>
        <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}>Mint Prompt $</Button>
        {loading && <div><br/><div class="spinner-border"></div></div>}
        </Form.Group>
      </Form>
      </Card.Text>
      </Card>
      <br/>
    </Container>
  )
};

export default WritePrompt;