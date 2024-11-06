import { Box, Typography, Divider } from '@mui/material';
import { Item } from '../types/Item';
import { ItemCard } from './ItemCard';
import { Subtitle, Title } from '../styles/SharedStyles';

interface ItemsListProps {
  items: Item[];
}

export function ItemsList({ items }: ItemsListProps) {
  // Calculate the total price of all items
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {items.length > 0 ? (
        items.map((item, index) => (<ItemCard key={index} item={item} />))
      ) : (
        <Typography>No items in this session.</Typography>
      )}
      <Divider sx={{ width: '80%', my: 2 }} />
      <Box display="flex" justifyContent="space-between" width="80%">
        <Title variant="h6">₪{totalPrice.toFixed(2)}</Title>
        <Subtitle dir='rtl' variant="h6">יצא לכם בטוטאל: </Subtitle>
      </Box>
    </Box>
  );
}
