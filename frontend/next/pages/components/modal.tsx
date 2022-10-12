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
          <Modal open={show}>
            <Box sx={style}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='subtitle1' component='h2'>
                  {comment}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  mt: '24px',
                }}
              >
                <Stack spacing={4} direction='row'>
                  <Button
                    variant='outlined'
                    sx={{
                      borderRadius: 16,
                      fontSize: '12px',
                      fontWeight: '700',
                      width: '96px',
                      height: '28px',
                    }}
                    onClick={() => close()}
                  >
                    キャンセル
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      borderRadius: 16,
                      fontSize: '12px',
                      fontWeight: '700',
                      width: '96px',
                      height: '28px',
                      '&:hover': {
                        color: 'primary.main',
                        background: '#FFF262',
                      },
                    }}
                    onClick={submit}
                  >
                    {btName}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Modal>
        </>
      ) : null}
    </div>
  );
}
