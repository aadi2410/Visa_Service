import React, { useState } from 'react';
import { Button, Input, Box, Card, CardContent, styled, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';

const PdfBox = styled(Box)({
  '& .pdf_div .react-pdf__Page > div': {
    display: 'none'
  },
  '& .pdf_div canvas': {
    width: '100% !important',
    height: '150px !important',
    objectFit: 'contain'
  }
})
const CustomBox = styled(Box)({
  width: '100%',
  '& .file_name': {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    height: '30px'
  }
})

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfUploadAndViewer = ({ images, setImages,isUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  React.useEffect(() => {
    const savedFile = localStorage.getItem('upload_pdf');

    if (savedFile) {
      setSelectedFile(savedFile);
    }
  }, []);

  const handlePdfFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result;

      // localStorage.setItem('upload_pdf', base64String);
      // localStorage.setItem('upload_pdf_name', file.name);

      setSelectedFile(file);
    };
    console.log({ images })
    setImages({ ...images, singleVisaApplyDocument: file })
  };
  const handleUpload = () => {
    // Handle file upload logic
    console.log(selectedFile);
  };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleCancel = () => {
    const { singleVisaApplyDocument, ...rest } = images;
    setImages(rest); setSelectedFile(null)
  };
  return (
    <CustomBox style={{ width: '100%' }}>
      <Input
        type="file"
        onChange={handlePdfFileChange}
        style={{ display: 'none' }}
        inputProps={{ accept: 'application/pdf' }}
        id="file-upload-pdf"
      />
      <label htmlFor="file-upload-pdf" style={{ textAlign: 'center', display: 'block' }}>
        {(selectedFile || images.singleVisaApplyDocument) && (
          <Card sx={{ boxShadow: 'none' }}>
            <CardContent style={{ padding: 0 }}>
             {!isUpload&& <p className='file_name'>file: {selectedFile?.name ?? ""}</p>}
              {(selectedFile || images.singleVisaApplyDocument) && (
                <PdfBox>
                  <Document
                    className='pdf_div'
                    file={images.singleVisaApplyDocument}
                    onLoadSuccess={handleDocumentLoadSuccess}
                  >
                    <Page
                      pageNumber={pageNumber}
                    />
                  </Document>
                </PdfBox>
              )}
            </CardContent>
          </Card>
        )}
        {!isUpload &&
          <>
            <Typography style={{ textAlign: 'center', marginBottom: 10, marginTop: 15 }}>Form Upload</Typography>
            <Box display={'flex'} gap={5}>

              <Button variant="contained" component="span">
                Upload PDF
              </Button>

            </Box>
          </>}
      </label>
      {!isUpload && <Button variant="contained" component="span" onClick={handleCancel}>
        Cancel PDF
      </Button>}
    </CustomBox>
  );
};

export default PdfUploadAndViewer;
