import React, {useReducer, useEffect, useCallback , useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredient , action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return[...currentIngredient,action.ingredient];
    case'DELETE':
    return currentIngredient.filter(ing =>ing.id !== action.id);
    default:
      throw new Error('should get there ');
  }
};


const Ingredients = () => {
 const[userIngredients , dispatch]= useReducer(ingredientReducer , []);
const {isLoading , error , data , sendRequest} = useHttp()
//  const [httpState , dispatchHttp] = useReducer(httpReducer ,{loading:false , error:null})
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();


  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients);
    dispatch({type:'SET', ingredients:filteredIngredients});
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
  //   dispatchHttp({type:'SEND'})
  //   fetch('https://react-hooks-update-8ff5a-default-rtdb.firebaseio.com/ingredient.json', {
  //     method: 'POST',
  //     body: JSON.stringify(ingredient),
  //     headers: { 'Content-Type': 'application/json'}
  //   })
  //     .then(response => {
  //       dispatchHttp({type:'RESPONSE'});
  //       return response.json();
  //     })
  //     .then(responseData => {
  //       // setUserIngredients(prevIngredients => [
  //       //   ...prevIngredients,
  //       //   { id: responseData.name, ...ingredient }
  //       // ]);
  //       dispatch({type:'ADD' , ingredient:{ id: responseData.name, ...ingredient }})
  //     });
   },[]);

  const removeIngredientHandler =useCallback(ingredientId => {
    sendRequest(`https://react-hooks-update-8ff5a-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json` ,'DELETE')
  },[sendRequest]);

  const clearError = useCallback(() => {
    // dispatchHttp({type:'CLEAR'})
  },[]);
  const ingredientList = useMemo(() => {
    return<IngredientList
    ingredients={userIngredients}
    onRemoveItem={removeIngredientHandler}
  />

  },[userIngredients ,removeIngredientHandler]);

  return (
    <div className="App">
      {error&& <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
