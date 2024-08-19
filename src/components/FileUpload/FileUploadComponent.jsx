import React, { useState } from 'react';

function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // The selected file is already a Blob
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    // Creating FormData to send the file
    const formData = new FormData();
    formData.append('file', file); // Directly use the file (Blob)

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/get_gemini_response', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponseText(data[0].word, data[0].definition);
      console.log(data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponseText('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload a File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {loading && <p>Loading...</p>}
      {responseText && (
        <div>
          <h3>Response:</h3>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;
