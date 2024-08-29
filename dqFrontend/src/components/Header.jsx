import React from 'react';
import dqLogo from '../assets/dqLogo.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <Container className='flex a-center j-between'>
      <div className='logo'>
        <img src={dqLogo} alt='dqLogo' />
      </div>
      <button onClick={() => navigate(props.login ? '/login' : '/signup')}>
        {props.login ? 'Log In' : 'Sign Up'}
      </button>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 4rem;

  .logo {
    img {
      height: 5rem;
    }
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #e6ddc5;
    border: none;
    cursor: pointer;
    color: black;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.25rem;
  }
`;
