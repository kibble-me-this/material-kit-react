import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Button, Modal, Box } from '@mui/material';
import {
  _bankingContacts,
  _bankingCreditCard,
  _bankingRecentTransitions,
} from '../../_mock/arrays';
import { BankingQuickTransfer } from '../../sections/@dashboard/general/banking';

export default function GeneralBankingPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> General: Banking | Minimal UI</title>
      </Helmet>


      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Container>
            <Grid container>
              <BankingQuickTransfer title="Quick Transfer" list={_bankingContacts} />
            </Grid>
          </Container>
        </Box>
      </Modal>
    </>
  );
}
