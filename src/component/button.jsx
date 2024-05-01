import React, { useState } from 'react';
import { Button, Input, Box, Card, CardMedia, styled, Typography } from '@mui/material';

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

const FileUploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const fileUrl = URL.createObjectURL(event.target.files[0]);
    setImageUrl(fileUrl);
  };

  return (
    <CustomBox>
      <Input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        inputProps={{ accept: 'image/*' }}
        id="file-upload"
      />
      {selectedFile && <p className='file_name' style={{paddingBottom: 10}}>File Name: {selectedFile.name}</p>}
      {imageUrl && (
        <Card sx={{ width: '100%' }}>
          <CardMedia style={{height: '150px', objectFit: 'cover', width: '100%'}} component="img" image={imageUrl} />
        </Card>
      )}
      <label htmlFor="file-upload" style={{textAlign: 'center', display: 'block', marginTop: 15}}>
        <Typography style={{textAlign: 'center', marginBottom: 10}}>Aadhhar Card Front Side</Typography>
        <Button variant="contained" component="span">
          Upload File
        </Button>
      </label>
    </CustomBox>
  );
};

export default FileUploadButton;
