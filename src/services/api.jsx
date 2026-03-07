const BASE_URL = 'https://dummyjson.com/products';

/**
 * Obtiene los productos con paginación real (limit y skip).
  * @param {number} limit - Cantidad de productos por página (ej: 8).
   * @param {number} skip - Cuántos productos saltar (página actual * limit).
    */
    export const getProducts = async (limit = 8, skip = 0) => {
      try {
          const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
              const data = await response.json();
                  return data; // Retorna { products, total, skip, limit }
                    } catch (error) {
                        console.error("Error al obtener productos:", error);
                            return null;
                              }
                              };

                              /**
                               * Realiza una búsqueda de productos por texto.
                                * @param {string} query - Palabra clave a buscar.
                                 */
                                 export const searchProducts = async (query) => {
                                   try {
                                       const response = await fetch(`${BASE_URL}/search?q=${query}`);
                                           const data = await response.json();
                                               return data;
                                                 } catch (error) {
                                                     console.error("Error en la búsqueda:", error);
                                                         return null;
                                                           }
                                                           };

                                                           /**
                                                            * Obtiene la información detallada de un solo producto por su ID.
                                                             * @param {string|number} id - ID del producto.
                                                              */
                                                              export const getProductById = async (id) => {
                                                                try {
                                                                    const response = await fetch(`${BASE_URL}/${id}`);
                                                                        const data = await response.json();
                                                                            return data;
                                                                              } catch (error) {
                                                                                  console.error("Error al obtener el detalle:", error);
                                                                                      return null;
                                                                                        }
                                                                                        };