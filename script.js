const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");
const downloadButton = document.getElementById("downloadButton");

function generateQR() {
    if (qrText.value.length > 0) {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +qrText.value;
        imgBox.classList.add("show-img");
        downloadButton.style.display = "inline-block"; 
    } else {
        qrText.classList.add("error");
        setTimeout(() => {
            qrText.classList.remove("error");
        }, 1000);
    }
}

function downloadQR() {
    if (qrImage.src) {
        fetch(qrImage.src)
            .then(response => response.blob())
            .then(blob => {
                const downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = "qrcode.png";
                downloadLink.click();

                URL.revokeObjectURL(downloadLink.href);
            })
            .catch(error => {
                console.error("Error downloading QR code:", error);
            });
    }
}

