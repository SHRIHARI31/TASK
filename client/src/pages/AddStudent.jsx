import React, { useReducer } from 'react';
import axios from 'axios';
import { GoArrowLeft } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import './page.css'; import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';


const initialState = {
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    dates: "",
    months: "",
    years: "",
    education: "",
    about: "",
};

const studentFormReducer = (state, action) => {
    switch (action.type) {
        case 'firstName':
            return { ...state, firstName: action.payload };
        case 'lastName':
            return { ...state, lastName: action.payload };
        case 'location':
            return { ...state, location: action.payload };
        case 'email':
            return { ...state, email: action.payload };
        case 'date':
            return { ...state, dates: action.payload };
        case 'month':
            return { ...state, months: action.payload };
        case 'year':
            return { ...state, years: action.payload };
        case 'education':
            return { ...state, education: action.payload };
        case 'about':
            return { ...state, about: action.payload };
        case 'REST':
            return initialState;
        default:
            return state;
    }
};

const AddStudent = () => {
    const [state, dispatch] = useReducer(studentFormReducer, initialState);
    const navigate = useNavigate()
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, location, email, dates, months, years, education, about } = state;

        if (!firstName || !lastName || !location || !email || !dates || !months || !years || !education || !about) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post('/api/create-student-details', state);
            console.log(response.data)
            dispatch({ type: 'REST' });
            setTimeout(() => {
                navigate('/')
            }, 900)

        } catch (error) {
            if (error.response.data.message) {
                alert('email id already exist!')
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        dispatch({ type: id, payload: value });
    };

    return (
        <section>
            <header className='p-5'>
                <NavLink style={{ display: 'inline-block' }} to={'/'}>
                    <GoArrowLeft className='text-5xl' />
                </NavLink>
                <h2 className='text-center font-bold text-3xl'>ADD STUDENTS DATA</h2>
            </header>
            <section className="form-section w-full flex justify-center items-center my-5">
                <form noValidate onSubmit={handleSubmit} className='md:w-[600px] w-full px-5 md:px-0 flex justify-center flex-col'>
                    <div className="flex w-full flex-wrap lg:flex-nowrap justify-between gap-3 lg:gap-10">
                        <div className="flex w-full max-md:flex-wrap items-center gap-3">
                            <label className='md:w-[100px] max-md:text-xs' htmlFor="firstName">First Name</label><span>:</span>
                            <input type="text" onChange={handleChange} id='firstName' value={state.firstName} className='outline-none student-input border w-full md:w-[300px]' autoFocus required />
                        </div>
                        <div className="flex w-full max-md:flex-wrap items-center gap-3">
                            <label className='md:w-[100px]' htmlFor="lastName">Last Name</label><span>:</span>
                            <input type="text" id='lastName' onChange={handleChange} value={state.lastName} className='outline-none border student-input w-full md:w-[300px]' required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 my-4">
                        <div className="flex max-md:flex-wrap items-center gap-3">
                            <label className='md:w-[100px]' htmlFor="location">Location</label><span>:</span>
                            <input type="text" id='location' onChange={handleChange} value={state.location} className='outline-none border student-input w-full md:w-[300px]' required />
                        </div>
                        <div className="flex max-md:flex-wrap items-center gap-3">
                            <label className='md:w-[100px]' htmlFor="email">Email</label><span>:</span>
                            <input type="text" id='email' onChange={handleChange} value={state.email} className='outline-none border student-input w-full md:w-[300px]' required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 my-3">
                        <div className="flex max-md:flex-wrap items-center gap-3">
                            <label className='md:w-[100px]' htmlFor="DOB">DOB</label><span>:</span>
                            <div className="flex gap-5 w-full md:w-[300px]">
                                <input type="text" onChange={handleChange} className="date-inputs placeholder:text-sm placeholder:text-black" placeholder='DD' id='date' value={state.dates} required />
                                <input type="text" onChange={handleChange} id='month' value={state.months} className="date-inputs placeholder:text-sm placeholder:text-black" placeholder='MM' required />
                                <input type="text" id='year' onChange={handleChange} value={state.years} placeholder='YYYY' className="date-inputs placeholder:text-sm placeholder:text-black" required />
                            </div>
                        </div>
                        <div className="flex max-md:flex-wrap items-center gap-3">
                            <label className='md:w-[100px]' htmlFor="education">Education</label><span>:</span>
                            <input type="text" id='education' onChange={handleChange} value={state.education} className='outline-none student-input border w-full md:w-[300px]' required />
                        </div>
                        <div className="flex max-md:flex-wrap items-start gap-3">
                            <label htmlFor="about" className='md:w-[100px]'>About</label><span>:</span>
                            <textarea id='about' onChange={handleChange} value={state.about} className='w-full md:w-[300px] px-3 pt-3 h-[150px] outline-none border' required></textarea>
                        </div>
                        <div className="flex justify-center relative">
                            <button className='bg-black w-[150px] active:text-black rounded-3xl text-white active:bg-[#F0F0F0] transition-all absolute left-[0rem] md:left-[8rem] ease-in-out border-b border-[2px] active:scale-105 active:border-black py-3 px-10 text-lg font-semibold add-btn'>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    );
};

export default AddStudent;
