const AppError=(err)=>{
    return err?.response && err?.response?.data?.message ? err.response.data.message : err.data.message
}
export {
    AppError
}