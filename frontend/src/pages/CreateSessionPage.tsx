import { Box, Button, TextField } from '@mui/material';
import { Subtitle, Title } from "../styles/SharedStyles";
import { useUserContext } from "../context/UserContext";
import { ChangeEvent, useState } from "react";
import { api } from '../../data/api';
import { useNavigate } from 'react-router-dom';

function CreateSessionPage() {
  const { user } = useUserContext()
  const navigate = useNavigate();

  const titleText = 'קדימה בוא ניתן בראש'
  const subtitleText = 'איך נקרא לחדר?'
  const defaultSessionTitle = `החדר של ${user.nickname}`

  const [title, setTitle] = useState<string>('')
 
  const changeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value as string);
};
  
  const createSession = async () => {
    try {
        const res = await api().sessions().add({
            _id: 'placeholder', managerId: user.id,
            title: title ? title : defaultSessionTitle,
            users: [user],
            items: []
        })
        
        if (res.length > 0) {
            navigate(`/session/${res}`)
        } else {
            alert('יש בעיה אחי')
            navigate(`/}`)
        }
    } catch(error) {
        console.log(error)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title variant='h4' style={{marginBottom: '1vh'}}>{titleText}</Title>
        <Subtitle dir="rtl" variant='h5'>{subtitleText}</Subtitle>
      </Box>
      <Box marginTop={'2vh'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <TextField style={{direction: "rtl", fontSize: '50px'}} onChange={changeTitle}
         placeholder={defaultSessionTitle} variant="standard" />
        <Button style={{marginTop: '2vh', fontSize: '30px'}} variant="outlined" onClick={() => createSession()}>תן בראש פי</Button>
      </Box>
    </>
  )
}

export default CreateSessionPage
