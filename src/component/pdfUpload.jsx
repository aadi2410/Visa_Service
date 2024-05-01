import React, { useState } from 'react';
import { Button, Input, Box, Card, CardContent, styled, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';

const PdfBox = styled(Box)({
    '& .pdf_div .react-pdf__Page > div': {
        display: 'none'
    },
    '& .pdf_div canvas': {
        width: '100% !important',
        height: 'unset !important',
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

const PdfUploadAndViewer = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handlePdfFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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

  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  return (
    <CustomBox style={{width: '100%'}}>
      <Input
        type="file"
        onChange={handlePdfFileChange}
        style={{ display: 'none' }}
        inputProps={{ accept: 'application/pdf' }}
        id="file-upload-pdf"
      />
      <label htmlFor="file-upload-pdf" style={{ textAlign: 'center', display: 'block', marginTop: 15 }}>
        {selectedFile && (
            <Card sx={{ marginTop: 2, boxShadow: 'none' }}>
            <CardContent style={{padding: 0}}>
                <p className='file_name'>file: {selectedFile.name}</p>
            {selectedFile && (
                <PdfBox mt={2}>
                <Document
                className='pdf_div'
                    file={selectedFile}
                    onLoadSuccess={handleDocumentLoadSuccess}
                >
                    <Page
                    pageNumber={pageNumber}
                    width={300}
                    />
                </Document>
                </PdfBox>
            )}
            </CardContent>
            </Card>
        )}
                                    <Typography style={{ textAlign: 'center', marginBottom: 10 }}>Form Upload</Typography>

        <Button variant="contained" component="span">
          Upload PDF
        </Button>
      </label>
    </CustomBox>
  );
};

export default PdfUploadAndViewer;
