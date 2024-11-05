import styled from 'styled-components'
import { User } from '../types/User'
import { Box } from '@mui/material'
import { useUserContext } from '../context/UserContext'

const UserIcon = styled('img')<{ isMyId: boolean }>(({ isMyId }) => ({
    minHeight: '60px',
    maxHeight: '60px',
    borderRadius: '33px',
    marginLeft: '1vw',
    marginRight: '1vw',
    border: isMyId ? '3px solid #77d637' : 'none',
}))

function UserIcons({ users }: { users: User[] }) {
    const { user } = useUserContext()

    return (
        <Box display={'flex'} overflow={'auto'} width={'80vw'} justifyContent={'center'}>
            { users.map(currUser =>  { 
                return <UserIcon key={currUser.id} src={currUser.picture} isMyId={currUser.id === user.id} />
            })}
        </Box>
    )
}

export default UserIcons
