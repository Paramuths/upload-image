const PORT = 8080;

const form = document.getElementById("form");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const inputFile = document.getElementById("uploaded-file");    
    const url = `http://localhost:${PORT}/upload`;

    const formData = new FormData();
    formData.append("fileupload", inputFile.files[0]);

    const image = await postData(url, formData);
    await displayImage(image);
});

async function postData(url, formData) {
    const response = await fetch(url, {
        method: "post", 
        body: formData,
    });

    return response;
}

async function displayImage(image) {
    const fileName = await image.text();
    document.getElementById("image").src = `http://localhost:${PORT}/${fileName}`;
}

function successfullyUpload() {
    document.getElementById("uploaded-text").style.display = "block";
}

