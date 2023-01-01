import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from '@/helper/axios'

import { useAuth } from '@/hooks'

import { DashboardContainer, DashboardSectionHeader } from '@/styles/pages/dashboard'
import { Divisor } from '@/styles/components/Divisor'

import { IWithdraw, IUser, IAppConfig, IPool } from '@/interfaces/db-interfaces'
import { StatusPool } from '@/styles/components/Card'

import { styled } from '@/styles/stitches.config'

import bscIcon from '@/assets/bsc.svg'
import ethIcon from '@/assets/eth.svg'
import { windowSendTransaction } from '@/utils/window-send-transaction'
import { getReceiptTransactionLooping } from '@/utils/get-receipt-transaction-looping'

import { ThreeDots } from 'react-loader-spinner'

interface DashboardUserData {
  user: IUser | null
  withdraws: IWithdraw[] | null
  appConfig: IAppConfig | null
}

export default function Dashboard() {
  const { address, isAuthenticated } = useAuth()
  const [data, setData] = useState<DashboardUserData>({ user: null, withdraws: null, appConfig: null })
  const [tax, setTax] = useState<number>(0)
  const [addressDefault, setAddressDefault] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthenticated && address) {
      
      axios.post(`/dashboard`, address, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }, [address, isAuthenticated])

  async function handleApproveWithdraw(amount: number, pool: IPool, withdrawId: number) {
    try {
      if (data.appConfig !== undefined && data.appConfig !== null) {
        const amt = amount - (amount / data.appConfig.tax_rate)
        const value = amt.toString(16)

        if (!pool) throw new Error('Pool not found')

        const txHash = await windowSendTransaction(
          value,
          data.appConfig.address_default,
          pool.address
        );
    
        await getReceiptTransactionLooping(
          txHash!.toString(),
          async (receipt: any) => {
            if (receipt.status === '0x1') {
              await axios.put(
                '/withdraws',
                {
                  id: withdrawId,
                  status: 'success',
                  hash_tx: txHash,
                  amount: Number((+amt / 1e18).toFixed(3))
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
            }
          }
        );

        setData({
          ...data,
          withdraws: [
            ...data.withdraws!.filter((withdraw: IWithdraw) => withdraw.id !== withdrawId)
          ]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRejectWithdraw(withdrawId: any) {
    try {
      await axios.put(
        '/withdraws',
        {
          id: withdrawId,
          status: 'rejected',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setData({
        ...data,
        withdraws: [
          ...data.withdraws!.filter((withdraw: IWithdraw) => withdraw.id !== withdrawId)
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  async function updateDataConfig() {
    try {
      setLoading(true)
      if (tax !== 0) {
        await axios.put('/update-app-config', {
          tax_rate: tax
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else if (addressDefault !== '') {
        await axios.put('/update-app-config', {
          address_default: addressDefault
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else if (tax !== 0 && addressDefault !== '') {
        await axios.put('/update-app-config', {
          tax_rate: tax,
          address_default: addressDefault
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        return
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardContainer>
      {
        data?.user?.role === 'admin' && (
          <>
            <DashboardSectionHeader>
              <h1>APP Configs</h1>
              <Divisor />
            </DashboardSectionHeader>
            <DashboardConfigContainer>
              <DashboardConfigItem>
                <DashboardConfigLabel>Taxa de saque (%)</DashboardConfigLabel>
                <DashboardConfigInput type='number' min={1} max={100} placeholder={data.appConfig?.tax_rate.toString()} onChange={(event) => {
                  setTax(Number(event.target.value))
                }} />
              </DashboardConfigItem>
              <DashboardConfigItem>
                <DashboardConfigLabel>Endereço default</DashboardConfigLabel>
                <DashboardConfigInput type="text" placeholder={data.appConfig?.address_default} onChange={(event) => {
                  if (event.target.value.length === 42) {
                    setAddressDefault(event.target.value)
                  } else {
                    setAddressDefault('')
                  }
                }} />
              </DashboardConfigItem>
              <DashboardConfigButton onClick={updateDataConfig}>{
                loading ? <ThreeDots 
                height="20" 
                width="40" 
                radius="9"
                color="#FFF" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
                 />
                : 'Salvar'
              }</DashboardConfigButton>
            </DashboardConfigContainer>
            {
              !!data?.withdraws?.length && (
                <>
                  <DashboardSectionHeader>
                    <h1>Pending Withdraws</h1>
                    <Divisor />
                  </DashboardSectionHeader>
                  <DashboardPoolContainer>
                    {
                      data?.withdraws?.map(withdraw => (
                        <DashboardPoolCard key={withdraw.id}>
                          <CardLink href={`/pools/${withdraw.pool_id}`} key={withdraw.id}>
                            <DashboardPoolImage src={withdraw.pool.thumbUri} alt="Project" width={200} height={300} />
                            <DashboardPoolContent>
                              <header>
                                <p>{withdraw.pool.title}</p>
                                <DashboardIconNetwork  src={
                                  withdraw.pool.chainId === '1' ? ethIcon : bscIcon
                                } alt="BSC" width={24} height={24} />
                              </header>
                              <StatusPool status={withdraw.pool.status}>{withdraw.pool.status}</StatusPool>
                              <DashboardPoolItemsContainer>
                                <DashboardPoolItem>
                                  <p>Objetivo</p>
                                  <p>{withdraw.pool.goal}</p>
                                </DashboardPoolItem>
                                <DashboardPoolItem>
                                  <p>Arrecadado</p>
                                  <p>{(withdraw.pool.raisedAmount / 1e18).toFixed(3)}</p>
                                </DashboardPoolItem>
                                <DashboardPoolItem>
                                  <p>Contribuições</p>
                                  <p>
                                  {
                                    withdraw.pool.contributions.length
                                  }
                                  </p>
                                </DashboardPoolItem>
                              </DashboardPoolItemsContainer>
                            </DashboardPoolContent>
                          </CardLink>
                          <DashboardPoolActionsContainer>
                            <ApproveButton onClick={ () => handleApproveWithdraw(
                              withdraw.pool.raisedAmount,
                              withdraw.pool,
                              withdraw.id
                              ) }>Approve</ApproveButton>
                            <RejectButton onClick={ () => handleRejectWithdraw(withdraw.id)}>Reject</RejectButton>
                          </DashboardPoolActionsContainer>
                        </DashboardPoolCard>
                      ))
                    }
                  </DashboardPoolContainer>
                </>
              )
            }
          </>
        )
      }
      {
        !!data?.user?.pools.length && (
          <>
            <DashboardSectionHeader>
              <h1>My Pools</h1>
              <Divisor />
            </DashboardSectionHeader>

            <DashboardPoolContainer>
              {
                data.user.pools.map(pool => (
                  <CardLink href={`/pools/${pool.id}`} key={pool.id}>
                    <DashboardPoolCard>
                      <DashboardPoolImage src={pool.thumbUri} alt="Project" width={200} height={300} />
                      <DashboardPoolContent>
                        <header>
                          <p>{pool.title}</p>
                          <DashboardIconNetwork  src={
                            pool.chainId === '1' ? ethIcon : bscIcon
                          } alt="BSC" width={24} height={24} />
                        </header>
                        <StatusPool status={pool.status}>{pool.status}</StatusPool>
                        <DashboardPoolItemsContainer>
                          <DashboardPoolItem>
                            <p>Objetivo</p>
                            <p>{pool.goal}</p>
                          </DashboardPoolItem>
                          <DashboardPoolItem>
                            <p>Arrecadado</p>
                            <p>{(pool.raisedAmount / 1e18).toFixed(3)}</p>
                          </DashboardPoolItem>
                          <DashboardPoolItem>
                            <p>Contribuições</p>
                            <p>
                            {
                              pool.contributions ? pool.contributions.length : 0
                            }
                            </p>
                          </DashboardPoolItem>
                        </DashboardPoolItemsContainer>
                      </DashboardPoolContent>
                    </DashboardPoolCard>
                  </CardLink>
                ))
              }
            </DashboardPoolContainer>
          </>
        )
      }
    </DashboardContainer>
  )
}

const DashboardPoolContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '40px',
  width: '100%',
  padding: '0 20px',
  marginTop: '60px',

  '@sm': {
    gridTemplateColumns: '1fr'
  },

  '@md': {
    gridTemplateColumns: '1fr',
  },

  '@lg': {
    gridTemplateColumns: '1fr 1fr',
  }
})  

const DashboardPoolCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '$gray800',
  borderRadius: '16px',
  width: '100%',

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    transform: 'scale(1.05)'
  },

  '@lg': {

  }
})

const CardLink = styled(Link, {
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  height: '100%',
})

const DashboardPoolImage = styled(Image, {
  height: '120px',
  width: '100%',
  objectFit: 'cover',
  objectPosition: 'top',
  border: 0,
  borderRadius: '16px',
})

const DashboardPoolContent = styled('div', {
  width: '100%',
  padding: '1.5rem 1.5rem 0 1.5rem', // 24px
  backgroundColor: 'inherit',
  borderRadius: '16px',

  'header': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',

    'p': {
      fontSize: '1.25rem', // 20px
      fontWeight: '500',
      color: '$white',
      textTransform: 'capitalize'
    },
  }
})

const DashboardIconNetwork = styled(Image, {
  width: '24px',
  height: '24px',
  objectFit: 'cover',
  objectPosition: 'center'
})

const DashboardPoolItemsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'inherit',
  gap: '16px',
  margin: '24px 0',
})

const DashboardPoolItem = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'inherit',
  width: '100%',

  'p': {
    fontSize: '1rem', // 16px
    fontWeight: '500',
    color: '$white',
    textTransform: 'capitalize'
  },
})

const DashboardPoolActionsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: 'transparent',
  padding: '16px',
  gap: '16px'
})

const ApproveButton = styled('button', {
  width: '100%',
  height: '40px',
  backgroundColor: '$green500',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  color: '$white',
  fontSize: '1rem', // 16px
  fontWeight: '500',
  textTransform: 'uppercase',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    filter: 'brightness(0.9)',
    transform: 'scale(1.05)'
  }
})

const RejectButton = styled('button', {
  width: '100%',
  height: '40px',
  backgroundColor: '$red500',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  color: '$white',
  fontSize: '1rem', // 16px
  fontWeight: '500',
  textTransform: 'uppercase',
  transition: 'all 0.2s ease-in-out',
  
  '&:hover': {
    filter: 'brightness(0.9)',
    transform: 'scale(1.05)'
  }
})

const DashboardConfigContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'inherit',
  gap: '16px',

  '@sm': {
    flexDirection: 'column',
  },

  '@md': {
    flexDirection: 'column',
  }
})

const DashboardConfigItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'inherit',
  gap: '5px',
})

const DashboardConfigLabel = styled('label', {
  fontSize: '1rem', // 16px
  fontWeight: '500',
  color: '$white',
  textTransform: 'capitalize',
  marginTop: '40px'
})

const DashboardConfigInput = styled('input', {
  width: '100%',
  height: '40px',
  backgroundColor: '$gray800',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  padding: '0 16px',
  color: '$white',
  fontSize: '1rem', // 16px
  fontWeight: '500',
  textTransform: 'uppercase',
  transition: 'all 0.2s ease-in-out',
})

const DashboardConfigButton = styled('button', {
  width: '250px',
  height: '40px',
  backgroundColor: '$green500',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  color: '$white',
  fontSize: '1rem', // 16px
  fontWeight: '500',
  textTransform: 'uppercase',
  transition: 'all 0.2s ease-in-out',
  marginTop: '65px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  
  '&:hover': {
    filter: 'brightness(0.9)',
    transform: 'scale(1.05)'
  },
})
