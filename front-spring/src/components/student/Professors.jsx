import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Prof from '../../assets/b.png'

const Professor = () => {
    const port = import.meta.env.VITE_PORT_SPRING;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [edit, setEdit] = useState(false)
    const url = `http://localhost:${port}/api/users`;
    const userlogin = JSON.parse(localStorage.getItem('userlogin'));

    const getProfessor = async () => {
        const res = await axios.get(`${url}/${userlogin.id}`);
        setUser(res.data);
        setSelectedImage(res.data.photo)
        // console.log(res.data.photo);
    };

    useEffect(() => {
        setLoading(true);
        getProfessor();
        
            setLoading(false);
        
    }, []);

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const updateUser = async () => {
        try {

            const rep = await axios.put(`${url}/update/student/${user.id}`, user);
            console.log(rep.data)
            setLoading(true);
            setEdit(false)
            getProfessor();
            setTimeout(() => {
                setLoading(false);
                window.location = 'student'
            }, 800);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex w-full justify-center items-center mt-32'>
            {loading ? (
                "Loading ...."
            ) : (
                <div className='flex flex-col w-2/3 justify-center items-center rounded-xl p-5 bg-white'>
                    <div >


                        <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];

                                if (selectedFile) {
                                    const reader = new FileReader();

                                    reader.onload = (event) => {
                                        const base64String = event.target.result;

                                        const base64WithoutPrefix = base64String.split(',')[1];
                                        setSelectedImage(base64String);
                                        setUser({ ...user, photo: base64WithoutPrefix });
                                        setEdit(true);
                                    };

                                    reader.readAsDataURL(selectedFile);
                                }
                            }}
                            style={{ display: 'none' }}
                            id='fileInput'
                        />
                        <img
                            key={Date.now()}
                            src={user.photo ===null ? Prof : `data:image/png;base64, ${user.photo}`} className='w-40 h-40 rounded-full'
                        />
                        <label htmlFor='fileInput' className='mt-36 text-blue-500 hover:text-sky-600 hover:cursor-pointer'>
                            <FontAwesomeIcon icon={faPen} />
                        </label>
                        <span >
                            <p className='text-2xl text-blue-700 font-bold'>Email : {user.email}</p>
                            <p className='text-2xl text-blue-500 font-bold'>
                                UserName : {user.userName}
                            </p>
                           
                        </span>
                    </div>
                    <div className='flex flex-col w-3/5 pt-4 bg-white items-center justify-center'>

                        <div className='w-4/5 my-2'>
                            <label
                                htmlFor='nom'
                                className='block text-blue-700 text-sm mb-2 dark:text-white'
                            >
                                First Name{' '}
                            </label>
                            <input
                                type='text'
                                id='nom'
                                name='firstName'
                                value={user.firstName}
                                onChange={handleInput}
                                className='bg-blue-100 py-3 font-semibold px-4 block text-blue-500 w-full border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-blue-700 dark:text-blue-400 dark:focus:ring-blue-600'
                            />
                        </div>

                        <div className='w-4/5 my-2'>
                            <label
                                htmlFor='nom'
                                className='block text-blue-700 text-sm mb-2 dark:text-white'
                            >
                                Last Name{' '}
                            </label>
                            <input
                                type='text'
                                id='nom'
                                name='lastName'
                                value={user.lastName}
                                onChange={handleInput}
                                className='bg-blue-100 py-3 font-semibold px-4 block text-blue-500 w-full border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-blue-700 dark:text-blue-400 dark:focus:ring-blue-600'
                            />
                            
                        </div>
                       

                        <div className='w-4/5 my-2'>
    <label
        htmlFor='career'
        className='block text-blue-700 text-sm mb-2 dark:text-white'
    >
        Career
    </label>
    <input
        type='text'
        id='career'
        name='career'
        value={user.carriere ? user.carriere.nomCarriere : 'N/A'}
        readOnly
        className='bg-blue-100 py-3 px-4 block text-blue-500 w-full border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-blue-700 dark:text-blue-400 dark:focus:ring-blue-600'
    />

    <label
        htmlFor='description'
        className='block text-blue-700 text-sm mb-2 dark:text-white mt-4' // Add margin-top for separation
    >
        Description
    </label>
    <textarea
        id='description'
        name='description'
        value={user.carriere ? user.carriere.description : 'N/A'}
        readOnly
        className='bg-blue-100 py-3 px-4 block text-blue-500 w-full border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-blue-700 dark:text-blue-400 dark:focus:ring-blue-600'
        rows='3' // Adjust the number of rows as needed
    />
</div>


                        <button
                            className='rounded-lg px-4 py-2 my-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold'
                            onClick={updateUser}
                        >
                            update
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Professor;
