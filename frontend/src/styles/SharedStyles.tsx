import { Typography } from "@mui/material"
import styled from "styled-components"
import '../assets/fonts/fonts.css'

export const Title = styled(Typography)({
  fontFamily: 'MainFont',
  fontWeight: 'bold !important',
  background: 'linear-gradient(300deg, rgb(118, 221, 225) 0%, rgb(248, 209, 126) 100%)',
  backgroundClip: 'text',
  color: 'transparent !important'
})

export const Subtitle = styled(Typography)({
  fontWeight: '500 !important',
  background: 'linear-gradient(300deg, rgb(118, 221, 225) 0%, rgb(248, 209, 126) 100%)',
  backgroundClip: 'text',
  color: 'transparent !important'})

export const modalStyle = (width: number) => {
  return {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: '0.5em 0.5em 1em rgb(74 72 72 / 60%)',
    align: 'center',
    p: 4,
  }
}