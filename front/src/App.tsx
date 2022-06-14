import { useEffect, useState } from "react";
import { CONTRACT_ADRESS, TOKEN_FACTORY } from "./Globals"
import { Contract, ethers } from "ethers";
import { Token } from "./typechain-types";
import { MetamaskRequired } from "components/MetamaskRequired";
import { ConnectAccount } from "components/ConnectAccount";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { User } from "store/slices/userSlice";
import { SignUp } from "components/SignUp";
import { Box, Flex } from "@chakra-ui/layout";

export const App: React.FC = () => {

  const currentAccount = useSelector((state: RootState) => state.user.currentAccount);
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setAmount] = useState("");
  const [ethereum, setEthereum] = useState(false);
  const connected = useSelector((state: RootState) => state.user.connected);
  const user: User | null = useSelector((state: RootState) => state.user.user);

  const test = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const add = await signer.getAddress();

      console.log("Add = ", add);
      const myContract = new Contract(CONTRACT_ADRESS, TOKEN_FACTORY.interface, signer) as Token;

      const res = await myContract.balanceOf(add);

      console.log("Balance: ", res);
      console.log("Signer = ", signer)
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
    const { ethereum } = window;
    // Check if Metamask is installed on the browser.
    if (ethereum && ethereum.isMetaMask) {
      setEthereum(true);
    }
  }, [])

  return (
    <Flex width={"100vw"} height={"100vh"} backgroundColor={"lightpink"} flexDir={"row"}>
      {!ethereum && <MetamaskRequired />}
      {ethereum && !connected && <ConnectAccount />}
      {ethereum && connected && !user && <SignUp />}
      {ethereum && connected && user &&
        <div>
          {<h1>{"Connected with address "}{currentAccount}</h1>}
          <button onClick={() => test()}><span>{"Check balance"}</span></button>
          <div style={{ display: "flex", flexDirection: "row", }}>
            <span style={{ marginRight: 5 }}>{"Send MHT to :"}</span>
            <input style={{}} onChange={(e) => setSendAddress(e.target.value)}></input>
            <span style={{ marginLeft: 5 }}>{"Amount : "}</span>
            <input style={{ marginLeft: 5 }} onChange={(e) => setAmount(e.target.value)}></input>
            <button style={{ marginLeft: 5 }} onClick={() => sendToken()}>{"Send"}</button>
          </div>
        </div>}
    </Flex>
  )
}

export default App;


