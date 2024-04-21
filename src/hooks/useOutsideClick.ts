import { useEffect, useRef } from "react";

export default function useOutsideClick (handler: any, listeningCapture = true) {

  const ref: any = useRef()

  useEffect(function(){
    function handleClick(e: Event){
      if(ref.current && !ref.current.contains(e.target)){
        handler()
      }
    }

    document.addEventListener("click", handleClick, listeningCapture)

    return () => document.removeEventListener("click", handleClick, listeningCapture)

  }, [handler])

  return ref
}