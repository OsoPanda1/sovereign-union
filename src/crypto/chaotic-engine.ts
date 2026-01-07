/**
 * TAMV MD-X4™ CHAOTIC ENCRYPTION ENGINE
 * Motor de Cifrado Caótico 4D para la Federación Korima
 * 
 * Basado en Mapas Logísticos de Bifurcación Cuántica
 * x_{n+1} = r · x_n · (1 - x_n)
 */

export class TAMVChaoticEngine {
  private x: number;
  private r: number;
  private seed: number;

  constructor(seed?: number) {
    // Semilla cuántica EOCT (Edwin Oswaldo Castillo Trejo)
    this.seed = seed || 0.35461234;
    this.x = this.seed;
    this.r = 3.9999; // Coeficiente de caos máximo
  }

  /**
   * Genera el siguiente valor caótico
   */
  private nextChaotic(): number {
    this.x = this.r * this.x * (1 - this.x);
    return this.x;
  }

  /**
   * Resetea el estado del motor
   */
  reset(): void {
    this.x = this.seed;
  }

  /**
   * Genera una secuencia caótica de N valores
   */
  generateSequence(length: number): number[] {
    const sequence: number[] = [];
    for (let i = 0; i < length; i++) {
      sequence.push(this.nextChaotic());
    }
    return sequence;
  }

  /**
   * Cifra un string usando XOR con flujo caótico
   */
  encrypt(data: string): string {
    this.reset();
    let result = '';
    for (let i = 0; i < data.length; i++) {
      const chaoticValue = this.nextChaotic();
      const key = Math.floor(chaoticValue * 255);
      result += String.fromCharCode(data.charCodeAt(i) ^ key);
    }
    return btoa(result);
  }

  /**
   * Descifra un string cifrado
   */
  decrypt(encryptedData: string): string {
    this.reset();
    const decoded = atob(encryptedData);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const chaoticValue = this.nextChaotic();
      const key = Math.floor(chaoticValue * 255);
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key);
    }
    return result;
  }

  /**
   * Procesa un buffer de bytes (para frames de video)
   */
  processBuffer(data: Uint8Array): Uint8Array {
    this.reset();
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      const chaoticValue = this.nextChaotic();
      const mask = Math.floor(chaoticValue * 255);
      result[i] = data[i] ^ mask;
    }
    return result;
  }

  /**
   * Genera un hash caótico único para identificadores
   */
  generateChaoticHash(input: string): string {
    this.reset();
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const chaoticValue = this.nextChaotic();
      hash = ((hash << 5) - hash + input.charCodeAt(i) * Math.floor(chaoticValue * 1000)) | 0;
    }
    return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
  }

  /**
   * Obtiene el estado actual del caos (para visualización)
   */
  getCurrentState(): { x: number; entropy: number } {
    return {
      x: this.x,
      entropy: Math.abs(Math.sin(this.x * Math.PI * 100)) * 100
    };
  }
}

// Instancia singleton para uso global
export const chaoticEngine = new TAMVChaoticEngine();

// Utilidades de hash para MSR Ledger
export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(36);
  const chaos = chaoticEngine.generateChaoticHash(timestamp);
  return `MSR-${chaos}-${timestamp.toUpperCase()}`;
};

export const generateUserId = (email: string): string => {
  return `KORIMA-${chaoticEngine.generateChaoticHash(email)}`;
};
