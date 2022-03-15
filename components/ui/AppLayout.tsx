import { Fragment, ReactNode, useContext, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { classNames, useProfile } from '../../utils';
import { ModalProvider } from '../modal';
import { FlashMessageContext } from '../FlashMessage';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { profile, isLoading, isError } = useProfile();
  const { setFlashMessages } = useContext(FlashMessageContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch('/api/logout');
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Logged out',
            message: 'You have successfully logged out',
            type: 'success',
          },
        ]);
      router.push('/signin');
    } catch (err) {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Error logging out',
            message: 'There was an error logging you out',
            type: 'error',
          },
        ]);
    } finally {
      setLoading(false);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Your Preferences', href: '/preferences' },
    { name: 'Activities', href: '/activities' },
  ];

  const removeTrailingSlashAndCapitalize = (s: string) => {
    return s.replace(/\//g, '').replace(/^\w/, (c) => c.toUpperCase());
  };

  const pageTitle =
    router.pathname === '/dashboard'
      ? moment().format('LL')
      : removeTrailingSlashAndCapitalize(router.pathname);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error getting your profile!</div>;
  }

  if (loading) {
    return <div>Logging you out...</div>;
  }

  return (
    <ModalProvider>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-blue-700">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <p className="text-white">Time Tracker</p>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item, id) => {
                          const isCurrent = router.pathname === item.href;
                          return (
                            <Link key={item.name} href={item.href}>
                              <a
                                className={classNames(
                                  isCurrent
                                    ? 'bg-blue-900 text-white'
                                    : 'text-blue-300 hover:bg-blue-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={isCurrent ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-blue-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <AiOutlineUser className="border-2 border-gray-400 rounded-full p-1 h-8 w-8 text-gray-400" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active ? 'bg-blue-100' : '',
                                    'block px-4 py-2 text-sm text-blue-700 cursor-pointer'
                                  )}
                                  onClick={handleLogout} // TODO
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <AiOutlineClose
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <AiOutlineMenu
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => {
                    const isCurrent = router.pathname === item.href;
                    return (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          isCurrent
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={isCurrent ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    );
                  })}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <AiOutlineUser className="rounded-full p-1 h-8 w-8 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {profile.firstName + ' ' + profile.lastName}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Disclosure.Button
                      as="a"
                      onClick={handleLogout}
                      className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 font-display">
              {pageTitle}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            {children}
            {/* /End replace */}
          </div>
        </main>
      </div>
    </ModalProvider>
  );
};
