import { Grid } from '@mui/material'
import '../styles/Navbar.css'
import { Title } from '../styles/SharedStyles'
import { useNavigate } from 'react-router-dom'
import UserModal from './UserModal'

function Navbar() {
    const navigate = useNavigate()
    return (
        <>
            <Grid container sx={{marginBottom: '3vh'}}>
                <Grid item xs={2}>
                    <UserModal />
               </Grid>
                <Grid item xs={8} className='headerTitle'>
                    <Title variant='h4' onClick={() => navigate("/")}
                    style={{fontFamily: 'MainFont'}}>חלק'תי</Title>
                </Grid>
                <Grid item xs={2}>
                    <img onClick={() => navigate("/")} src="receiptLogo.png" alt="" />
                </Grid>
            </Grid>
        </>
    )
}

export default Navbar
