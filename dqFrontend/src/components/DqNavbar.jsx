import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dqLogo from '../assets/dqLogo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

export default function Navbar({ isScrolled }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/dqHome');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const links = [
    { name: 'Data Profiling', link: '/dataProfiling' },
    { name: 'Exception Rules', link: '/exceptionRules' },
    { name: 'Execute Rules', link: '/executeRules' },
    { name: 'Exception Records', link: '/exceptionRecords' },
    { name: 'Charts', link: '/charts' },
  ];

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate('/login');
    });
  }, [navigate]);

  return (
    <Container>
      <nav className={`flex ${isScrolled ? 'scrolled' : ''}`}>
        <div className='left flex a-center'>
          <div className='brand flex a-center j-center'>
            <Link to='/dqHome' onClick={() => setActiveLink('/dqHome')}>
              <img src={dqLogo} alt='dqLogo' />
            </Link>
          </div>
          <ul className='links flex'>
            {links.map(({ name, link }) => (
              <li key={name} className={activeLink === link ? 'active' : ''}>
                <Link to={link} onClick={() => setActiveLink(link)}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='right flex a-center'>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  nav {
    background-color: white;
    position: fixed;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;

    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: black;
            text-decoration: none;
            font-size: 18px;
            font-family: 'Arial', serif;
            font-style: normal;
            font-weight: bold;
            padding: 0.4rem 1.0rem; /* Increased padding */
          }
          &.active a {
            color: white; /* Text color for the active link */
             background-color: rgba(17, 86, 204, 0.85);/* Background color for the active link */
            border: 2px solid blue; /* Border color for the active link */
            box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2); /* Optional shadow for button effect */

          }
        }
      }
    }

    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: black;
          font-size: 1.2rem;
        }
      }
    }

    .search {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      justify-content: center;
      padding: 0.2rem;
      padding-left: 0.5rem;
      button {
        background-color: transparent;
      }
      svg {
        color: white;
      }
      input {
        width: 0;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease-in-out;
        background-color: transparent;
        border: none;
        color: white;
        &:focus {
          outline: none;
        }
      }
    }

    .show-search {
      border: 1px solid white;
      background-color: rgba(0, 0, 0, 0.6);
      input {
        width: 100%;
        opacity: 1;
        visibility: visible;
        padding: 0.3rem;
      }
    }
  }
`;
