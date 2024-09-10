import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Backgroundimage from "../components/Backgroundimage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();

  const [formValues, setformValues] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;

      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
      showAlert("Incorrect credentials")
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/dqHome");
  });
  function showAlert(message) {
    Swal.fire({
      title: "",
      text: message,
      icon: "info",
      confirmButtonText: "OK",
    });
  }
  return (
    <div className="relative">
      <Backgroundimage />
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 h-screen w-screen grid grid-rows-[15vh_85vh]">
        <Header />
        <div className="flex flex-col items-center justify-center gap-8 h-[85vh]">
          <div className="flex flex-col items-center justify-center gap-8 p-8 bg-black bg-opacity-70 w-[25vw] text-white rounded-lg shadow-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold">Login</h3>
            </div>
            <div className="flex flex-col gap-8">
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
                className="p-4 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:border-blue-500"
              />
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
                className="p-4 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:border-blue-500"
              />
              <button
                onClick={handleLogIn}
                className="p-4 bg-[#e6ddc5] text-black rounded font-bold text-lg flex items-center justify-center hover:bg-[#d4c7a1] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              >
                <FaSignInAlt className="mr-2" />
                Log In
              </button>
            </div>
          </div>
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
//   }
//   .form-container {
//     gap: 2rem;
//     height: 85vh;
//     .form {
//       padding: 2rem;
//       background-color: #000000b0;
//       width: 25vw;
//       gap: 2rem;
//       color: white;
//       .container {
//         gap: 2rem;
//         input {
//           padding: 0.5rem 1rem;
//           width: 15rem;
//         }
//         button {
//           padding: 0.5rem 1rem;
//           background-color: #e6ddc5;
//           border: none;
//           cursor: pointer;
//           color: black;
//           border-radius: 0.2rem;
//           font-weight: bolder;
//           font-size: 1.05rem;
//         }
//       }
//     }
//   }
// `;
