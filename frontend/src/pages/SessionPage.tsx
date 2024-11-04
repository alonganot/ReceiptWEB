// SessionPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { api } from '../../data/api';
import { Session } from '../types/Sesssion';

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

  useEffect(() => {
    const fetchSession = async () => {
        try {
          const response = await api().sessions().getById(id!)
          setSessionData(response || {_id: 'not-found', title: 'not-found', 'managerId': 'not-found'});
        } catch (error) {
          console.error("Error fetching session data:", error);
        }
      }

    fetchSession();
  }, [id]);

  return (
    <div>
      {sessionData ? (
        sessionData._id === 'not-found' ? 
        <NotFoundPage /> :
        <div>
          <h1>Session Details</h1>
          <pre>{JSON.stringify(sessionData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading session data...</p>
      )}
    </div>
  );
}
