import React from 'react';
import PropTypes from 'prop-types';

import './FileLoader.scss';

function FileLoader({setImage}) {
    const handleFileSelect = (evt) => {
        const file = evt.currentTarget.files[0];
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            const newThumbnail = {
                path: fileReader.result,
                originalname: file.name,
                mimetype: file.type,
                size: file.size,
            };
            setImage(newThumbnail, 'thumbnail');
            console.log(fileReader.result);
        };
        console.log(file);
    };

    return (
        <div className="file_loader">
            <label htmlFor="file_loader_input">
                <input
                    type="file"
                    id="file_loader_input"
                    name="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelect}
                />
                Выберите файл...
            </label>
        </div>
    );
}

FileLoader.propTypes = {
    setImage: PropTypes.func,
};

FileLoader.defaultProps = {
    setImage: null,
};

export default FileLoader;
