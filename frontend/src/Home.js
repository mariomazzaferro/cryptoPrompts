import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Home = ({accounts, connectMetamask}) => {

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
            <h4>Click on <i>NEW</i> and create a prompt from scratch OR branch an existing prompt on <i>FEED</i>...</h4>
            <br/>
            <h2><i>"What we write in life, echoes in eternity."</i></h2><h5>- Marcus de Fox</h5>
          </Card>
        }
      </Container>
    )
};

export default Home;