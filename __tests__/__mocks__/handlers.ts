import { isEqual, isValid, sub } from 'date-fns';
import { rest, RestHandler } from 'msw';
import { fakeActivities } from './fakeData/fakeActivities';
import { fakeBlocks } from './fakeData/fakeBlocks';
import { fakeProfile } from './fakeData/fakeProfile';
import { fakeActivityReport } from './fakeData/fakeReports';

export const handlers: RestHandler[] = [
  rest.get('http://localhost/api/logs', (req, res, ctx) => {
    return res(ctx.json(fakeBlocks));
  }),

  rest.get('http://localhost/api/profile', (req, res, ctx) => {
    return res(ctx.json(fakeProfile));
  }),

  rest.get('http://localhost/api/activities', (req, res, ctx) => {
    return res(ctx.json(fakeActivities));
  }),

  rest.get('http://localhost/api/activities/:id', (req, res, ctx) => {
    const totalCount = fakeBlocks.length;
    return res(ctx.json({ totalCount }));
  }),

  rest.get('http://localhost/api/activities/:id/:page', (req, res, ctx) => {
    const { page } = req.params;
    if (Number.isNaN(Number(page))) {
      return res(ctx.status(400));
    }
    const paginatedBlocks = fakeBlocks.filter((item, i) => {
      // Return 0-9 if page = 1, 11-19 if page == 2 and so on.
      if (i < Number(page) * 10 && i > (Number(page) - 1) * 10) {
        return item;
      }
    });
    // Return logs
    return res(ctx.json(paginatedBlocks));
  }),

  rest.post('http://localhost/api/logs/report', async (req, res, ctx) => {
    const { to } = await req.json();
    if (!isValid(new Date(to))) {
      return res(ctx.status(400));
    }
    const toDateWithoutTime = new Date(`${to}`);
    toDateWithoutTime.setUTCHours(0, 0, 0, 0);
    const yesterdayWithoutTime = sub(new Date(), { days: 1 });
    yesterdayWithoutTime.setUTCHours(0, 0, 0, 0);
    if (isEqual(yesterdayWithoutTime, toDateWithoutTime)) {
      return res(ctx.json(fakeActivityReport));
    } else {
      return res(ctx.json([]));
    }
  }),
];
