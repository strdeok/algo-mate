import "./App.css";

function App() {
  return (
    <>
      <button
        onClick={() => {
          fetch("/api/search/user?query=ejraks1548")
            .then((res) => {
              console.log(res);
            })
            .catch((error) => console.log(error));
        }}
      >
        호출
      </button>
    </>
  );
}

export default App;
