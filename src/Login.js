import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { auth, provider } from './components/firebase'

const Login = () => {
    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithPopup(provider).catch(e => alert(e))
    }
    return (
        <LoginContainer>
            <LoginInnerContainter>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png" alt="" />
                <h1>Sign into the SlackApp</h1>
                <p>mletz.slack.com</p>
                <Button onClick={signIn}>Signin with Google</Button>
            </LoginInnerContainter>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`

const LoginInnerContainter = styled.div`

    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    > img {
        object-fit: contain;
        height: 70px;
        margin-bottom: 40px;
    }

    > button {
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: #0a8d48 !important;
        color: white;
    }
`
