import React, { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import isrcImage from "../images/isrc.jpg";
import CustomDialog from "../components/CustomDialog";
import casnet1Image from "../images/casnet1.jpg";
import casnet2Image from "../images/casnet2.jpg";

function Home() {
    const [notes, setNotes] = useState([]);
    const [maps, setMaps] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [imageName, setImageName] = useState("");
    const [outputImage, setOutputImage] = useState(null); 
    const [showEmptyContainer, setShowEmptyContainer] = useState(false);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, imageURL: selectedImage.name, model: selectedOption })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    //Handling image upload from the user's computer
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    //Confirming user's option
    const handlePrintInfo = () => {
        if (!selectedImage) {
            alert("Por favor selecione uma imagem.");
            return;
        }
        if (!selectedOption) {
            alert("Por favor selecione um método.");
            return;
        }

        setShowDialog(true);
    };

    const handleShowImage = () => {   
        setShowEmptyContainer(true);
      };

    const handleCloseDialog = () => {
        setShowDialog(false);
      };
    
    //Show the correct image to the user, depending on the model chosen
    useEffect(() => {
        const imageName = selectedImage && selectedOption ? `${selectedImage.name.split('.')[0]}${selectedOption}.jpg` : "";
        setImageName(imageName);

        if (selectedOption) {
            if (selectedOption === "casnet1") {
                setOutputImage(casnet1Image);
            } else if (selectedOption === "casnet2") {
                setOutputImage(casnet2Image);
            }
        } else {
            setOutputImage(null);
        }
    }, [selectedImage, selectedOption]);

    return (
        <div>
            <img src={isrcImage} alt="ISRC logo" ></img>
            
            <div style={{ textAlign: "right" }}>
                <a href="http://localhost:5173/logout">Logout</a>
            </div>

            <div style={{ textAlign: "center" }}>
                <br></br>
                <label htmlFor="image" style={{ display: "block", textAlign: "center" }}>Escolha uma imagem para a criação do mapa de saliências:</label>
                <input type="file" id="imageInput" style={{ margin: "0 auto", display: "none" }} onChange={handleImageUpload} /> {}
                <button onClick={() => document.getElementById("imageInput").click()} >Escolher Imagem</button> {}
            </div>
            
            <div className="break"></div>

            <div className="centered-container combo-box-container">
                <label htmlFor="casnet" style={{ display: "block", textAlign: "center" }}>Escolha um modelo para a criação do mapa de saliências:</label>
                <select id="casnet" name="casnet" onChange={handleOptionChange} value={selectedOption} style={{ margin: "0 auto", display: "block" }}>
                    <option value="">Selecione um modelo...</option>
                    <option value="casnet1">CASNET 1</option>
                    <option value="casnet2">CASNET 2</option>
                </select>
            </div>
            
            <div className="break"></div>

            <div id="imageContainer" className="container">
                {selectedImage && (
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" style={{ maxWidth: "100%" }} />
                )}
            </div>

            <div id="emptyContainer" className="container">
                {outputImage && showEmptyContainer && (
                    <img src={outputImage} alt="Output Image" style={{ maxWidth: "100%" }} />
                )}
            </div>

            <div className="break"></div> 

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={handlePrintInfo} style={{ width: "50%" }}>Criar mapa de saliências</button>
            </div>

            <div style={{ borderBottom: "4px solid black", margin: "20px auto", width: "90%" }}></div>
            
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>

            {showDialog && (
                <CustomDialog
                message={`O método selecionado foi: ${selectedOption}\n   ||| A imagem selecionada foi: ${selectedImage.name}`}
                onClose={handleCloseDialog}
                onShowImage={handleShowImage}
                showEmptyContainer={showEmptyContainer}
                />
            )}
        </div>
    );
}

export default Home;