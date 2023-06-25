import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

// My dependencies
import { getToken } from "./func/ergotoken";
import { NFTInfo } from "./types/types";

function App() {
  // ... useState and other declarations ...

  // My Implementation
  const [llamaMsg, setLlamaMsg] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false); // Loading state

  const [llamaList, setLlamaList] = useState<NFTInfo[]>([]); // Array of ErgoLlamas

  // Llama Count Function
  async function getLlama() {
    try {
      setLoading(true); // Set loading state to true

      const result = await getToken(address, '9i27sKZ1gdZtnkbEsL1jkbnosZh3pHi9tZiwMLmi6tcwjmRQMhz'); // Mint Address
      if (result) {
        let count = 0;
        const llamas = result.ergollamas.filter((llama) => llama.getValid());
        setLlamaList(llamas);
        count = llamas.length;
        setLlamaMsg(count.toString());
      } else {
        console.log("Failed to retrieve user's ergollamas.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  }

  return (
    <>
      <div className="container">
        <p className="header"> Fleece Tracker </p>
        <p> A product from the Alpaca and Llama Team </p>
      </div>
      <div className="container">
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            getLlama();
          }}
        >
          <input
            id="address-input"
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="Enter an address..."
          />
          <button type="submit">Get Llama Count</button>
        </form>
        {loading ? ( // Conditional rendering based on loading state
          <p>Loading...</p>
        ) : (
          <>
            <p>You own {llamaMsg} llamas.</p>
            <div className="llama-list-container">
              <div className="llama-list">
              {/* Map through the array of token IDs and render each box */}
              {llamaList.map((llama) => (
              <div className="llama-box" key={llama.getTokenID()}>
                <p> {llama.getName()} </p>
                <p> {llama.getTokenID()} </p>
                <img src={llama.getImageLink().toString()} alt="LLama Image" />
              </div>
            ))}
            </div>
      </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
