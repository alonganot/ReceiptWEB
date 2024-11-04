import { Box } from '@mui/material';
import { Title } from "../styles/SharedStyles";
import { GoogleLogin } from '@react-oauth/google';
import { useAuthContext } from '../context/AuthContext';
import { GoogleApiDTO } from '../types/GoogleApiDTO';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const titleText = '?שנתחבר'

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title variant='h4' style={{fontFamily: "MainFont", padding: '6px'}}>{titleText}</Title>
        <img src="receiptLogo.png" alt="" />
      </Box>
      <Box marginTop={'2vh'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <GoogleLogin shape='pill' theme='filled_black' onSuccess={credentialResponse => {
        const { email, name, picture } = JSON.parse(atob(credentialResponse.credential!.split('.')[1])) as GoogleApiDTO
        login({id: email, nickname: name, picture})
        navigate("/")
        }} onError={() => {
            console.log('Login Failed');
        }}/>;
      </Box>
    </>
  )
}

export default LoginPage
