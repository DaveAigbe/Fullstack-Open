const Greet = (props) => {
  return (
      <div>
        <p>
          How are you {props.name}?
        </p>
        <p>
          Data shows that in 10 years you will be: {props.age} years old.
        </p>
      </div>
  );
};

const App = () => {
  const name = 'Dave';
  const age = 22;
  return (
      <div>
        <h1>Greetings , {name}</h1>
        <Greet name={name} age={age + 10} />
      </div>
  );
};
// Edited


export default App;