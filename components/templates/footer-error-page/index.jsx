import React from 'react';

import {Button} from '@elements';
import {FiMail} from 'react-icons/fi';
import {FaDiscord, FaYoutube, FaTwitter} from 'react-icons/fa';

/* import images */
// import IconTwitter from '@images/icon/icon-twitter.png';
// import IconYoutube from '@images/icon/icon-youtube.png';
// import IconDiscord from '@images/icon/icon-discord.png';
// import IconMail from '@images/icon/icon-mail-blue.png';

const FooterError = () => (
  <>
    <footer className="relative error-page">
      <nav className="container mx-auto md:flex justify-between items-center pb-10">
        <div className="left-side flex flex-col items-center gap-10 md:gap-0 md:flex-row mb-10 md:mb-0">
          <div className="menu flex flex-col items-center ml-10 md:flex-row gap-10 md:gap-0">
            <Button
              className="px-3 flex flex-row align-center gap-3 items-center font-weight-bold"
              onClick={() => {
                window.open('mailto:support@diamondhands.com?subject=Question about (your question here)', '_blank');
              }}
            >
              <FiMail size="20" />
              <div>
                support@diamondhands.com
              </div>
            </Button>
          </div>
        </div>
        <div className="right-side flex justify-center gap-3">
          <Button
            className="social-button flex flex-row align-center gap-3 items-center font-weight-bold"
            onClick={() => {
              window.open('https://discord.gg/G89yvGYefz', '_blank');
            }}
          >
            <FaDiscord size="32" />
          </Button>

          <Button
            className="social-button flex flex-row align-center gap-3 items-center font-weight-bold"
            onClick={() => {
              window.open('https://www.youtube.com/channel/UCbx3n0yQrboWvkz__M9j5SQ', '_blank');
            }}
          >
            <FaYoutube size="32" />
          </Button>

          <Button
            className="social-button flex flex-row align-center gap-3 items-center font-weight-bold"
            onClick={() => {
              window.open('https://twitter.com/DiamondHandsOFC', '_blank');
            }}
          >
            <FaTwitter size="32" />
          </Button>
        </div>
      </nav>
    </footer>
  </>
);

export default FooterError;
