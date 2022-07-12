import { FC, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';

import { User } from 'store/slices/userSlice';
import { RootState } from 'store/store';

import { AutoResizeTextArea } from 'components/AutoResizeTextArea';
import { Content } from 'components/Content';
import HeaderBar from 'components/HeaderBar';
import { useAsync } from 'components/hooks';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex, Heading, HStack } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';
import { Spinner } from '@chakra-ui/spinner';
import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';

export const UserProfile: FC = () => {
    const connectedUser: User | null = useSelector((state: RootState) => state.user.user);
    const [user, setUser] = useState<User | null>(null);

    const [isMyProfile, setIsMyProfile] = useState(false);
    const [lengthError, setLengthError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [bio, setBio] = useState(user?.bio);
    const [value, setValue] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const { userAddress } = useParams();
    const { state } = useLocation();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > 140) {
            setLengthError(true);
            return;
        }
        if (lengthError && e.target.value.length <= 140)
            setLengthError(false);
        setValue(e.target.value);
    }

    const saveBio = async (bio: string) => {
        if (saving) return;
        setSaving(true);
        const reset = await fetch('http://localhost:8080/setUserBio', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: user?._id,
                bio: bio,
            })
        }).finally(() => { setSaving(false); });

        if (reset.status === 200) {
            const data = await reset.json();

            setBio(data.user.bio);
            console.log(data);
            setSaving(false);
            setLoading(false);
            setValue("");
            setLengthError(false);
            onClose();
        }
    }

    const getUser = async () => {
        console.log("Getting user...");
        console.log("profileId:", state);
        const t0 = performance.now();

        const res = await fetch('http://localhost:8080/getUserById/' + state, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (res.status === 200) {
            const data = await res.json();
            const t1 = performance.now();

            console.log("Call to getUser took " + (t1 - t0) + " milliseconds.");
            console.log("User found!", data);
            console.log(data.user.bio)
            setIsMyProfile(false)
            setBio(data.user.bio);
            setUser(data.user);
            return;
        }
    }

    useAsync(async (isActive) => {
        if (isActive()) {
            if (connectedUser?.address != userAddress) {
                console.log("Not connected user's profile");
                await getUser()
            }
            else {
                console.log("lupo")
                setIsMyProfile(true);
                setUser(connectedUser);
                setBio(user?.bio);
                return;
            }
        }
    }, [connectedUser]);

    return (
        <Flex flex={1} flexDir={"column"} >
            <HeaderBar title={"Profile"} />
            < Flex flexDir={"column"} width={"100%"} padding={"0.5em"} borderBottom={"1px"} borderColor={"lightgray"} >
                <Flex flexDir={"row"} width={"100%"} maxW={"750px"} >
                    <Image
                        borderRadius={"full"}
                        border={"1px"}
                        borderColor={"lightgray"}
                        shadow={"md"}
                        boxSize={"96px"}
                        src={"https://robohash.org/" + userAddress}
                        alt={"Dan Abramov"}
                        _hover={{ cursor: "pointer" }}
                    />
                    <Flex flex={1} flexDir={"column"} overflow={"auto"} marginBottom={"0.5em"}>
                        <Heading
                            size={"md"}
                            color={"gray.400"}
                            fontWeight={"normal"}
                            marginLeft={"0.5em"}
                            marginBottom={"0.5em"}>
                            {"@" + userAddress}
                        </Heading>
                        {bio
                            ? <Text color={"gray.400"} marginLeft={"2em"} >{bio}</Text>
                            : isMyProfile
                                ? <Text color={"gray.400"} marginLeft={"2em"}>{"Click edit button to add a Bio"}</Text>
                                : <Text color={"gray.400"} marginLeft={"2em"}>{"Empty bio."}</Text>
                        }

                    </Flex>

                </Flex>
                <Flex alignItems={"center"} >
                    {isMyProfile ?
                        <Button
                            marginLeft={"auto"}
                            marginRight={"1.25em"}
                            width={"15%"}
                            size={"md"}
                            borderLeftRadius={"25px"}
                            borderRightRadius={"25px"}
                            shadow={"sm"}
                            onClick={() => { onOpen(); setLoading(true) }}
                        >
                            {loading ? <Spinner /> : "Edit"}
                        </Button>
                        :
                        <HStack justifyContent={"flex-end"} backgroundColor={"red.100"} flex={1}>
                            <Button
                                size={"md"}
                                borderLeftRadius={"25px"}
                                borderRightRadius={"25px"}
                                shadow={"sm"}
                                onClick={() => { onOpen(); setLoading(true) }}
                            >
                                {loading ? <Spinner /> : "Follow"}
                            </Button>
                            <Button
                                size={"md"}
                                borderLeftRadius={"25px"}
                                borderRightRadius={"25px"}
                                shadow={"sm"}
                                onClick={() => { onOpen(); setLoading(true) }}
                            >
                                {loading ? <Spinner /> : "Follow"}
                            </Button>
                        </HStack>
                    }
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={() => { setLoading(false); onClose() }}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{"Edit profile"}</ModalHeader>
                            <ModalCloseButton disabled={saving} />
                            <ModalBody pb={6}>
                                <FormControl mt={4}>
                                    <FormLabel>{"Bio"}</FormLabel>
                                    <AutoResizeTextArea
                                        placeholder={"My life is awesome."} value={value}
                                        shadow={"sm"}
                                        isReadOnly={saving}
                                        onChange={handleChange}
                                        isInvalid={lengthError}
                                        focusBorderColor={lengthError ? "red" : ""} />
                                    <Text>{value.length + "/140"}</Text>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button isLoading={saving} colorScheme={"blue"} mr={3} onClick={() => saveBio(value)}>
                                    {"Save\r"}
                                </Button>
                                <Button
                                    disabled={saving}
                                    onClick={
                                        () => {
                                            setLoading(false);
                                            setValue("");
                                            setLengthError(false);
                                            onClose()
                                        }}>
                                    {"Cancel"}
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
            </Flex >
            {user
                ? <Content user={user} />
                : <Spinner alignSelf={"center"}
                    thickness={"4px"}
                    speed={"0.65s"}
                    emptyColor={"gray.200"}
                    color={"blue.500"}
                    size={"xl"} />}
        </Flex >
    )
}