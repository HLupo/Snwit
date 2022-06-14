import { setCurrentAccount, setUser, User } from "store/slices/userSlice";
import { Flex, Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button";
import { useDispatch } from "react-redux";

export const ConnectAccount = () => {
    const dispatch = useDispatch();

    const getUserByAddress = async (address: string) => {
        const res = await fetch('http://localhost:8080/getUserByAddress/' + address, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        if (res.status === 200) {
            const data = await res.json();
            return data.user;
        }
        else return null;
    }

    const connectWalletHandler = async () => {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        const user: User = await getUserByAddress(accounts[0]);
        if (user) dispatch(setUser(user));
        dispatch(setCurrentAccount(accounts[0]));
        ethereum.on("accountsChanged", async (accounts: string) => {
            dispatch(setCurrentAccount(accounts));
            if (accounts && accounts != undefined) {
                const user: User = await getUserByAddress(accounts);
                if (user) dispatch(setUser(user));
                else dispatch(setUser(null));
            }
            console.log("Accounts changed: " + accounts[0]);
        });
    };

    return (
        <Flex>
            <Heading>{"Please connect your Metamask account"}</Heading>
            <Button onClick={() => connectWalletHandler()}>{"Connect with Metamask"}</Button>
        </Flex>
    )
}

export default ConnectAccount;
