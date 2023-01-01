import { FileContainer, FileInfo, Preview } from './styles'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function FileList({file, excludeFile}: any) {
  
  return (
    <FileContainer>
      <FileInfo>
        <Preview src={file.preview}width={300} height={100} alt="teste" />
        <div>
          <strong>{file.name}</strong>
          <span>{file.readableSize}<button onClick={excludeFile}>Excluir</button></span>
        </div>

        <div className='status'>
          <CircularProgressbar value={file.progress} strokeWidth={15} styles={{
            root: { 
              width: 24
            },
            path: { 
              stroke: '#78e5d5'             }
          }} />
          {
            file.url && 
            <Link href={file.url} target="_blank" rel="noopener noreferrer">
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </Link>
          }

          {
            file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />
          }

          {
            file.error && <MdError size={24} color="#e57878" />
          }
        </div>
      </FileInfo>
    </FileContainer>
  )
}