import React, { useState, useRef } from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';

const New = ({writePrompt, updateCounter}) => {
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
    <Container>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
      <Card.Text>
      <Form ref={formRef} onSubmit={(e) => submit(e)}>
        <Form.Group>
        <Form.Control
          as="textarea" rows="15"
          placeholder='Write your prompt...   the "0x..." standard will be added automatically : )'
          onChange={e => updatePrompt(e)}
        ></Form.Control>
        <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Mint Prompt $</i></Button>
        {loading && <div><br/><div class="spinner-border"></div></div>}
        </Form.Group>
      </Form>
      </Card.Text>
      </Card>
    </Container>
  )
};

export default New;