import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Champion } from './interface';

function App() {
  const [champions, setChampions] = React.useState<Champion[]>([]);
  useEffect(() => {
    axios
      .get(
        'http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion.json',
      )
      .then((res) => {
        setChampions(Object.values(res.data.data));
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='px-4'>
      <div className='grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'>
        {champions.map((champion) => {
          return (
            <div
              key={champion.id}
              className='p-2 space-y-2 text-center shadow-sm hover:shadow-lg hover:bg-slate-100 cursor pointer'
            >
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/${champion.image.full}`}
                alt={champion.name}
                className='w-full'
              />

              <h1 className='text-lg font-semibold'>{champion.name}</h1>
              <p className='text-base font-medium'>{champion.title}</p>
              <div className='grid grid-cols-3 gap-2 p-1 text-xs font-medium'>
                <p className=''>Attack:{champion.info.attack}</p>
                <p className=''>Defense:{champion.info.defense}</p>
                <p className=''>Health:{champion.stats.hp}</p>
                <p className=''>Hpperlevel:{champion.stats.hpperlevel}</p>
                <p className=''>Mp:{champion.stats.mp}</p>
                <p className=''>Movespeed:{champion.stats.movespeed}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
