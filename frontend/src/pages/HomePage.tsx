import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material';
import { Subtitle, Title } from "../styles/SharedStyles";
import { useUserContext } from "../context/UserContext";
import '../styles/HomePage.css'

function HomePage() {
  const { user } = useUserContext()
  const titleText = 'טוב שחזרת,'
  const subtitleText = 'אז מה נעשה הפעם?'
  
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title variant='h4' style={{fontFamily: "MainFont", marginBottom: '1vh'}}>{titleText} {user.nickname}</Title>
        <Subtitle dir="rtl" variant='h5' style={{fontFamily: "MainFont"}}>{subtitleText}</Subtitle>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Button className="homeButtons" style={{fontFamily: "MainFont"}} variant="outlined"><Link to="/join">להצטרפות לחדר קיים</Link></Button>
        <Button className="homeButtons" style={{fontFamily: "MainFont"}} variant="outlined"><Link to="/create">ליצירת חדר חדש</Link></Button>
      </Box>
    </>
  )
}

export default HomePage
