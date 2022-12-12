import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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

type Props = {
  show: boolean;
  close: () => void;
  comment: string;
  btName: string;
  submit: () => void;
};

const Confirmation = (props: Props) => {
  return (
    <div>
      {props.show ? (
        <>
          <Modal open={props.show}>
            <Box sx={style}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='subtitle1' component='h2'>
                  {props.comment}
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
                    onClick={props.submit}
                  >
                    {props.btName}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default Confirmation;
