import * as constants from './shopcarConstants.js'

export default (state = {}, action) => {
    let _state = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case constants.REQUESTING:
            _state.loading = true;
            break;
        case constants.REQUESTED:
            _state.loading = false;
            if(action.name){
                _state[action.name] = _state[action.name] || {};
                _state[action.name].data = action.data;
            } else {
                _state.data = action.data;
            }
            break;
        case constants.REQUESTERROR:
            _state.loading = false;
            _state.error = action.error;
            break;
    }
    return _state;
}