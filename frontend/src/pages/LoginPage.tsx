import { Box } from '@mui/material';
import { Title } from "../styles/SharedStyles";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate()
  const titleText = '?שנתחבר'

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title variant='h4' style={{padding: '6px'}}>{titleText}</Title>
        <img src="receiptLogo.png" alt="" />
      </Box>
      <Box marginTop={'2vh'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <GoogleLogin shape='pill' theme='filled_black' onSuccess={credentialResponse => {
        if (credentialResponse.credential) {
            localStorage.setItem("jwt", credentialResponse.credential)
            navigate("/")
        }
        }} onError={() => {
            console.log('Login Failed')
        }}/>
      </Box>
    </>
  )
}

export default LoginPage
