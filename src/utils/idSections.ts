// Definir el tipo para los objetos en el array secciones
type Seccion = { [clave: string]: string };

const secciones: Seccion[] = [
    { "PLATOS_FUERTES": "platos_fuertes" },
    { "ENTRADAS": "entradas" },
    { "HAMBURGUESAS": "hamburguesas" },
    { "PERROS_CALIENTES": "perros_calientes" },
    { "CERVEZAS": "cervezas" },
    { "BEBIDAS_CALIENTES": "bebidas_calientes" },
    { "COCTELES": "cocteles" },
    {"PIZZA" : "pizza"}
];

export const idSecciones = (id: string): string | null => {
    for (const obj of secciones) {
        for (const clave in obj) {
            if (obj[clave] === id) {
                return clave;
            }
        }
    }
    return null;
};
