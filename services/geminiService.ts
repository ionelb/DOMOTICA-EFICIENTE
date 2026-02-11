import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { PDF_CONTEXT } from '../constants';

// NOTE: It is critical to instantiate GoogleGenAI *right before* making an API call
// to ensure it always uses the most up-to-date API key from the dialog if it was opened.
// Do not instantiate it globally or when the component first renders.

/**
 * Generates an energy efficiency solution using the Gemini API based on user input and PDF context.
 * @param userDescription The user's description of their home or energy problem.
 * @returns A structured string containing the diagnosis, device proposal, and impact/savings.
 */
export async function getEnergyEfficiencySolution(userDescription: string): Promise<string> {
  let ai: GoogleGenAI | null = null;
  try {
    // Check if an API key has been selected using the aistudio API.
    // This is required for models like 'veo-3.1-generate-preview' and 'gemini-3-pro-image-preview'.
    // While 'gemini-3-pro-preview' might not strictly require it, it's good practice for consistency
    // in an AI Studio environment to ensure a key is selected.
    if (typeof window.aistudio !== 'undefined' && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // Automatically open the key selection dialog.
        await window.aistudio.openSelectKey();
        // Assume key selection was successful to mitigate race conditions.
        // The new API key will be available via process.env.API_KEY on the next GoogleGenAI instantiation.
      }
    }
    
    // Create a new GoogleGenAI instance right before the API call to ensure the latest API_KEY is used.
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

    // Using gemini-3-pro-preview for its advanced reasoning capabilities and structured output.
    const modelName = "gemini-3-pro-preview";

    const prompt = `Actúa como un Arquitecto Técnico experto en Domótica y eficiencia energética.
    Tu fuente de conocimiento principal para el diagnóstico y las propuestas es la siguiente guía técnica en formato PDF.
    
    ---
    **Contexto del PDF:**
    ${PDF_CONTEXT}
    ---
    
    El usuario describe una vivienda o un problema de consumo. Tu función es responder con una solución estructurada en 3 partes, utilizando la información del PDF y tu expertise.
    
    **Formato de respuesta requerido (usa Markdown):**
    
    **1. Diagnóstico de los problemas detectados:**
    [Analiza la descripción del usuario e identifica los problemas de eficiencia energética, relacionándolos con los conceptos del PDF (aislamiento, transmitancia U, puntos críticos, etc.). Sé específico.]
    
    **2. Propuesta de dispositivos Smart Home específicos:**
    [Basándote en el diagnóstico y la guía, propone dispositivos Smart Home que ayuden a mejorar la eficiencia. Relaciona cada dispositivo con una medida de rehabilitación del PDF (ej., termostato inteligente para control de calefacción/refrigeración, sensores de apertura para ventanas, etc.). Si no hay una relación directa, enfócate en la mejora de eficiencia energética que el dispositivo puede aportar. No uses nombres de marcas ficticias, sino tipos de dispositivos.]
    
    **3. Estimación del impacto o ahorro:**
    [Estima el ahorro energético y económico potencial, basándote en los datos del PDF o extrapolando de forma razonada. Menciona también otros impactos positivos como la mejora del confort, reducción de emisiones, etc. Indica un rango de amortización si es posible.]
    
    **Descripción del usuario:**
    ${userDescription}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7, // A balanced temperature for informative and creative responses
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 2048, // Allow for detailed responses
        // thinkingConfig: { thinkingBudget: 1024 }, // Only available for Gemini 3 and 2.5 series
      },
    });

    const solutionText = response.text;
    if (!solutionText) {
      throw new Error('No text response received from the model.');
    }
    return solutionText;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error calling Gemini API:', error);
      if (error.message.includes('Requested entity was not found.')) {
        // Handle API key issues specifically for aistudio environment
        if (typeof window.aistudio !== 'undefined' && typeof window.aistudio.openSelectKey === 'function') {
           console.log('API key might be invalid or not selected. Prompting user to select key.');
           window.aistudio.openSelectKey(); // Prompt user to select key again
           return 'Error: Parece que la clave API es inválida o no ha sido seleccionada. Por favor, selecciona una clave API válida para continuar. [ai.google.dev/gemini-api/docs/billing]';
        }
      }
      return `Error al obtener la solución: ${error.message}. Por favor, inténtalo de nuevo.`;
    }
    return 'Error desconocido al obtener la solución. Por favor, inténtalo de nuevo.';
  }
}
