import { Box } from '@mui/material';
import { Title } from "../styles/SharedStyles";
import SearchSession from '../components/SearchSession';

function JoinSessionPage() {
  const titleText = '? רוצה להצטרף לחגיגה'
  const findByTitleMessage = 'לפי שם החדר'
  const findByManagerMessage = 'לפי מנהל החדר'

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title variant='h4' style={{marginBottom: '1vh'}}>{titleText}</Title>
      </Box>
      <Box marginTop={'2vh'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <SearchSession header={findByTitleMessage} route='title' />
        <SearchSession header={findByManagerMessage} route='managerId' />
      </Box>
    </>
  )
}

export default JoinSessionPage
