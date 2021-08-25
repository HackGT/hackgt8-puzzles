import React from 'react';
import { Background } from './main/background/Background';
import { Tile } from './main/tiles/Tile';

const App = () => {
  return (
    <Background color="white">
      <Tile content={{message: "Hidden Text!"}} refresh={5}></Tile>
    </Background>
  )
}

export default App;