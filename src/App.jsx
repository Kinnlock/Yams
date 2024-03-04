import { useGetPastriesQuery, useGetWinQuery } from './storage/game'


function App() {
  const { pastries, error, isLoading } = useGetPastriesQuery();
  const { win, error:e, isLoading:i } = useGetWinQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (pastries) {
    return (
      <>
        {pastries.map((pastrie) => (
          <p key={pastrie.id}>{pastrie.name}</p>
        ))}
      </>
    );
  }
}

export default App
