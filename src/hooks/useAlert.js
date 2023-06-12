import { useContext } from 'react';
import AlertContext from './Alerts';

const useAlert = () => useContext(AlertContext);

export default useAlert;