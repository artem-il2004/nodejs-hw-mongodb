
export const sortList = ["asc","desc"];


export const parseSortParams = ({ sortBy, sortOrder},sortFields ) => {
    const parsed = sortList.includes(sortOrder) ? sortOrder : sortList[0]; 
    const parsedSortBy = sortFields.includes(sortBy) ? sortBy : "_id";
    return {
        sortBy: parsedSortBy,
        sortOrder: parsed,

    };
 };