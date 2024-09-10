import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
// import styled from 'styled-components';
import Backgroundimage from '../components/Backgroundimage';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaArrowRight } from 'react-icons/fa';
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
    <div className={`relative ${showPassword ? '' : ''}`}>
      <Backgroundimage />
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 h-screen w-screen grid grid-rows-[15vh_85vh]">
        <Header login />
        <div className="flex flex-col justify-center items-center gap-4 h-[85vh]">
          <div className="flex flex-col text-center gap-4">
            <h1 className="text-4xl">Adro Data Quality</h1>
            <h4 className="text-xl">Your one stop destination for Data Quality</h4>
          </div>
          <div className={`grid ${showPassword ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'} w-3/5`}>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setformValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              className="p-6 text-black border border-black text-lg focus:outline-none focus:border-blue-500 hover:border-blue-500 rounded"
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setformValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                className="p-6 text-black border border-black text-lg focus:outline-none focus:border-blue-500 hover:border-blue-500 rounded"
              />
            )}
            {!showPassword && (
              <button
                onClick={() => setShowPassword(true)}
                className="p-2 bg-[#e6ddc5] text-black font-bold text-lg cursor-pointer flex items-center justify-center hover:bg-[#d4c7a1] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                <FaArrowRight className="mr-2" />
                Get Started
              </button>
            )}
          </div>
          {showPassword && (
            <button
              onClick={handleSignIn}
              className="p-2 bg-[#e6ddc5] text-black font-bold text-lg cursor-pointer flex items-center justify-center hover:bg-[#d4c7a1] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              <FaUserPlus className="mr-2" />
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// const Container = styled.div`
//   position: relative;
//   .content {
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     height: 100vh;
//     width: 100vw;
//     display: grid;
//     grid-template-rows: 15vh 85vh;
//     .body {
//       gap: 1rem;
//       .text {
//         gap: 1rem;
//         text-align: center;
//         font-size: 2rem;
//         h1 {
//           padding: 0 25 rem;
//         }
//       }
//     }

//     .form {
//       display: grid;
//       grid-template-columns: ${({ showPassword }) =>
//         showPassword ? '1fr 1fr' : '2fr 1fr'};
//       width: 60%;
//       input {
//         color: black;
//         border: none;
//         padding: 1.5rem;
//         font-size: 1.2rem;
//         border: 1px solid black;
//         &:focus {
//           outline: none;
//         }
//       }

//       button {
//         padding: 0.5rem 1rem;
//         background-color: #e6ddc5;
//         border: none;
//         cursor: pointer;
//         color: black;
//         font-weight: bolder;
//         font-size: 1.05rem;
//       }
//     }
//     button {
//       padding: 0.5rem 1rem;
//       background-color: #e6ddc5;
//       border: none;
//       cursor: pointer;
//       color: black;
//       border-radius: 0.2rem;
//       font-weight: bolder;
//       font-size: 1.05rem;
//     }
//   }
// `;
