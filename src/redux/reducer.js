
let _state = {
    userInfo:{
        userID:""
    }
}

const reducer = (state=_state,action)=>{
    switch(action.type){
        case 'LOGIN':
            state.userInfo = action.userInfo;
            // console.log(state)
            action.callback();
            return state;break;

        case 'ADD_TODO':
            state.todos=state.todos.concat(action.todos)
            return state;break;

        default :
            return state;break;
    }
}

export default reducer
