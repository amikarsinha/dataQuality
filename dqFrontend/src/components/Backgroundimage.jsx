import React from 'react'
import backgroundimage from '../assets/dqBackground.png'
import styled from 'styled-components'

export default function Backgroundimage() {
  return (
    <Container>
        <img src={backgroundimage} alt="backgroundimage" />

    </Container>
  )
}

const Container = styled.div`
 height : 100vh;
 width : 100vw;
 img{
    height : 100vh;
    width : 100vw;
 }

`;