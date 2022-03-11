import React, { useState, useRef } from 'react'
import { Container, Button, Form, Card } from 'react-bootstrap'

const New = ({ writePost, updateLength }) => {
  const [post, setPost] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const submit = async (e) => {
    e.preventDefault()
    if (post && title) {
      setLoading(true)
      let res
      try {
        res = await writePost(title, post)
      } catch (err) {
        console.log(err.message)
      }
      setPost(undefined)
      setTitle(undefined)
      formRef.current.reset()
      setLoading(false)
      if (res) {
        if (res.status) {
          alert(`Post published successfully`)
          await updateLength()
        } else {
          alert('Post failed')
        }
      } else {
        alert(
          `Post publication is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/`
        )
      }
    } else {
      alert('Post failed. Make sure your Post has a title and a body.')
    }
  }

  const updateTitle = (e) => {
    const title = e.target.value
    setTitle(title)
  }

  const updatePost = (e) => {
    const post = e.target.value
    setPost(post)
  }

  return (
    <Container>
      <Card
        className='shadow-lg p-3 mb-5 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <Card.Text>
          <Form ref={formRef} onSubmit={(e) => submit(e)}>
            <Form.Group>
              <Form.Control
                style={{ textAlign: 'center' }}
                as='textarea'
                rows='1'
                placeholder='Title : )'
                onChange={(e) => updateTitle(e)}
              ></Form.Control>
              <br />
              <Form.Control
                style={{ textAlign: 'center' }}
                as='textarea'
                rows='15'
                placeholder='Write your Post... : )'
                onChange={(e) => updatePost(e)}
              ></Form.Control>
              <Button
                variant='dark'
                type='submit'
                className='font-weight-bold'
                style={{ color: 'silver' }}
              >
                <i>Publish Post $</i>
              </Button>
              {loading && (
                <div>
                  <br />
                  <div class='spinner-border'></div>
                </div>
              )}
            </Form.Group>
          </Form>
        </Card.Text>
      </Card>
    </Container>
  )
}

export default New
