import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '4px',
};

export default function Confirmation({ show, close, comment, btName, submit }) {
  return (
    <div>
      {show ? (
        <>
          {console.log(show)}
          {console.log(close)}
          {console.log(comment)}
          {console.log(btName)}
          {console.log(close)}
          <Modal open={show}>
            <Box sx={style}>
              <Typography variant='subtitle1' component='h2'>
                {comment}
              </Typography>
              <Stack spacing={2} direction='row'>
                <Button
                  variant='outlined'
                  size='small'
                  sx={{ borderRadius: 16 }}
                  onClick={() => close()}
                >
                  キャンセル
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  color='secondary'
                  sx={{ borderRadius: 16 }}
                  onClick={submit}
                >
                  {btName}
                </Button>
              </Stack>
            </Box>
          </Modal>
        </>
      ) : null}
    </div>
  );
}
