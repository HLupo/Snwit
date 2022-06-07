import { useEffect, useState } from "react";
import { CONTRACT_ADRESS, TOKEN_FACTORY } from "./Globals"
import { Contract, ethers } from "ethers";
import { Token } from "./typechain-types";

export const App: React.FC = () => {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setAmount] = useState("");


  const checkWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("pas metamask");
      return;
    } else console.log("metamask ok")

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
      return;
    } else console.log("No auth account found")
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum)
      console.log("no metamask")

    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Account found: " + accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) { console.log(err); }
  }

  const test = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const add = await signer.getAddress();
      console.log("Signer = ", signer)
      console.log("Add = ", add);
      const myContract = new Contract(CONTRACT_ADRESS, TOKEN_FACTORY.interface, signer) as Token;

      const res = await myContract.balanceOf(add);

      console.log("Balance: ", res);
      const test = parseInt(res._hex);
      console.log(test);
    }
  }

  const sendToken = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const add = await signer.getAddress();
      console.log("Signer = ", signer)
      console.log("Add = ", add);
      const myContract = new Contract(CONTRACT_ADRESS, TOKEN_FACTORY.interface, signer) as Token;

      const res = await myContract.transfer(sendAddress, sendAmount);
      const test = await res.wait();

      console.log(test);
    }
  }

  useEffect(() => {
    console.log("yo")
    checkWallet();
  }, [])

  return (
    <div >
      {currentAccount == null && <button onClick={() => connectWalletHandler()}><span>Connect</span></button>}
      {currentAccount && <h1>Connected with address {currentAccount}</h1>}
      <button onClick={() => test()}><span>Check balance</span></button>
      <div style={{ display: "flex", flexDirection: "row", }}>
        <span style={{ marginRight: 5 }}>Send MHT to :</span>
        <input style={{}} onChange={(e) => setSendAddress(e.target.value)}></input>
        <span style={{ marginLeft: 5 }}>Amount : </span>
        <input style={{ marginLeft: 5 }} onChange={(e) => setAmount(e.target.value)}></input>
        <button style={{ marginLeft: 5 }} onClick={() => sendToken()}>Send</button>
      </div>
    </div>
  )
}

export default App;


