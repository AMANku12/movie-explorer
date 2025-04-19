import { useEffect, useState } from "react";

function useDebounce(value, delay){
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        // Set a timeout to update the debounced value after the specified delay
        const timer = setTimeout(()=>{
            setDebouncedValue(value);
        },delay);

        // Clear the timeout if the value or delay changes before the timeout completes
        // This prevents the debounced value from updating too soon
        return ()=>{
            clearTimeout(timer);
        }
    },[delay, value]);
    
    return debouncedValue;
}

export default useDebounce;