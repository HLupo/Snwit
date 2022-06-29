import { setUser, User } from "store/slices/userSlice";
import { Flex, Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMetamaskAccount } from "store/slices/appSlice";
import { Navigate } from "react-router";
import { RootState } from "store/store";

export const ConnectAccount = () => {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.app.currentMetamaskAccount);

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
        dispatch(setCurrentMetamaskAccount(accounts[0]));
    };


    return (
        <>
            {(!account || account === "") &&
                <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"}>
                    <Heading>{"Please connect your Metamask account"}</Heading>
                    <Button marginTop={2} onClick={() => connectWalletHandler()}>{"Connect with Metamask"}</Button>
                </Flex>}
            {(account && account !== "") && <Navigate to={"/"} replace={true} />}

        </>
    )
}

export default ConnectAccount;
