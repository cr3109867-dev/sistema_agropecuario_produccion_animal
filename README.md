# Sistema Agropecuario de Producción Animal

Este sistema está diseñado para apoyar el contexto rural mediante el registro de producción, control de ventas y gestión de animales. Permite administrar datos como cantidad, precio de venta, gastos mensuales y generar estadísticas útiles para la toma de decisiones.

## Mejora implementada (Semana 4)
En esta semana se realizaron mejoras significativas:
- Nuevo card 📊 ROI Total (#roiTotal) integrado en el grid.
- Refactorización con la función central `actualizarEstadisticas()` que actualiza todos los indicadores (animales, ganancia, huevos, carnes, leche, ingresos, gastos, promedio y ROI).
- Función `actualizarMejorPeorAnimal()` que muestra el mejor y peor animal con valores y ganancias.
- Soporte completo de gráficos con `crearGrafica()` (producción total) y `crearGraficaPorAnimal()` (gráfico doughnut).
- Tabla dinámica reforzada con `renderTabla()`, botón Eliminar por fila y `eliminarRegistro(index)` que borra registros y recalcula totales con persistencia en localStorage.
- Función `reiniciarTodos()` para limpieza total de variables, estadísticas y UI.
- Persistencia sólida con `cargarLocalStorage()` y `recalcularTotales()`.
- Validación de campos en `calcular()` (cantidad > 0, precio ≥ 0, gasto ≥ 0).
- Botones funcionales: Calcular, Limpiar, Exportar CSV, Reiniciar todos.
- Búsqueda activa con `buscarAnimal()` para filtrar la tabla.

## Comandos de terminal utilizados
- `echo "README del sistema" > README.md`
- `code .` (apertura del proyecto en VS Code)

## Atajos de teclado aplicados
- Ctrl + / (comentar/descomentar)
- Ctrl + P (búsqueda rápida)
- Ctrl + Shift + F (búsqueda global)

## Instrucciones de ejecución
Abrir el proyecto en VS Code y ejecutar con Live Server o abrir `index.html` en navegador.

## Reflexión técnica
Estas mejoras consolidan el sistema como una herramienta más robusta y profesional. Se fortaleció el dominio del entorno de programación, integrando validaciones, persistencia y visualización avanzada, lo que demuestra autonomía y eficiencia en el desarrollo.

