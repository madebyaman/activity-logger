import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useProfile } from '@/utils';

export default function HomeComponent() {
  const { profile } = useProfile();

  return (
    <>
      <Head>
        <title>Activity Logger App</title>
      </Head>
      <div className="relative bg-white overflow-hidden">
        <div
          className="hidden lg:block lg:absolute lg:inset-0"
          aria-hidden="true"
        >
          <svg
            className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
            width={640}
            height={784}
            fill="none"
            viewBox="0 0 640 784"
          >
            <defs>
              <pattern
                id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                x={118}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              y={72}
              width={640}
              height={640}
              className="text-gray-50"
              fill="white"
            />
            <rect
              x={118}
              width={404}
              height={784}
              fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
            />
          </svg>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 mt-2 md:mt-6"
            aria-label="Global"
          >
            <p className="text-sm font-bold text-gray-700 uppercase">
              Activity Logger App
            </p>
            <div className="hidden md:block text-right">
              <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                <Link
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  href={profile ? '/dashboard' : '/signin'}
                >
                  {profile ? 'Dashboard' : 'Login'}
                </Link>
              </span>
            </div>
          </nav>
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    Take control of your time
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Activity Logger is an app to help you keep track of your time.
                  After every few hours come back to the app and enter what you
                  were doing in that time.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <p className="text-sm font-medium text-gray-700">
                    Sign up to start using the app.
                  </p>
                  <div className="mt-2">
                    <Link
                      href="/signup"
                      className="inline-block rounded-lg bg-blue-500 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-500 hover:bg-blue-700 hover:ring-blue-700"
                    >
                      Get started
                      <span className="ml-2 text-blue-200" aria-hidden="true">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <svg
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                  width={640}
                  height={784}
                  fill="none"
                  viewBox="0 0 640 784"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                      x={118}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    y={72}
                    width={640}
                    height={640}
                    className="text-gray-50"
                    fill="currentColor"
                  />
                  <rect
                    x={118}
                    width={404}
                    height={784}
                    fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                  />
                </svg>
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <Link
                    className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    href="https://www.loom.com/share/a95eec8cb13e4dcab1936973b9a09cd2"
                    target={'_blank'}
                    title="Watch the app video to learn more"
                  >
                    <span className="sr-only">
                      Watch our video to learn more
                    </span>
                    <Image
                      width={300}
                      height={200}
                      className="w-full"
                      priority
                      alt="App demo gif"
                      src="https://cdn.loom.com/sessions/thumbnails/a95eec8cb13e4dcab1936973b9a09cd2-with-play.gif"
                    />
                    <div
                      className="absolute inset-0 w-full h-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-20 w-20 text-indigo-500"
                        fill="currentColor"
                        viewBox="0 0 84 84"
                      >
                        <circle
                          opacity="0.9"
                          cx={42}
                          cy={42}
                          r={42}
                          fill="white"
                        />
                        <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* <div className="isolate bg-white">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mx-auto mt-4 mb-8 px-4">
          <header className="max-w-7xl mx-auto py-6 px-4 sm:px-4 lg:px-8">
            <nav>
              <ul className="flex justify-between items-center">
                <li className="uppercase text-sm font-semibold text-gray-700">
                  Activity Logger App
                </li>
                <li>
                  <Link
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    href={profile ? '/dashboard' : '/signin'}
                  >
                    {profile ? 'Dashboard' : 'Login'}
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <div className="relative px-6 lg:px-8">
              <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                <div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl"></h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center"></p>
                    <div className="mt-8 flex gap-x-4 sm:justify-center">
                      <Link
                        href="/signin"
                        className="inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-blue-700 hover:ring-blue-700"
                      >
                        Get started
                        <span className="ml-2 text-blue-200" aria-hidden="true">
                          &rarr;
                        </span>
                      </Link>
                      <Link
                        href="https://www.loom.com/share/a95eec8cb13e4dcab1936973b9a09cd2"
                        target={'_blank'}
                        className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                      >
                        Watch Demo in Loom
                        <span className="ml-2 text-gray-400" aria-hidden="true">
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <svg
                      className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                      viewBox="0 0 1155 678"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                        fillOpacity=".3"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                      />
                      <defs>
                        <linearGradient
                          id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                          x1="1155.49"
                          x2="-78.208"
                          y1=".177"
                          y2="474.645"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#9089FC" />
                          <stop offset={1} stopColor="#FF80B5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div> */}
    </>
  );
}
