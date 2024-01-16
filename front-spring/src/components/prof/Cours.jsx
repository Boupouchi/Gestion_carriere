import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cours = () => {
  const port = import.meta.env.VITE_PORT_SPRING;
  const [cours, setcours] = useState([]);
  const [cour, setcour] = useState({
    id: '',
    nomCours: '',
    description:''
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const url = `http://localhost:${port}/api/cours`;
  const notify = (mssg) => {
    toast.success(`${mssg}`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};
  const fetchcours = async () => {
    setLoading(true);
    const rep = await axios.get(`${url}/all`);
    setcours(rep.data);
    setLoading(false); 
  };

  useEffect(() => {
    fetchcours();
  }, []); 

  const handlecour = (e) => {
    setcour({ ...cour, [e.target.name]: e.target.value });
  };

  const handleUpdate = (id, nomCours,description) =>{
    cour.id = id
    cour.nomCours = nomCours
    cour.description = description
    setUpdateMode(true)
    openModal()
  }
  const handleDelete = (id) =>{
    cour.id = id
    openModaldel()
  } 

  const addcour = async () =>{
    const rep = await axios.post(`${url}/add`,cour)
    notify(rep.data.message)
    setcour({
        id: '',
        nomCours: '',
        description: '',
      })
    fetchcours();
    closeModal()
  }
  const updatecour = async () =>{
    const rep = await axios.put(`${url}/update/${cour.id}`,cour)
    notify(rep.data.message)
    setcour({
        id: '',
        nomCours: '',
        description: '',
      })
    fetchcours()
    closeModal()
    setUpdateMode(false)
  }
  const deletecour = async () =>{
    const rep = await axios.delete(`${url}/delete/${cour.id}`)
    notify(rep.data.message)
    setcour({
        id: '',
        nomCours: '',
        description: '',
      })
    fetchcours();
    closeModaldel()
  }

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setcour({
        id: '',
        nomCours: '',
        description: '',
      })
    setUpdateMode(false)
  };
  const openModaldel = () => {
    setModalDel(true);
  };

  const closeModaldel = () => {
    setModalDel(false);
    setcour({
        id: '',
        nomCours: '',
        description: '',
      })
  };

  return (
    <div className="w-full mt-20">
      {loading ? (
        <p>loading</p>
      ) : (
        <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
  <button
    type="button"
    className="w-1/6 mb-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-blue-600 ml-auto"
    onClick={openModal}
  >
    <FontAwesomeIcon icon={faPlus} />
    Add new cours
  </button>
</div>
        <div class="flex flex-col w-full border p-10 border-blue-200 rounded-xl bg-white">
        
                    
                    <div class="-m-1.5 overflow-x-auto">
                        <div class="p-1.5 min-w-full inline-block align-middle">
                            <div class="overflow-hidden rounded-t-2xl">
                                <table class="min-w-full divide-y mt-1 divide-blue-200 dark:divide-blue-700">
                                    <thead className='bg-blue-200 '>
                                        <tr>
                                            <th scope="col" class="px-8 py-3 text-start text-xs font-medium text-blue-500 uppercase">Id</th>
                                            <th scope="col" class="pl-32 py-3 text-start text-xs font-medium text-blue-500 uppercase">CoursName</th>
                                            <th scope="col" class="pl-32 py-3 text-start text-xs font-medium text-blue-500 uppercase">description</th>

                                            <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-blue-500 uppercase">Delete</th>
                                            <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-blue-500 uppercase">Update</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-blue-200 dark:divide-blue-700">
                                        {cours.map((cour, index) => (
                                            <tr>  
                                                <td class="px-8 py-4 whitespace-nowrap text-sm font-medium text-blue-800 dark:text-blue-200">{cour.id}</td>
                                                <td class="pl-32 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-blue-200">{cour.nomCours}</td>
                                                <td class="pl-32 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-blue-200">{cour.description}</td>

                                                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button type="button" class="inline-flex items-center pr-3 gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-blue-600"
                                                        onClick={() =>handleDelete(cour.id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button type="button" class="inline-flex items-center pr-3 gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-blue-600"
                                                        onClick={() =>handleUpdate(cour.id,cour.nomCours,cour.description)}>
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
          

          {modal && (
            <div
              className="w-full h-full fixed top-0 left-0 z-[60] bg-black bg-opacity-50 flex justify-center items-center"
            //   onClick={closeModal}
            >
              <div className="bg-white w-full max-w-md p-4 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-3 text-center">
                {updateMode ? 'Update' : 'Add'} cour
                </h3>
                <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white"></label>
                <input type="email" id="input-label" 
                    name='nomCours'
                    value={cour.nomCours}
                    onChange={handlecour}
                    class="py-3  w-full px-4  border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-blue-700 dark:text-blue-400 dark:focus:ring-blue-600" placeholder="nameCours"/>
                 <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white"></label>
                 <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white"></label>
                <input type="email" id="input-label" 
                    name='description'
                    value={cour.description}
                    onChange={handlecour}
                    class="py-3  w-full px-4  border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-blue-700 dark:text-blue-400 dark:focus:ring-blue-600" placeholder="description"/>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="py-2 px-3 mr-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-200 bg-white text-blue-800 shadow-sm hover:bg-blue-50"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                    onClick={updateMode? updatecour: addcour}
                  >
                     {updateMode ? 'update' : 'add'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
       {modalDel && (
            <div
              className="w-full h-full fixed top-0 left-0 z-[60] bg-black bg-opacity-50 flex justify-center items-center"
            //   onClick={closeModal}
            >
              <div className="flex flex-col items-center bg-white w-full max-w-md p-4 rounded-xl p-5">
                <h3 className="font-bold text-xl text-blue-800 mb-3 text-center">
                    Delete cour
                </h3>
                
                <h3 className="text-center text-sm text-blue-600 mb-3 ">
                    Are you shure you wont to delete this cours ?
                </h3>
               
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="py-2 px-3 mr-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-200 bg-white text-blue-800 shadow-sm hover:bg-blue-50"
                    onClick={closeModaldel}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700"
                    onClick={deletecour}
                  >
                     delete
                  </button>
                </div>
              </div>
            </div>
          )}
           <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
    </div>
  );
};

export default Cours;

