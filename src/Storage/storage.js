export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('myContextState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.log('Error loading state from localStorage:', error);
      return undefined;
    }
  };
  
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('myContextState', serializedState);
  } catch (error) {
    console.log('Error saving state to localStorage:', error);
  }
};