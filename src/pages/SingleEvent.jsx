


// Import React, useState, useEffect, useRef, useParams, axios, Loading component, TopBar component, InviteButton component, Footer component, useNavigate hook from 'react-router-dom'
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import TopBar from '../components/TopBar';
import InviteButton from '../components/InviteButton';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


const SingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // State to manage comments
  const [newComment, setNewComment] = useState(''); // State to manage new comment
  const navigate = useNavigate();
  const tagsInputRef = useRef(null);
  const guestsInputRef = useRef(null);


  // Function to handle joining room
  const handleJoinRoom = useCallback((link) => {
    console.log("Joining room:", link);
    navigate(`/room/${link}`);
  }, [navigate]);


  // Function to fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://academiaaconnect.onrender.com/event/getevent/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };


    fetchEvent();
  }, [id]);


  // Function to handle submitting a new comment
  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Add new comment to the comments array
    setComments([...comments, newComment]);
    // Clear the input field
    setNewComment('');
  };


  // Render loading state
  if (loading) return <Loading />;
  // Render error state
  if (error) return <p>Error: {error.message}</p>;


  return (
    <>
      <TopBar />
      {/* Main container */}
      <div className='min-h-screen px-0 lg:px-10 pb-20 2xl:px-10 bg-gray-100 lg:rounded-lg overflow-hidden'>
        <div className='w-full flex flex-col lg:flex-row gap-4 pt-2'>
          {/* Left section */}
          <div className='bg-gray-100 w-full lg:w-3/4 h-full lg:flex flex-col gap-6 overflow-y-auto'>
            {event && (
              <div className='p-4 rounded-md shadow-xl bg-secondary'>
                {/* Image and button section */}
                <div className="relative w-full flex justify-center flex-grow overflow-y-auto">
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-md' style={{ zIndex: '-1' }}></div>
                  <div className="w-1/2 relative">
                    <img src={event.image} alt={event.title} className='w-full h-auto rounded-md mb-4' style={{ maxHeight: '300px' }} />
                  </div>
                </div>
                {/* Event title, description, tags, and button */}
                <div className='flex flex-col min-h-screen flex-1 overflow-y-auto'>
                  <h3 className='text-2xl font-semibold mb-2'>{event.title}</h3>
                  <p className='text-lg text-gray-600 mb-4'>{event.description}</p>
                  <div className='flex justify items-center mb-4'>
                    <p className='text-sm text-gray-500'>📅 {new Date(event.date).toLocaleDateString()}</p>
                    <p className='text-sm text-gray-500 ml-5'>📍 {event.location}</p>
                  </div>
                  {/* Tags */}
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold mb-2'>Tags</h3>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {event.tags && event.tags.map((tag, index) => (
                        <div
                          key={index}
                          className='px-3 py-1 rounded-md flex items-center gap-1'
                          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                        >
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Button to join event */}
                  <div className='p-4'>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        className='bg-blue-500 text-white py-2 px-4 rounded-lg font-bold shadow-md hover:bg-blue-600'
                        onClick={() => handleJoinRoom(event.link)}
                      >
                        Go to Event
                      </button>
                      <InviteButton />
                    </div>
                  </div>
                  {/* Comment section */}
                  <div className='p-4 border-t border-gray-300 rounded-md shadow-xl bg-secondary'>
                    <h3 className='text-lg font-semibold mb-2'>Comments</h3>
                    {/* Render comments */}
                    <div className="space-y-4">
                      {comments.map((comment, index) => (
                        <div key={index} className="border-b border-gray-300 pb-2">
                          <p>{comment}</p>
                        </div>
                      ))}
                    </div>
                    {/* Form to add new comment */}
                    <form onSubmit={handleSubmitComment} className="mt-4">
                      <textarea
                        className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Add your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                      ></textarea>
                      <button
                        type="submit"
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-600"
                      >
                        Add Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Right section */}
          <div className='flex-1 h-full lg:w-1/4 px-4 py-6 flex flex-col gap-6 bg-primary lg:rounded-lg'>
            {/* Map */}
            <div className='p-4 rounded-md shadow-xl bg-secondary'>
              {event && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.6337385965094!2d10.186698775307745!3d36.899109362118715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cb75abbb1733%3A0x557a99cdf6c13b7b!2sESPRIT%20Ecole%20Sup%C3%A9rieure%20Priv%C3%A9e%20d&#39;Ing%C3%A9nierie%20et%20de%20Technologies!5e0!3m2!1sfr!2stn!4v1714415787308!5m2!1sfr!2stn"
                  width="100%"
                  height="250"
                  style={{ border: '0' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
            {/* Card for event description and tags */}
            <div className='p-4 mt-4 border-t border-gray-300 rounded-md shadow-xl bg-secondary'>
              <h3 className='text-lg font-semibold mb-2'>Event Description & Tags</h3>
              <div className='p-4'>
                {/* Event description */}
                <h3 className='text-lg font-semibold mb-2'>{event.title}</h3>
                <p className='text-lg text-gray-600 mb-4'>{event.description}</p>
                {/* Tags */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {event.tags && event.tags.map((tag, index) => (
                    <div
                      key={index}
                      className='px-3 py-1 rounded-md flex items-center gap-1'
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                    >
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Card for list of guests */}
            <div className='p-4 mt-4 border-t border-gray-300 rounded-md shadow-xl bg-secondary'>
              <h3 className='text-lg font-semibold mb-2'>Guest List</h3>
              <div className="space-y-2">
                {event.guests && event.guests.map((guest, index) => (
                  <div key={index}>{guest}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer class="bg-gray-900">
  <div class="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
        <div class="flex justify-center text-teal-300 sm:justify-start">
        <span className='text-xl md:text-4xl text-[#d00000] font-bold'>
          ESPRIT
        </span>
        </div>


      


       
      </div>


      <div
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-4"
      >
        <div class="text-center sm:text-left">
          <p class="text-lg font-medium text-white">About Us</p>


          <nav class="mt-8">
            <ul class="space-y-4 text-sm">
              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Company History
                </a>
              </li>


              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Meet the Team
                </a>
              </li>


              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Employee Handbook
                </a>
              </li>


              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Careers
                </a>
              </li>
            </ul>
          </nav>
        </div>


        <div class="text-center sm:text-left">
          <p class="text-lg font-medium text-white">Our Services</p>


          <nav class="mt-8">
            <ul class="space-y-4 text-sm">
              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Web Development
                </a>
              </li>


              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Web Design
                </a>
              </li>


              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Marketing
                </a>
              </li>


              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Google Ads
                </a>
              </li>
            </ul>
          </nav>
        </div>


        <div class="text-center sm:text-left">
          <p class="text-lg font-medium text-white">Helpful Links</p>


          <nav class="mt-8">
            <ul class="space-y-4 text-sm">
              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  FAQs
                </a>
              </li>


              <li>
                <a class="text-white transition hover:text-white/75" href="/">
                  Support
                </a>
              </li>


              <li>
                <a
                  class="flex group justify-center sm:justify-start gap-1.5"
                  href="/"
                >
                  <span class="text-white transition group-hover:text-white/75">
                    Live Chat
                  </span>


                  <span class="relative flex w-2 h-2 -mr-2">
                    <span
                      class="absolute inline-flex w-full h-full bg-teal-400 rounded-full opacity-75 animate-ping"
                    ></span>
                    <span
                      class="relative inline-flex w-2 h-2 bg-teal-500 rounded-full"
                    ></span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>


        <div class="text-center sm:text-left">
          <p class="text-lg font-medium text-white">Contact Us</p>


          <ul class="mt-8 space-y-4 text-sm">
            <li>
              <a
                class="flex items-center justify-center sm:justify-start gap-1.5 group"
                href="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-white shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>


                <span class="text-white transition group-hover:text-white/75">
                  SocialNetworkEsprit@outlook.com
                </span>
              </a>
            </li>


            <li>
              <a
                class="flex items-center justify-center sm:justify-start gap-1.5 group"
                href="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-white shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>


                <span class="text-white transition group-hover:text-white/75">
                (+216) 70 250 000
                </span>
              </a>
            </li>


            <li
              class="flex items-start justify-center gap-1.5 sm:justify-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-white shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>


              <address class="-mt-0.5 not-italic text-white">
              1, 2 rue André Ampère - 2083 - Pôle Technologique - El Ghazala.
              </address>
            </li>
          </ul>
        </div>
      </div>
    </div>


    <div class="pt-6 mt-12 border-t border-gray-800">
      <div class="text-center sm:flex sm:justify-between sm:text-left">
        <p class="text-sm text-gray-400">
          <span class="block sm:inline">All rights reserved.</span>


          <a
            class="inline-block text-teal-500 underline transition hover:text-teal-500/75  text-[#d00000]"
            href="/"
          >
            Terms & Conditions
          </a>


          <span>&middot;</span>


          <a
            class="inline-block text-teal-500 underline transition hover:text-teal-500/75  text-[#d00000]"
            href="/"
          >
            Privacy Policy
          </a>
        </p>


        <p class="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
          &copy; Better Call US
        </p>
      </div>
    </div>
  </div>
</footer>
      </div>


    </>
  );
};


export default SingleEvent;



