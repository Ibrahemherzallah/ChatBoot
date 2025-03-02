const Input = ({placeholder,...props}) => {
  return(
    <input type="text" placeholder={placeholder} {...props}/>
  )
}
export default Input;