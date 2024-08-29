import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Backgroundimage from '../components/Backgroundimage';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formValues, setformValues] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;

      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/dqHome');
  });

  return (
    <Container showPassword={showPassword}>
      <Backgroundimage />
      <div className='content'>
        <Header login />
        <div className='body flex column j-center a-center'>
          <div className='text flex column'>
            <h1>Adro Data Quality</h1>
            <h4>Your one stop destination for Data Quality</h4>
          </div>
          <div className='form'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={formValues.email}
              onChange={(e) =>
                setformValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={formValues.password}
                onChange={(e) =>
                  setformValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}

            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>

          {showPassword && <button onClick={handleSignIn}>Sign Up</button>}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25 rem;
        }
      }
    }

    .form {
      display: grid;
      grid-template-columns: ${({ showPassword }) =>
        showPassword ? '1fr 1fr' : '2fr 1fr'};
      width: 60%;
      input {
        color: black;
        border: none;
        padding: 1.5rem;
        font-size: 1.2rem;
        border: 1px solid black;
        &:focus {
          outline: none;
        }
      }

      button {
        padding: 0.5rem 1rem;
        background-color: #e6ddc5;
        border: none;
        cursor: pointer;
        color: black;
        font-weight: bolder;
        font-size: 1.05rem;
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
      font-size: 1.05rem;
    }
  }
`;
