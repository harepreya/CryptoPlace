import { createContext, useEffect, useState } from "react";

export const Coincontext = createContext();

const CoinContextProvider = (props) => {
  const [allcoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-uLQQD4xqUX8s4daw4YsTJXJg' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
      .then(response => response.json())
      .then(response => setAllCoin(response))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allcoin,
    currency,
    setCurrency,
  };

  return (
    <Coincontext.Provider value={contextValue}>
      {props.children}
    </Coincontext.Provider>
  );
};

export default CoinContextProvider;
