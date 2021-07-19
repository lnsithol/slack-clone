import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import firebase from 'firebase'
import { auth, db } from './components/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const ChartInput = ({ channelName, channelId, chartRef }) => {
    const [input, setInput] = useState('')
    const [user] = useAuthState(auth)
    const sendMessage = (e) => {
        e.preventDefault()

        if (!channelId){
            return false
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL,
        })

        chartRef.current.scrollIntoView({
            behavior: "smooth"
        })
        setInput('')
    }
    return (
        <ChartInputContainer>
            <form>
                <input onChange={e => setInput(e.target.value)} value={input} placeholder={`Message #${channelName}`} />
                <Button type='submit' onClick={sendMessage} hidden>SEND</Button>
            </form>
        </ChartInputContainer>
    )
}

export default ChartInput

const ChartInputContainer = styled.div`
    border-radius: 20px;
    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 5px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`
