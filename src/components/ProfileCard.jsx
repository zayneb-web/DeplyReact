import React, { useEffect, useState , useRef } from "react";
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsPersonFillAdd,
} from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";

import { NoProfile } from "../assets";
import { UpdateProfile } from "../redux/userSlice";
import EditProfile from "../components/EditProfile"
import { useDispatch, useSelector } from "react-redux";

const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showEditPost, setShowEditPost] = useState(false);

  return (
    <div>
      <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4 '>
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
          <Link to={"/profile/" + user?._id} className='flex gap-2'>
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className='w-14 h-14 object-cover rounded-full'
            />

            <div className='flex flex-col justify-center'>
              <p className='text-lg font-medium text-ascent-1'>
                {user?.firstName} {user?.lastName}
              </p>
              <span className='text-ascent-2'>
                {user?.profession ?? "No Profession"}
              </span>
            </div>
          </Link>

          <div className=''>
            {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className='text-blue cursor-pointer'
                onClick={() =>  setShowEditPost(true)}
              />
            ) : (
              <button
                className='bg-[#F76566] text-sm text-white p-1 rounded'
                onClick={() => {}}
              >
                <BsPersonFillAdd size={20} className='text-[#F76566]' />
              </button>
            )}
          </div>
        </div>
        {showEditPost && <EditProfile onClose={() => setShowEditPost(false)} />} {/* Pass onClose prop to handle closing AddEvent */}

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <div className='flex gap-2 items-center text-ascent-2'>
            <CiLocationOn className='text-xl text-ascent-1' />
            <span>{user?.location ?? "Add Location"}</span>
          </div>

          <div className='flex gap-2 items-center text-ascent-2'>
            <BsBriefcase className=' text-lg text-ascent-1' />
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <p className='text-xl text-ascent-1 font-semibold'>
            {user?.friends?.length} Friends
          </p>

          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Who viewed your profile</span>
            <span className='text-ascent-1 text-lg'>{user?.views?.length}</span>
          </div>

          <span className='text-base text-blue'>
            {user?.verified ? "Verified Account" : "Not Verified"}
          </span>

          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Joined</span>
            <span className='text-ascent-1 text-base'>
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-4 py-4 pb-6'>
          <p className='text-ascent-1 text-lg font-semibold'>Social Profile</p>

          <div className='flex gap-2 items-center text-ascent-2'>
            <BsInstagram className=' text-xl text-ascent-1' />
            <span>Instagram</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <FaTwitterSquare className=' text-xl text-ascent-1' />
            <span>Twitter</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <BsFacebook className=' text-xl text-ascent-1' />
            <span>Facebook</span>
          </div>
          
        </div>
        <div className='w-full flex flex-col gap-4 py-4 pb-6'>
          <p className='text-ascent-1 text-lg font-semibold'>Others</p>

          {/* Add Link to Event Page with Emoji */}
          <div className='flex gap-2 items-center text-ascent-2'>
          <span className='text-xl text-ascent-1'>📅</span>
          <Link to="/event" className='text-ascent-1'>
          Events
          </Link>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
          <span className='text-xl text-ascent-1'>📘</span>
          <Link to="/course" className='text-ascent-1'>
          Courses
          </Link>
          </div>

          
          
<div className='flex gap-2 items-center text-ascent-2'>
          <span className='text-xl text-ascent-1'>📖</span>
          <Link to="/chapter" className='text-ascent-1'>Udemy</Link>
          </div>


          <div className='flex gap-2 items-center text-ascent-2'>
          <span className='text-xl text-ascent-1'>✅</span>
          <Link to="/task" className='text-ascent-1'>
          Tasks
          </Link>
          </div>

<div className='flex gap-2 items-center text-ascent-2'>
          <span className='text-xl text-ascent-1'>Q/R</span>
          <Link to="/forum" className='text-ascent-1'>
          Forum
          </Link>
          </div>
          


          </div>
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
                        <Link to="/dashboard/admin">
                   Go to Dashboard Admin
       
                      </Link>     
                    </div>
                    
      </div>
    </div>
  );
};

export default ProfileCard;