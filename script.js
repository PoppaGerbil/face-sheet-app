async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const form = document.getElementById("faceSheetForm");
    const data = new FormData(form);

    let y = 10;
    doc.setFontSize(12);
    doc.text("ABA Face Sheet Summary", 10, y);
    y += 10;

    for (let [key, value] of data.entries()) {
        if (value.trim() !== "") {
            const label = form.querySelector(`[name="${key}"]`).previousElementSibling?.innerText || key;
            doc.text(`${label}: ${value}`, 10, y);
            y += 10;
            if (y > 280) {
                doc.addPage();
                y = 10;
            }
        }
    }

    doc.save("FaceSheet.pdf");
}