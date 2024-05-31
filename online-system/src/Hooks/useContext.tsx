import { useContext } from 'react';
import AppContext  from '../contexts/AppContext';

//  const useAppContext = () => useContext(appContext)
    
// export default useAppContext;

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
  };