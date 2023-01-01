type StatusWithdraw = 'pending' | 'success' | 'rejected'

export interface IUser {
  id: number
  wallet: string
  role: string
  pools: IPool[]
  contributions: IContribution[]
  createdAt: Date
  updatedAt: Date
}

export interface IContribution {
  id: number
  amount: number
  owner: IUser
  owner_wallet: string
  userId: number
  hash_tx: string
  pool: IPool
  poolId: number
  createdAt: Date
}

export type StatusPool = 'active' | 'finished'

export interface IPool {
  id: number
  title: string
  address: string
  startDate: string
  endDate: string
  thumbUri: string
  thumbKey: string
  videoUri: string
  goal: number
  chainId: string
  raisedAmount: number
  owner: IUser
  ownerId: number
  contributions: IContribution[]
  withdraws: IWithdraw
  status: StatusPool
  createdAt: Date
  updatedAt: Date
}

export interface IWithdraw {
  id: number
  amount?: number
  user: IUser
  user_id: number
  pool: IPool
  pool_id: number
  hash_tx?: string
  status: StatusWithdraw
  createdAt: Date
}

export interface IAppConfig {
  id: number
  tax_rate: number
  address_default: string
  createdAt: Date
  updatedAt: Date
}
