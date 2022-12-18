import { rest } from 'msw';
import { newBlocks } from '../../utils';
import { activitiesData } from '../../utils';

export const handlers = [
  rest.get('http://localhost/api/logs', (req, res, ctx) => {
    const blocks = newBlocks(4).map((block, id) => ({
      ...block,
      id,
      notes: '',
    }));
    return res(ctx.json({ blocks }));
  }),

  rest.get('http://localhost/api/profile', (req, res, ctx) => {
    const profile = {
      sleepFrom: 22,
      sleepTo: 6,
      blocksPerHour: 4,
      firstName: 'Aman',
      lastName: 'Thakur',
      isVerified: true,
    };
    return res(ctx.json(profile));
  }),

  rest.get('http://localhost/api/activities', (req, res, ctx) => {
    return res(ctx.json({ activitiesData }));
  }),
];
