import { Button } from '@mui/material'
import '../styles/Navbar.css'
import { Subtitle } from '../styles/SharedStyles'
import { Session } from '../types/Sesssion'
import { useNavigate } from 'react-router-dom'
import { api } from '../../data/api'
import { useUserContext } from '../context/UserContext'

function SessionList({ sessions }: { sessions: Session[] }) { 
    const navigate = useNavigate()
    const { user } = useUserContext()

    const joinSession = async (sessionId: string) => {
        await api().sessions().join(sessionId, user)
        navigate(`/session/${sessionId}`)
    }

    return (
        <>
            <h5>{`נמצאו ${sessions.length} תוצאות`}</h5>
            { sessions.map(session =>  { 
                return <div key={session._id}>
                    <Subtitle dir="rtl" variant='h5' style={{fontFamily: "MainFont"}}>{session.title}</Subtitle>
                    <Subtitle dir="rtl" variant='h5' style={{fontFamily: "MainFont"}}>{session.managerId}</Subtitle>
                    <Button onClick={() => joinSession(session._id)}>יאללה</Button>
                </div>
            })}
        </>
    )
}

export default SessionList
