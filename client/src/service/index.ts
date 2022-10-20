import { IResponse } from '../models'
import axios from '../axios'

export async function fetchUsers(params: string) {
  const { data } = await axios.get<IResponse>(String(params))
  return data
}
