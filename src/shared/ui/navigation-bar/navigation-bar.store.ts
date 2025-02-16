import { create } from 'zustand';

interface NavBarState {
  showMenuDrawer: boolean;
}

interface NavBarActions {
  setMenuDrawer: (isOpen: boolean) => void;
}

interface NavBarStore extends NavBarState {
  actions: NavBarActions;
}

const initialState: NavBarState = {
  showMenuDrawer: false,
};

const useNavBarStore = create<NavBarStore>((set) => ({
  ...initialState,
  actions: {
    setMenuDrawer(isOpen) {
      set({ showMenuDrawer: isOpen });
    },
  },
}));

export const useMenuDrawer = () =>
  useNavBarStore((state) => state.showMenuDrawer);

export const useMenuDrawerActions = () =>
  useNavBarStore((state) => state.actions);
