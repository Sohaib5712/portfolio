import { useAuthContext } from '../../hooks/useAuthContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('project_user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}