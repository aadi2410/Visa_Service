import { Box, Button, Modal, Typography } from '@mui/material'
import SuccessIcon from '../assets/success.png';
import React from 'react'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    py: 2,
    px: 4,
};
function CustomModal() {
    const [modalopen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    return (
        <Modal
            open={modalopen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
                    <img src={SuccessIcon} width={120} />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0, fontWeight: 900, textAlign: 'center' }}>
                    Profile Data Successfully Filled
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                    Thank you for completing your profile information. Your details have been successfully saved.
                </Typography>
                <Box style={{ textAlign: 'center', marginTop: 10 }}>
                    <Button onClick={handleModalClose} variant="contained" color="primary">Ok</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CustomModal
