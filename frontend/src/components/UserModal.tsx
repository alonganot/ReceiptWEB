import { Box, Button, Icon, Modal, Typography } from "@mui/material"
import { useState } from "react";
import { modalStyle, Title } from "../styles/SharedStyles";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";

function UserModal() {
    const { logout } = useAuthContext();
    const { user } = useUserContext()

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const changeIsOpen = (): void => setIsOpen(!isOpen);

    return (
        <>
            <Button disabled={user.id === "test-id"} style={{height: '100%'}} onClick={changeIsOpen}>
                <Icon>person</Icon>
            </Button>
            <Modal
                open={isOpen}
                onClose={changeIsOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle(300)} textAlign={'center'}>
                    <Title dir="rtl" variant="h5" align="center" sx={{ marginBottom: '2vh' }}>{user.nickname}</Title>
                    <img src={user.picture} alt="" />
                    <Box display={'flex'} justifyContent={'center'}>
                        <Button variant="outlined" color="error" sx={{ marginTop: '3vw' }} onClick={() => { logout(); changeIsOpen()}}>
                            התנתקות</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default UserModal
