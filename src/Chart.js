import React from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from './features/appSlice';
import ChartInput from './ChartInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from './components/firebase';
import Message from './Message';
import { useRef } from 'react';
import { useEffect } from 'react';

const Chart = () => {
    const chartRef = useRef(null)
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
        )
    const [roomMessages, loading] = useCollection(
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
        )

    useEffect(() =>{
        chartRef?.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [roomId, loading])
    return (
        <ChartContainer>
            {roomDetails && roomMessages && (
                <>
                <Header>
                    <HeaderLeft>
                        <h4><strong>#{roomDetails?.data().name}</strong></h4>
                        <StarBorderOutlinedIcon/>
                    </HeaderLeft>
                    <HeaderRight>
                        <p>
                            <InfoOutlinedIcon /> Details
                        </p>
                    </HeaderRight>
                </Header>
                <ChartMessages>
                    {roomMessages?.docs.map(doc =>{
                        const { message, timestamp, user, userImage} = doc.data()
                        return (
                            <Message 
                                key={doc.id}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userImage={userImage}
                            />
                        )
                    })}
                    <ChartBottom ref={chartRef}/>
                </ChartMessages>
                <ChartInput
                chartRef={chartRef}
                channelName ={roomDetails?.data().name}
                channelId ={ roomId}
                />
            </>
            )}
            
        </ChartContainer>
    )
}

export default Chart

const ChartBottom = styled.div`
    padding-bottom: 200px;
`
const ChartContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        display: flex;
        text-transform: lowercase;
    }
    > .MuiSvgIcon-root{
        margin-left: 10px;
        font-size: 18px;
    }
`

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root{
        margin-right: 5px;
        font-size: 16px;
    }
`

const ChartMessages = styled.div``