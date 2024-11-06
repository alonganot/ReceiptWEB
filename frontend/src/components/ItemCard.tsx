import { Box } from '@mui/material';
import { Item } from '../types/Item';
import { Subtitle, Title } from '../styles/SharedStyles';
import UserIcons from './UserIcons';

interface ItemsListProps {
  item: Item;
}

export function ItemCard({ item }: ItemsListProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Box display="flex" justifyContent="space-between" width="80%" padding="8px">
        <Subtitle dir='rtl'>₪{item.price.toFixed(2)}</Subtitle>
        <UserIcons users={item.payers} size={30}/>
        <Title variant={'h6'}>{item.name}</Title>
        </Box>
    </Box>
  );
}
