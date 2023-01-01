import { useEffect, useState } from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';

import axios from '@/helper/axios';

import {
  PoolContainer,
  PoolContent,
  PoolContribute,
  PoolContributeButton,
  PoolDescriptionContainer,
  PoolDescriptionContent,
  PoolInfo,
  PoolInfoWrapper,
  RequestWithdrawButton,
  Status,
  TableContainer,
} from '@/styles/pages/pool';

import { useAuth } from '@/hooks';

import { useForm } from 'react-hook-form';

import { getReceiptTransactionLooping } from '@/utils/get-receipt-transaction-looping';
import { formatValueToTransaction } from '@/utils/format-value-to-transaction';
import { windowSendTransaction } from '@/utils/window-send-transaction';

import { IAppConfig, IPool } from '@/interfaces/db-interfaces';
import { truncateBigString } from '@/utils/truncate-big-strings';

interface FormInput {
  amount: number;
}

interface PoolProps {
  pool: IPool;
  appConfig: IAppConfig;
}

export default function Pool({ pool, appConfig }: PoolProps) {
  const { isAuthenticated, address } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const { register, handleSubmit } = useForm<FormInput>();
  const [amount, setAmount] = useState('');
  const [isOwnerOfPool, setIsOwnerOfPool] = useState(false);

  useEffect(() => {
    if (isAuthenticated && address) {
      setIsOwnerOfPool(address.toLowerCase() === pool.address.toLowerCase());
    } else {
      setIsOwnerOfPool(false);
    }

    if (pool.status === 'active') {
      setIsActive(true);
    }
  }, [isAuthenticated, address, pool, isOwnerOfPool]);

  function handleInputAmountChange(e: any) {
    const { value } = e.target

    const valueWithoutDot = value.replace(/\.|,/g, '')

    const valueWithZeros = valueWithoutDot.padEnd(19, '0')

    let valueWithoutZeros = ''
    for (let i = 0; i < valueWithZeros.length; i++) {
      if (valueWithZeros[i] !== '0') {
        valueWithoutZeros = valueWithZeros.slice(i)
        break
      }
    }

    if (valueWithoutZeros.length !== 0) {
      setAmount(valueWithoutZeros)
    }
  }

  async function handleOnSubmit() {
    const value = formatValueToTransaction(amount);

    if (value.length !== 0) {
      const txHash = await windowSendTransaction(
        value,
        address!,
        appConfig.address_default
      );

      await getReceiptTransactionLooping(
        txHash!.toString(),
        async (receipt: any) => {
          if (receipt.status === '0x1') {
            await axios.post(
              '/contribution',
              {
                address,
                amount,
                hash_tx: txHash,
                poolId: pool.id,
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
    }
  }

  async function handleRequestWithdraw() {
    try {
      await axios.post('/request-withdraw', {
        user_id: pool.ownerId,
        pool_id: pool.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setIsActive(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PoolContainer>
      <Image src={pool.thumbUri} alt='Project' width={1180} height={330} />

      <header>
        <h1>{pool.title}</h1>

        <div>
          <Status>{
            pool.status === 'active' ? 'Ativo' : pool.status === 'finished' ? 'Finalizado' : 'N/A'
            }</Status>
          <Status>{
            pool.chainId === '1' ? 'ETH' : pool.chainId === '38' ? 'BSC' : pool.chainId === '61' ? 'tBSC' : 'N/A'
          }</Status>
        </div>
      </header>

      <PoolContent>
        <PoolInfoWrapper>
          <PoolInfo>
            <div>
              <h4>Início</h4>
              <p>
                {new Intl.DateTimeFormat('pt-Br', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                }).format(new Date(pool.startDate))}
              </p>
            </div>
            <div>
              <h4>Fim</h4>
              <p>
                {new Intl.DateTimeFormat('pt-Br', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                }).format(new Date(pool.endDate))}
              </p>
            </div>
            <div>
              <h4>Meta</h4>
              <p>{pool.goal}</p>
            </div>
            <div>
              <h4>Arrecadado</h4>
              <p>{(pool.raisedAmount / 1e18).toFixed(3)}</p>
            </div>
            <div>
              <h4>Participações</h4>
              <p>{!!pool.contributions ? pool.contributions.length : 0}</p>
            </div>
          </PoolInfo>
          <PoolContribute>
            {
              isActive ? (
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                  {/* <SliderRoot
                    defaultValue={contributionPercentAmount}
                    max={100}
                    step={1}
                    aria-label='Volume'
                    onValueChange={handleSliderChange}
                  >
                    <SliderTrack>
                      <SliderRange />
                    </SliderTrack>
                    <SliderThumb />
                  </SliderRoot> */}
                  <input
                    type='number'
                    {...register('amount')}
                    placeholder='Insira o valor a ser contribuído'
                    onChange={handleInputAmountChange}
                    step='0.000001'
                  />
                  <PoolContributeButton type='submit'>
                    Contribute
                  </PoolContributeButton>
                </form>
              ) : (
                <p>Finished</p>
              )
            }
            {
              isOwnerOfPool && isActive && (
                <RequestWithdrawButton onClick={handleRequestWithdraw}>Solicitar Saque</RequestWithdrawButton>
              )
            }
          </PoolContribute>
        </PoolInfoWrapper>
        <PoolDescriptionContainer>
          <nav>
            <h2>Descrição do Projeto</h2>
          </nav>
          <PoolDescriptionContent>
            {pool.videoUri && (
              <iframe
                width='560'
                height='315'
                src={pool.videoUri}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
              )
            }
          </PoolDescriptionContent>
        </PoolDescriptionContainer>
      </PoolContent>

      {
        !!pool.contributions.length && (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Contribuidor</th>
                  <th>hash_tx</th>
                  <th>Valor</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                { pool.contributions.map((contribution, index) => (
                    <tr key={index}>
                      <td>{truncateBigString(contribution.owner_wallet, 4)}</td>
                      <td>{truncateBigString(contribution.hash_tx)}</td>
                      <td>{(contribution.amount / 1e18).toFixed(3)}</td>
                      <td>
                        {new Intl.DateTimeFormat('pt-Br', {
                          year: 'numeric',
                          month: 'long',
                          day: '2-digit',
                        }).format(new Date(contribution.createdAt))}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </TableContainer>
        )
      }
    </PoolContainer>
  );

}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const { data } = await axios.get(`/pool/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(data);
  
  return {
    props: data,
  };
};
