import React, { FC } from 'react';
import Button from '../../components/ui/button';
import Counter from "../../features/counter/counter";

  let buttonText = 'Click';
    buttonText = 'MUI button';

const Home: FC = () => {

return (
  <header style={{
    'backgroundColor': 'white',
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'fontSize': 'calc(10px + 2vmin)',
    'color': '#282c34'
  }}>
    <p>Welcome To React!</p>
    <Button text={buttonText} onClick={() => alert("Hello 👋")} />
    <Counter />
  </header>
)
}
export default Home;
