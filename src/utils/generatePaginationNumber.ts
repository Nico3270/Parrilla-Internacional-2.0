

export const generatePagination = (currentPage:number, totalPages:number ) => {
    ///Si el número total de páginas es 7 o menos
    //Se muestran todas las páginas sin puntos suspensivos
    if( totalPages <= 7){
        return Array.from({length:totalPages}, (_,i) => i + 1);
    };

    //Mayor a 7 páginas  - Si la página está entre las primeras 3 páginas
    // mostrar las primeras 3, puntos suspensivos y las últimas 2

    if(currentPage <= 3){
        return [1,2,3, "...", totalPages - 1, totalPages];
    };

    //Si la página actual esta entre las últimas 3 páginas, mostrar las primeras 2
    // puntos suspensivos y las últimas 3 páginas
    if (currentPage >= totalPages -2 ){
        return [1,2,"...", totalPages- 2, totalPages-1, totalPages];
    }

    //Si la página actual esta en otro lugar medio
    // mostrar la primera página, puntos suspensivos, la página actual y vecinos

    return [
        1, "....", currentPage-1, currentPage, currentPage+1, "....", totalPages
    ];
}





