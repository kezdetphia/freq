/**
 * Frequency Player - Generate and play healing frequencies
 * Works on iOS, Android, and Web using expo-audio
 */

/**
 * Generate a WAV file as a base64 data URI for any frequency
 * @param frequency - Frequency in Hz (e.g., 432, 528, 7.5)
 * @param durationSeconds - Duration of the tone in seconds
 * @returns Data URI string for the WAV file
 */
export function generateToneDataUri(frequency: number, durationSeconds: number = 30): string {
  const sampleRate = 44100;
  const numSamples = durationSeconds * sampleRate;
  const amplitude = 0.25; // 25% volume to prevent distortion

  // Create WAV file buffer
  const dataSize = numSamples * 2; // 16-bit samples
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // Helper to write string to buffer
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // Write WAV header
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Format chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Generate sine wave samples
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * frequency * t) * amplitude;
    const value = Math.max(-1, Math.min(1, sample)) * 32767;
    view.setInt16(offset, value, true);
    offset += 2;
  }

  // Convert to base64
  const bytes = new Uint8Array(buffer);
  let base64: string;

  // Use Buffer if available (React Native), otherwise btoa (web)
  if (typeof Buffer !== 'undefined') {
    base64 = Buffer.from(bytes).toString('base64');
  } else {
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    base64 = btoa(binary);
  }

  return `data:audio/wav;base64,${base64}`;
}
