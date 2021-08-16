import { useRef, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

type Time = Date;

function App() {
  const { register, handleSubmit } = useForm();
  const [time, setTime] = useState<Time>(() => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(15);
    date.setSeconds(0);
    return date;
  });
  const [isRunningTimer, setIsRunningTimer] = useState<boolean>(false);
  const interval = useRef<any>();

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
    if (isRunningTimer) {
      setIsRunningTimer(false);
      clearInterval(interval.current);
      return;
    }
    setIsRunningTimer(true);
    interval.current = setInterval(() => {
      setTime((cTime) => {
        let s = new Date();
        s.setHours(cTime.getHours());
        s.setMinutes(cTime.getMinutes());
        s.setSeconds(cTime.getSeconds() - 1);

        return s;
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
      <button id='start' onClick={() => handleStartClick()}>
        {!isRunningTimer ? 'Start' : 'Stop'}
      </button>
      <div className='timer-container'>
        <p>
          {`${time.getHours() === 0 ? '00' : time.getHours()}`}:
          {`${time.getMinutes() === 0 ? '00' : time.getMinutes()}`}:
          {`${time.getSeconds() === 0 ? '00' : time.getSeconds()}`}
        </p>
      </div>
    </div>
  );
}

export default App;
