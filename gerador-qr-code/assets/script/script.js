const btn = document.getElementById("btn");
const qrCodeImage = document.getElementById("qr-code");

function gerarQrCode() {
    const url = document.getElementById('url').value;
    if (url == '') {
        return;
    }

    btn.value = "Gerando QR Code...";
    qrCodeImage.setAttribute("src", "https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=25-20-98&data=" + url);
    qrCodeImage.addEventListener("load", () => {
        qrCodeImage.classList.add("active");
        btn.value = "QR Code gerado!";
    })
}

document.addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        gerarQrCode();
    }
})

document.addEventListener("keyup", () => {
    btn.value = "Gerar";
    qrCodeImage.classList.remove("active");
});