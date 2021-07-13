import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { db } from "../firebase";

import { toast, ToastContainer, Zoom } from 'react-toastify';

const Links = () => {
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [bandera, setBandera] = useState(false);

    const addOrEditTask = async (linkObject) => {
        if (currentId === '') {
            //Crear
            await db.collection('links').doc().set(linkObject);
            toast("Succefull", {
                type: 'success',
                osition: "bottom-center",
                autoClose: 3000,
                draggable: true,
            });
        } else {
            //edit
            await db.collection('links').doc(currentId).update(linkObject);
            toast("Update Succefull", {
                type: 'success',
                osition: "bottom-center",
                autoClose: 3000,
                draggable: true,
            });
            setBandera(true);
            setCurrentId('');
        }
    };

    const onDeleteLink = async (id) => {
        //delete
        window.confirm('Are you sure you want to delete this element?') &&
            await db.collection('links').doc(id).delete();
        toast("Removed", {
            type: 'error',
            osition: "bottom-center",
            autoClose: 3000,
            draggable: true,
        });
    }

    const getLinks = async () => {
        //Get
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(element => {
                docs.push({ ...element.data(), id: element.id });
            });
            setLinks(docs);
        });
    };

    useEffect(() => {
        getLinks();
        setBandera(false);
    }, [bandera])

    return (
        <>
            <div className="col-md-4 p-2">
                <LinkForm addOrEditTask={addOrEditTask} links={links} currentId={currentId} />
            </div>
            <div className="col-md-8 p-2">
                {links.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i
                                        className="material-icons text-danger"
                                        onClick={() => onDeleteLink(link.id)}
                                    >
                                        close
                                    </i>
                                    <i
                                        className="material-icons"
                                        onClick={() => setCurrentId(link.id)}
                                    >
                                        create
                                    </i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">Go to Website</a>
                        </div>
                    </div>
                ))}
                <ToastContainer
                    position="bottom-center"
                    autoClose={1000}
                    hideProgressBar
                    transition={Zoom}
                />
            </div>
        </>
    )
}

export default Links
