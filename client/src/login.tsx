import React from 'react'

const tokenUri = 'http://localhost:5000/login'
const githubUri = 'https://github.com/login/oauth/authorize'

interface QueryData {
  client_id: string,
  state: string,
}

const Login = () => {
  const [queryData, setQueryData] = React.useState<QueryData>();

  React.useEffect(() => {
    fetch(tokenUri)
      .then((res) => res.json())
      .then((data) => {
        setQueryData(data)
      })
  }, [])

  const login = () => {
    window.location.href = `${githubUri}?client_id=${queryData?.client_id}&state=${queryData?.state}`	
  }

  return (
    <div style={{ textAlign: "left" }}>
      <div>
        <h1>GitHub OAuth</h1>
        <p>
          This is a simple example of how to use OAuth to authenticate users
          with GitHub.
        </p>
      </div>
      <button style={{ padding: "10px", visibility:((queryData) ? "visible" : "hidden")}} onClick={login}>Sign in through GitHub</button>
      {queryData && (
        <div>
        <p>ClientID: {queryData.client_id}</p>
        <p>Token: {queryData.state}</p>
        </div>
      )}
    </div>
  )
}

export default Login