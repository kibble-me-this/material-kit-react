import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack } from '@mui/material';
// _mock_
import {
  _bankingContacts,
  _bankingCreditCard,
  _bankingRecentTransitions,
} from '../../_mock/arrays';
// import { useSettingsContext } from '../../components/settings';
// sections
import {
  BankingContacts,
  BankingWidgetSummary,
  BankingInviteFriends,
  BankingQuickTransfer,
  BankingCurrentBalance,
  BankingBalanceStatistics,
  BankingRecentTransitions,
  BankingExpensesCategories,
} from '../../sections/@dashboard/general/banking';

// ----------------------------------------------------------------------
export default function GeneralBankingPage() {
  const theme = useTheme();

  // const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> General: Banking | Minimal UI</title>
      </Helmet>

      <Container>
        <Grid container>
            <BankingQuickTransfer title="Quick Transfer" list={_bankingContacts} />
        </Grid>
      </Container>
    </>
  );
}
