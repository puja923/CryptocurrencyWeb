
import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios";
import Coin from './Components/Coin';

function App() {
  // useEffect runs every time the page renders
  // we will use useState to render the data or whenever the data changes it will 
  // trigger the new data and update it

  const [listOfCoins, setlistOfCoins]=  useState([]);
  const [searchWord, setSearchWord] = useState("");

  // For searching the crypto currency we will use
  // javascript function filter that will filter only that elements
  // that has been searched

  useEffect (()=>{
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setlistOfCoins(response.data.coins);

      }
    );
    // console.log("Hello");
  }, []);

  const filteredCoins = listOfCoins.filter((coin)=>{
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
   <div className="App">
    <div className="cryptoHeader">
      <input type="text" 
      placeholder='Bitcoin...'
      onChange={(event) => {
        setSearchWord(event.target.value);
      }}
      />
    </div>

      <div className="cryptoDisplay">
        {filteredCoins.map((coin)=>{
          return(
          <Coin 
          name={coin.name} 
          icon={coin.icon} 
          price={coin.price} 
          symbol={coin.symbol}/>
          );
        })}
    </div>

   </div>
  );
}

export default App;
