export enum MessageSender {
  User = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: Date;
}

export interface Part {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export interface Content {
  parts: Part[];
}

export interface Candidate {
  content: Content;
}

export interface GenerateContentResponse {
  candidates?: Candidate[];
  text?: string;
  // Add other properties if needed for detailed response parsing
}

// FunctionDeclaration type (for reference, not directly used in this app's current logic)
export interface FunctionDeclaration {
  name: string;
  parameters: {
    type: string;
    description?: string;
    properties?: {
      [key: string]: {
        type: string;
        description?: string;
      };
    };
    required?: string[];
  };
}

// Type enum for response schema (for reference, not directly used in this app's current logic)
export enum Type {
  TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  INTEGER = 'INTEGER',
  BOOLEAN = 'BOOLEAN',
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT',
  NULL = 'NULL',
}