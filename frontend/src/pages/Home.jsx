const Home = ({ user }) => {
  
  return (
    <div className='max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-md'>
      <h1 className='text-3xl font-bold mb-3'>
        Welcome, {user?.name}
      </h1>
      <p className='text-gray-600'>
        You are successfully logged in.
      </p>
    </div>
  );
};

export default Home;