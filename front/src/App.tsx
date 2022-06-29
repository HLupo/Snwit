import { Flex } from "@chakra-ui/layout";

export const App: React.FC = () => {

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
  //     const myContract = new Contract(CONTRACT_ADRESS, TOKEN_FACTORY.interface, signer) as Token;

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
      {"Accueil"}
    </Flex>
  )
}

export default App;


