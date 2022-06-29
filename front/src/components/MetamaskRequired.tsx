import { Button, Flex, Heading } from "@chakra-ui/react";
import MetaMaskOnboarding from "@metamask/onboarding"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setMetamaskInstalled } from "store/slices/appSlice";
import { RootState } from "store/store";

export const MetamaskRequired = () => {
    const [onBoard, setOnBoard] = useState(false);
    const metamaskInstalled = useSelector((state: RootState) => state.app.metamaskInstalled);
    const onboarding = useRef<MetaMaskOnboarding>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    const startOnBoarding = () => {
        setOnBoard(true);
        onboarding.current?.startOnboarding();

    }

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            if (!metamaskInstalled)
                dispatch(setMetamaskInstalled(true));
            navigate("/");
        }
    });

    return (
        <Flex flexDir={"column"} margin={5} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
            <Heading>{"Metamask Required"}</Heading>
            {!onBoard && <Button margin={2} onClick={() => startOnBoarding()} disabled={onBoard}>{"Download Metamask"}</Button>}
        </Flex>
    )
}
