import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Index() {
  return (
    <div className="container mx-auto mt-4 mb-8">
      <Head>
        <title>Activity Logger App</title>
      </Head>
      <header>
        <nav className="flex justify-between">
          <h4 className="uppercase text-sm font-semibold text-gray-700">
            Activity Logger App
          </h4>
          <Link href="/signin" passHref>
            <a className="uppercase text-sm text-gray-600 hover:text-gray-800 hover:underline">
              Login
            </a>
          </Link>
        </nav>
      </header>
      <main className="mt-20 flex justify-between items-center" id="main">
        <div>
          <h1 className="text-6xl font-bold text-gray-800">
            Take back control of your time
          </h1>
          <div className="text-lg text-gray-600 mt-4">
            <p>
              Activity Logger is an app to help you keep track of your time.
              After every few hours come back to the app and enter what you were
              doing in that time.
            </p>
          </div>
          <Link passHref href="/signin">
            <a className="px-5 py-4 mt-4 inline-block uppercase bg-blue-600 text-gray-200 hover:bg-blue-700 rounded font-medium">
              Start tracking your time
            </a>
          </Link>
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
