import React from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import dqLogo from '../assets/dqLogo.png';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-16">
      <div className="logo">
        <img src={dqLogo} alt="dqLogo" className="h-20" />
      </div>
      <button
        onClick={() => navigate(props.login ? '/login' : '/signup')}
        className="px-4 py-2 bg-[#e6ddc5] border-none cursor-pointer text-black rounded font-bold text-xl flex items-center justify-center hover:bg-[#d4c7a1] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {props.login ? (
          <>
            <FaSignInAlt className="mr-2" />
            Log In
          </>
        ) : (
          <>
            <FaUserPlus className="mr-2" />
            Sign Up
          </>
        )}
      </button>
    </div>
  );
}

// import React from 'react';
// import dqLogo from '../assets/dqLogo.png';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// export default function Header(props) {
//   const navigate = useNavigate();

//   return (
//     <Container className='flex a-center j-between'>
//       <div className='logo'>
//         <img src={dqLogo} alt='dqLogo' />
//       </div>
//       <button onClick={() => navigate(props.login ? '/login' : '/signup')}>
//         {props.login ? 'Log In' : 'Sign Up'}
//       </button>
//     </Container>
//   );
// }

// const Container = styled.div`
//   padding: 0 4rem;

//   .logo {
//     img {
//       height: 5rem;
//     }
//   }

//   button {
//     padding: 0.5rem 1rem;
//     background-color: #e6ddc5;
//     border: none;
//     cursor: pointer;
//     color: black;
//     border-radius: 0.2rem;
//     font-weight: bolder;
//     font-size: 1.25rem;
//   }
// `;
