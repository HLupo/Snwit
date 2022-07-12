import { FC, useEffect, useState } from "react";
import { Box, Flex, Stack, StackItem, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { AiOutlineHome, AiOutlineNumber, AiOutlineBell, AiOutlineMail, AiOutlineBook, AiOutlineUnorderedList } from "react-icons/ai";
import { FaReact } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setSelectedNav } from "store/slices/appSlice";
import { CONTRACT_ADRESS, TOKEN_FACTORY } from "Globals";
import { Contract, ethers, Signer } from "ethers";
import { Interface } from "readline";
import { Token } from "typechain-types";

interface IconTextNavProps {
    icon: IconType;
    text: string;
    destination: string;
    textWeight: "bold" | "normal";
}

const IconTextNav: FC<IconTextNavProps> = ({ icon, text, destination, textWeight }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Stack isInline={true} spacing={4} _hover={{ bgColor: "red.100", cursor: "pointer" }} onClick={() => { dispatch(setSelectedNav(text)); navigate(destination) }} borderRightRadius={"25px"} borderLeftRadius={"25px"} padding={"0.5rem"} >
            <Box as={icon} size={"2em"} />
            <Text alignSelf={"center"} fontSize={"lg"} fontWeight={textWeight} >{text}</Text>
        </Stack>
    );
};

export const Navbar: FC = () => {
    const [balance, setBalance] = useState("0");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedNav = useSelector((state: RootState) => state.app.selectedNav);
    const user = useSelector((state: RootState) => state.user.user);
    const [loading, setLoading] = useState(false);

    const selectFontWeight = (text: string) => {
        if (text === selectedNav) {
            return "bold";
        }
        return "normal";
    }
    const updateBalance = async () => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const add = await signer.getAddress();
            const myContract = new Contract(CONTRACT_ADRESS, TOKEN_FACTORY.interface, signer) as Token;
            const balance = await myContract.balanceOf(add);

            setBalance(parseInt(balance._hex).toString());
        }
    }

    const claimToken = async () => {
        const { ethereum } = window;

        if (!user?.address) return;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

            const myContract = new Contract(CONTRACT_ADRESS, TOKEN_FACTORY.interface, signer) as Token;
            setLoading(true);
            const res = await myContract.transfer(user.address, 100);
            res.wait().then(() => { updateBalance(); setLoading(false) });

        }
    }

    useEffect(() => {
        updateBalance();
    }, [user])

    return (
        <Flex flexDirection={"column"} flex={1} alignItems={"center"} >
            <Stack spacing={4} paddingLeft={"2rem"} paddingRight={"2rem"} height={"100%"}>
                <Stack isInline={true} spacing={4} onClick={() => { dispatch(setSelectedNav("Home")); navigate("/") }} borderRightRadius={"25px"} borderLeftRadius={"25px"} padding={"0.5rem"} >
                    <Box as={FaReact} size={"2em"} _hover={{ bgColor: "red.100", cursor: "pointer" }} borderRightRadius={"25px"} borderLeftRadius={"25px"} />
                </Stack>
                <IconTextNav icon={AiOutlineHome} text={"Home"} destination={"/"} textWeight={selectFontWeight("Home")}></IconTextNav>
                <IconTextNav icon={AiOutlineNumber} text={"Nft"} destination={"/nft"} textWeight={selectFontWeight("Nft")}></IconTextNav>
                <IconTextNav icon={AiOutlineBell} text={"Notifications"} destination={"/notifications"} textWeight={selectFontWeight("Notifications")}></IconTextNav>
                <IconTextNav icon={AiOutlineMail} text={"Messages"} destination={"/messages"} textWeight={selectFontWeight("Messages")}></IconTextNav>
                <IconTextNav icon={AiOutlineBook} text={"Bookmarks"} destination={"/bookmarks"} textWeight={selectFontWeight("Bookmarks")}></IconTextNav>
                <IconTextNav icon={AiOutlineUnorderedList} text={"Lists"} destination={"/lists"} textWeight={selectFontWeight("Lists")}></IconTextNav>
                <Button size={"lg"} width={"100%"} borderLeftRadius={"25px"} borderRightRadius={"25px"} >{"Tweet"}</Button>
                <Box visibility={"hidden"} >
                    <IconTextNav icon={AiOutlineUnorderedList} text={"Jesuistreslong"} destination={"/"} textWeight={selectFontWeight("Jesuistreslong")}></IconTextNav>
                </Box>
                <StackItem flex={1} />
                <Stack>
                    <Text fontSize={"xl"} alignSelf={"center"}>{"Balance: " + balance + " SWT"}</Text>
                    <Button isLoading={loading} size={"lg"} width={"100%"} borderLeftRadius={"25px"} borderRightRadius={"25px"} onClick={() => claimToken()}>{"Claim Token"}</Button>
                </Stack>
            </Stack>


        </Flex>

    )
}

export default Navbar;