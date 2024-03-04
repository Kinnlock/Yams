import { useGetPastriesQuery } from './storage/game'


function App() {
  const { data, error, isLoading } = useGetPastriesQuery();
  const pastries = data

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <>
        {data.map((pastrie) => (
          <p key={pastrie.id}>{pastrie.name}</p>
        ))}
      </>
    );
  }
}

export default App
