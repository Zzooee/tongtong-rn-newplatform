export const UPDATE_KEYWORD = 'UPDATE_KEYWORD'

export function updateKeyword(filterText) {
    return {
        type: 'UPDATE_KEYWORD',
        payload: {
            filterText: filterText
        }
    }
}
