import { Part } from './types';

// OCR content from the provided PDF, structured for AI context.
export const PDF_CONTEXT: string = `
## EFICIENCIA Y AHORRO ENERGÉTICO: Guía práctica de la energía para la rehabilitación de edificios. El aislamiento, la mejor solución.

**Introducción:**
La rehabilitación térmica mediante aislamiento es fundamental para reducir el consumo energético. En España, más de la mitad de los edificios carecen de aislamiento adecuado. El consumo de energía de las viviendas supone el 20% del total del país, con una tendencia ascendente. España tiene una dependencia energética exterior superior al 80%. El Real Decreto 314/2006 (CTE) y la Directiva Europea de Eficiencia Energética (2002/91/CE) buscan reducir el consumo energético en edificios nuevos y existentes.

**Beneficios de la rehabilitación térmica con aislamiento:**
1.  **Ahorro energético:** Reduce las pérdidas de calor o frío, disminuyendo la energía necesaria para climatizar la vivienda.
2.  **Mejora del confort:** Mantiene una temperatura confortable constante en el interior, tanto en invierno como en verano.
3.  **Reducción de emisiones de CO2:** Menor consumo de energía implica menos emisiones de gases de efecto invernadero.
4.  **Eliminación de condensaciones y mejora acústica:** Previene la aparición de moho y reduce el ruido exterior.
5.  **Aumento del valor del edificio:** Un edificio rehabilitado térmicamente es más atractivo para alquiler o venta.

**Amortización y ahorro:**
-   Una rehabilitación térmica media puede amortizarse en **5-7 años**.
-   Considerando la vida útil del aislamiento, se puede ahorrar **8 a 9 veces** el coste de la rehabilitación.
-   Un edificio insuficientemente aislado o con más de 20 años puede lograr un ahorro del **50%** de la energía en calefacción y/o refrigeración.

**Dónde y cómo aplicar el aislamiento térmico:**
La rehabilitación térmica se puede realizar en diferentes partes del edificio:
1.  **Fachadas (muros y ventanas):**
    *   Instalación de material aislante por el exterior, interior o inyección en los muros.
    *   Sustitución de vidrios y ventanas por unidades de vidrio aislante (doble acristalamiento) con vidrio bajo emisivo y marcos con "rotura de puente térmico". El tratamiento térmico del contorno del hueco (jambas, registros de persiana, dinteles, alféizares) es crítico.
2.  **Cubiertas:** Instalación de material aislante (entre tabiquillos, vigas de madera, rastreles, con teja adherida, en cubiertas ajardinadas, con pavimento flotante).
3.  **Suelos y Techos:** Instalación de material aislante en techos en contacto con espacios habitables/no habitables, suelos sobre el terreno o en contacto con el aire exterior.
4.  **Tabiques interiores y separación con zonas comunes:** Aislamiento de tabiques entre viviendas o con cajas de escalera, ascensores, descansillos.
5.  **Instalaciones (tuberías):** Aislamiento de tuberías de agua caliente o fría, calderas, acumuladores de calor para evitar pérdidas y condensaciones.

**Tipos de edificios aplicables:**
-   Viviendas unifamiliares aisladas
-   Viviendas unifamiliares adosadas
-   Viviendas en bloque
-   Edificios del sector terciario (oficinas, centros docentes, sanitarios, etc.)
-   Recordar: viviendas construidas antes de 1980 probablemente carecen de protección térmica y sus instalaciones son ineficientes.

**Ejemplo práctico (Edificio en Guadalajara, zona climática D3):**
-   **Edificio:** Construido en 1975, 6 viviendas en bloque, 3 plantas + baja, 2 viviendas por planta, 92 m²/vivienda, 10 m² de superficie acristalada por vivienda.
-   **Fachada actual:** Ladrillo guarnecido (11.5 cm), enlucido de cemento (1 cm), cámara de aire (2 cm), ladrillo hueco (4 cm), capa de yeso (1.5 cm).
-   **Transmitancia térmica actual (U):** 1,83 W/m².K (valor alto, mal aislamiento).
-   **Sistema de calefacción:** Caldera de gas natural, 5 meses/año (Nov-Mar).
-   **Demanda anual de energía (solo calefacción):** 132 kWh/m² y año, o 895 €/vivienda/año.
-   **Solución propuesta:** Aislamiento por el exterior y aplacado de piedra natural.
    *   **Nueva fachada:** Aplacado (1 cm), Aislante térmico (1.5 m².K/W, 5-6 cm espesor), Ladrillo guarnecido (11.5 cm), Enlucido de cemento (1 cm), Cámara de aire (2 cm), Ladrillo hueco (4 cm), Capa de yeso (1.5 cm).
    *   **Nueva transmitancia térmica (U):** 0,55 W/m².K (mejora significativa).
-   **Impacto de la solución (solo fachadas):**
    *   Aumento del aislamiento en un **70%**.
    *   Reducción de las necesidades de calefacción en un **35%**.
    *   Ahorro anual por vivienda: **310 €** (gasto de 895 € a 585 €).
-   **Impacto adicional (simultáneo):**
    *   **Mejora de ventanas:** Reducción de pérdidas de calor hasta un **45%**. Ahorro anual: **400 €/vivienda**.
    *   **Mejora de cubierta:** Reducción de demanda de calefacción hasta **53,6%**. Ahorro anual: **480 €/vivienda**.
-   **Presupuesto estimado (sin subvención):** 3.800 €/vivienda.
    *   Aislamiento en fachadas: 15 €/m².
    *   Rehabilitación de cubierta: 18 €/m².
-   **Con subvención (ejemplo del 30% para >50% ahorro):** Coste total 2.660 €/vivienda. Amortización en 5 años con 480 € de ahorro anual.

**Conceptos clave:**
-   **Transmitancia Térmica (Valor U):** Indica la "facilidad" con la que el calor se escapa. Valores altos = mal aislamiento, valores bajos = mejor aislamiento.
-   **Materiales aislantes:** Mejoran la resistencia al paso del calor.
-   **Rotura de puente térmico:** En marcos de ventanas, evita la transmisión de calor/frío.
-   **Vidrio bajo emisivo:** Reduce la radiación térmica a través del vidrio.
`;

export const APP_TITLE = 'Domótica Eficiente: Asesor Energético';
export const APP_DESCRIPTION = 'Proporciona diagnósticos, propuestas de dispositivos Smart Home y estimaciones de ahorro energético.';

// Ensure process.env.API_KEY is available in the environment.
if (!process.env.API_KEY) {
  console.warn('API_KEY is not defined. Gemini API calls may fail.');
}
