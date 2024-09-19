import React, { useState, useEffect } from 'react';
import dqLogo from '../assets/dqLogo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { firebaseAuth } from '../utils/firebase-config';
import {
  FaPowerOff,
  FaHome,
  FaChartBar,
  FaClipboardList,
  FaCogs,
  FaTable,
} from "react-icons/fa";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/dqHome');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const links = [
    {
      name: "Data Profiling",
      link: "/dataProfiling",
      icon: <FaClipboardList />,
    },
    { name: "Exception Rules", link: "/exceptionRules", icon: <FaCogs /> },
    { name: "Execute Rules", link: "/executeRules", icon: <FaClipboardList /> },
    { name: "Exception Records", link: "/exceptionRecords", icon: <FaTable /> },
    { name: "Data Quality Charts", link: "/charts", icon: <FaChartBar /> },
  ];
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate('/login');
    });
  }, [navigate]);
  return (
    <div
      className={`fixed w-full z-20 transition-transform duration-300 ${
        isScrolled ? '-top-16' : 'top-0'
      }`}
    >
      <nav className="flex items-center justify-between h-26 px-16 bg-white shadow-lg">
        <div className="flex items-center gap-8">
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/dqHome"
              onClick={() => setActiveLink("/dqHome")}
              className="flex items-center gap-2"
            >
              {/* <FaHome className="text-xl mr-2 hover:text-blue-700 transition duration-300" /> */}
              <img
                src={dqLogo}
                alt="dqLogo"
                className="h-16 rounded-full shadow-lg hover:shadow-xl transition duration-300"
              />
            </Link>
          </div>
          <ul className="flex gap-8 list-none">
            {links.map(({ name, link, icon }) => (
              <li
                key={name}
                className={`${activeLink === link ? "active" : ""}`}
              >
                <Link
                  to={link}
                  onClick={() => setActiveLink(link)}
                  className={`flex items-center text-black no-underline text-lg font-bold py-1 px-2 hover:bg-gray-200 rounded-xl transition duration-300 ${
                    activeLink === link
                      ? "bg-blue-700 text-white border-2 rounded-xl border-blue-700 shadow-md"
                      : ""
                  }`}
                >
                  {icon}
                  <span className="ml-2">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => signOut(firebaseAuth)}
            className="bg-transparent border-none cursor-pointer focus:outline-none"
            data-tooltip-id="logout" data-tooltip-content="Logout"
          >
            <FaPowerOff className="text-black text-xl hover:text-red-700 transition duration-300" />
          </button>
          {/* <Tooltip id="logout" place="bottom" type="dark" effect="solid" /> */}
        </div>
      </nav>
    </div>
  );
}
