import useCounterStore from './store/counterStore'

function Login() {

  // const toggletheme = () =>{
  //   document.documentElement.classList.toggle("dark");
  // }

  const { count, increment, decrement } = useCounterStore();
  return (
    <div className="bg-background min-h-screen">
      Theme Working
      <button onClick={increment}>button inc</button>
      <button onClick={decrement}> dec {count}</button>
    </div>
  )
}

export default Login