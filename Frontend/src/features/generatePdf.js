import jsPDF from "jspdf"
import html2canvas from "html2canvas";
const generatePDF = (props, supervisor) => {
  const capture = document.querySelector(".pdf")
  html2canvas(capture).then((canvas) =>{
    const imgData = canvas.toDataURL("img/png");
    const doc = new jsPDF("landscape", "mm", "a4")
    const componentWidth = doc.internal.pageSize.getWidth()
    const componentHeight = doc.internal.pageSize.getHeight()
    doc.addImage(imgData,"PNG" , 0,0 , componentWidth, componentHeight)
    doc.save("Certificate.pdf")
  })
  
  
  
 
 
  };
  
    
      
export default generatePDF