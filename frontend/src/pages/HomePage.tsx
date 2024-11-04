import { Box, Button, ButtonProps, styled } from '@mui/material';
import { Subtitle, Title } from "../styles/SharedStyles";
import { useUserContext } from "../context/UserContext";
import '../styles/HomePage.css'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const titleText = 'טוב שחזרת'
  const subtitleText = 'אז מה נעשה הפעם?'

  const PrimaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: 'rgb(15,15,15)',
  }));

  const SecondaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.secondary.main,
    backgroundColor: 'rgb(15,15,15)',
  }));
  
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title variant='h4' style={{fontFamily: "MainFont", marginBottom: '1vh', direction: "rtl"}}>{titleText} {user.nickname.split(" ")[0]}</Title>
        <Subtitle dir="rtl" variant='h5' style={{fontFamily: "MainFont", marginBottom: '4vh'}}>{subtitleText}</Subtitle>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <div className='background'>
        <SecondaryButton className="homeButtons" color="secondary" style={{fontFamily: "MainFont"}} variant="contained"  onClick={() => navigate('/join')}>להצטרפות לחדר קיים</SecondaryButton>
        </div>
        <div className='background'>
        <PrimaryButton className="homeButtons" style={{fontFamily: "MainFont"}} variant="contained" onClick={() => navigate('/create')}>ליצירת חדר חדש</PrimaryButton>
        </div>
      </Box>
    </>
  )
}

export default HomePage
