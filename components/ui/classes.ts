const baseButtonClasses = 'font-bold py-2 px-4 rounded';

export const defaultButtonClasses =
  baseButtonClasses +
  ' ' +
  'bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline';

export const disabledButtonClasses =
  baseButtonClasses + ' bg-blue-500 text-white opacity-50 cursor-not-allowed';

export const outlineButtonClasses =
  baseButtonClasses +
  ' bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent';

const baseHeadingClasses = `font-bold leading-7 text-gray-900 sm:truncate`;

export const h1Classes = `${baseHeadingClasses} text-3xl`;

export const h2Classes = `${baseHeadingClasses} text-2xl`;

export const h3Classes = `${baseHeadingClasses} text-xl`;

export const labelClasses = `block text-gray-600 text-sm font-bold mb-2`;

export const linkClasses = 'text-blue-500 hover:text-blue-800';

export const selectClasses = `block w-full shadow border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`;

export const inputClasses = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500`;
