export const loggerMiddleware=(store)=>{
    return function(next){
        return function(action){
            console.log("[Log]"+""+ action.type+""+new Date().toISOString());
            const result = next(action);
            console.log("Next state:", store.getState());
            return result;
        }
    }
}