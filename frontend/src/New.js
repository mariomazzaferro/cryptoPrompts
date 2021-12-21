import React, { useState, useRef } from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';

const New = ({writePrompt, updateCounter}) => {
  const [prompt, setPrompt] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if(prompt && title) {
      setLoading(true);
      let res;
      try {
        res = await writePrompt(title, prompt);
      } catch(err) {
        console.log(err.message);  
      }
      setPrompt(undefined);
      setTitle(undefined);
      formRef.current.reset();
      setLoading(false);
      if(res) {
        if(res.status) {
          const newId = res.events.Transfer.returnValues[2];
          alert(`Prompt Id ${newId} minted successfully`);
          await updateCounter();
        } else {
          alert("Prompt failed");
        }
      } else {
        alert("Prompt failed");
      }
    } else {
      alert("Prompt failed. Make sure your Prompt has a title and a body.");
    }
  }

  const updateTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
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
          style={{ textAlign: 'center' }}
          as="textarea" rows="1"
          placeholder='Title : )'
          onChange={e => updateTitle(e)}
        ></Form.Control>
        <br/>
        <Form.Control
          style={{ textAlign: 'center' }}
          as="textarea" rows="15"
          placeholder='Write your Prompt... : )'
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