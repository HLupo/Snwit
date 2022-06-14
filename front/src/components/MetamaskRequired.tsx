import { Button, Flex, Heading } from "@chakra-ui/react";
import MetaMaskOnboarding from "@metamask/onboarding"
import { useEffect, useRef, useState } from "react";

export const MetamaskRequired = () => {
    const [onBoard, setOnBoard] = useState(false);

    const onboarding = useRef<MetaMaskOnboarding>();

    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    const startOnBoarding = () => {
        setOnBoard(true);
        onboarding.current?.startOnboarding();

    }
    return (
        <Flex flexDir={"column"} margin={5} justifyContent={"center"} alignItems={"center"} backgroundColor={"red.100"} width={"100%"} height={"100%"}>
            <Heading>{"Metamask Required"}</Heading>
            {!onBoard && <Button margin={2} onClick={() => startOnBoarding()} disabled={onBoard}>{"Download Metamask"}</Button>}
        </Flex>
    )
}
