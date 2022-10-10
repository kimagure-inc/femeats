import React from 'react';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'primary',
  backgroundColor: '#FFFFFF',
  width: '350px',
  marginBottom: '32px',
}));

const ShippmentForm = (props: any) => {
  return (
    <>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        direction='column'
      >
        <StyledBox>
          <Box
            sx={{
              fontSize: '16px',
              fontWeight: '700',
              marginTop: '32px',
              marginBottom: '24px',
            }}
          >
            配送情報
          </Box>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 288 }}>
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}
              >
                初回お届け日
              </FormHelperText>
              <Select
                name='datelist'
                onChange={(e) => props.deliveryDateChange(e.target.value)}
              >
                {dataSet.map((value: any) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 288 }}>
              <FormHelperText
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  marginTop: '24px',
                  marginBottom: '8px',
                }}
              >
                お届け時間帯
              </FormHelperText>
              <Select
                name='timezone'
                onChange={(e) => props.delTimeChange(e.target.value)}
                sx={{
                  marginBottom: '48px',
                }}
              >
                {props.timezone.map((value: any) => (
                  <MenuItem value={value.id} key={value.id}>
                    {value.timezone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </StyledBox>
      </Grid>
    </>
  );
};

export default ShippmentForm;

// 5日後の日程から2週間表示させる（例：今日10/1 => 10/6~10/20の日程）
const days = ['日', '月', '火', '水', '木', '金', '土'];
const dataSet: any[] = [];
let start = Date.now() + 5 * 86400000; // 基準日=5日後の日程
let max = 14; // 何回繰り返すか
for (let i = 0; i < max; i++) {
  let newDay = new Date(start + i * 86400000);
  let year = newDay.getFullYear();
  let month = newDay.getMonth() + 1;
  let date = newDay.getDate();
  let day = days[newDay.getDay()];

  let selectDay = year + '/' + month + '/' + date + '(' + day + ')';

  dataSet.push(selectDay);
}