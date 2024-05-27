import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import axios from 'axios';
import { deleteStudentData } from '../store/studentDataSlice';
const DeletionModal = ({ id }) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeModal())
    }
    const deleteStudentApi = () => {
        dispatch(deleteStudentData(id))
    }
    return (
        <div onClick={close} className="w-full h-screen  bg-black/5 top-0 left-0 fixed   flex justify-center items-center">
            <section className='deletionModal   drop-shadow-md  shadow-black  fixed  bottom-[40%]  rounded-md   bg-[#717171]'>
                <div className="w-full   rounded-md  px-5 py-4  gap-3 flex flex-col justify-center items-center">
                    <RiDeleteBin6Line className='text-5xl text-white' />
                    <p className='text-white text-center'>Are you sure you want to <br /> delete</p>
                </div>
                <div className="btn-section  bg-black  rounded-md  flex gap-1 justify-between">
                    <button onClick={close} className='w-[50%] active:bg-white active:text-black rounded-bl-md  text-white  py-3 px-4 bg-[#C4C4C4]'>Cancel</button>
                    <button onClick={deleteStudentApi} className='w-[50%] text-white active:bg-white active:text-black rounded-br-md  py-3 px-4 bg-[#C4C4C4]'>Yes</button>
                </div>
            </section>
        </div>
    )
}

export default DeletionModal