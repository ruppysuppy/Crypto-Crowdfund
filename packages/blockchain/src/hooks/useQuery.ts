import { useLocation } from 'react-router';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default useQuery;
