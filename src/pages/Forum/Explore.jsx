import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../../components/TopBar';

const Explore = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('https://academiaaconnect.onrender.com/forum/tags');
        setTags(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, []);

  const navigateToTopic = async (topic) => {
    try {
      const response = await axios.get(`https://academiaaconnect.onrender.com/forum/find/${topic}`);
      console.log('Questions based on the topic:', response.data);
      window.location.href = `/explore/${topic.toLowerCase()}`;
    } catch (error) {
      console.error('Error fetching questions by topic:', error);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      <TopBar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full md:w-[50%] text-center mt-8">
          <h1 className="text-3xl text-gray-800 dark:text-white">Select A Topic To Explore</h1>
          <div className="grid grid-cols-3 md:grid-cols-4 mt-3 items-center">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center cursor-pointer gap-2 m-3 text-start"
                onClick={() => navigateToTopic(tag)}
              >
                <div className="h-4 md:w-8 w-4 md:h-8 rounded-full" style={{ backgroundColor: getRandomColor() }}></div>
                <h3 className="text-base">{tag}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;