import { uniqueId } from 'lodash'
import { filesize } from 'filesize';
import { FileList } from '../FileList'
import { DropContainer } from './styles'
import  { useDropzone } from 'react-dropzone'
import { useEffect, useState } from 'react'

interface UploadProps {
  updateFileState: (file: FileUploaded) => void
  file: FileUploaded
}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
}

interface FileUploaded {
  file: File | null
  id: string | null
  name: string | null
  readableSize: string | number | any[] | {
    value: any;
    symbol: any;
    exponent: number;
    unit: string;
  } | null
  preview: string | null
  progress: number | null
  uploaded: boolean | null
  error: boolean | null
  url: string | null
}

export function Upload({ updateFileState, file }: UploadProps) {
  const renderDragMessage = (dragActive: boolean, dragReject: boolean) => {
    if (!dragActive) {
      return <p>Drag and drop your image here</p>
    }
    if (dragReject) {
      return <p>Invalid file type</p>
    }
    return <p>Drop the image here</p>
  }

  const {acceptedFiles, getRootProps, getInputProps, isDragActive: dragActive, isDragReject: dragReject} = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    }
  })

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const uploadedFile = {
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      }

      updateFileState(uploadedFile)
    }
  }, [acceptedFiles, updateFileState])

  function excludeFile() {
    acceptedFiles.pop()
    updateFileState({
      file: null,
      id: null,
      name: null,
      readableSize: null,
      preview: null,
      progress: null,
      uploaded: null,
      error: null,
      url: null
    })
  }

  return (
    <>
      <DropContainer {...getRootProps()} isDragActive={dragActive} isDragReject={dragReject} >
        <input {...getInputProps()} />
        {
          renderDragMessage(dragActive, dragReject)
        }
      </DropContainer>
      {
        acceptedFiles.length > 0 && file.file !== null && <FileList file={file} excludeFile={excludeFile} />
      }
    </>
  )
}