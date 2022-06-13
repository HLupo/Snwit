import { Button, Flex, Heading } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "store/slices/CounterSlice";
import { RootState } from "../store/store";

export const Accueil = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch();

    const createUser = async () => {
        const res = await fetch('http://localhost:8080/createUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: '0x1234567890123456789012345678901234567890',
                email: 'xtekaa@gmail.com',
                password: ":1a2b3c4D",
            })
        })

        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            dispatch(increment());
        } else {
            console.log(res)
            dispatch(decrement());
        }
    }

    const up = () => {
        dispatch(increment());
    }

    const down = () => {
        dispatch(decrement());
    }

    return (
        <>
            <Flex backgroundColor={"#968e8e"}>
                <Heading>
                    {"Bienvenue\r"}
                </Heading>
            </Flex>
            <Flex margin={5}>
                <Button onClick={() => createUser()}>
                    {"Create user"}
                </Button>
                <Button onClick={() => up()}>{"increment"}</Button>
                <Button onClick={() => down()}>{"decrement"}</Button>
                <h1>{count}</h1>
            </Flex>

        </>
    )
}
