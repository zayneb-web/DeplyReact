import axios from 'axios';
import React from 'react';
import { MdDelete, MdEdit, MdVisibility } from 'react-icons/md'; // Import MdVisibility icon


const CourseCard = ({
  selectCourse,
  course,
  canDelete = false,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <div className="flex flex-row mt-3 bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <div className="flex-shrink-0 w-64 h-full mt-5 ">
        <img
          className=" flex"
          src={course.imageUrl}
          alt={course.title}
          style={{ maxWidth: '100%', height: '180px' }}
        />
      </div>
      <div className="flex flex-col justify-between p-6">
        <div>
          <h5 className="mb-2 text-xl font-semibold text-neutral-800">
            {course.title}
          </h5>
        </div>
        {canDelete && (
          <div className="flex justify-between items-center mt-4 mb-2 ">
            <span className="text-gray-600 mr-2">Do some Actions !</span>


            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(course._id)}
                className="text-[#f64949fe] "
              >
                <MdDelete />
              </button>
              <button
                onClick={() => handleUpdate(course._id)}
                className="text-[#2ba150fe]"
              >
                <MdEdit />
              </button>
            </div>
          </div>
        )}
        {/* Replace button with just the MdVisibility icon */}
        <MdVisibility
          onClick={() => selectCourse(course)}
          className="cursor-pointer text-[#D00000] hover:text-blue-600"
          size={24}
        />
      </div>
    </div>
  );
};


export default CourseCard;



