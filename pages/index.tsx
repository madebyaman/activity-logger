import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Index() {
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
              <Link href="/signin" passHref>
                <a className="uppercase text-sm text-gray-600 tracking-wider font-semibold hover:text-gray-800 hover:underline">
                  Login
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main
        className="mt-20 flex flex-col gap-12 justify-between items-start sm:flex-row"
        id="main"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-800 leading-tight md:text-5xl">
            Take Back Control of Your Time
          </h1>
          <div className="text-base text-gray-600 mt-2 md:mt-4 md:text-lg">
            <p>
              Activity Logger is an app to help you keep track of your time.
              After every few hours come back to the app and enter what you were
              doing in that time.
            </p>
          </div>
          <div className="mt-6 md:mt-8">
            <Link passHref href="/signin">
              <a className="btn">Start tracking your time</a>
            </Link>
          </div>
        </div>
        <Image
          src="/screenshot.png"
          alt="screenshot of activity logger app"
          width={1000}
          height={778}
        />
      </main>
    </div>
  );
}
