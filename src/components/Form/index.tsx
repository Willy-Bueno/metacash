import { styled } from '@/styles/stitches.config'
import { useState } from 'react'
import { Upload } from '../upload'

import axios from '@/helper/axios'
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

import { ThreeDots } from 'react-loader-spinner'


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

export function Form() {
  const { address: wallet, chainId } = useAuth()
  const { replace } = useRouter()

  const [step, setStep] = useState(0)
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [videoUri, setVideoUri] = useState<string | null>('')
  const [goal, setGoal] = useState(0)
  const [file, setFile] = useState<FileUploaded>({
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
  const formHelpers = [
    'Insira o título da sua pool.',
    'Insira da carteira que irá receber os fundos.',
    'Insira a data de início da sua pool.',
    'Insira a data de término da sua pool.',
    'Insira o link do vídeo da sua pool. (Opcional)',
    'Insira o valor da meta de arrecadação da sua pool.',
    'Insira a imagem de capa da sua pool. Recomendamos o tamanho 3:1, Ex: 1200x400.',
  ]
  const [loading, setLoading] = useState(false)

  function handlePrevStep() {
    if (step === 0) return
    setStep(step - 1)
  }

  function handleNextStep() {
    if (step === formHelpers.length - 1) return
    setStep(step + 1)
  }

  function currentInput(step: number) {
    switch (step) {
      case 0:
        return <input 
        type="text" 
        placeholder='Ex: Metacash' 
        onChange={e => setTitle(e.target.value)}
        value={title}
        />
      case 1:
        return <input 
        type="text" 
        placeholder='Ex: 0x0d878e9sd4e...'
        onChange={e => setAddress(e.target.value)}
        value={address}
        />
      case 2:
        return <input 
        type="date" 
        placeholder='Ex: 01/01/2023'
        onChange={e => setStartDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        value={startDate}
        />
      case 3:
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return <input 
        type="date" 
        placeholder='Ex: 30/01/2023'
        onChange={e => setEndDate(e.target.value)}
        value={endDate}
        min={tomorrow.toISOString().split('T')[0]}
        />
      case 4:
        return <input 
        type="text" 
        placeholder='Ex: https://www.youtube.com/watch?v=123456'
        onChange={e => setVideoUri(e.target.value)}
        value={videoUri!}
        />
      case 5:
        return <input 
        type="number" 
        placeholder='Ex: 100'
        onChange={e => setGoal(Number(e.target.value))}
        value={goal}
        />
      case 6:
        return <Upload updateFileState={setFile} file={file} />
    }
  }

  function disableButton(step: number) {
    switch (step) {
      case 0:
        return title.length > 3 ? false : true
      case 1:
        return address.length === 42 ? false : true
      case 2:
        const anteriorDate = new Date()
        anteriorDate.setDate(anteriorDate.getDate() - 1)

        const date = new Date(startDate)

        return  date > anteriorDate ? false : true
      case 3:
        return endDate > startDate ? false : true
      case 4:
        return false
      case 5:
        return goal > 0 ? false : true
      case 6:
        return file.file !== null ? false : true
    }
  }

  async function handleSubmit() {
    try {
      setLoading(true)
      const formData = new FormData()

      formData.set('title', title)
      formData.set('address', address)
      formData.set('startDate', startDate)
      formData.set('endDate', endDate)
      formData.set('videoUri', videoUri || '')
      formData.set('goal', goal.toString())
      formData.set('wallet', wallet  as string)
      formData.set('thumb', file.file! || null)
      formData.set('chainId', chainId!.toString())

      const { data } = await axios.post('/pool/create', formData, {
        onUploadProgress: e => {
          const progress = Math.round((e.loaded * 100) / e.total!)

          setFile({
            ...file,
            progress
          })

          if (progress === 100) {
            setTimeout(() => {
              setTitle('')
              setAddress('')
              setStartDate('')
              setEndDate('')
              setVideoUri('')
              setGoal(0)
            }, 1000)
          }
        }
      })
      replace(`/pools/${data.id}`)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  function preventEnter(e: any) {
    if (e.keyCode === 13) {
      e.preventDefault()
    }

    if (e.keyCode === 13 && step < 6 && !disableButton(step)) {
      handleNextStep()
    }
  }

  return (
    <FormContainer>
      <FormHeader>
        <p>{formHelpers[step]}</p>
      </FormHeader>
      <FormBody>
        <form onKeyDown={preventEnter}>
          {
            step === 6 ? (
              <Upload updateFileState={setFile} file={file} />
            ) : (
              <>
                <label>
                  {currentInput(step)}
                </label>
              </>
            )
          }
        </form>
      </FormBody>
      <FormFooter>
        <button onClick={handlePrevStep} disabled={step === 0 ? true : false}>Voltar</button>
        {
          step === formHelpers.length - 1 ? (
            <button type='submit' disabled={disableButton(step)} className='submit' onClick={handleSubmit}>{
              loading ? (
                <ThreeDots 
                  height="20" 
                  width="40" 
                  radius="9"
                  color="#FFF" 
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                 />
              ) : (
                'Criar'
              )
            }</button>
          ) : (
            <button onClick={handleNextStep} disabled={disableButton(step)}>Avançar</button>
          )
        }
      </FormFooter>
    </FormContainer>
  )
}

export const FormContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '600px',
  width: '100%',
  backgroundColor: '#080808',
  color: '$white',
  borderRadius: '10px',
  margin: 'auto',
  padding: '20px',
  gap: '20px',
})

const FormHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '40px',
  gap: '10px',

  h1: {
    fontSize: '1.5rem',
  },

  p: {
    color: '$gray200',
    fontSize: '1rem',
    fontWeight: 'regular',
    textAlign: 'center',
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },
})

const FormBody = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '10px',

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    'label': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '400px',
      width: '100%',
      height: '40px',
      backgroundColor: '#000',
      borderRadius: '5px',

      'input': {
        width: '100%',
        height: '100%',
        background: 'transparent',
        color: '$white',
        border: 'none',
        padding: '0 10px',
        fontSize: '1rem',
        fontWeight: 'regular',
        '&:focus': {
          outline: 'none'
        },

        '&::placeholder': {
          color: '$gray200',
          fontSize: '0.825rem',
          fontWeight: 'regular',
          fontStyle: 'italic',
          textTransform: 'capitalize',
        },
      },

      'input[type="date"]::-webkit-calendar-picker-indicator': {
        filter: 'invert(1)'
      },

      button: {
        background: 'transparent',
        border: 'none',
        borderRadius: 'inherit',
        height: '100%',
        width: '70px',
        cursor: 'pointer',

        'svg': {
          filter: 'invert(1)',
        }
      },
    }
  }
})

const FormFooter = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '40px',
  gap: '10px',

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '30px',
    background: '#000',
    color: '$white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      filter: 'brightness(1.2)'
    },

    '&:disabled': {
      cursor: 'not-allowed',
      filter: 'brightness(0.5)'
    },
  },

  'button.submit': {
    width: '100px',
    height: '30px',
    background: '$green400',
    color: '$white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      filter: 'brightness(1.2)'
    },

    '&:disabled': {
      cursor: 'not-allowed',
      filter: 'brightness(0.5)'
    }
  }
})
