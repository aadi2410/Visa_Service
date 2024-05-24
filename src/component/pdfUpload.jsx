import React, { useState } from 'react';
import { Button, Input, Box, Card, CardContent, styled, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';

const PdfBox = styled(Box)({
  '& .pdf_div .react-pdf__Page > div': {
    display: 'none'
  },
  '& .pdf_div canvas': {
    width: '100% !important',
    height: '250px !important',
    objectFit: 'contain'
  }
})
const CustomBox = styled(Box)({
  width: '100%',
  // '& .file_name': {
  //   display: '-webkit-box',
  //   WebkitLineClamp: 1,
  //   '-webkit-box-orient': 'vertical',
  //   overflow: 'hidden',
  //   height: '30px'
  // }
})

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfUploadAndViewer = ({  key, images, setImages, isUpload, handleGroupFileChange, value, activeStep, handleCancel }) => {
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
    setSelectedFile(file);

    setImages({ ...images, singleVisaApplyDocument: file })
  };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // const handleCancel = () => {
  //   if (images) {
  //     const { singleVisaApplyDocument, ...rest } = images;
  //     setImages(rest); setSelectedFile(null)
  //   }
  // };
  console.log(activeStep)
  return (
    <CustomBox style={{ width: '100%', textAlign: 'center' }} key={key ?? 1}>
      <Input
        type="file"
        onChange={(e) => {
          !value == 1 ? handlePdfFileChange(e) : handleGroupFileChange(e, images,
            "groupVisaApplyDocument"
          );
        }}
        style={{ display: 'none' }}
        inputProps={{ accept: 'application/pdf' }}
        id={`file-upload-pdf-${images.id ?? 1}`}
      />
      <label htmlFor={`file-upload-pdf-${images.id ?? 1}`} style={{ textAlign: 'center', display: 'block' }}>
        {(selectedFile || images?.singleVisaApplyDocument || images?.groupVisaApplyDocument) && (
          <Card sx={{ boxShadow: 'none' }}>
            <CardContent style={{ padding: 0 }}>
              {/* {!isUpload && <p className='file_name'>file: {(selectedFile?.name ?? "") || images?.groupVisaApplyDocument?.name}</p>} */}
              {(selectedFile || images.singleVisaApplyDocument || images?.groupVisaApplyDocument) && (
                <PdfBox>
                  <Document
                    className='pdf_div'
                    file={images.singleVisaApplyDocument || images?.groupVisaApplyDocument}
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
        {activeStep == 0 &&
          <>
            <Typography style={{ textAlign: 'center', marginBottom: 10, marginTop: 15 }}>Form Upload</Typography>
            <Box display={'flex'} gap={5} style={{ justifyContent: 'center' }}>
              <Button variant="contained" component="span">
                Upload PDF
              </Button>
            </Box>
          </>}
      </label>
      {((activeStep === 0 && images.singleVisaApplyDocument) || (activeStep === 0 && images.groupVisaApplyDocument)) && <Box className="cancel-icon" onClick={() => {
        value === 0 ? handleCancel('singleVisaApplyDocument') : handleCancel("cancel", images, "groupVisaApplyDocument");
        setSelectedFile(null)
      }}>
        x
      </Box>}
    </CustomBox>
  );
};

export default PdfUploadAndViewer;
