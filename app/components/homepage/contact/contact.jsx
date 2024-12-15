"use client";
// @flow strict
import { isValidEmail } from '@/utils/check-email';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { TbMailForward } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactWithoutCaptcha() {
  const [error, setError] = useState({ email: false, required: false });
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [messageSent, setMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const successRef = useRef(null);

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    setIsSending(true);
    try {
      const response = await axios.post('/api/send-email', {
        name: userInput.name,
        email: userInput.email,
        message: userInput.message,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setMessageSent(true);
        setUserInput({ name: '', email: '', message: '' }); // Reset form fields
      }
    } catch (error) {
      toast.error("Error sending message. Please try again.");
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (messageSent && successRef.current) {
      successRef.current.focus();
    }
  }, [messageSent]);

  return (
    <div className="">
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email &&
              <p className="text-sm text-red-400">Please provide a valid email!</p>
            }
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message: </label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            {error.required &&
              <p className="text-sm text-red-400">
                Email, Name, and Message are required!
              </p>
            }
            <button
              className={`flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
              role="button"
              onClick={handleSendMail}
              disabled={isSending}
            >
              <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
            {messageSent && 
              <div className="flex items-center text-green-500" role="alert" tabIndex="-1" ref={successRef}>
                <FaCheckCircle className="mr-2" />
                <p className="text-sm">Message sent successfully!</p>
              </div>
            }
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default ContactWithoutCaptcha;