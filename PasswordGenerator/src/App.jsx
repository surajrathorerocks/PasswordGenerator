import { useState,useCallback,useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllow, setnumberAllow] = useState(false)
  const [charallow, setcharallow] = useState(false)
  const [Password, setpassword] = useState("")
  // useRef hook
  const passwordRef = useRef(null)
  const passwordgenerator = useCallback (()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllow) str+= "01213456789"
    if (charallow) str+= "!@#$%^&*()_+{}[]?/~"
    for (let i = 0; i <length; i++) {
    let char = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(char)
      
    }
    setpassword(pass)

  },[length,numberAllow,charallow,setpassword])
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(Password)},[Password])
  useEffect(()=>{passwordgenerator()},[length,numberAllow,charallow,passwordgenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4  py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
         value={Password}
         className="outline-none w-full py-1 px-3 bg-white"
         placeholder="Password"
         readOnly
         ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}
         className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-400"
        >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
             min={6}
             max={50}
             value={length}
             onChange={(e)=>{setlength(e.target.value)}}
             className='cursor-pointer'
            />
            <label> Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllow}
              id='numberInput'
              onChange={(e)=>{
                setnumberAllow((prev)=>!prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charallow}
              id='charInput'
              onChange={(e)=>{
                setcharallow((prev)=>!prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
