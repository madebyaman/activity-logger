import { rest } from 'msw';
import { fakeActivities } from './fakeData/fakeActivities';
import { fakeBlocks } from './fakeData/fakeBlocks';
import { fakeProfile } from './fakeData/fakeProfile';

export const handlers = [
  rest.get('http://localhost/api/logs', (req, res, ctx) => {
    return res(ctx.json({ blocks: fakeBlocks }));
  }),

  rest.get('http://localhost/api/profile', (req, res, ctx) => {
    return res(ctx.json(fakeProfile));
  }),

  rest.get('http://localhost/api/activities', (req, res, ctx) => {
    return res(ctx.json(fakeActivities));
  }),

  rest.get('http://localhost/api/activities/1/:page', (req, res, ctx) => {
    const { page } = req.params;
    const paginatedBlocks = fakeBlocks.filter((item, i) => {
      // Return 0-9 if page = 1, 11-19 if page == 2 and so on.
      if (i < Number(page) * 10 && i > (Number(page) - 1) * 10) {
        return item;
      }
    });
    // Return logs
    return res(ctx.json(paginatedBlocks));
  }),

  rest.get('http://localhost/api/activities/1/count', (req, res, ctx) => {
    return res(ctx.json(fakeBlocks.length));
  }),
];
