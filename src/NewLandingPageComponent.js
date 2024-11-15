import React, { useEffect, useState } from "react";

const NewLandingPageComponent = ({ nodeComponent: NodeComponent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Automate any workflow";
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="items-center justify-center lg:flex-row xl:py-24 lg:px-8 mx-auto px-6 flex flex-col overflow-hidden max-w-screen-2xl">
      <span
        class="h-full w-full items-center justify-center -z-10 inline-flex absolute inset-0 opacity-30
      [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <svg
          id="Windframe_UZseGzFhuSf"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full"
        >
          <defs>
            <pattern
              id="a-new-header02"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              patternTransform="scale(12) rotate(0)"
            >
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="hsla(0,0%,100%,1)"
              />
              <path
                d="M15 5h10v30H15zM35-5V5H5V-5zM35 35v10H5V35zM35-15h10v30H35zM55
  15v10H25V15zM15 15v10h-30V15zM35 25h10v30H35zM-5 25H5v30H-5zM-5-15H5v30H-5z"
                stroke-width="0.1"
                class="stroke-gray-900"
                fill="none"
              />
            </pattern>
          </defs>
          <rect
            width="800%"
            height="800%"
            transform="translate(0,0)"
            fill="url(#a-new-header02)"
          />
        </svg>
      </span>

      <div className="mr-auto pb-12 lg:w-1/2 lg:max-w-xl lg:pb-8 sm:pb-4 pt-10">
        <div className="mt-16 sm:mt-24 lg:mt-8">
          <span className="tracking-widest font-semibold text-sm text-gray-500 uppercase">
            — Automate any workflow
          </span>
          <p className="mt-5 text-4xl font-bold tracking-tight lg:text-6xl lg:!leading-tight">
            No-code tool for invoice automation
          </p>
          <p className="mt-5 text-lg text-gray-500">
            SwayHire helps users turn their email and Excel workflows into
            custom software—no coding required.
          </p>
          <div className="mt-12 items-start justify-start lg:flex-row lg:gap-4 lg:max-w-sm w-full flex flex-col gap-3">
            <a
              href="https://calendar.app.google/qUpMZG33fcHXhAURA"
              type="submit"
              className="disabled text-center transition duration-200 hover:bg-gray-700 rounded-md bg-gray-900 px-0.5 py-3.5 text-base font-semibold text-white shadow-sm lg:mt-0 lg:w-3/5 lg:px-2.5 lg:text-sm xl:font-bold w-full"
            >
              Know More
            </a>
          </div>
          <div className="pt-16">
            <p className="font-semibold text-lg text-gray-500">
              We can integrate your favourite solution
            </p>
            <div className="items-center mt-5 w-fit flex flex-wrap gap-8">
              <img
                src="https://www.wflow.com/files/logo-horizont.svg"
                width="65"
                height="14"
                alt="wflow"
                class="logo__image logo__image--primary is-loaded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg"
                width="14"
                height="14"
                alt="wflow"
                class="logo__image logo__image--primary is-loaded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"
                width="30"
                height="14"
                alt="wflow"
                class="logo__image logo__image--primary is-loaded"
              />
              <img
                src="https://cdn.dativery.com/cdn/logos/channels/resized/pohoda-108.png"
                width="30"
                height="14"
                alt="wflow"
                class="logo__image logo__image--primary is-loaded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/80/Workday_logo.svg"
                width="30"
                height="14"
                alt="wflow"
                class="logo__image logo__image--primary is-loaded"
              />
              <img
                src="https://www.easydoc.cz/images/frontend/logo.svg"
                width="65"
                height="20"
                alt="wflow"
                class="logo__image logo__image--primary is-loaded"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto pb-24 mt-16 lg:w-1/2 lg:flex-shrink-0">
        <div className="mx-5 relative">
          <div className="bg-tranparent rounded-full lg:size-72 absolute left-0 top-0 -ml-20 -mt-16 size-40 border border-gray-900 dark:border-gray-900"></div>
          <div className="bg-tranparent rounded-full lg:size-72 absolute left-0 top-0 -ml-14 -mt-20 size-40 border border-gray-700 dark:border-gray-950"></div>
          <div className="bg-tranparent rounded-full lg:size-72 absolute bottom-0 right-0 -mb-16 -mr-20 size-40 border border-gray-700 dark:border-gray-900"></div>
          <div className="bg-tranparent rounded-full lg:size-72 absolute bottom-0 right-0 -mb-20 -mr-14 size-40 border border-gray-900 dark:border-gray-950"></div>
          <div className="rounded-xl bg-gray-500 absolute inset-0 -m-6 -rotate-2 dark:bg-gray-800"></div>
          <div className="rounded-xl bg-white shadow-inner absolute inset-0 -m-6 rotate-1 dark:bg-gray-900/75"></div>
          {NodeComponent ? <NodeComponent /> : null}
        </div>
      </div>
    </div>
  );
};

export default NewLandingPageComponent;
