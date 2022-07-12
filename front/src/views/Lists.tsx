import { Button } from '@chakra-ui/button';
import { FC, useEffect } from 'react'

export const Lists: FC = () => {

    const purge = async () => {
        const res = await fetch('http://localhost:8080/post', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        if (res.status === 200) console.log("Posts deleted!")
    };

    return (
        <div>
            <Button onClick={() => purge()}>{"ClearPost"}</Button>
        </div>
    )
}

export default Lists