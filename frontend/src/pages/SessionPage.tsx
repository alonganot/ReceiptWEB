import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { api } from '../../data/api';
import { Session } from '../types/Sesssion';
import { Title } from '../styles/SharedStyles';
import { Box } from '@mui/material';
import UserIcons from '../components/UserIcons';
import { AddItemModal } from '../components/AddItemModal';
import { ItemsList } from '../components/ItemsList';

export function SessionPageWrapper() {
    const { id } = useParams();

    // Validate the ID format
    if (!/^[a-zA-Z0-9]{1,100}$/.test(id!)) {
      return <NotFoundPage />;
    }

    return <SessionPage />;
  }

 function SessionPage() {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState<Session | null>(null);

  const fetchSession = async () => {
    try {
      const response = await api().sessions().getById(id!)
      setSessionData(response || {_id: 'not-found', title: 'not-found', 'managerId': 'not-found', users: [], items: []});
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  }

  useEffect(() => {
    fetchSession();
  }, [id]);

  return (
    <>
      {sessionData ? (
        sessionData._id === 'not-found' ? 
        <NotFoundPage /> :
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Title sx={{marginBottom: '1vh'}} variant='h4' dir='rtl'>{sessionData.title}</Title>
            <UserIcons users={sessionData.users} size={60} />
            <ItemsList items={sessionData.items} />
            <AddItemModal sessionId={id!} onItemAdded={fetchSession} />
        </Box>
      ) : (
        <p>Loading session data...</p>
      )}
    </>
  );
}
