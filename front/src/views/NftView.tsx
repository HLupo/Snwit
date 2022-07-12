import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Flex, Box, Heading, Text, Stack, Divider } from '@chakra-ui/layout';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal';
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/number-input';
import AutoResizeTextArea from 'components/AutoResizeTextArea';
import Content from 'components/Content';
import { useAsync } from 'components/hooks';
import PostArea from 'components/PostArea';
import { ethers, Contract } from 'ethers';
import { CONTRACT_ADRESS, TOKEN_FACTORY, NFT_CONTRACT_ADDRESS, NFT_FACTORY } from 'Globals';
import React from 'react';
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from 'store/store';
import { Token, MyNFT } from 'typechain-types';

type NftItemProps = { hex: string, isSelling: boolean, currentPrice: string }

type INft = {
    ownerAddress: string;
    tokenId: string;
    price: string;
}

const NftItem: FC<NftItemProps> = ({ hex, isSelling, currentPrice }) => {
    const [isPublic, setPublic] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [sellPrice, setSellPrice] = useState<string>("0");
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (isSelling) { setPublic(true); setSellPrice(currentPrice); }
    })

    if (!user) return null;

    const createNft = async (ownerAddress: string, tokenId: string, sellPrice: string) => {
        if (saving) return;
        setSaving(true);

        const res = await fetch('http://localhost:8080/nft', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ownerAddress: ownerAddress,
                tokenId: tokenId,
                price: sellPrice,
            })
        }).finally(() => { setSaving(false); setLoading(false); setPublic(true); onClose() });
        const data = await res.json();
        if (data.error) {
            console.log(data.error);
            return;
        }
    };

    const deleteNft = async (tokenId: string) => {
        if (saving) return;
        setSaving(true);

        const res = await fetch('http://localhost:8080/nft/' + tokenId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).finally(() => { window.location.reload(); onClose() });
        const data = await res.json();
        if (data.error) {
            console.log(data.error);
            return;
        }
    };


    return (
        <Flex border={"1px"} borderLeftRadius={"25px"} borderRightRadius={"25px"} borderColor={"lightgray"} shadow={"sm"} alignItems={"center"}>
            <Heading flex={1} size={"md"} margin={"1em"} >{"TokenId: " + parseInt(hex)}</Heading>
            {isPublic && <Text>{"Current price: " + sellPrice + " SWT"}</Text>}
            <Button isLoading={loading} margin={"1em"} onClick={() => { console.log(isPublic); setLoading(true); onOpen() }} backgroundColor={isPublic ? "greenyellow" : ""}>{isPublic ? "Make private" : "Make public"}</Button>


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => { setLoading(false); onClose() }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{"Sell NFT"}</ModalHeader>
                    <ModalCloseButton disabled={saving} />
                    <ModalBody pb={6}>
                        <FormControl mt={4} display={"flex"} alignItems={"center"}>
                            <FormLabel>{"Sell price"}</FormLabel>
                            <NumberInput flex={1} defaultValue={0} placeholder={"Sell price"} onChange={(e) => setSellPrice(e)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={saving} colorScheme={"blue"} mr={3} onClick={() => { createNft(user.address, parseInt(hex).toString(), sellPrice) }}>
                            {"Confirm\r"}
                        </Button>
                        <Button disabled={saving} onClick={() => { deleteNft(parseInt(hex).toString()); onClose() }}>{"Make private"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
const PublicNft: FC<NftItemProps> = ({ hex, isSelling, currentPrice }) => {
    const [isPublic, setPublic] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [sellPrice, setSellPrice] = useState<string>("0");
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (isSelling) { setPublic(true); setSellPrice(currentPrice); }
    })

    if (!user) return null;

    const createNft = async (ownerAddress: string, tokenId: string, sellPrice: string) => {
        if (saving) return;
        setSaving(true);

        const res = await fetch('http://localhost:8080/nft', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ownerAddress: ownerAddress,
                tokenId: tokenId,
                price: sellPrice,
            })
        }).finally(() => { setSaving(false); setLoading(false); setPublic(true); onClose() });
        const data = await res.json();
        if (data.error) {
            console.log(data.error);
            return;
        }
    };

    const deleteNft = async (tokenId: string) => {
        if (saving) return;
        setSaving(true);

        const res = await fetch('http://localhost:8080/nft/' + tokenId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).finally(() => { window.location.reload(); onClose() });
        const data = await res.json();
        if (data.error) {
            console.log(data.error);
            return;
        }
    };


    return (
        <Flex border={"1px"} borderLeftRadius={"25px"} borderRightRadius={"25px"} borderColor={"lightgray"} shadow={"sm"} alignItems={"center"}>
            <Heading flex={1} size={"md"} margin={"1em"} >{"TokenId: " + parseInt(hex)}</Heading>
            {isPublic && <Text>{"Current price: " + sellPrice + " SWT"}</Text>}
            <Button isLoading={loading} margin={"1em"} onClick={() => { setLoading(true); onOpen() }}>{"Buy"}</Button>


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => { setLoading(false); onClose() }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{"Buy this NFT ?"}</ModalHeader>
                    <ModalCloseButton disabled={saving} />
                    <ModalFooter>
                        <Button isLoading={saving} colorScheme={"blue"} mr={3} onClick={() => { createNft(user.address, parseInt(hex).toString(), sellPrice) }}>
                            {"Confirm\r"}
                        </Button>
                        <Button disabled={saving} onClick={() => { setLoading(false); onClose() }}>{"Make private"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
export const NftView: FC = () => {
    const [nft, setNft] = useState<ethers.BigNumber[]>([]);
    const user = useSelector((state: RootState) => state.user.user);
    const [publicNft, setPublicNft] = useState<INft[]>([]);
    const [sellingNft, setSellingNft] = useState<INft[]>([]);
    const [triggerRefresh, setTriggerRefresh] = useState(false);


    useAsync(async (isActive) => {
        console.log("ici")
        if (isActive()) {
            if (triggerRefresh) setTriggerRefresh(false);
            await getUserNft();
            await getPublicNftUser();
        }
    }, [user, triggerRefresh]);

    if (!user) return null;

    const mint = async () => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
            const currentAccount = await provider.getSigner().getAddress();

            const myContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_FACTORY.interface, signer) as MyNFT;

            const res = await myContract.mintNFT(currentAccount, "");

            res.wait().then((res) => { console.log("done => ", res) });
            console.log(currentAccount);
        }
    }

    const getUserNft = async () => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            const myContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_FACTORY.interface, signer) as MyNFT;

            // myContract.getTokensByOwner(address).then((res) => { res.map((e) => console.log(parseInt(e._hex))) });
            const res = await myContract.getTokensByOwner(address)
            console.log(res);
            setNft(res);
            return res;
        }
    }

    const getPublicNftUser = async () => {
        if (!user) return;

        const res = await fetch('http://localhost:8080/nft/' + user?.address, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
        console.log("public nft !!!")
        console.log(res);
        setPublicNft(res);
        return res;
    }

    const getSellingNft = async (ownerAddress: string) => {
        const res = await fetch('http://localhost:8080/nft/others/' + ownerAddress, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
        setSellingNft(res);
        return res;
    }


    const checkSell = (tokenId: string) => {
        const nft = publicNft.find((e) => e.tokenId === parseInt(tokenId).toString());

        if (nft) { return true; }
        console.log("non")
        return false;
    }

    const getPrice = (tokenId: string) => {
        const nft = publicNft.find((e) => e.tokenId === parseInt(tokenId).toString());

        if (nft) { return nft.price; }
        return "0";
    }

    return (
        <Flex flex={1} flexDir={"column"} overflow={"auto"}>
            <Box borderBottom={"1px"} borderColor={"lightgray"} padding={"0.5em"} shadow={"sm"}>
                <Heading size={"lg"}>{"NFT"}</Heading >
            </Box>
            <Flex flexDir={"column"} margin={"1em"} border={"1px"} borderRadius={"10px"} borderColor={"lightgray"} shadow={"md"} backgroundColor={"seashell"}>
                <Heading size={"lg"} margin={"0.5em"}>{"My NFT collection"}</Heading>
                <Stack spacing={4} margin={"1em"}>
                    {nft.map((e) => {
                        return (
                            <NftItem key={e._hex} hex={e._hex} isSelling={checkSell(e._hex)} currentPrice={getPrice(e._hex)} />
                        )
                    })}
                    <Button width={"25%"} alignSelf={"center"} onClick={() => { mint(); setTriggerRefresh(true) }}>{"Mint Nft !"}</Button>
                </Stack>
            </Flex>
            <Flex flexDir={"column"} margin={"1em"} border={"1px"} borderRadius={"10px"} borderColor={"lightgray"} shadow={"md"} backgroundColor={"seashell"}>
                <Heading size={"lg"} margin={"0.5em"}>{"Public sales"}</Heading>
                <Stack spacing={4} margin={"1em"}>
                    {sellingNft.map((e) => {
                        return (
                            <PublicNft key={e.tokenId} hex={e.tokenId} isSelling={true} currentPrice={e.price} />
                        )
                    })}
                    <Button width={"25%"} alignSelf={"center"} onClick={() => { getSellingNft(user?.address) }}>{"Update"}</Button>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default NftView;