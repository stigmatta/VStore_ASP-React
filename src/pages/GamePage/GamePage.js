import './GamePage.css';

import PageTitle from '../../components/PageTitle';
import SliderSyncing from '../../components/SliderSyncing';

import Gallery1 from '../../images/gallery-marvel.jpg';
import Gallery2 from '../../images/gallery-marvel2.jpg';
import Gallery3 from '../../images/gallery-marvel3.jpg';
import Pegi16 from '../../images/pegi16.png';
import GameLogo from '../../images/rivals-logo.jpg';

import GreenButton from '../../components/GreenButton';
import GrayButton from '../../components/GrayButton';

import GameSectionTitle from '../../components/GameSectionTitle';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import AchievementImage from '../../images/achievement.png';
import CustomSlider from '../../components/CustomSlider';
import Select from '../../components/Select';
import Review from '../../components/Review';
import useWindowWidth from '../../hooks/useWindowWidth';


const strAndColor = {
  'Mixed': 'text-yellow-400',
  'Neutral': 'text-gray-lighter',
  'Overwhelmingly Positive': 'text-green',
  'Very Positive': 'text-green',
  'Mostly Positive': 'text-green',
  'Mostly Negative': 'text-red',
  'Overwhelmingly Negative': 'text-red'
};

const sortOptions = [
  { label: 'None', value: '' },
  { label: 'Recent', value: 'top' },
  { label: 'Popular', value: 'sale' }
];


function reviewByPercent(percent) {
  if (percent == null)
    return { text: 'Neutral', color: strAndColor['Neutral'] };
  if (percent >= 95)
    return {
      text: 'Overwhelmingly Positive',
      color: strAndColor['Overwhelmingly Positive']
    };
  if (percent >= 80)
    return { text: 'Very Positive', color: strAndColor['Very Positive'] };
  if (percent >= 70)
    return { text: 'Mostly Positive', color: strAndColor['Mostly Positive'] };
  if (percent >= 40)
    return { text: 'Mixed', color: strAndColor['Mixed'] };
  if (percent >= 20)
    return { text: 'Mostly Negative', color: strAndColor['Mostly Negative'] };

  return {
    text: 'Overwhelmingly Negative',
    color: strAndColor['Overwhelmingly Negative']
  };
}

