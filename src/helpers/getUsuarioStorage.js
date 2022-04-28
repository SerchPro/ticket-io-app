


export const getUsuarioStorage = () =>{
    return {
        agent: localStorage.getItem('agent') || null,
        desk: localStorage.getItem('desk') || null,
    }
}