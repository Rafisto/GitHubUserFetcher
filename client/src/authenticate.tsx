import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const authUri = 'http://localhost:5000/authenticate'

interface AuthResponse {
    token: string,
    user: {
        [key: string]: string
    }
}

const Authenticate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [response, setResponse] = useState<AuthResponse>();

    useEffect(() => {
        fetch(`${authUri}?code=${searchParams.get('code')}&state=${searchParams.get('state')}`, {
            method: 'POST',
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                setResponse(data)
            })
    })

    return (
        <div style={{ textAlign: "left" }}>
            <p>Authenticate</p>
            <p>Secret Code: {searchParams.get('code')}</p>
            <p>State: {searchParams.get('state')}</p>

            {(response !== undefined) && (
                <div>
                    <p>Access Token: {response.token}</p>
                    <hr/>
                    <p>Response:</p>
                    {
                        Object.keys(response.user).map((key) => {
                            return (
                                <p key={key}>{key}: {response.user[key]}</p>
                            )
                        })
                    }
                </div>
            )}

        </div>
    )
}

export default Authenticate