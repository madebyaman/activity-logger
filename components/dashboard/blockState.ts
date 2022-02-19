import { Log } from '@prisma/client';
import { atom, RecoilState } from 'recoil';

const defaultBlocks: Log[] = [];

export const blockState = atom({
  key: 'blockState',
  default: defaultBlocks,
});
