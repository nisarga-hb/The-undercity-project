(function () {
  'use strict';

  const INTEL_ACCESS_KEY = 'UNDERCITY';

  // Kiramman Key Encryption Per Stage:
  // S1: Base64( XOR(plain, 'PILTOVER') )          flag: CTF{HEXCORE_ARCHIVES_UNLOCKED}
  // S2: HEX( XOR(plain, 'KIRAMMAN') )             flag: CTF{BRIDGE_PATROL_COMPROMISED}
  // S3: Base64( XOR(byte+13 mod256, 'HEXCORE') )  flag: CTF{SHIMMER_RELAY_DECODED}
  // S4: Base64( XOR(plain, 'ARCANE') ) split x3   flag: CTF{UNDERCITY_PROTOCOL_BREACHED}
  const stages = [
    {
      id: 1,
      name: 'Stage 01 — Piltover: The City of Progress',
      flag: 'CTF{HEXCORE_ARCHIVES_UNLOCKED}',
      cityArea: 'New Piltover • Upper Piltover • Midtown',
      areaDesc: 'The gleaming spires of Piltover rise above the smog line — a city of innovation, ambition, and order. Jayce Talis and Viktor\'s Hextech breakthroughs reshaped the upper districts, but their work cracked open something older and far more dangerous. House Kiramman\'s surveillance network operates from the highest towers, intercepting transmissions no one is supposed to see.',
      hint: 'The fragment is not truly encrypted — it has only been encoded using standard Piltover transport encoding. The resonance pattern repeats. Try Base64 decode first, then apply XOR with a repeating 8-character key tied to this city\'s name.',
      url: 'https://cryptii.com/pipes/xor-cipher',
      files: ['council_intercept.log', 'hexcore_fragment.enc'],
      contents: {
        'council_intercept.log':
          '[KIRAMMAN INTELLIGENCE — CLASSIFIED]\n' +
          'TIMESTAMP: Progress Day +3, 02:17 UTC\n' +
          'ORIGIN: Hexcore Research Wing, Upper Piltover\n' +
          'PRIORITY: CRITICAL\n\n' +
          'Jayce Talis presented Hextech to the council.\n' +
          'Hours later, an unauthorized signal was detected\n' +
          'from the Hexcore chamber. Our relay captured one\n' +
          'encoded fragment before the signal vanished.\n\n' +
          'Encoding: Base64 over XOR (Piltover standard)\n' +
          'Crystal signature: 8 chars — the city\'s own name.\n' +
          'ANALYST: Decode Base64 first, then XOR.',
        'hexcore_fragment.enc':
          '> INTERCEPTED HEXCORE TRANSMISSION\n' +
          '> SIGNAL INTEGRITY: 94.2% | BAND: ALPHA-7\n' +
          '> METHOD: Base64( XOR(plain, repeating_key) )\n' +
          '> XOR KEY: [8 chars — name of this city]\n\n' +
          '> ENCODED_INTEL:\n' +
          '> Ex0KLwcTHREfGwkLDgQGGhkfCQcQAwseHwoHEQsr\n\n' +
          '> STEPS: 1. Base64 decode  2. XOR with key\n' +
          '> STATUS: AWAITING ANALYST',
      },
      problemStatement:
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        ' STAGE 01 — PILTOVER: THE CITY OF PROGRESS\n' +
        ' METHOD: BASE64 ENCODED REPEATING XOR CIPHER\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        'THE STORY:\n' +
        'Progress Day. Jayce Talis unveiled Hextech to the\n' +
        'Merchant Council and the crowd cheered. But in the\n' +
        'Hexcore chamber, hours later, Viktor\'s experimental\n' +
        'core pulsed with an unauthorized signal — bypassing\n' +
        'every council-approved relay. Someone was using the\n' +
        'Hexcore itself to communicate.\n\n' +
        'House Kiramman intercepted one encoded fragment before\n' +
        'the signal collapsed. It was wrapped in Piltover\'s\n' +
        'standard transport encoding: Base64 layered over a\n' +
        'repeating XOR cipher. The crystal signature — the\n' +
        'XOR key — is the city\'s own name.\n\n' +
        'THE CHALLENGE:\n' +
        'Decode the fragment and recover the Kiramman Key.\n\n' +
        'ENCODED PAYLOAD:\n' +
        'Ex0KLwcTHREfGwkLDgQGGhkfCQcQAwseHwoHEQsr\n\n' +
        'PIPELINE: Base64 decode → XOR(repeating 8-char key)\n' +
        'XOR KEY: Name of this city (8 characters)\n' +
        'FLAG FORMAT: CTF{...}',
    },
    {
      id: 2,
      name: 'Stage 02 — The Bridge: Enforcer Checkpoint',
      flag: 'CTF{BRIDGE_PATROL_COMPROMISED}',
      cityArea: 'The Bridge — Guard Post • Enforcer Checkpoint',
      areaDesc: 'The stone bridge between Piltover and Zaun — the only sanctioned crossing. After Vander\'s death and the powder explosion, the Enforcers sealed it and encrypted every patrol dispatch with a Kiramman-authorized signature. But the garrison commander, overwhelmed by the crisis, disabled key rotation. The same 8-character family name encrypted every message for 14 days — a fatal mistake.',
      hint: 'This stage uses raw XOR only — no Base64 wrapper. The output is hex-encoded bytes. Convert hex pairs to bytes, then XOR each byte with the repeating 8-character key. The key is the family name whose authorization runs this checkpoint. Key reuse across multiple messages creates exploitable patterns.',
      url: 'https://www.dcode.fr/xor-cipher',
      files: ['patrol_report.enc', 'checkpoint_auth.log'],
      contents: {
        'patrol_report.enc':
          '[ENFORCER TACTICAL DISPATCH — ENCRYPTED]\n' +
          'CHECKPOINT: BRIDGE-7 UPPER GARRISON\n' +
          'STATUS: POST-UPRISING LOCKDOWN — DAY 14\n' +
          'METHOD: HEX( XOR(plain, repeating_key) )\n' +
          'KEY REUSE: CONFIRMED — same key, 14 dispatches\n\n' +
          '> ENCODED_INTEL:\n' +
          '> 081d143a0f1f080a0c0c0d110c1913010716110e001d1301060001040930\n\n' +
          '> XOR KEY: [8 chars — family name at this checkpoint]\n' +
          '> STEPS: 1. Hex decode  2. XOR with key',
        'checkpoint_auth.log':
          '[BRIDGE CHECKPOINT AUTHORIZATION LOG]\n' +
          'KEY_ROTATION: DISABLED — "operational continuity"\n' +
          'SAME 8-CHAR SIGNATURE USED: 14 dispatches\n\n' +
          'SECURITY NOTE:\n' +
          'Reusing the same XOR key across multiple messages\n' +
          'enables known-plaintext attacks. The family name\n' +
          'on the checkpoint crest is 8 letters.\n' +
          'Immediate key rotation is recommended.',
      },
      problemStatement:
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        ' STAGE 02 — THE BRIDGE: ENFORCER CHECKPOINT\n' +
        ' METHOD: REPEATING-KEY XOR → HEX ENCODING\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        'THE STORY:\n' +
        'After Vander fell and the powder explosion shook\n' +
        'Piltover, the Enforcers sealed the bridge. Every\n' +
        'tactical dispatch was encrypted with a Kiramman\n' +
        'family XOR signature. Commander Elara disabled key\n' +
        'rotation for "operational continuity." The same\n' +
        '8-character family name encrypted 14 consecutive\n' +
        'dispatches — a catastrophic oversight.\n\n' +
        'A damaged terminal from the collapsed eastern checkpoint\n' +
        'still holds one of those dispatches in memory.\n\n' +
        'THE CHALLENGE:\n' +
        'Decrypt the recovered dispatch and recover the key.\n\n' +
        'ENCODED PAYLOAD (hex-encoded XOR output):\n' +
        '081d143a0f1f080a0c0c0d110c1913010716110e001d1301060001040930\n\n' +
        'PIPELINE: Hex decode → XOR(repeating 8-char key)\n' +
        'XOR KEY: Family name on the checkpoint crest (8 chars)\n' +
        'FLAG FORMAT: CTF{...}',
    },
    {
      id: 3,
      name: 'Stage 03 — Zaun: The Underground Relay',
      flag: 'CTF{SHIMMER_RELAY_DECODED}',
      cityArea: 'Zaun — Boundary Markets • Vander Statue • The Last Drop • Benzo\'s Shop',
      areaDesc: 'Beneath Piltover\'s cobblestones, Zaun breathes — smoky, neon-lit, and alive with secrets. The Boundary Markets, Vander\'s statue, The Last Drop: nodes in Ekko\'s hidden Firelight relay network. Benzo\'s abandoned workshop was found to contain fragmented relay archives modified with a two-layer cipher that confounded every topside analyst.',
      hint: 'Two transformations were applied — not one. First every byte had 13 added to it (mod 256), then XOR with a 7-char repeating key, then Base64. Reverse it: Base64 decode → XOR with 7-char key → subtract 13 from each byte (mod 256). The 7-char key is the power source that built Piltover.',
      url: 'https://gchq.github.io/CyberChef/#recipe=From_Base64(\'A-Za-z0-9%2B/%3D\',true,false)XOR(%7B\'option\':\'UTF8\',\'string\':\'HEXCORE\'%7D,\'Standard\',false)From_Charcode(\'Comma\',10)',
      files: ['relay_archive.enc', 'benzo_workshop.log'],
      contents: {
        'relay_archive.enc':
          '[ZAUN UNDERGROUND RELAY — INTERCEPTED]\n' +
          'NODE: BOUNDARY-MARKETS-RELAY-9\n' +
          'ORIGIN: Benzo\'s Workshop | MODIFIER: Firelights\n' +
          'METHOD: Base64( XOR(byte+13 mod256, key) )\n\n' +
          '> ENCODED_INTEL:\n' +
          '> GCQLyy8HExIfChwjDRcRCz4vHgAVFBQKEsU=\n\n' +
          '> REVERSE PIPELINE:\n' +
          '>   1. Base64 decode\n' +
          '>   2. XOR each byte with repeating 7-char key\n' +
          '>   3. Subtract 13 from each byte (mod 256)\n' +
          '> KEY: 7 chars — the power source of Piltover',
        'benzo_workshop.log':
          '[RECOVERED FROM BENZO\'S WORKSHOP — PARTIAL]\n\n' +
          'Handwritten note found inside terminal casing:\n\n' +
          '"Ekko changed the encoding. Two steps now.\n' +
          'Add 13 to every char code first, then XOR.\n' +
          'To decode: XOR first, then subtract 13.\n' +
          'Key is 7 letters — what powers their crystals.\n' +
          'Base64 wrapper on top of everything. Good luck."\n\n' +
          'ANALYST NOTE: Byte shift (+13) is the inner layer.\n' +
          'Decode: Base64 → XOR → (byte - 13 mod 256)',
      },
      problemStatement:
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        ' STAGE 03 — ZAUN: THE UNDERGROUND RELAY\n' +
        ' METHOD: BYTE TRANSFORM (+13 mod256) → XOR → BASE64\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        'THE STORY:\n' +
        'Ekko runs the Firelights from Zaun\'s forgotten depths.\n' +
        'After Benzo\'s arrest, his workshop became a relay node.\n' +
        'Ekko modified the encryption himself: shift every byte\n' +
        'by +13, then XOR with a 7-character key tied to the\n' +
        'power that built Piltover, then wrap in Base64.\n\n' +
        'House Kiramman\'s analysts intercepted one fragment.\n' +
        'The workshop notes survived and revealed the pipeline.\n\n' +
        'THE CHALLENGE:\n' +
        'Reverse the three-layer transform and recover the key.\n\n' +
        'ENCODED PAYLOAD:\n' +
        'GCQLyy8HExIfChwjDRcRCz4vHgAVFBQKEsU=\n\n' +
        'PIPELINE: Base64 decode → XOR(7-char key) → byte − 13 mod 256\n' +
        'XOR KEY: 7 characters — the power source of Piltover\n' +
        'FLAG FORMAT: CTF{...}',
    },
    {
      id: 4,
      name: 'Stage 04 — The Sumps: Refinery Depths',
      flag: 'CTF{UNDERCITY_PROTOCOL_BREACHED}',
      cityArea: 'The Sumps — Shimmer Refineries • The Dredge • Old Hungry',
      areaDesc: 'At Zaun\'s lowest level, where sunlight never reaches and the air burns with chemical residue, the old shimmer refineries still pulse. Singed worked here before Piltover knew his name. When the refinery was abandoned, the AI control system didn\'t die — it scattered its archives across three synchronization layers and kept transmitting, broken, into the dark.',
      hint: 'Three fragments must be concatenated in order (01 → 02 → 03) before decoding. The combined string is a single Base64 payload. The decryption pipeline is the same as Stage 1 (Base64 decode → XOR) but the crystal signature has changed. It is no longer a city — it is the 6-character name of the world these archives belong to.',
      url: 'https://gchq.github.io/CyberChef/#recipe=From_Base64(\'A-Za-z0-9%2B/%3D\',true,false)XOR(%7B\'option\':\'UTF8\',\'string\':\'ARCANE\'%7D,\'Standard\',false)',
      files: ['fragment_01.enc', 'fragment_02.enc', 'fragment_03.enc', 'refinery_telemetry.log'],
      contents: {
        'fragment_01.enc':
          '[REFINERY ARCHIVE — FRAGMENT 01 of 03]\n' +
          'SYNC LAYER: PRIMARY | STATUS: INTACT\n\n' +
          '> FRAGMENT_DATA:\n' +
          '> AgYFOhsLBRcRAgc',
        'fragment_02.enc':
          '[REFINERY ARCHIVE — FRAGMENT 02 of 03]\n' +
          'SYNC LAYER: SECONDARY | STATUS: INTACT\n\n' +
          '> FRAGMENT_DATA:\n' +
          '> RGA0TEwERDhEMDR',
        'fragment_03.enc':
          '[REFINERY ARCHIVE — FRAGMENT 03 of 03]\n' +
          'SYNC LAYER: TERTIARY | STATUS: INTACT\n\n' +
          '> FRAGMENT_DATA:\n' +
          '> EHExcCAgYABS8=',
        'refinery_telemetry.log':
          '[SUMPS REFINERY — FINAL AI TELEMETRY LOG]\n' +
          'FACILITY: Shimmer Refinery Delta-9\n' +
          'LINKED TO: Singed\'s early experiments\n' +
          'STATUS: ABANDONED — SHUTDOWN PROTOCOL ACTIVE\n\n' +
          '"Scattering archive across 3 sync layers.\n' +
          ' Concatenate fragments 01+02+03 in order.\n' +
          ' Combined = single Base64 string.\n' +
          ' Pipeline: Base64 decode → XOR(6-char key)\n' +
          ' Crystal signature: the world itself — 6 chars.\n' +
          ' This is the last record. Goodbye."\n' +
          '— Refinery AI, final transmission\n\n' +
          'COMBINED PAYLOAD:\n' +
          'AgYFOhsLBRcRAgcRGA0TEwERDhEMDREHExcCAgYABS8=',
      },
      problemStatement:
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        ' STAGE 04 — THE SUMPS: REFINERY DEPTHS\n' +
        ' METHOD: FRAGMENTED BASE64 XOR (3 SYNC LAYERS)\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        'THE STORY:\n' +
        'Before the council knew Singed\'s name, he worked\n' +
        'in the shimmer refineries beneath Zaun\'s lowest\n' +
        'corridors. When the refinery was abandoned, the AI\n' +
        'executed its shutdown protocol: scatter the archives\n' +
        'rather than destroy them. Three fragments. Three\n' +
        'sync layers. Buried across the deepest levels.\n\n' +
        'House Kiramman\'s recovery team found all three.\n' +
        'The fragments must be assembled in order. The key\n' +
        'is no longer a city — it is the world itself.\n\n' +
        'THE CHALLENGE:\n' +
        'Reconstruct the scattered archive and recover the key.\n\n' +
        'FRAGMENTS (concatenate in order 01 → 02 → 03):\n' +
        'FRAGMENT_01: AgYFOhsLBRcRAgc\n' +
        'FRAGMENT_02: RGA0TEwERDhEMDR\n' +
        'FRAGMENT_03: EHExcCAgYABS8=\n\n' +
        'COMBINED: AgYFOhsLBRcRAgcRGA0TEwERDhEMDREHExcCAgYABS8=\n\n' +
        'PIPELINE: Base64 decode → XOR(repeating 6-char key)\n' +
        'XOR KEY: 6 characters — the name of this world\n' +
        'FLAG FORMAT: CTF{...}',
    },
  ];

  let currentStageIndex = 0;
  let awaitingIntelKey = false;
  let awaitingFlagKey = false;
  let bootComplete = false;

  const terminalOutput = document.getElementById('terminal-output');
  const stageStatus = document.getElementById('stage-status');
  const panelPath = document.getElementById('panel-path');
  const fileList = document.getElementById('file-list');
  const flagForm = document.getElementById('flag-form');
  const flagInput = document.getElementById('flag-input');
  const flagFeedback = document.getElementById('flag-feedback');
  const folderGrid = document.getElementById('folder-grid');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const intelToggle = document.getElementById('intel-toggle');

  function hideLoadingScreen() {
    const ls = document.getElementById('loading-screen');
    if (ls) setTimeout(function () { ls.classList.add('hidden'); }, 1600);
  }

  function appendLine(text) {
    var el = document.createElement('div');
    el.textContent = text;
    terminalOutput.appendChild(el);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function typeLines(lines, delay, cb) {
    delay = delay || 32;
    var li = 0, ci = 0;
    function next() {
      if (li >= lines.length) { if (cb) cb(); return; }
      if (!terminalOutput.lastChild || terminalOutput.lastChild.getAttribute('data-typing') !== 'true') {
        var el = document.createElement('div');
        el.setAttribute('data-typing', 'true');
        terminalOutput.appendChild(el);
      }
      var el = terminalOutput.lastChild;
      var line = lines[li];
      el.textContent = line.slice(0, ci + 1);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      ci++;
      if (ci >= line.length) {
        el.removeAttribute('data-typing');
        li++; ci = 0;
        setTimeout(next, 120);
      } else {
        setTimeout(next, delay);
      }
    }
    next();
  }

  /* ===== BOOT SEQUENCE ===== */
  function bootSequence() {
    var banner = [
      '',
      '  ██╗   ██╗███╗   ██╗██████╗ ███████╗██████╗  ██████╗██╗████████╗██╗   ██╗',
      '  ██║   ██║████╗  ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██║╚══██╔══╝╚██╗ ██╔╝',
      '  ██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝██║     ██║   ██║    ╚████╔╝ ',
      '  ██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗██║     ██║   ██║     ╚██╔╝  ',
      '  ╚██████╔╝██║ ╚████║██████╔╝███████╗██║  ██║╚██████╗██║   ██║      ██║   ',
      '   ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝   ╚═╝      ╚═╝   ',
      '',
    ];
    var sysBox = [
      '  ╔══════════════════════════════════════════╗',
      '  ║    KIRAMMAN ARCHIVE TERMINAL  v2.4.1     ║',
      '  ║      HEXTECH INTELLIGENCE DIVISION       ║',
      '  ╚══════════════════════════════════════════╝',
      '',
    ];
    var boot = [
      '> ESTABLISHING SECURE UPLINK.............. OK',
      '> INITIALIZING DECRYPTION LAYERS.......... OK',
      '> HEXTECH PROTOCOL STATUS................. STABLE',
      '> ARCHIVE ACCESS LEVEL.................... GRANTED',
      '> INTEL ACCESS............................. LOCKED',
      '',
      '> Type \\help in ARCHIVE> to see available commands.',
      '',
    ];

    typeLines(banner, 6, function () {
      sysBox.forEach(function (l) { appendLine(l); });
      setTimeout(function () {
        typeLines(boot, 16, function () {
          bootComplete = true;
          initStatusPings();
        });
      }, 300);
    });
  }

  /* ===== STAGE RENDERING ===== */
  function renderStage() {
    var s = stages[currentStageIndex];
    stageStatus.textContent = s.name.toUpperCase() + ' - ACTIVE';
    var stageDir = 'stage-files/stage-' + String(s.id).padStart(2, '0') + '/';
    panelPath.textContent = '/kiramman/intel/stage-' + String(s.id).padStart(2, '0') + '/';
    fileList.innerHTML = '';
    s.files.forEach(function (f) {
      var item = document.createElement('div');
      item.className = 'file-item';
      var link = document.createElement('a');
      link.className = 'file-name file-download';
      link.textContent = f;
      link.href = stageDir + f;
      link.download = f;
      link.title = 'Download ' + f;
      var tag = document.createElement('span');
      tag.className = 'file-tag';
      tag.textContent = 'DOWNLOAD';
      item.appendChild(link);
      item.appendChild(tag);
      fileList.appendChild(item);
    });
    updateFolderState();
    appendLine('> Stage ' + s.id + ' data loaded. Archive path updated.');
  }

  function updateFolderState() {
    document.querySelectorAll('.folder-card').forEach(function (card) {
      var si = Number(card.dataset.stage);
      card.classList.toggle('is-active', si === currentStageIndex);
      card.classList.toggle('is-locked', si > currentStageIndex);
    });
  }

  /* ===== INTEL ACCESS ===== */
  function requestIntel() {
    appendLine('');
    appendLine('╔══════════════════════════════════════════╗');
    appendLine('║   ⚠  CLASSIFIED INTEL — ACCESS LOCKED   ║');
    appendLine('╚══════════════════════════════════════════╝');
    appendLine('');
    appendLine('> Security clearance required.');
    appendLine('> Enter access key to decrypt intel:');
    appendLine('');
    awaitingIntelKey = true;
    terminalInput.placeholder = 'ENTER ACCESS KEY...';
    terminalInput.focus();
  }

  function handleIntelKey(input) {
    awaitingIntelKey = false;
    terminalInput.placeholder = '';
    if (input.toUpperCase() === INTEL_ACCESS_KEY) {
      var s = stages[currentStageIndex];
      appendLine('> ACCESS KEY ACCEPTED. Decrypting intel...');
      appendLine('');
      setTimeout(function () {
        appendLine('┌──────────────────────────────────────────────┐');
        appendLine('│  CLASSIFIED INTEL — ' + s.name.toUpperCase());
        appendLine('├──────────────────────────────────────────────┤');
        appendLine('│');
        appendLine('│  HINT: ' + s.hint);
        appendLine('│');
        appendLine('│  DATABANK: ' + s.url);
        appendLine('│');
        appendLine('└──────────────────────────────────────────────┘');
        appendLine('');
      }, 600);
    } else {
      appendLine('> ✖ ACCESS DENIED — Invalid key.');
      appendLine('> Intel remains encrypted. Try again.');
      appendLine('');
    }
  }

  /* ===== SLASH COMMANDS ===== */
  function wrapText(prefix, text, maxLen) {
    var words = text.split(' '), line = prefix;
    words.forEach(function (w) {
      if ((line + w).length > maxLen) { appendLine(line); line = prefix + w + ' '; }
      else { line += w + ' '; }
    });
    if (line.trim() !== '│') appendLine(line);
  }

  function cmdHelp() {
    appendLine('');
    appendLine('┌─ ARCHIVE COMMANDS ─────────────────────────┐');
    appendLine('│                                             │');
    appendLine('│  \\hidn ....... Reveal access key for intel  │');
    appendLine('│  \\stage ...... Current stage & city details │');
    appendLine('│  \\info ....... Problem statement / briefing │');
    appendLine('│  \\etrkey ..... Submit flag (enter key)      │');
    appendLine('│                                             │');
    appendLine('├─ UTILITY ──────────────────────────────────┤');
    appendLine('│  ls .......... List stage files             │');
    appendLine('│  cat <file> .. Read file contents           │');
    appendLine('│  pwd ......... Show current path            │');
    appendLine('│  intel ....... Request classified intel     │');
    appendLine('│  clear ....... Clear terminal               │');
    appendLine('│                                             │');
    appendLine('└─────────────────────────────────────────────┘');
    appendLine('');
  }

  function cmdHidn() {
    appendLine('');
    appendLine('┌─ HIDDEN INTEL ACCESS ──────────────────────┐');
    appendLine('│                                             │');
    appendLine('│  The intel archives require an access key.  │');
    appendLine('│  Use this key when prompted by REQUEST      │');
    appendLine('│  INTEL or the "intel" command.              │');
    appendLine('│                                             │');
    appendLine('│  ► ACCESS KEY: ' + INTEL_ACCESS_KEY + '                      │');
    appendLine('│                                             │');
    appendLine('└─────────────────────────────────────────────┘');
    appendLine('');
  }

  /* ===== MULTILINE HELPER ===== */
  /* Splits text on \n and appends each line with optional prefix */
  function printMultiLine(text, prefix) {
    prefix = prefix || '';
    text.split('\n').forEach(function (line) {
      appendLine(prefix + line);
    });
  }

  function cmdStage() {
    var s = stages[currentStageIndex];
    appendLine('');
    appendLine('┌─ ACTIVE STAGE ─────────────────────────────┐');
    appendLine('│  ' + s.name.toUpperCase());
    appendLine('├────────────────────────────────────────────┤');
    appendLine('│');
    appendLine('│  CITY AREA: ' + s.cityArea);
    appendLine('│');
    appendLine('│  AREA INTEL:');
    printMultiLine(s.areaDesc, '│  ');
    appendLine('│');
    appendLine('│  FILES: ' + s.files.join(', '));
    appendLine('│  PATH:  ' + panelPath.textContent);
    appendLine('│');
    appendLine('└────────────────────────────────────────────┘');
    appendLine('');
  }

  function appendLinkLine(prefix, url) {
    var el = document.createElement('div');
    el.textContent = prefix;
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = url;
    a.style.color = 'var(--teal)';
    a.style.textDecoration = 'underline';
    a.style.cursor = 'pointer';
    el.appendChild(a);
    terminalOutput.appendChild(el);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function cmdInfo() {
    var s = stages[currentStageIndex];
    appendLine('');
    appendLine('┌─ MISSION BRIEFING ─────────────────────────');
    appendLine('  ' + s.name.toUpperCase());
    appendLine('─────────────────────────────────────────────');
    appendLine('');
    printMultiLine(s.problemStatement);
    appendLine('');
    appendLine('── HINT ──────────────────────────────────────');
    printMultiLine(s.hint);
    appendLine('');
    appendLinkLine('── DATABANK: ', s.url);
    appendLine('─────────────────────────────────────────────');
    appendLine('');
  }

  function cmdEtrkey() {
    appendLine('');
    appendLine('> FLAG SUBMISSION MODE');
    appendLine('> Enter the flag for ' + stages[currentStageIndex].name + ':');
    appendLine('');
    awaitingFlagKey = true;
    terminalInput.placeholder = 'ENTER FLAG...';
    terminalInput.focus();
  }

  function handleFlagKey(input) {
    awaitingFlagKey = false;
    terminalInput.placeholder = '';
    var val = input.trim().toUpperCase();
    var s = stages[currentStageIndex];
    if (!val) return;
    if (val === s.flag.toUpperCase()) {
      appendLine('> ✔ FLAG ACCEPTED — ' + s.flag);
      appendLine('> Unlocking next archive stage...');
      appendLine('');
      flagFeedback.textContent = 'FLAG ACCEPTED - NEXT STAGE UNLOCKED';
      flagFeedback.style.color = 'var(--green-zaun)';
      flagInput.value = '';
      currentStageIndex++;
      if (currentStageIndex >= stages.length) {
        appendLine('> All stages complete. Archive secured.');
        stageStatus.textContent = 'ALL STAGES COMPLETE - ACCESS SEALED';
        updateFolderState();
        return;
      }
      setTimeout(renderStage, 600);
    } else {
      appendLine('> ✖ INCORRECT FLAG — Access denied.');
      appendLine('> Attempt logged. Try again.');
      appendLine('');
      flagFeedback.textContent = 'INCORRECT FLAG - ACCESS DENIED';
      flagFeedback.style.color = 'rgba(230, 57, 70, 0.8)';
    }
  }

  /* ===== FOLDER CLICK ===== */
  function handleFolderClick(e) {
    var t = e.target.closest('.folder-card');
    if (!t) return;
    var si = Number(t.dataset.stage);
    if (Number.isNaN(si)) return;
    if (si > currentStageIndex) {
      appendLine('');
      appendLine('> ⚠  ARCHIVE LOCKED — clearance insufficient.');
      appendLine('> Submit the current stage Kiramman Key to unlock.');
      appendLine('> Type \\help for available commands.');
      appendLine('');
      return;
    }
    currentStageIndex = si;
    renderStage();
    /* Show problem statement immediately, then help reminder */
    cmdInfo();
    appendLine('> Type \\help to see all available commands.');
    appendLine('> Type \\hidn for the intel access key.');
    appendLine('');
  }

  /* ===== FLAG FORM (left panel) ===== */
  function handleFlagSubmit(e) {
    e.preventDefault();
    var val = flagInput.value.trim().toUpperCase();
    var s = stages[currentStageIndex];
    if (!val) return;
    if (val === s.flag.toUpperCase()) {
      flagFeedback.textContent = 'FLAG ACCEPTED - NEXT STAGE UNLOCKED';
      flagFeedback.style.color = 'var(--green-zaun)';
      appendLine('> ' + s.flag + ' accepted. Unlocking next archive stage.');
      flagInput.value = '';
      currentStageIndex++;
      if (currentStageIndex >= stages.length) {
        appendLine('> All stages complete. Archive secured.');
        stageStatus.textContent = 'ALL STAGES COMPLETE - ACCESS SEALED';
        updateFolderState(); return;
      }
      setTimeout(renderStage, 600);
    } else {
      flagFeedback.textContent = 'INCORRECT FLAG - ACCESS DENIED';
      flagFeedback.style.color = 'rgba(230, 57, 70, 0.8)';
      flagInput.classList.add('input-error');
      appendLine('> Invalid key. Attempt logged.');
      setTimeout(function () { flagInput.classList.remove('input-error'); }, 800);
    }
  }

  /* ===== TERMINAL ROUTER ===== */
  function handleTerminalSubmit(e) {
    e.preventDefault();
    var raw = terminalInput.value.trim();
    if (!raw) return;
    terminalInput.value = '';

    if (awaitingIntelKey) {
      appendLine('KEY> ' + '*'.repeat(raw.length));
      handleIntelKey(raw); return;
    }
    if (awaitingFlagKey) {
      appendLine('FLAG> ' + raw.toUpperCase());
      handleFlagKey(raw); return;
    }

    var cmd = raw.toLowerCase().trim();
    appendLine('ARCHIVE> ' + raw);

    /* Slash commands (accept both \ and /) */
    if (cmd === '\\help' || cmd === '/help') { cmdHelp(); return; }
    if (cmd === '\\hidn' || cmd === '/hidn') { cmdHidn(); return; }
    if (cmd === '\\stage' || cmd === '/stage') { cmdStage(); return; }
    if (cmd === '\\info' || cmd === '/info') { cmdInfo(); return; }
    if (cmd === '\\etrkey' || cmd === '/etrkey') { cmdEtrkey(); return; }

    /* Utility commands */
    if (cmd === 'ls') {
      stages[currentStageIndex].files.forEach(function(f) { appendLine('  ' + f); });
      return;
    }
    if (cmd.startsWith('cat ')) {
      var fn = raw.slice(4).trim();
      var c = stages[currentStageIndex].contents[fn];
      if (c) {
        appendLine('');
        printMultiLine(c);
        appendLine('');
      } else {
        appendLine('cat: ' + fn + ': file not found');
        appendLine('> Type \\help for available commands.');
      }
      return;
    }
    if (cmd === 'pwd') { appendLine(panelPath.textContent); return; }
    if (cmd === 'intel') { requestIntel(); return; }
    if (cmd === 'clear') { terminalOutput.innerHTML = ''; return; }

    appendLine('> Unknown command. Type \\help for available commands.');
  }

  /* ===== STATUS PINGS (only after boot) ===== */
  function initStatusPings() {
    var msgs = [
      'SYSTEM CHECK: DATA STREAMS NOMINAL.',
      'SECURE LINK: 99.4% INTEGRITY.',
      'ARCHIVE WATCHER: STANDBY.',
    ];
    setInterval(function () {
      if (!bootComplete) return;
      appendLine('> ' + msgs[Math.floor(Math.random() * msgs.length)]);
    }, 30000);
  }

  /* ===== CANVAS: MATRIX RAIN ===== */
  function initMatrixRain() {
    var canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    var chars = '01アイウエオカキクケコサシスセソ⬡◊∆∇∞≡≈';
    var fs = 14, cols = Math.floor(canvas.width / fs), drops = Array(cols).fill(1);
    function draw() {
      ctx.fillStyle = 'rgba(11, 16, 32, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fs + 'px Sora';
      for (var i = 0; i < drops.length; i++) {
        var ch = chars[Math.floor(Math.random() * chars.length)];
        var x = i * fs, y = drops[i] * fs, b = Math.random();
        ctx.fillStyle = b > 0.95 ? '#8be9fd' : b > 0.8 ? '#4cc9f0' : 'rgba(76, 201, 240, 0.4)';
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ===== CANVAS: DATA STREAMS ===== */
  function initDataStreams() {
    var canvas = document.getElementById('data-streams-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    var streams = [];
    for (var i = 0; i < 15; i++) {
      streams.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        length: 50 + Math.random() * 200, speed: 0.5 + Math.random() * 2,
        opacity: 0.05 + Math.random() * 0.15, width: 0.5 + Math.random() * 1.5, isRed: Math.random() > 0.6
      });
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      streams.forEach(function (s) {
        var g = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length);
        var c = s.isRed ? '76, 201, 240' : '157, 78, 221';
        g.addColorStop(0, 'rgba(' + c + ', 0)');
        g.addColorStop(0.5, 'rgba(' + c + ', ' + s.opacity + ')');
        g.addColorStop(1, 'rgba(' + c + ', 0)');
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x, s.y + s.length);
        ctx.strokeStyle = g; ctx.lineWidth = s.width; ctx.stroke();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = -s.length; s.x = Math.random() * canvas.width; }
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ===== DIGITAL DUST ===== */
  function initDigitalDust() {
    var el = document.getElementById('digital-dust');
    if (!el) return;
    for (var i = 0; i < 50; i++) {
      var p = document.createElement('div');
      p.className = 'dust-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 8 + 's';
      p.style.animationDuration = 6 + Math.random() * 6 + 's';
      if (Math.random() > 0.7) p.style.background = '#6bff95';
      else if (Math.random() > 0.5) { p.style.background = '#c8a96b'; p.style.width = '1px'; p.style.height = '1px'; }
      el.appendChild(p);
    }
  }

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    hideLoadingScreen();
    initMatrixRain();
    initDataStreams();
    initDigitalDust();

    bootSequence();
    renderStage();
    /* NOTE: initStatusPings is now called INSIDE bootSequence after boot completes */

    intelToggle.addEventListener('click', requestIntel);
    folderGrid.addEventListener('click', handleFolderClick);
    flagForm.addEventListener('submit', handleFlagSubmit);
    terminalForm.addEventListener('submit', handleTerminalSubmit);

    /* Wire up the INTEL nav link in header */
    var navIntelLink = document.getElementById('nav-intel-link');
    if (navIntelLink) {
      navIntelLink.addEventListener('click', function (e) {
        e.preventDefault();
        requestIntel();
      });
    }
  });
})();
