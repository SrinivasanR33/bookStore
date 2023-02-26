import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateBook, ViewBook } from "../../service/BookService";

function BookAddImage() {
  const [uploadedFile, setUploadedFile] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const dispatch = useDispatch();
  const handelChange = async (e) => {
    if (e.length > 3) {
    }
    if (!e) {
      dispatch({
        type: "IMAGE_BOOK_DATA",
        payload: [],
      });
    }
  };
  // useEffect(() => {
  //   dispatch(imageUploadGet());
  // }, []);

  function handleFormSubmittion(e) {
    e.preventDefault();

    let form = document.getElementById("form");
    let formData = new FormData(form);

    // do something
    console.log("Form submitted");
  }

  function handleFileTitle(e) {
    setFileTitle(e.target.value);
  }

  function handleUploadedFile(e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.files);

    setUploadedFile(e.target.value);
  }
  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  
  function handleFormSubmittion(e) {
    e.preventDefault();

    let form = document.getElementById("form");
    let formData = new FormData(form);
    console.log(formData);
    // formData.append("uploadedFile", uploadedFile);
    // formData.append("fileTitle", fileTitle);
    // new line added
    // dispatch(imageUpload(formData));
    dispatch(CreateBook(formData));
  }

  return (
    <React.Fragment>
      <h1>File upload</h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleFormSubmittion}
        id="form"
        method="post"
        action="/upload"
      >
        <input
         type="file"
         name="uploadedFile"
         value={uploadedFile}
         onChange={handleUploadedFile}
         required
        />
        <input
          type="text"
          name="fileTitle"
          value={fileTitle}
          onChange={handleFileTitle}
          required
        />

        <button type="submit">Submit Form</button>
        

      </form>
    </React.Fragment>
  );
}

export default BookAddImage;
