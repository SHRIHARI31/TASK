import React, { useState } from 'react'
import './commonStyle.css'
import { FiSearch } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { FiRefreshCw } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { updateName } from '../store/searchSlice';
const Header = () => {
    const [search, setSearch] = useState("")
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const dispatch = useDispatch()
    const handleSearch = () => {
      
        dispatch(updateName(search))
    }
    const resetSearch = () => {
        dispatch(updateName(""))
    }
    return (
        <header className='w-full'>
            <div className="w-full "><h1 className='font-bold text-3xl   mb-12'>Student management system</h1></div>
            <section className="activity-div flex  flex-wrap w-full justify-between items-center">
                <div className="search-bar flex p relative  items-center w-full md:w-[500px] ">
                    <input autoFocus type="text" value={search} onChange={handleChange} className='placeholder:font-semibold outline-none  relative pl-8  w-full  p-4 rounded-md capitalize placeholder:text-xl bg-[#F0F0F0] placeholder:text-[#D8D8D8]' placeholder='Search by first name' />
                    <button type='button' onClick={resetSearch} className='absolute left-2' ><FiRefreshCw className=' text-slate-600' /></button>
                    <button onClick={handleSearch} className='absolute right-6   bottom-[30%]' type='button'><FiSearch className=' text-[#D8D8D8] text-2xl font-bold ' /></button>
                </div>
                <NavLink to={'/add-students'}> <button type='button' className='bg-black mt-5 md:t-0  md:w-[150px] active:text-black  rounded-3xl text-white active:bg-[#F0F0F0] transition-all  ease-in-out  border-b border-[2px]  active:scale-105 active:border-black  py-3 px-10 text-lg font-semibold add-btn'>
                    ADD</button></NavLink>
            </section>
        </header>
    )
}

export default Header