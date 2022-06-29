import { Button, Flex, Heading } from "@chakra-ui/react"

export const Accueil = () => {

    const createUser = async () => {
        const res = await fetch('http://localhost:8080/createUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
                email: 'xtekaa@gmail.com',
                password: ":1a2b3c4D",
            })
        })

        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
        }
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

            </Flex>

        </>
    )
}
