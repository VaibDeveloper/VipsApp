// vips-backend/scripts/fix-encodings.js
const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  console.error('data/ directory not found at', dataDir);
  process.exit(1);
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
if (files.length === 0) {
  console.log('No json files found in data/');
  process.exit(0);
}

files.forEach((f) => {
  const p = path.join(dataDir, f);
  const raw = fs.readFileSync(p);
  let parsed = null;
  let decodedAs = null;

  // helper: try parse from a buffer with a given decoder
  const tryParse = (buf, encoding) => {
    try {
      const s = buf.toString(encoding);
      return JSON.parse(s);
    } catch (e) {
      return null;
    }
  };

  // 1) try utf8 (normal)
  parsed = tryParse(raw, 'utf8');
  if (parsed !== null) {
    console.log('[OK] (utf8)   ', f);
    return;
  }

  // 2) strip possible utf8 BOM and try again
  if (raw.length >= 3 && raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF) {
    parsed = tryParse(raw.slice(3), 'utf8');
    if (parsed !== null) {
      decodedAs = 'utf8-bom';
    }
  }

  // 3) try utf16le
  if (parsed === null) {
    parsed = tryParse(raw, 'utf16le');
    if (parsed !== null) decodedAs = 'utf16le';
  }

  // 4) try utf16be by byte-swap (rare). Convert buffer to swapped buffer then decode as utf16le
  if (parsed === null) {
    try {
      const swapped = Buffer.alloc(raw.length);
      for (let i = 0; i + 1 < raw.length; i += 2) {
        swapped[i] = raw[i + 1];
        swapped[i + 1] = raw[i];
      }
      parsed = tryParse(swapped, 'utf16le');
      if (parsed !== null) decodedAs = 'utf16be';
    } catch (e) {
      // ignore
    }
  }

  if (parsed !== null) {
    // backup original file
    const bak = p + '.bak';
    try {
      if (!fs.existsSync(bak)) fs.copyFileSync(p, bak);
    } catch (e) {
      console.warn('Could not create backup for', f, e.message);
    }

    // write normalized JSON (utf8, pretty)
    fs.writeFileSync(p, JSON.stringify(parsed, null, 2), 'utf8');
    console.log('[FIXED]', f, 'decoded as', decodedAs || 'detected', '→ re-saved as UTF-8 JSON');
  } else {
    console.error('[FAILED ]', f, 'could not be parsed as utf8/utf16. Backup left as', p + '.bak');
  }
});
