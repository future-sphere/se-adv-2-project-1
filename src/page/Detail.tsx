import { LightningBoltIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { championProfilePicture } from '../constants';
import { capitalizeFirstLetter } from '../helpers';
import { Champion } from '../interface';

type Props = {};

const DetailPage = (props: Props) => {
  const { name } = useParams();
  const [champion, setChampion] = React.useState<Champion | null>(null);

  React.useEffect(() => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion/${name}.json`
      )
      .then((res) => {
        setChampion(res.data.data[name as string]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(champion);

  return (
    champion && (
      <div className='w-full max-w-5xl px-4 mx-auto'>
        <div className='flex items-center my-4 space-x-4'>
          <img
            src={championProfilePicture + champion?.image.full}
            alt={champion?.name}
            className='w-16 h-16 rounded-full'
          />
          <h1 className='my-4 text-3xl font-semibold'>
            {champion?.name} {champion?.title}
          </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4'>
          {champion?.info &&
            Object.entries(champion.info).map(([key, value]) => (
              <span className='flex items-center mb-2 space-x-1 text-lg font-medium'>
                {capitalizeFirstLetter(key)}:
                {Array(value)
                  .fill(0)
                  .map((_, index) => (
                    <LightningBoltIcon
                      className='w-5 h-5 text-red-500'
                      key={index}
                    />
                  ))}
              </span>
            ))}
        </div>
        <p className='text-gray-600 text-md'>{champion?.lore}</p>
        <div className='grid grid-cols-1 gap-4 my-4 md:grid-cols-5'>
          <div className='p-4 rounded-lg shadow-lg bg-slate-100'>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/12.16.1/img/passive/${champion.passive.image.full}`}
              className='w-10 h-10 rounded-full'
              alt=''
            />
            <p className='mt-2 text-sm font-medium'>
              Passive: {champion?.passive.name}
            </p>
          </div>
          {champion.spells.map((spell) => (
            <div
              className='p-4 rounded-lg shadow-lg bg-slate-100'
              key={spell.name}
            >
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/${spell.image.full}`}
                className='w-10 h-10 rounded-full'
                alt=''
              />
              <p className='mt-2 text-sm font-medium'>{spell.name}</p>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 gap-4 my-2 md:grid-cols-2'>
          <div className='p-4 bg-red-100 rounded-lg'>
            <p className='mb-2 text-lg font-semibold'>Enemy tips</p>
            <ul className='pl-4 space-y-2 text-sm list-disc'>
              {champion?.enemytips.map((tip) => (
                <li>{tip}</li>
              ))}
            </ul>
          </div>
          <div className='p-4 bg-green-100 rounded-lg'>
            <p className='mb-2 text-lg font-semibold'>Ally tips</p>
            <ul className='pl-4 space-y-2 text-sm list-disc'>
              {champion?.allytips.map((tip) => (
                <li>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 my-4 md:grid-cols-3 lg:grid-cols-4'>
          {champion &&
            champion.skins.map((skin, index) => {
              return (
                <div
                  key={index}
                  className='flex items-center justify-center rounded-lg'
                >
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${skin.num}.jpg`}
                    alt={skin.name}
                    className='rounded-lg'
                  />
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default DetailPage;
