import React, { Fragment, useState } from 'react'
import axios from 'axios';
import config from '../config';

export default () => {
    const [file, setFile] = useState();
    const [fileName, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file)
        try {
            const res = await axios.post(`${config.apiURL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath })
            console.log(`${fileName} was uploaded`);
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 500) {
                console.log('There was a propblem with the server');
            } else {
                console.log(error.response.data.msg);
            }
        }
    }
    return (
        <Fragment>
            <form className="file has-name pt-3" onSubmit={onSubmit}>
                <label className="file-label ">
                    <input className="file-input" type="file" name="file" onChange={onChange} />
                    <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <label className="file-label">
                            Browse...
                    </label>
                    </span>
                    <span className="file-name">
                        {fileName}
                    </span>
                </label>
                <button className="button" type="submit">Upload</button>
            </form>
            {uploadedFile ? <div className="container">
                <img style={{ width: '100%' }} src={uploadedFile.filePath} />
            </div> : null}
        </Fragment>
    )
}
