import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Home = ({accounts, connectMetamask}) => {

    return (
      <Container className="text-center">
        {
          accounts.length === 0 ?
          <div>
          <Card className="shadow-lg p-3 bg-white rounded text-center" style={{ width: 'auto' }}>
            <h3>Welcome to Crypto Prompts!</h3>
            <br/>
            <h4>Click on <i>FEED</i> and enjoy the reading. Don't mind the fox, he is handling security...</h4>
            <br/>
            <h4>Click on BRANCHES to read parallel branches...</h4>
            <br/>
            <h4>Click on SALES for auctions, fixed price sales and transfers...</h4>
            <br/>
            <h4>Click on ABOUT to get more context...</h4>
            <br/>
            <h4>If you want to buy, sell or create your own Literary NFTs:</h4>
            <h4><a href="https://metamask.io/">install Metamask</a> + <a href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844">connect it to Polygon</a> + <a href='#' onClick={() => connectMetamask()}>connect to this site</a>!</h4>
            <br/>
            <h2><i>"What we write in life echoes in eternity."</i></h2>
          </Card>
          <br/>
          </div>
          :
          <div>
          <Card className="shadow-lg p-3 bg-white rounded text-center" style={{ width: 'auto' }}>
            <h3>Welcome to Crypto Prompts!</h3>
            <br/>
            <h4>Click on <i>FEED</i> and enjoy the reading. Don't mind the fox, he is handling security...</h4>
            <br/>
            <h4>Click on <i>NEW</i> and create a Prompt from scratch OR branch an existing Prompt on <i>FEED</i>...</h4>
            <br/>
            <h4>Click on BRANCHES to read parallel branches...</h4>
            <br/>
            <h4>Click on SALES for auctions, fixed price sales and transfers...</h4>
            <br/>
            <h4>Click on ABOUT to get more context...</h4>
            <br/>
            <h2><i>"What we write in life echoes in eternity."</i></h2>
          </Card>
          <br/>
          </div>
        }
        <Card className="shadow-lg p-3 bg-white rounded text-center" style={{ width: 'auto' }}>
            <h3>WHITE PAPER</h3>
            <br/>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </Card>
        <br/>
        <br/> 
      </Container>
    )
};

export default Home;