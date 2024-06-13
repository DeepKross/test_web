import { Position } from '../models/positions.types.ts';
import { axios } from '../services/axios';

interface Positions {
  success: boolean;
  positions: Position[];
}

export const getAllPositions = async () => {
  const response = await axios.get<Positions>(`/positions`);

  const data = response.data.positions;

  return data;
};