export default function GamePage() {
  const windowWidth = useWindowWidth();
  const game = {
    title: 'Marvel Rivals',
    gallery: [
      { type: 'video', src: 'https://www.youtube.com/watch?v=-b0veB7q9P4' },
      { type: 'image', src: Gallery1 },
      { type: 'image', src: Gallery2 },
      { type: 'video', src: 'https://www.youtube.com/watch?v=DA4iVv4MARE' },
      { type: 'image', src: Gallery3 }
    ],
    logo: GameLogo,
    shortDescription:
      'Marvel Rivals is a Super Hero Team-Based PVP Shooter! Assemble an all-star Marvel squad, devise countless strategies by combining powers to form unique Team-Up skills and fight in destructible,' +
      ' ever-changing battlefields across the continually evolving Marvel universe!',
    percent: 93,
    date: new Date('2025-02-27T17:00:00'),
    developer: 'pixyda,inc.',
    publisher: 'pixyda,inc.',
    fullDescription:
      'Marvel Rivals is an exhilarating, fast-paced, team-based PvP shooter set in the Marvel Universe. Assemble your dream team of iconic Marvel superheroes, each with unique powers and abilities, and dive into intense battles where strategy, teamwork, and quick reflexes are key to victory.\n' +
      'In Marvel Rivals, every match is a chance to create dynamic team-ups, combining the powers of different heroes to unleash devastating combo attacks and abilities that can turn the tide of battle. With multiple game modes, including objective-based missions and classic deathmatches, players can test their skills in a variety of ever-changing environments, all while experiencing the vibrant, destructive, and immersive worlds inspired by the Marvel Comics universe.\n' +
      'The game features stunning, high-quality graphics that bring the iconic characters and environments to life. From epic cityscapes to alien worlds, each map is designed to push your strategic thinking and adaptability to the limit. Play with friends or challenge players from around the globe in ranked or casual matches, and rise through the ranks to prove you\'re the ultimate superhero team!\n' +
      'Whether you\'re playing as the mighty Thor, the web-slinging Spider-Man, or the powerful Hulk, Marvel Rivals offers a diverse roster of heroes and villains, each bringing their own set of powerful abilities to the battlefield. Mastering each hero\'s unique skills is essential to overcoming your opponents and dominating the competition.\n' +
      'Join the action, form your team, and prepare for the ultimate showdown. Marvel Rivals is the game where superheroes meet strategy in the most exciting battle arena ever created. Are you ready to rise and take on the challenge?'
  };

  const systemRequirements = {
    minimal: {
      os: 'Windows 7/8/10 (64-bit)',
      processor: 'Intel Core i5-2300 / AMD FX-6350',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 660 2GB / AMD Radeon HD 7870 2GB',
      storage: '20 GB available space',
      additionalInputDevice: 'Gamepad'
    },
    required: {
      os: 'Windows 10/11 (64-bit)',
      processor: 'Intel Core i7-4770 / AMD Ryzen 5 1600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1070 8GB / AMD Radeon RX Vega 56 8GB',
      storage: '20 GB available space',
      additionalInputDevice: 'Gamepad'
    }
  };

  const achievements = Array(6).fill({
    image: AchievementImage,
    title: 'Professional newbies',
    description: 'Complete the game at the easiest difficulty',
    percent: 35
  });

  const reviews = [
    {
      isLiked: true,
      user: 'dimabalawov',
      date: new Date('2025-02-27T17:00:00'),
      text: 'It\'s a shame this game has gotten the hate it has. It\'s actually pretty awesome.'
    },
    {
      isLiked: false,
      user: 'johnDoe123',
      date: new Date('2025-03-12T14:30:00'),
      text: 'Love the game! The world is huge, and the quests are engaging. Though the combat could use more variety, it\'s overall an enjoyable experience. The side content adds a lot of depth, and the graphics are stunning.'
    },
    {
      isLiked: true,
      user: 'gamer456',
      date: new Date('2025-01-05T19:00:00'),
      text: 'The story is fantastic, but the gameplay can be a bit tedious at times. The world-building is top-notch, and the lore is rich and detailed. The combat system is solid, but it could use more depth.'
    },
    {
      isLiked: false,
      user: 'randomPlayer',
      date: new Date('2025-04-02T10:00:00'),
      text: 'Not a fan of the mechanics, but the world-building is phenomenal.'
    },
    {
      isLiked: true,
      user: 'elite_gamer',
      date: new Date('2025-03-20T22:00:00'),
      text: 'I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting.' +
        ' The open-world aspect is great, but the game could use more variety in enemies.I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting.' +
        ' The open-world aspect is great, but the game could use more variety in enemies.I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting.' +
        ' The open-world aspect is great, but the game could use more variety in enemies.I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting.' +
        ' The open-world aspect is great, but the game could use more variety in enemies.I wish the controls were smoother, but overall, it’s a fun experience. The combat feels engaging once you get the hang of it, and the variety of skills available makes it interesting.' +
        ' The open-world aspect is great, but the game could use more variety in enemies.'
    },
    {
      isLiked: false,
      user: 'gamer456',
      date: new Date('2025-02-25T11:00:00'),
      text: 'Great game for fans of action RPGs. The loot system is addictive, but the combat can be repetitive.'
    },
    {
      isLiked: true,
      user: 'dimabalawov',
      date: new Date('2025-01-17T16:00:00'),
      text: 'Didn\'t like it much, but the graphics are amazing. The combat left me wanting more.'
    },
    {
      isLiked: true,
      user: 'johnDoe123',
      date: new Date('2025-03-07T13:00:00'),
      text: 'An underrated gem! Loved exploring the world and finding hidden secrets. The side quests are some of the best I\'ve ever played, and they often tell more compelling stories than the main quest.'
    },
    {
      isLiked: false,
      user: 'randomPlayer',
      date: new Date('2025-02-18T18:00:00'),
      text: 'It’s okay. The game has its flaws, but it can be fun at times.'
    }
  ];


  const reviewStrColor = reviewByPercent(game.percent);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const [sortValue, setSortValue] = React.useState('');


  return (
    <div>
      <PageTitle title={game.title} />
      <div className="flex flex-col lg:flex-row justify-between gap-6 mt-8">
        <div name="first-col" className="first-col flex flex-col flex-1">
          <SliderSyncing items={game.gallery} />
          <GameSectionTitle title="About this game" />
          <p className={`w-[85%] ${!expanded ? 'fade-out-bottom' : ''}`}>
            {expanded
              ? game.fullDescription
              : `${game.fullDescription.slice(0, 300)}...`}
          </p>
          <div onClick={toggleExpand} className="text-green">
            {expanded ? <ShowLessSpan /> : <ShowMoreSpan />}
          </div>
          <GameSectionTitle title="System Requirements" />
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1 max-w-[43%]">
              <span className="font-bold text-bigButton mb-3">Minimum</span>
              <Requirement
                item={{ category: 'OS:', text: systemRequirements.minimal.os }}
              />
              <Requirement
                item={{
                  category: 'Processor:',
                  text: systemRequirements.minimal.processor
                }}
              />
              <Requirement
                item={{
                  category: 'Memory:',
                  text: systemRequirements.minimal.memory
                }}
              />
              <Requirement
                item={{
                  category: 'Graphics:',
                  text: systemRequirements.minimal.graphics
                }}
              />
              <Requirement
                item={{
                  category: 'Storage:',
                  text: systemRequirements.minimal.storage
                }}
              />
              <Requirement
                item={{
                  category: 'Additional Input Device',
                  text: systemRequirements.minimal.additionalInputDevice
                }}
              />
            </div>

            <div className="flex flex-col gap-1 max-w-[43%]">
              <span className="font-bold text-bigButton mb-3 ">
                Recommended
              </span>
              <Requirement
                item={{ category: 'OS:', text: systemRequirements.required.os }}
              />
              <Requirement
                item={{
                  category: 'Processor:',
                  text: systemRequirements.required.processor
                }}
              />
              <Requirement
                item={{
                  category: 'Memory:',
                  text: systemRequirements.required.memory
                }}
              />
              <Requirement
                item={{
                  category: 'Graphics:',
                  text: systemRequirements.required.graphics
                }}
              />
              <Requirement
                item={{
                  category: 'Storage:',
                  text: systemRequirements.required.storage
                }}
              />
              <Requirement
                item={{
                  category: 'Additional Input Device',
                  text: systemRequirements.required.additionalInputDevice
                }}
              />
            </div>
          </div>
        </div>

        <div name="second-col" className="flex flex-col min-w-[400px]">
          <img className="object-contain" src={game.logo} alt="Game Logo" />
          <p className="text-bigButton font-normal text-left opacity-90 mt-2">
            {game.shortDescription}
          </p>
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex justify-between">
              <span className="font-normal opacity-80">All reviews:</span>
              <span className={strAndColor[reviewStrColor.text]}>
                {reviewStrColor.text} ({game.percent}%)
              </span>

            </div>
            <div className="flex justify-between">
              <span className="font-normal opacity-80">Release date:</span>
              <span>{game.date.toLocaleDateString('en-gb')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-normal opacity-80">Developer:</span>
              <span>{game.developer}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-normal opacity-80">Publisher:</span>
              <span>{game.publisher}</span>
            </div>
            <div className="flex justify-between h-[47px]">
              <GreenButton
                text="Add to cart"
                width="47%"
                height="100%"
                weight={700}
              />
              <GrayButton text="Wishlist" width="47%" height="100%" />
            </div>
            <div
              className="h-[129px] border-solid border border-opacity-70 rounded-md flex justify-start px-3 items-center gap-5">
              <img src={Pegi16} className="w-[87px] h-[105px]" alt="pegi-16" />
              <div className="flex flex-col gap-2">
                <span>16+</span>
                <span className="font-normal opacity-70">Mild violence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GameSectionTitle title="Achievements" />
      <CustomSlider items={achievements} componentName="AchievementForSlider" />
      <GameSectionTitle title="Customer Reviews" />
      <div className="flex flex-col">
        <span className="text-highlightedText font-normal">Review score:</span>
        <span className={`${strAndColor[reviewStrColor.text]} text-title`}>
          {reviewStrColor.text}
        </span>
        <div className="mt-5">
          <Select
            label="Sort by"
            onChange={(e) => setSortValue(e.target.value)}
            value={sortValue}
            items={sortOptions}
          />
        </div>
        {windowWidth > 1050 ? (
            <div className="flex gap-x-4 mt-10">
              <div className="flex flex-col gap-y-4 flex-1">
                {reviews.filter((_, i) => i % 2 === 0).map((item, index) => (
                  <Review key={index} item={item} />
                ))}
              </div>
              <div className="flex flex-col gap-y-4 flex-1">
                {reviews.filter((_, i) => i % 2 !== 0).map((item, index) => (
                  <Review key={index} item={item} />
                ))}
              </div>
            </div>
          ) :
          (
            <div className="flex flex-col w-full gap-4">
              {reviews.map((item, index) => (
                <Review key={index} item={item} />
              ))}
            </div>
          )
        }


      </div>
    </div>
  );
}

function ShowMoreSpan() {
  return (
    <div className="flex flex-row">
      <span className="text-green hover:cursor-pointer">Show more</span>
      <ChevronDown size={24} color="#7bc74d" />
    </div>
  );
}

function ShowLessSpan() {
  return (
    <div className="flex flex-row">
      <span className="text-green hover:cursor-pointer">Show less</span>
      <ChevronUp size={24} color="#7bc74d" />
    </div>
  );
}

function Requirement({ item }) {
  return (
    <div className="flex gap-2 self-start">
      <span className="font-semibold text-text opacity-70">
        {item.category}
      </span>
      <span>{item.text}</span>
    </div>
  );
}
