import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, User } from "store/slices/userSlice";
import { RootState } from "store/store";

export const SignUp = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value) }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }
    const handlePassordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPasswordConfirm(e.target.value) }


    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const dispatch = useDispatch();
    const currentAccount = useSelector((state: RootState) => state.user.currentAccount);

    const createUser = async (address: string, email: string, password: string, username: string) => {
        const res = await fetch('http://localhost:8080/createUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: address,
                username: username,
                email: email,
                password: password,
            })
        })

        if (res.status === 201) {
            const data = await res.json();
            return data.user;
        } else {
            console.log(res);
            return null;
        }
    }

    const createAccount = async () => {
        const user: User | null = await createUser(currentAccount, email, password, username);
        if (user) {
            dispatch(setUser(user));
        } else {
            console.log("Error creating user");
        }
    };

    return (
        <Flex width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"flex-start"} marginTop={10}>
            <Flex flexDir={"column"} backgroundColor={"white"} shadow={"lg"} borderRadius={10}>
                <Heading size={"xl"} marginLeft={10} marginRight={10} marginTop={2} marginBottom={2}>{"Create your Snwit account"}</Heading>
                <Flex alignItems={"center"} flexDir={"column"} paddingLeft={2} paddingRight={2}>
                    <Input backgroundColor={"white"} disabled={true} value={currentAccount} size={"md"} margin={1} ></Input>
                    <Input backgroundColor={"white"} placeholder={"Email"} value={email} size={"md"} margin={1} onChange={handleEmailChange}></Input>
                    <Input backgroundColor={"white"} placeholder={"Username"} value={username} size={"md"} margin={1} onChange={handleUsernameChange}></Input>
                    <InputGroup size={"md"} margin={1}>
                        <Input
                            pr={"4.5rem"}
                            type={show ? 'text' : 'password'}
                            placeholder={"Enter password"}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <InputRightElement width={"4.5rem"}>
                            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <InputGroup size={"md"} margin={1}>
                        <Input
                            pr={"4.5rem"}
                            type={showConfirm ? 'text' : 'password'}
                            placeholder={"Confirm password"}
                            value={passwordConfirm}
                            onChange={handlePassordConfirmChange}
                        />
                        <InputRightElement width={"4.5rem"}>
                            <Button h={"1.75rem"} size={"sm"} onClick={() => setShowConfirm(!showConfirm)}>
                                {showConfirm ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button margin={2} size={"lg"} onClick={() => createAccount()}>{"Create account"}</Button>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default SignUp;