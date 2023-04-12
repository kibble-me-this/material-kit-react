import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, Chip, Stack } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 117,
        height: 34.5,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <svg width="117" height="34.5" viewBox="0 0 78 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M77.9938 10.2635C77.9499 9.37312 77.4378 8.7078 76.5912 8.43584C75.9017 8.21569 75.2122 8.42127 74.7627 8.98137C74.57 9.22095 74.4112 9.47834 74.3047 9.77134C74.1712 10.1501 74.0445 10.5273 73.9143 10.911C73.6 11.8499 73.1758 12.7289 72.5303 13.4913C72.1923 13.8895 71.8104 14.2327 71.3625 14.5014C70.6393 14.9369 69.8619 15.0713 69.0288 14.9094C68.8361 14.8721 68.5944 14.7977 68.3477 14.6115C68.1111 14.4335 67.9354 14.168 67.8864 14.0417C67.4639 13.2339 67.3591 12.2384 67.3456 12.1024C67.2712 11.3529 67.2374 9.78429 67.8526 9.00889C68.1027 8.69323 68.4981 8.49736 68.7837 9.02832C68.9713 9.3796 69.0152 9.69526 69.0338 10.0482C69.044 10.3055 69.0389 10.5645 69.0625 10.8187C69.0913 11.1344 69.2214 11.4128 69.4664 11.6184C69.992 12.0587 70.7254 12.1639 71.3237 11.824C71.8881 11.4986 72.2548 11.0194 72.3326 10.3687C72.4052 9.75515 72.3579 9.09793 72.1399 8.51031C71.9861 8.08457 71.7766 7.68634 71.5129 7.31726C70.9958 6.6147 70.3165 6.13878 69.4495 5.98176C69.0828 5.91377 68.711 5.87168 68.341 5.87168C66.8977 5.86682 65.703 6.42693 64.7431 7.48885C64.2851 8.00039 63.9421 8.58477 63.7055 9.22257C63.2864 10.3379 63.1782 11.5455 63.2796 12.7337C63.2948 12.8907 63.3235 13.0542 63.3235 13.2129C63.3235 13.3035 63.3033 13.4039 63.261 13.4848C63.0532 13.8491 62.8487 14.1923 62.5715 14.5128C62.4532 14.6488 62.4144 14.6989 62.2031 14.8495C61.931 15.0421 61.6607 15.0308 61.4883 14.7572C61.3869 14.6002 61.3108 14.4124 61.2618 14.2311C61.0945 13.603 61.0743 12.9636 61.1131 12.3161C61.1858 11.1085 61.4291 9.78429 61.7435 8.61715C61.8364 8.27234 61.9209 7.93078 62.024 7.59245C62.1389 7.19909 62.0189 6.89961 61.6995 6.65841C61.6218 6.59528 61.5457 6.53862 61.4579 6.49653C60.667 6.09345 59.822 5.89272 58.9348 5.89758C58.3383 5.89758 57.9411 6.17601 57.7147 6.74583C57.2128 7.99877 56.8528 9.42007 56.8579 10.775C56.8579 11.0955 56.8089 11.4177 56.7142 11.7236C56.5114 12.3711 56.3086 13.0105 56.0957 13.6532C56.018 13.8782 55.9183 14.0984 55.8152 14.3185C55.7611 14.4383 55.7003 14.5484 55.6225 14.6536C55.4586 14.8835 55.1105 14.8835 54.9567 14.6293C54.8418 14.4383 54.7455 14.2262 54.6812 14.0158C54.4835 13.3505 54.3956 12.6657 54.372 11.9713C54.3128 10.4059 54.4294 8.85511 54.6914 7.31402C54.7252 7.11329 54.7353 6.90609 54.8401 6.68593C54.9601 6.74421 55.0598 6.79115 55.1595 6.83324C55.3352 6.91256 55.511 6.98541 55.658 7.02588C56.1751 7.17157 56.4793 7.08092 56.6889 6.75716C56.9153 6.4075 57.0708 6.15659 57.2212 5.7697C57.3699 5.38119 57.2989 4.91821 56.9356 4.73205C56.574 4.54589 56.2258 4.3743 55.871 4.18814C55.7594 4.12986 55.6546 4.06349 55.5144 3.98741C55.6445 3.65718 55.8186 3.22334 55.947 2.91739C56.2461 2.20027 56.1498 1.72111 55.5989 1.16424C55.1206 0.685082 54.5613 0.34028 53.9242 0.1266C52.8494 -0.237628 52.3796 0.231821 52.0821 0.926281C51.8996 1.35688 51.7729 1.8069 51.6732 2.26178C51.6529 2.3492 51.614 2.43337 51.5904 2.51108C51.5278 2.51593 51.4923 2.5305 51.4636 2.52079C49.8278 2.11285 48.1683 1.85061 46.4851 1.72596C45.5151 1.65312 44.545 1.63855 43.5716 1.68711C42.6743 1.73082 42.0101 2.14199 41.5691 2.92549C41.2936 3.4095 41.1246 3.92104 41.0232 4.46172C40.9844 4.68673 40.9945 4.91174 41.052 5.13189C41.1398 5.46698 41.3122 5.59163 41.6536 5.53497C41.875 5.49612 42.093 5.42813 42.3093 5.35852C43.1914 5.072 44.0955 4.9085 45.0216 4.84699C45.8649 4.78871 46.7048 4.79842 47.548 4.84699C48.5671 4.91012 49.5793 5.038 50.5764 5.25007C50.6491 5.26464 50.715 5.30834 50.7978 5.34072C50.7775 5.47508 50.7775 5.58516 50.7538 5.69523C50.5561 6.65679 50.4243 7.62969 50.3449 8.6042C50.2181 10.0886 50.2824 11.5569 50.5815 13.0186C50.7843 14.0142 51.1375 14.9628 51.7103 15.8191C52.4674 16.9588 53.5236 17.6176 54.8891 17.8102C55.4823 17.8928 56.2309 17.8248 56.7852 17.6144C57.2922 17.4282 57.7502 17.1595 58.1743 16.8293C58.2622 16.7613 58.3484 16.6949 58.4346 16.6285C58.5123 16.6917 58.5647 16.7305 58.6086 16.771C59.7375 17.8572 60.9188 18.1842 62.4228 17.9058C63.3438 17.7358 64.1449 17.3554 64.9121 16.8681C65.076 16.7677 65.2349 16.6577 65.3802 16.5622C65.7232 16.7532 66.0308 16.9555 66.3637 17.1465C67.8357 17.8782 69.3921 18.0417 71.0009 17.7795C72.7043 17.5011 74.2101 16.7839 75.5299 15.6929C76.0318 15.2768 76.4509 14.7928 76.7855 14.2327C77.2672 13.4039 77.6237 12.5281 77.8553 11.6054C77.9651 11.1651 78.0192 10.7183 77.9938 10.2635Z" fill="#2C4CFF"/>
      <path d="M48.9422 11.5322C48.5974 11.1443 48.1958 10.8307 47.7523 10.5624C47.1448 10.1988 46.5574 9.8125 45.9616 9.43431C45.7374 9.29208 45.57 9.09975 45.4796 8.85085C45.4027 8.6359 45.4412 8.43549 45.5901 8.2674C45.7273 8.11063 45.9198 8.08154 46.1206 8.12518C46.3783 8.18336 46.6026 8.31104 46.7549 8.53246C46.8754 8.70378 46.9841 8.88156 47.0946 9.05773C47.2419 9.29208 47.4243 9.49249 47.6402 9.66543C47.9665 9.92402 48.338 9.98543 48.7296 9.89978C49.0693 9.8222 49.3555 9.6929 49.5848 9.43431C49.8961 9.08036 50.0099 8.67954 49.809 8.22861C49.7003 7.97972 49.5747 7.73244 49.4225 7.51263C49.1062 7.05363 48.6577 6.74331 48.1656 6.49119C46.9272 5.85925 45.6252 5.74126 44.2814 6.04188C43.5216 6.20835 42.8438 6.58169 42.3033 7.16515C41.649 7.86658 41.2423 9.1547 42.1744 10.2828C42.2832 10.4202 42.3987 10.556 42.5275 10.6756C42.8438 10.9713 43.1953 11.2202 43.5651 11.4546C44.1994 11.857 44.8219 12.2821 45.4428 12.7104C45.9449 13.0546 46.1357 13.4134 46.1976 13.992C46.226 14.2215 46.1742 14.4413 46.0771 14.6482C45.9767 14.8777 45.7943 14.9925 45.5466 14.9973C45.2253 15.007 44.9458 14.8826 44.7483 14.6288C44.6161 14.4526 44.5023 14.3573 44.4069 14.1553C44.2931 13.9064 44.1609 13.6348 44.0421 13.3908C43.9049 13.0999 43.8245 12.9189 43.6388 12.6603C43.2237 12.0817 42.6213 11.9055 41.9418 11.9685C41.7895 11.9831 41.6305 12.0542 41.4983 12.1301C41.2021 12.3015 40.9678 12.5455 40.8306 12.8655C40.6549 13.276 40.4875 13.5847 40.3051 13.9953C40.2097 14.2151 40.116 14.3298 39.9972 14.5351C39.8717 14.7452 39.6759 14.7888 39.4566 14.6773C39.2759 14.5868 39.1454 14.4381 39.0701 14.2619C38.973 14.0421 38.8843 13.8175 38.8307 13.5831C38.6785 12.8865 38.6634 12.1819 38.7538 11.4756C38.8826 10.4493 39.1353 9.45855 39.47 8.48397C39.5704 8.19791 39.6324 7.89567 39.6993 7.59991C39.8047 7.1312 39.6223 6.77241 39.2357 6.52997C38.64 6.15178 37.994 5.86086 37.2861 5.74126C36.7405 5.65076 36.2535 5.68308 35.8736 6.09198C35.7782 6.1938 35.6728 6.28754 35.6008 6.36027C35.2343 6.25037 34.913 6.14532 34.5867 6.06451C34.0461 5.93036 33.8537 5.91581 33.0119 5.90612C31.6982 5.95137 30.7125 6.38451 29.8925 7.3397C29.0206 8.35144 28.567 9.94341 28.4147 11.2768C28.3026 12.2417 28.0382 13.1645 27.5646 14.0147C27.4491 14.2248 27.3102 14.4252 27.168 14.6175C27.1161 14.6886 27.0391 14.7565 26.9571 14.7743C26.6509 14.3961 26.527 14.1229 26.3881 13.588C26.2174 12.9124 26.1538 12.2255 26.1304 11.537C26.0768 9.96927 26.2777 8.43064 26.599 6.9017C26.6191 6.80958 26.6659 6.72554 26.7094 6.61079C26.8852 6.69644 27.0441 6.77726 27.2014 6.84998C27.3922 6.93726 27.583 7.0213 27.7755 7.09888C27.9713 7.17646 28.162 7.12797 28.326 7.01322C28.4465 6.9308 28.5654 6.83706 28.6373 6.71746C28.8432 6.3926 29.0473 6.06289 29.2063 5.71379C29.4021 5.28388 29.2649 4.93477 28.8448 4.70042C28.5386 4.5291 28.2139 4.38526 27.8993 4.22687C27.7571 4.15414 27.588 4.13636 27.4692 3.95373C27.6449 3.54645 27.819 3.1133 28.0198 2.69794C28.1821 2.36823 28.1871 2.0466 28.0098 1.73306C27.9177 1.56659 27.819 1.39365 27.6935 1.25143C27.2148 0.711613 26.6324 0.32857 25.9446 0.0990683C25.6969 0.0166415 25.4426 -0.0108341 25.1849 0.00371185C24.7313 0.027955 24.3765 0.204122 24.1908 0.640499C23.9615 1.17062 23.7373 1.70073 23.508 2.23247C23.4645 2.33267 23.421 2.42803 23.3758 2.52823C23.2837 2.51369 23.2235 2.51369 23.1616 2.49914C21.7324 2.1064 20.2898 1.83003 18.8138 1.70073C17.5954 1.59568 16.3771 1.59083 15.1638 1.75892C14.7588 1.8171 14.3839 1.96418 14.1078 2.27934C13.5723 2.89673 13.1857 3.58847 13.0987 4.42082C13.0753 4.62608 13.0501 4.83618 13.0702 5.04306C13.1137 5.45519 13.42 5.6556 13.825 5.55378C13.8869 5.53924 13.9539 5.51984 14.0108 5.4956C15.0534 5.07054 16.1512 4.91215 17.254 4.84427C19.0229 4.73436 20.7801 4.8879 22.5189 5.23701C22.5909 5.25155 22.6562 5.29519 22.7432 5.32913C22.7331 5.47136 22.7281 5.60227 22.7097 5.72672C22.5624 6.71099 22.457 7.70011 22.4219 8.69408C22.4118 8.95268 22.4068 9.20481 22.4068 9.4634C22.4018 10.1551 22.4018 10.8453 22.3917 11.5322C22.3917 11.6744 22.3968 11.8279 22.3482 11.9572C22.0085 12.8946 21.0479 13.727 20.2898 14.3848C20.017 14.6191 19.7108 14.792 19.3677 14.8906C19.033 14.986 18.7033 14.9731 18.3786 14.8373C17.9251 14.6466 17.4716 14.1262 17.3093 13.6009C17.4666 13.567 17.6256 13.5427 17.7778 13.5039C18.0406 13.436 18.3084 13.3843 18.5661 13.2938C20.2731 12.7621 21.3843 11.0424 21.401 9.20642C21.4111 8.21568 20.9291 7.17646 20.2664 6.71746C19.4899 6.17926 18.9025 5.90935 17.8883 5.90935C16.2616 5.90935 14.6701 6.92756 13.8317 8.37569C13.5489 8.86217 13.3447 9.3842 13.2108 9.93372C12.928 11.0958 12.9481 12.2578 13.1623 13.4215C13.2911 14.1003 13.4535 14.7646 13.8016 15.3771C14.5463 16.6862 15.6408 17.538 17.1168 17.8725C18.0573 18.0875 18.9945 18.0148 19.925 17.7723C21.0278 17.4863 22.4754 16.9545 23.3858 16.2757C23.4862 16.203 23.5917 16.1367 23.682 16.0802C23.7406 16.1141 23.7691 16.1287 23.7925 16.1481C24.661 16.9739 25.7036 17.4329 26.8785 17.5913C27.8625 17.7206 28.7997 17.5671 29.6431 17.0127C29.705 16.9691 29.772 16.9351 29.8188 16.9077C29.8808 16.9368 29.9142 16.9465 29.9393 16.9659C30.6991 17.5881 31.5877 17.7982 32.5483 17.7497C33.7868 17.6867 34.898 17.2713 35.9222 16.5925C36.0427 16.5149 36.1565 16.4357 36.2987 16.3339C36.8443 16.898 37.4551 17.357 38.1898 17.6237C38.9161 17.8871 39.6558 17.9728 40.4172 17.8144C41.1921 17.6527 41.8498 17.2745 42.4606 16.725C42.5995 16.8301 42.6179 16.8463 42.8221 16.9626C44.1023 17.6463 45.4529 17.8629 46.872 17.5574C47.9146 17.3327 48.7782 16.8123 49.404 15.9331C49.7053 15.508 49.9111 15.0393 49.973 14.5173C50.1069 13.3148 49.7388 12.4308 48.9422 11.5322ZM16.8457 10.6756C16.8457 10.5398 16.8942 10.4267 16.9193 10.32C17.0331 9.85775 17.2105 9.4036 17.4582 8.98338C17.5067 8.90419 17.5603 8.83146 17.6172 8.76196C17.7193 8.6456 17.8414 8.55186 18.0188 8.57772C18.2381 8.61004 18.3786 8.73449 18.4272 8.92035C18.4573 9.04157 18.4623 9.16763 18.4456 9.28885C18.4037 9.59431 18.2682 9.86745 18.0138 10.0776C17.7042 10.3378 17.2892 10.5382 16.8457 10.6756ZM34.8243 9.93533C34.7239 10.8566 34.6001 11.7794 34.3708 12.6829C34.2085 13.3148 33.9307 13.8886 33.4872 14.3702C33.3834 14.4898 33.2579 14.59 33.1257 14.6805C32.955 14.7953 32.791 14.7662 32.6571 14.5981C32.5852 14.5108 32.5232 14.4122 32.4814 14.312C32.3392 13.9823 32.2806 13.6413 32.2572 13.2857C32.2003 12.4372 32.3576 11.7843 32.5433 11.0489C32.6571 10.5947 32.8496 10.1745 33.0789 9.76886C33.1023 9.72523 33.1274 9.68159 33.1558 9.64441C33.5307 9.06258 34.0294 9.06258 34.4277 9.28562C34.5515 9.35673 34.6804 9.41976 34.8294 9.50057C34.8344 9.66219 34.8377 9.80765 34.8243 9.93533Z" fill="#2C4CFF"/>
      <path d="M60.9955 4.99982C62.0998 4.98673 63.0167 4.10551 62.9998 2.99599C62.9783 1.62035 61.9523 0.98343 61.0139 1.00088C60.0371 0.970343 59.028 1.73668 59.0004 2.98726C58.9789 3.98772 59.839 5.01581 60.9955 4.99982Z" fill="#2C4CFF"/>
      <path d="M0.884288 20.8955C2.52176 24.5802 5.95961 22.3058 5.95961 22.3058C5.95961 22.3058 4.32379 19.4692 4.45051 17.2638C4.45051 17.2638 4.45545 17.0936 4.68914 17.2462C4.92447 17.3971 6.43522 18.4589 8.127 17.8517C8.127 17.8517 10.7963 17.2172 11.7294 13.7028C12.6642 10.1884 10.877 8.01195 10.877 8.01195C10.877 8.01195 8.96959 5.09504 5.64035 6.66433C5.64035 6.66433 3.43018 4.6196 0.640725 5.06292C0.640725 5.06452 0.540337 6.49889 1.1657 8.57413C-1.28145 16.4832 0.884288 20.8955 0.884288 20.8955ZM8.34587 12.0918C8.12041 13.502 7.29921 14.5429 6.51421 14.416C5.72593 14.2891 5.27171 13.0443 5.49717 11.6356C5.72263 10.2253 6.54384 9.1845 7.33048 9.31139C8.11712 9.43668 8.57133 10.6815 8.34587 12.0918Z" fill="#2C4CFF"/>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
      <>
      <Link to="/dashboard/pets" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link><Chip label="alpha" size="small" variant="outlined" sx={{ marginLeft: 1 }} /></>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
