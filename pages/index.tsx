import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto mt-4 mb-8 px-4">
      <Head>
        <title>Activity Logger App</title>
      </Head>
      <header>
        <nav>
          <ul className="flex justify-between items-center">
            <li className="uppercase text-sm font-semibold text-gray-700">
              Activity Logger App
            </li>
            <li>
              <Link
                className="uppercase text-sm text-gray-600 tracking-wider font-semibold hover:text-gray-800 hover:underline"
                href="/signin"
                passHref
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main
        className="mt-20 flex flex-col gap-12 justify-between items-start sm:flex-row"
        id="main"
      >
        <div className="flex-2">
          <h1 className="heading1">Take Back Control of Your Time</h1>
          <div className="paragraph mt-2 md:mt-4">
            <p>
              Activity Logger is an app to help you keep track of your time.
              After every few hours come back to the app and enter what you were
              doing in that time.
            </p>
          </div>
          <div className="mt-6 md:mt-8">
            <Link className="btn" href="/signin" passHref>
              Start tracking your time
            </Link>
          </div>
        </div>
        <Image
          src="/screenshot.png"
          alt="screenshot of activity logger app"
          className="flex-1"
          priority
          width={1000 / 1.5}
          height={778 / 1.5}
        />
      </main>
    </div>
  );
}
