import React, { useEffect, useState } from 'react';
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";

import './commonStyle.css';
import DeletionModal from './DeletionModal';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../store/modalSlice';
import { getStudentData } from '../store/studentDataSlice';
import { updateId, updateName, updateSecondName } from '../store/updateSlice';
import { useNavigate } from 'react-router-dom';
const Table = () => {
    const { firstName } = useSelector((state) => state.search)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isOpen = useSelector((state) => state.modal.isOpen);
    const { data: studentDetails } = useSelector((state) => state.studentData)
    const [data, setData] = useState([])
    const [selectedId, setSelectedId] = useState(null);


    const tableHeading = ["ID", "First Name", "Last Name", "Location", "Email", "DOB", "Education", "About", "Action", "Delete"];


    const handleEdit = (id, name, secondName) => {
        dispatch(updateId(id));
        dispatch(updateName(name));
        dispatch(updateSecondName(secondName));
        navigate('/edit-students');
    };
    const handleDelete = async (id) => {
        setSelectedId(id)
        dispatch(openModal())
    }
    useEffect(() => {
        dispatch(getStudentData())
    }, [])
    useEffect(() => {
        if (studentDetails) {
            setData(studentDetails);
        }
    }, [studentDetails]);
    const filteredData = firstName
    ? data.filter((student) =>
          student.firstName.toLowerCase().includes(firstName.toLowerCase())
      )
    : data;
    return (
        <section className='my-10 relative'>
            {isOpen && <DeletionModal id={selectedId} />}
            <div className="overflow-x-auto">
                <table className='min-w-full border bg-white px-5'>
                    <thead className='border-b border-[#D8D8D8]'>
                        <tr>
                            {tableHeading.map((heading, index) => (
                                <th className='text-center py-6 px-4' key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data, index) => (
                            <tr className='border-b ' key={index}>
                                <td className='text-center py-10 md:py-20 px-4'>{index + 1}</td>
                                <td className='text-center py-10 md:py-20 px-4 capitalize'>{data.firstName}</td>
                                <td className='text-center py-10 md:py-20 px-4 capitalize'>{data.lastName}</td>
                                <td className='text-center py-10 md:py-20 px-4 capitalize'>{data.location}</td>
                                <td className='text-center py-10 md:py-20 px-4'>{data.email}</td>
                                <td className='text-center py-10 md:py-20 px-4'>{`${data.dates}/${data.months}/${data.years}`}</td>
                                <td className='text-center py-10 md:py-20 px-4 '>{data.education}</td>
                                <td className='text-center py-10 md:py-20 px-4'>{data.about}</td>
                                <td className='text-center py-10 md:py-20 px-4'>
                                    <button typeof='button' onClick={() => handleEdit(data.id, data.firstName, data.lastName)} type='button' className='flex justify-center items-center w-full'>
                                        <LiaUserEditSolid className='text-2xl' />
                                        <p className='ml-2'>Edit</p>
                                    </button>
                                </td>
                                <td className='text-center py-4 px-4'>
                                    <button onClick={() => handleDelete(data.id)} type='button' className='flex justify-center items-center w-full'>
                                        <RiDeleteBin6Line className='text-2xl' />
                                        <p className='ml-2'>Delete</p>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Table;
