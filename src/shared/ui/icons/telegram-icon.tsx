import type { SVGProps } from 'react';

function TelegramIcon(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...svgProps}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M18.483 19.79v-.002l.018-.043L21.5 4.625v-.048c0-.377-.14-.706-.442-.903c-.265-.173-.57-.185-.784-.169a2.7 2.7 0 0 0-.586.12a3 3 0 0 0-.24.088l-.013.005l-16.72 6.559l-.005.002a1 1 0 0 0-.149.061a2.3 2.3 0 0 0-.341.19c-.215.148-.624.496-.555 1.048c.057.458.372.748.585.899a2 2 0 0 0 .403.22l.032.014l.01.003l.007.003l2.926.985q-.016.276.057.555l1.465 5.559a1.5 1.5 0 0 0 2.834.196l2.288-2.446l3.929 3.012l.056.024c.357.156.69.205.995.164c.305-.042.547-.17.729-.315a1.74 1.74 0 0 0 .49-.635l.008-.017l.003-.006zM7.135 13.875a.3.3 0 0 1 .13-.33l9.921-6.3s.584-.355.563 0c0 0 .104.062-.209.353c-.296.277-7.071 6.818-7.757 7.48a.3.3 0 0 0-.077.136L8.6 19.434z'
        clipRule='evenodd'
      />
    </svg>
  );
}

export default TelegramIcon;
