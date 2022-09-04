import React, { useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Champion, ChampionTag } from '../interface';
import Dropdown from '../components/Dropdown';
import { SearchIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { championProfilePicture } from '../constants';

type Props = {};

const HomePage = (props: Props) => {
  const [champions, setChampions] = React.useState<Champion[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedTag, setSelectedTag] = React.useState<ChampionTag>(
    ChampionTag.All
  );
  useEffect(() => {
    axios
      .get(
        'http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion.json'
      )
      .then((res) => {
        setChampions(Object.values(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className='w-full max-w-5xl px-4 mx-auto'>
      <form className='grid grid-cols-2 gap-2 py-4 md:grid-cols-3 lg:grid-cols-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Search By Name
          </label>
          <div className='relative mt-1 rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <SearchIcon
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
            <input
              type='search'
              name='name'
              id='name'
              className='block w-full py-2 pl-10 pr-2 border-gray-500 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Annie'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <Dropdown setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
      </form>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
        {champions
          .filter((champion) =>
            champion.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .filter(
            (champion) =>
              selectedTag === ChampionTag.All ||
              champion.tags.includes(selectedTag as ChampionTag)
          )
          .map((champion) => {
            return (
              <div
                key={champion.id}
                className='p-2 space-y-2 text-center bg-gray-100 rounded-lg shadow-sm hover:shadow-lg hover:bg-slate-100 cursor pointer hover:cursor-pointer'
                onClick={() => navigate(`/champion/${champion.name}`)}
              >
                <img
                  src={championProfilePicture + champion.image.full}
                  alt={champion.name}
                  className='w-full'
                />

                <h1 className='text-lg font-semibold'>{champion.name}</h1>
                <p className='text-xs font-medium'>{champion.title}</p>
                <div className='space-x-2'>
                  {champion.tags.map((tag) => (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className='grid grid-cols-2 gap-1 p-1 text-xs font-medium text-left'>
                  <p className=''>Attack:{champion.info.attack}</p>
                  <p className=''>Defense:{champion.info.defense}</p>
                  <p className=''>Health:{champion.stats.hp}</p>
                  <p className=''>Hpperlevel:{champion.stats.hpperlevel}</p>
                  <p className=''>Mp:{champion.stats.mp}</p>
                  <p className=''>Movement:{champion.stats.movespeed}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
