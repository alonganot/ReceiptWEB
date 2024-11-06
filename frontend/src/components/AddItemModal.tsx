// AddItemModal.tsx
import { useState } from 'react';
import { Box, Button, Icon, Modal, TextField } from '@mui/material';
import { api } from '../../data/api';
import { useUserContext } from '../context/UserContext';
import { Subtitle, Title } from '../styles/SharedStyles';

interface AddItemModalProps {
  sessionId: string;
  onItemAdded: () => void; // Callback to refresh session data after adding item
}

export function AddItemModal({ sessionId, onItemAdded }: AddItemModalProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState<number | ''>('');
  const { user } = useUserContext()

  const handleAddItem = async () => {
    if (!itemName || !itemPrice) return;

    try {
      await api().sessions().addItem(sessionId, {
        name: itemName,
        price: itemPrice,
        payers: [user]
      });

      // Reset fields and close modal after adding item
      setItemName('');
      setItemPrice('');
      setModalOpen(false);

      // Trigger session data refresh in parent
      onItemAdded();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ position: 'fixed', bottom: 16, left: 16, borderRadius: '20px', minWidth: '40px !important', maxWidth: '40px' }}
        onClick={() => setModalOpen(true)}
      >
        <Icon>add</Icon>
      </Button>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box
          display="flex"
          flexDirection="column"
          p={3}
          bgcolor="#1f1f1f"
          borderRadius={2}
          boxShadow={24}
          sx={{ width: 300, margin: 'auto', mt: '20vh' }}
        >
          <Title variant="h4" dir='rtl'>מה נוסיף להזמנה?</Title>
          <Box display={'flex'} flexDirection={'row-reverse'} alignItems={'center'}>
            <Subtitle dir='rtl' variant='h4' sx={{paddingRight: '15px'}}>שם:</Subtitle>
            <TextField
                sx={{ input: { color: '#62dbc4', fontFamily: 'MainFont !important', fontSize: '24px' } }} 
                variant='filled'
                dir='rtl'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                margin="normal"
            />
          </Box>
          <Box display={'flex'} flexDirection={'row-reverse'} alignItems={'center'}>
            <Subtitle dir='rtl' variant='h4' sx={{paddingRight: '15px'}}>מחיר:</Subtitle>
            <TextField
                sx={{ input: { color: '#62dbc4', fontFamily: 'MainFont !important', fontSize: '24px' } }} 
                variant='filled'
                type="number"
                dir='rtl'
                value={itemPrice}
                onChange={(e) => setItemPrice(Number(e.target.value))}
                margin="normal"
                />
            </Box>
          <Button sx={{marginTop: '3vh', marginX: '30vw'}} color='secondary' variant='outlined' onClick={handleAddItem}>
            <Icon>add</Icon> 
          </Button>
        </Box>
      </Modal>
    </>
  );
}
