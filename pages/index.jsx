/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import {CgChevronUpO, CgChevronDownO} from 'react-icons/cg';

import MainLayout from '@components/MainLayout';
import {
  Section1Banner,
  Section2LootboxInfo,
  Section3GameTrailer,
  Section4GameRule,
  Section5DailyQuest,
  Section6NFTCards,
  Section7Events,
  Section8Stages,
  Section9LootboxList,
  Section10Roadmap,
  Section11Join,
} from '@sections/pageHome';

const Home = () => {
  const anchors = [
    'welcome',
    'lootbox-info',
    'game-trailer',
    'game-rule',
    'daily-quest',
    'nft-cards',
    'events',
    'stages',
    'lootbox-list',
    'roadmap',
    'join',
  ];

  const [activeSection, setActiveSection] = React.useState('');
  const [FPA, setFPA] = React.useState(null);

  return (
    <MainLayout>
      <script type="text/javascript" src="vendors/scrolloverflow.min.js" />
      <main className="page-home flex-grow">
        <ReactFullpage
          scrollingSpeed={750}
          navigation
          navigationPosition="right"
          anchors={anchors}
          afterLoad={(origin, destination) => {
            setActiveSection(destination.anchor);
          }}
          scrollOverflow
          render={({fullpageApi}) => {
            setFPA(fullpageApi);

            return (
              <ReactFullpage.Wrapper>
                <div className="section">
                  <Section1Banner />
                </div>
                <div className="section">
                  <Section2LootboxInfo isLoaded={activeSection === anchors[1]} />
                </div>
                <div className="section">
                  <Section3GameTrailer isLoaded={activeSection === anchors[2]} />
                </div>
                <div className="section">
                  <Section4GameRule />
                </div>
                <div className="section">
                  <Section5DailyQuest />
                </div>
                <div className="section">
                  <Section6NFTCards />
                </div>
                <div className="section">
                  <Section7Events />
                </div>
                <div className="section">
                  <Section8Stages />
                </div>
                <div className="section">
                  <Section9LootboxList />
                </div>
                <div className="section">
                  <Section10Roadmap />
                </div>
                <div className="section">
                  <Section11Join />
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />

        <div className="fixed right-[17px] top-[50%] mt-[130px] bg-[#22222233] px-[4px] py-[8px] rounded-[16px] flex flex-col gap-2">
          <button
            className={activeSection === anchors[0] ? 'cursor-default' : 'cursor-pointer'}
            onClick={() => {
              FPA.moveSectionUp();
            }}
          >
            <CgChevronUpO size="20" color={activeSection === anchors[0] ? '#FFFFFF66' : '#FFFFFF'} />
          </button>
          <button
            className={activeSection === anchors[anchors.length - 1] ? 'cursor-default' : 'cursor-pointer'}
            onClick={() => {
              FPA.moveSectionDown();
            }}
          >
            <CgChevronDownO size="20" color={activeSection === anchors[anchors.length - 1] ? '#FFFFFF66' : '#FFFFFF'} />
          </button>
        </div>
      </main>
    </MainLayout>
  );
};

export default Home;
