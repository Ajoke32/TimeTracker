import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux';

export const useCurrentSelector: TypedUseSelectorHook<RootState> = useSelector;