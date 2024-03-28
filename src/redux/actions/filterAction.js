export const setGridView = () => async (dispatch) => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };
  
  // to set the list view
  export const setListView = () => async (dispatch) => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };
  
  // sorting function
  export const sorting = (event) => async (dispatch) => {
    let userValue = event;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };
  
  // update the filter values
  export const updateFilterValue = ({ name, value }) => ({
    type: "UPDATE_FILTERS_VALUE",
    payload: { name, value }
  });
  
  // to clear the filter
  export const clearFilters = () => async (dispatch) => {
    dispatch({ type: "CLEAR_FILTERS" });
  };