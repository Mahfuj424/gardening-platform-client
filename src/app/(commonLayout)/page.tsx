// import HomePage from '@/components/HomePage/HomePage';
import dynamic from 'next/dynamic';

const HomePage = dynamic(()=> import('@/components/HomePage/HomePage'),{ssr:false})

const Home: React.FC = () => {
  return (
    <div>
      <HomePage/>
    </div>
  );
};

export default Home;
