// src/utils/fileStore.js
const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');

// in-process lock map to avoid concurrent writes in same process
const locks = new Map();
async function _acquire(file) {
  while (locks.get(file)) await new Promise((r) => setTimeout(r, 8));
  locks.set(file, true);
}
function _release(file) { locks.delete(file); }

function _cleanString(s) {
  if (typeof s !== 'string') return s;
  // remove UTF-16/NULL weirdness and BOMs, then trim
  // strip NULs:
  s = s.replace(/\u0000/g, '');
  // strip UTF-8 BOM (EF BB BF)
  if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
  // remove leftover odd replacement characters that sometimes appear
  // (optional): s = s.replace(/\uFFFD/g, '');
  return s.trim();
}

async function readJSON(filename) {
  const p = path.join(dataDir, filename);
  try {
    let raw = await fs.readFile(p);
    // try decode as utf8 string
    let text;
    try {
      text = raw.toString('utf8');
    } catch (e) {
      // fallback to utf16le
      try { text = raw.toString('utf16le'); } catch (e2) { text = ''; }
    }
    text = _cleanString(text);
    if (!text) {
      // empty -> treat as empty array
      return [];
    }
    try {
      return JSON.parse(text);
    } catch (err) {
      // if parse fails, try to recover by removing BOM / non-printables again
      const cleaned = text.replace(/[\u0000]/g, '').replace(/^\uFEFF/, '').trim();
      try { return JSON.parse(cleaned); } catch (e2) {
        // final fallback: return empty array and log
        console.warn(`[fileStore] parse failed for ${filename}. Returning []`);
        return [];
      }
    }
  } catch (err) {
    // file missing or other error -> create empty and return []
    if (err.code === 'ENOENT') {
      await writeJSON(filename, []);
      return [];
    }
    console.error('[fileStore] read error', err.message);
    return [];
  }
}

async function writeJSON(filename, obj) {
  const p = path.join(dataDir, filename);
  await _acquire(p);
  try {
    const tmp = p + '.tmp';
    await fs.writeFile(tmp, JSON.stringify(obj, null, 2), 'utf8');
    await fs.rename(tmp, p);
  } finally {
    _release(p);
  }
}

module.exports = { readJSON, writeJSON };
