import {useReducer , useCallback} from 'react';

const httpReducer = (curhttpState, action) =>{
    switch(action.type){
      case'SEND':
      return {loading:true , error:null , data: null };
      case'RESPONSE':
      return{...curhttpState,loading:false , data:action.responseData};
      case'ERROR':
      return{loading:false ,error:action.errorMessage};
      case 'CLEAR':
        return{...curhttpState , error:null};
      default:
        throw new Error('not to get eeeoe');
    }
  };
const useHttp =() =>{
const [httpState , dispatchHttp] = useReducer(httpReducer,{loading:false , error:null , data:null});
   
    const sendRequest = useCallback((url , method , body )=>{
        dispatchHttp({type:'SEND'})
        fetch(
             url ,
            {
              method: 'method',
              body:'body',
              header:{
                  'Content-Type' :'application/json'
              }
            }
          ).then(response => {
          return response.json();

          })
          .then (responseData =>{
           dispatchHttp({type:'RESPONSE' , responseData:responseData});
          })
          .catch(error => {
            dispatchHttp({type:'ERROR',errorMessage: 'something wwent wrong !'})
          });
    },[])
  return {
      isLoading: httpState.loading,
      data:httpState.data,
      error:httpState.error,
      sendRequest:sendRequest
  };
};

export default useHttp ;