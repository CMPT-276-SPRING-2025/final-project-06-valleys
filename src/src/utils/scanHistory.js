/**
 * Scanned item saved to LocalStorage
 * @param {string} type - The type of scan (url, ip, file)
 * @param {string} id - The analysis ID or identifier
 * @param {string} label - The display label (URL, IP, filename)
 */
export function saveToRecentScans(type, id, label) {
  try {
    // Get existing scans
    const storedScans = localStorage.getItem(`recent-${type}-scans`);
    let scans = storedScans ? JSON.parse(storedScans) : [];
    
    // Create new scan entry
    const newScan = {
      id,
      label,
      timestamp: new Date().toISOString()
    };
    
    // Add to beginning of array and limit to 10 items
    scans = [newScan, ...scans.filter(scan => scan.id !== id)].slice(0, 10);
    
    // Save back to localStorage
    localStorage.setItem(`recent-${type}-scans`, JSON.stringify(scans));
  } catch (error) {
    console.error("Error saving recent scan:", error);
  }
}