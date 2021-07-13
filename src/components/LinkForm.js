import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const LinkForm = (props) => {
    const { addOrEditTask, currentId } = props;

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };

    const [values, setValues] = useState(initialStateValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrEditTask(values);
        setValues(initialStateValues);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get()
        setValues({ ...doc.data() });
    }

    useEffect(() => {
        currentId ?
            getLinkById(currentId)
            :
            setValues({ ...initialStateValues });
    }, [currentId]);

    return (
        <form onSubmit={handleSubmit} className="card card-body border-primary">
            <div className="form-group input-group m-1">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="https://someurl.xyz"
                    value={values.url}
                    name="url"
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group input-group m-1">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    type="text"
                    value={values.name}
                    name="name"
                    placeholder="Website Name"
                    className="form-control"
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group input-group m-1">
                <textarea
                    rows="3"
                    className="form-control"
                    placeholder="Write a Description"
                    name="description"
                    value={values.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <button className="btn btn-primary btn-block m-1">
                {currentId ? 'Edit' : 'Save'}
            </button>
        </form>
    )
}

export default LinkForm
