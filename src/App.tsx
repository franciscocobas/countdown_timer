import { useEffect, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

type Time = Date;

function App() {
  const { register, handleSubmit } = useForm();
  const [time, setTime] = useState<Time>(new Date(0, 0, 0));

  const onSubmit = ({
    hours,
    minutes,
    seconds,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    setTime(new Date(2021, 8, 5, hours, minutes, seconds));
  };

  const handleStartClick = () => {
    setInterval(() => {
      setTime((time) => {
        let s = time.getSeconds();
        console.log(s);
        time.setSeconds(s--);
        console.log(time);
        return time;
      });
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='number' {...register('hours')} />
        <input type='number' {...register('minutes')} />
        <input type='number' {...register('seconds')} />
        <button>Set</button>
      </form>
      <button onClick={() => handleStartClick()}>Start</button>
      <div className='timer-container'>
        <p>
          {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
        </p>
      </div>
    </div>
  );
}

export default App;
