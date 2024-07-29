
// Accessing the customApi object from the window and invoking the 'ping' channel
const func = async () => {
  const res = await window.customApi.ping()
  console.log(res)
}
// Console shows two 'pong' responses and an "I love my wife!" message
func()
console.log("I love my wife!")
func()

function App() {
  

  return (
    <>
      <h1>I love my wife!</h1>
    </>
  )
}

export default App
