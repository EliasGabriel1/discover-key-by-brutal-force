const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function tryPasswords(pdfPath, passwordListPath, outputPath) {
  const existingPdfBytes = fs.readFileSync(pdfPath);
  const passwords = fs.readFileSync(passwordListPath, 'utf-8').split('\n');

  for (let password of passwords) {
    password = password.trim(); // Remover espaços em branco
    try {
      const pdfDoc = await PDFDocument.load(existingPdfBytes, { password: password });
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(outputPath, pdfBytes);
      console.log(`Senha encontrada: ${password}`);
      return;
    } catch (error) {
      // Ignorar erros e continuar tentando outras senhas
    }
  }
  console.log('Nenhuma senha encontrada.');
}

const inputPath = './pasta-pdf/pdf1.pdf';
const passwordListPath = './rockyou.txt'; // Caminho para a lista de senhas
const outputPath = 'pdf_desprotegido.pdf';

tryPasswords(inputPath, passwordListPath, outputPath).then(() => {
  console.log('Tentativas concluídas.');
}).catch((err) => {
  console.error('Erro durante as tentativas:', err);
});
