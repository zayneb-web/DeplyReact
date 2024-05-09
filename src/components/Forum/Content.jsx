import React, { useEffect } from "react";
import Arrowup from "../../icons/Arrowup";
import Arrowdown from "../../icons/Arrowdown";
import Write from "../../icons/Write"
import UserInfo from "./UserInfo";
import Send from "../../icons/Write"
import { useQuery } from "react-query";
import { newRequests } from "../../utils/api"; // Importez la méthode apiRequest correctement
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import NothingHere from "./NothingHere";
import { Toaster } from "react-hot-toast";
import {  useSelector } from "react-redux";


const Content = () => {
  const { topic } = useParams();
  const { user} = useSelector((state) => state.user);
  const [openId, setOpenId] = React.useState([]);
  const [answer, setAnswer] = React.useState("");

  const { isLoading, data } = useQuery("getAllQuestions", () => {
    if (topic) {
      return newRequests
        .get(`https://academiaaconnect.onrender.com/forum/find/${topic}`)
        .then((res) => res.data);
    } else {
      return newRequests
        .get("https://academiaaconnect.onrender.com/forum/questions")
        .then((res) => res.data);
    }
  });

  
  const handleSubmitComment = async (questionId) => {
    try {
      const response = await fetch(`https://academiaaconnect.onrender.com/forum/answer/${questionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: answer,
          userId: user._id, // Assuming getUserId() returns the user ID
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Comment submitted:", data);
        setAnswer(""); // Clear the answer input after submission
      } else {
        console.error("Failed to submit comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className="md:w-[60%] flex flex-col items-center gap-y-5 
    md:gap-8 my-8 "
    >
      <Toaster />
      {data.length > 0 &&
        data.map((question, index) => {
          console.log("question", question);
          return (
            <div
              key={index}
              className="w-[96%] md:w-[80%] mx-12 flex flex-col 
              items-end  p-3 md:p-4 rounded-md bg-red-200
               dark:bg-slate-400"
            >
              <div
                className="w-full bg-white dark:bg-[#1E212A]
              
              p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5"
              >
                <div className="left-section space-y-1 text-center">
                  <Arrowup id={question._id} />
                  <h3 className="text-sm md:text-base">
                    {question?.upvote?.length || 0}
                  </h3>
                  <Arrowdown id={question._id} />
                </div>
                <div className="right-section w-full">
                <h1 className="text-base md:text-lg dark:text-white" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
    {question?.question}
</h1>
<p className="text-sm md:text-base">
    {question?.description}
</p>

                  <hr />
                  <UserInfo
  openId={openId}
  index={index + 1}
  setOpenId={setOpenId}
  question={question}
  style={{ marginTop: '1cm' }} // Ajoutez cette ligne pour l'espace d'un centimètre
/>
                </div>
              </div>
              {/* nested comment       */}
              {openId.find((ele) => ele === index + 1) && (
                <>
                  {question?.replies?.map((answer, index) => {
                    console.log("answer", answer);
                    return (
                      <div key={answer._id} className="flex items-center gap-4">
                        {/* fix this */}
                      
                        <div
                          className="   bg-white dark:bg-[#32353F] dark:text-white
          max-w-xl p-5 rounded-lg shadow-md flex flex-col items-start gap-5 mt-2"
                        >
                          <p className="text-inherit">{answer?.reply}</p>
                          <UserInfo answer={answer} />
                        </div>
                      </div>
                    );
                  })}
                  {/* nested comment       */}
                  <div
                    className="w-full bg-white dark:bg-slate-900 flex items-center gap-4
       px-5 py-2 rounded-lg shadow-md  mt-2"
                  >
                    <Write />
                    <input
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full h-10 border-none outline-none 
          rounded-md py-1 px-2 "
                      type="text"
                      value={answer}
                      placeholder="Write a comment"
                    />
                     <button
                    onClick={() => handleSubmitComment(question._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Send
                  </button>
                
                  </div>
                </>
              )}
            </div>
          );
        })}
      {data.length === 0 && <NothingHere />}
    </div>
  );
};


export default Content;