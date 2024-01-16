import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MultiSelect } from "primereact/multiselect";
const Carriere = () => {
    const port = import.meta.env.VITE_PORT_SPRING;
    const [carrieres, setcarrieres] = useState([]);
    const [selectedfilieres, setSelectedfilieres] = useState([]);
    const [filieres, setfilieres] = useState([]);
    const [carriere, setcarriere] = useState({
        id: '',
        nomCarriere: '',
        description: '',
        filieres: []
    });
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
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const url = `http://localhost:${port}/api`;

    const fetchcarrieres = async () => {
        setLoading(true);
        const response = await axios.get(`${url}/carrieres/all`);
        setcarrieres(response.data);
        setLoading(false);
    };

    const fetchfilieres = async () => {
        try {
            const rep = await axios.get(`${url}/filieres/all`);
            setfilieres(rep.data);
        } catch (error) {
            console.error("Error fetching filiereses:", error);
        }
    };

    useEffect(() => {
        fetchfilieres();
        fetchcarrieres();
    }, []);

    const addcarrierefilieres = () => {
        setcarriere(prevcarriere => ({
            ...prevcarriere,
            filieres: selectedfilieres,
        }));
    };

    useEffect(() => {
        addcarrierefilieres();
    }, [selectedfilieres]);
    
    

   
    const handlecarriere = (e) => {
        setcarriere({ ...carriere, [e.target.name]: e.target.value });
    };

    const handleUpdate = (carriereup) => {
        setcarriere(carriereup);
        setUpdateMode(true);
        openModal();
    };

    const handleDelete = (id) => {
        carriere.id = id;
        openModaldel();
    };

    const addcarriere = async () => {
        try {
            const response = await axios.post(`${url}/carrieres/add`, carriere);
            notify(response.data.message);
            restcarriere();
            fetchcarrieres();
            closeModal();
        } catch (error) {
            console.error("Error adding carriere:", error);
        }
    };
    
    const updatecarriere = async () => {
        const response = await axios.put(`${url}/carrieres/update/${carriere.id}`, carriere);
        notify(response.data.message);
        restcarriere();
        fetchcarrieres();
        closeModal();
        setUpdateMode(false);
    };

    const deletecarriere = async () => {
        const response = await axios.delete(`${url}/carrieres/delete/${carriere.id}`);
        notify(response.data.message);
        restcarriere();
        fetchcarrieres();
        closeModaldel();
    };

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        restcarriere();
        setUpdateMode(false);
    };

    const openModaldel = () => {
        setModalDel(true);
    };

    const closeModaldel = () => {
        setModalDel(false);
        restcarriere();
    };

    const restcarriere = () => {
        setcarriere({
            id: '',
            nomCarriere: '',
            description: '',
            filieres: []
        });
    };
   
    const handlefilieresChange = (e) => {
        setSelectedfilieres(e.value);
    };
    
    
    return (
        <div className="w-full mt-20">
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
         <div style={{ display: 'flex', justifyContent: 'center' }}>
  <button
    type="button"
    className="w-1/6 mb-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-blue-600 ml-auto"
    onClick={openModal}
  >
    <FontAwesomeIcon icon={faPlus} />
    Add new carriere
  </button>
</div>

                <div className="flex flex-col w-full border p-10 border-blue-200 rounded-xl bg-white">
                   

                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden rounded-t-2xl">
                                <table className="min-w-full divide-y mt-1 divide-blue-200 dark:divide-blue-700">
                                    <thead className='bg-blue-200 '>
                                        <tr>
                                            <th scope="col" className="px-8 py-3 text-start text-xs font-medium text-blue-500 uppercase">Id</th>
                                            <th scope="col" className="pl-32 py-3 text-start text-xs font-medium text-blue-500 uppercase">nomCarriere</th>
                                            <th scope="col" className="pl-32 py-3 text-start text-xs font-medium text-blue-500 uppercase">description</th>
                                            <th scope="col" className="pl-32 py-3 text-start text-xs font-medium text-blue-500 uppercase">filieres</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium">Delete</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium">Update</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-blue-200 dark:divide-blue-700">
                                        {carrieres.map((carriere, index) => (
                                            <tr key={index}>
                                                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-blue-800 dark:text-blue-200">{carriere.id}</td>
                                                <td className="pl-32 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-blue-200">{carriere.nomCarriere}</td>
                                                <td className="pl-32 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-blue-200">{carriere.description}</td>
                                                <td className="pl-32 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-blue-200">
    {carriere.filieres.map((c, index) => (
        <button
            key={index}
            className="inline-flex items-center px-3 py-1 mr-2 mb-2 text-sm font-medium leading-5 text-white bg-blue-500 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
            {c.nomFiliere}
        </button>
    ))}
</td>

 <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button type="button" className="inline-flex items-center pr-3 gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-blue-600" onClick={() => handleDelete(carriere.id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button type="button" className="inline-flex items-center pr-3 gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-blue-600" onClick={() => handleUpdate(carriere)}>
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
                    <div className="w-full h-full fixed top-0 left-0 z-[60] bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white w-full max-w-md p-4 rounded-xl p-5">
                            <h3 className="font-bold text-blue-800 mb-3 text-center">{updateMode ? 'Update' : 'Add'} carriere</h3>
                            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">nomcarriere</label>
                            <input type="text" id="input-label" name='nomCarriere' value={carriere.nomCarriere} onChange={handlecarriere} className="py-3  w-full px-4  border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-blue-700 dark:text-blue-400 dark:focus:ring-blue-600" placeholder="nomCarriere" />
                            <label htmlFor="input-label" className="block text-sm font-medium mb-2 mt-1 dark:text-white">description</label>
                            <input type="text" id="input-label" name='description' value={carriere.description} onChange={handlecarriere} className="py-3  w-full px-4  border-blue-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-blue-700 dark:text-blue-400 dark:focus:ring-blue-600" placeholder="description" />
                            <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">filieres</label>
                        <MultiSelect
                            value={selectedfilieres}
                            onChange={handlefilieresChange}
                            options={filieres}
                            optionLabel="nomFiliere" 
                            placeholder="Select filiereses"
                            className="w-full md:w-20rem"
                        />


                            <div className="flex justify-end mt-4">
                                <button type="button" className="py-2 px-3 mr-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-200 bg-white text-blue-800 shadow-sm hover:bg-blue-50" onClick={closeModal}>Close</button>
                                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" onClick={updateMode ? updatecarriere : addcarriere}>{updateMode ? 'Update' : 'Add'}</button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )}
            {modalDel && (
                <div className="w-full h-full fixed top-0 left-0 z-[60] bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="flex flex-col items-center bg-white w-full max-w-md p-4 rounded-xl p-5">
                        <h3 className="font-bold text-xl text-blue-800 mb-3 text-center">Delete carriere</h3>
                       
                        <h3 className="text-center text-sm text-blue-600 mb-3">Are you sure you want to delete this carriere?</h3>
                        <div className="flex justify-end mt-4">
                            <button type="button" className="py-2 px-3 mr-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-200 bg-white text-blue-800 shadow-sm hover:bg-blue-50" onClick={closeModaldel}>Close</button>
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700" onClick={deletecarriere}>Delete</button>
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


}

export default Carriere
