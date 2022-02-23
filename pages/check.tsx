import {
  FlashMessage,
  CenteredLayout,
  SlideOver,
  labelClasses,
  inputClasses,
  h2Classes,
  defaultButtonClasses,
  selectClasses,
  linkClasses,
} from '../components/ui';

const CheckComponents = () => {
  return (
    <CenteredLayout>
      <SlideOver title="Add Modal">
        <label htmlFor="name" className={labelClasses} />
        <input className={inputClasses} id="name" />
      </SlideOver>
      <h2 className={h2Classes}>Button</h2>
      <button className={defaultButtonClasses}>
        <svg
          className="fill-current w-4 h-4 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </button>
      <h2 className={h2Classes}>Select</h2>
      <label htmlFor="select" className={labelClasses} />
      <select className={selectClasses} id="select">
        <option>New Mexico</option>
        <option>New York</option>
        <option>New Jersey</option>
        <option>New Hampshire</option>
      </select>
      <h2 className={h2Classes}>Link Component</h2>
      <a className={linkClasses} href="https://www.google.com">
        Google
      </a>
      <h2 className={h2Classes}>Flash Message</h2>
      <FlashMessage
        message="Something not ideal might be happening"
        title="Be warned"
        type="success"
      />
    </CenteredLayout>
  );
};

export default CheckComponents;
