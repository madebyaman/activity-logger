import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function HomeComponent() {
  return (
    <div className="bg-white mx-auto mt-4 mb-8 px-4">
      <Head>
        <title>Activity Logger App</title>
      </Head>
      <header className="max-w-7xl mx-auto py-6 px-4 sm:px-4 lg:px-8">
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
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block mb-2">Take control of your time</span>
                <span className="block">
                  Signup today and start using the app.
                </span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-200">
                Activity Logger is an app to help you keep track of your time.
                After every few hours come back to the app and enter what you
                were doing in that time.
              </p>
              <Link
                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50"
                href="/signin"
              >
                Start tracking your time
              </Link>
            </div>
          </div>
          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <Image
              className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="/screenshot.png"
              alt="App screenshot"
              priority
              width={1000}
              height={778}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
