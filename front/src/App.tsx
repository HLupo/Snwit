import { Outlet, useOutlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Flex } from "@chakra-ui/layout";

import { Home } from "views/Home";

export const App: React.FC = () => {
  const outlet = useOutlet();

  // const currentAccount = useSelector((state: RootState) => state.app.currentMetamaskAccount);
  // const [sendAddress, setSendAddress] = useState("");
  // const [sendAmount, setAmount] = useState("");
  // const [ethereum, setEthereum] = useState(false);
  // const user: User | null = useSelector((state: RootState) => state.user.user);

  // const test = async () => {
  //   const { ethereum } = window;

  //   if (ethereum) {
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const signer = provider.getSigner();
  //     const add = await signer.getAddress();

  //     console.log("Add = ", add);
  //     const myContract = new Contract(CONTRACT_ADRESS, new Interface("pathToJsonABI"), signer) as Token;

  //     const res = await myContract.balanceOf(add);

  //     console.log("Balance: ", res);
  //     console.log("Signer = ", signer)
  //     const test = parseInt(res._hex);
  //     console.log(test);
  //   }
  // }

  // const sendToken = async () => {
  //   const { ethereum } = window;

  //   if (ethereum) {
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const signer = provider.getSigner();
  //     const add = await signer.getAddress();
  //     console.log("Signer = ", signer)
  //     console.log("Add = ", add);
  //     const myContract = new Contract(CONTRACT_ADRESS, TOKEN_FACTORY.interface, signer) as Token;

  //     const res = await myContract.transfer(sendAddress, sendAmount);
  //     const test = await res.wait();

  //     console.log(test);
  //   }
  // }


  return (
    <Flex width={"100vw"} height={"100vh"} flexDir={"row"}>
      <Flex flex={1} borderRight={"1px"} borderColor={"lightgray"}>
        <Navbar />
      </Flex>
      <Flex flex={1.5}>
        {outlet ? <Outlet /> : <Home />}
      </Flex>
      <Flex flex={1} justifyContent={"center"} borderLeft={"1px"} borderColor={"lightgray"}>
        <h1>{"news bla bla"}</h1>
      </Flex>
    </Flex>
  )
}

export default App;


