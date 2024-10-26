import { Button, Grid, Icon } from '@mui/material'
import '../styles/Navbar.css'
import { Title } from '../styles/SharedStyles'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    return (
        <>
            <Grid container sx={{marginBottom: '3vh'}}>
                <Grid item xs={2}>
                    <Button style={{height: '100%'}}>
                        <Icon>person</Icon>
                    </Button>
               </Grid>
                <Grid item xs={8} className='headerTitle'>
                    <Title className='halekti' variant='h4' onClick={() => navigate("/")}
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
