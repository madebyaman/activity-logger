import axios from 'axios';
/**
 * Wrapper of native `fetch` function. It returns data or an error.
 */
export async function fetcher(url: string) {
  const res = await axios.get(`${window.location.origin}/api${url}`);
  return res.data;
}
