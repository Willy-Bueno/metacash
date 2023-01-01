import Image from 'next/image'
import { GetServerSideProps } from 'next'

import axios from '@/helper/axios'

import { CardContainer, CardContent, StatusPool, CardItems } from '@/styles/components/Card'
import { PoolsContainer, PoolsGrid } from '@/styles/pages/pools'

import bscIcon from '@/assets/bsc.svg'
import ethIcon from '@/assets/eth.svg'
import { Divisor } from '@/styles/components/Divisor'
import { IPool } from '@/interfaces/db-interfaces'
import { useEffect, useState } from 'react'

import { styled } from '@/styles/stitches.config'


interface PoolsProps {
  props: IPool[]
}
  

export default function Pools({ props }: PoolsProps) {
  const [pools, setPools] = useState<IPool[]>([])
  const [take, setTake] = useState(12)
  const [skip, setSkip] = useState(6)

  async function loadMorePools() {
    const { data } = await axios.get(`/pool/get-pools?take=${take}?skip=${skip}`)

    const newPools = data.filter((pool: IPool) => {
      return !pools.find((p: IPool) => p.id === pool.id)
    })

    setPools([...pools, ...newPools])

    if(newPools.length !== 0) {
      setSkip(skip + 6)
      setTake(take + 6)
    }
  }

  useEffect(() => {
    setPools(props)
  }, [props])

  return (
    <PoolsContainer>
      {
        !!pools.length ? (
          <>
            <section>
              <h1>Pools</h1>
              <Divisor />
            </section>
            <PoolsGrid>
              {
                pools.map(pool => (
                  pool.status === 'active' && (
                    <CardContainer href={`/pools/${ pool.id }`} key={ pool.id } >
                      <Image src={pool.thumbUri} alt="Project" width={200} height={300} />
                      <CardContent>
                        <header>
                          <h2>{pool.title}</h2>
                          <Image src={
                            pool.chainId === '1' ? ethIcon : bscIcon
                          } alt="BSC" width={24} height={24} />
                        </header>
                        <StatusPool status="active">Active</StatusPool>
                        <CardItems>
                          <p>Objetivo</p>
                          <p>{ pool.goal }</p>
                        </CardItems>
                        <CardItems>
                          <p>Arrecadado</p>
                          <p>
                            {
                              (pool.raisedAmount / 1e18).toFixed(3)
                            }
                          </p>
                        </CardItems>
                        <CardItems>
                          <p>Contribuições</p>
                          <p>
                            {
                              pool.contributions ? pool.contributions.length : 0
                            }
                          </p>
                        </CardItems>
                      </CardContent>
                    </CardContainer>
                  )
                ))
              }
            </PoolsGrid>
            {
              pools.length > 6 && (
                <LoadMoreButton onClick={loadMorePools}>
                  Carregar mais
                </LoadMoreButton>
              )
            }
          </>
        ) : (
          <PoolNotFound>Nenhuma pool encontrada</PoolNotFound>
        )
      }
    </PoolsContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('/pool/get-pools')

  return {
    props: {
      props: data
    }
  }
}

const LoadMoreButton = styled('button', {
  width: '200px',
  height: '50px',
  background: '#000',
  color: '$white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  marginTop: '30px',
  '&:hover': {
    transform: 'scale(1.1)',
    filter: 'brightness(1.2)'
  }
})


const PoolNotFound = styled('p', {
  color: '$gray200',
  fontSize: '1rem',
  fontWeight: 'regular',
  textAlign: 'center',
  fontStyle: 'italic'
})
