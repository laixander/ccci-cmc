export const useRole = () => {
    return useState<string>('user-role', () => 'ILSP Staff') // default role
}