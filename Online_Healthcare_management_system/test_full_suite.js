const fs = require('fs');

console.log('========================================================');
console.log('PULSECARE HEALTHCARE SYSTEM - COMPREHENSIVE TEST SUITE');
console.log('========================================================');

// Create mock localStorage
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

// Mock browser objects
global.window = {
  location: { hash: '#/' },
  scrollTo: () => {},
  print: () => {}
};

global.document = {
  addEventListener: () => {},
  querySelectorAll: () => [],
  getElementById: (id) => ({
    value: '',
    textContent: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {} },
    addEventListener: () => {},
    appendChild: () => {},
    innerHTML: '',
    reset: () => {}
  })
};

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

// Read and execute app.js in a controlled sandbox to inspect functions
const appCode = fs.readFileSync('app.js', 'utf8');

// Test 1: Code loads and parses without error
try {
  eval(appCode);
  assert(true, 'app.js parses and executes without runtime errors');
} catch (e) {
  assert(false, `app.js runtime error: ${e.message}`);
}

// Verify database initialization in localStorage
const dbRaw = global.localStorage.getItem('pulsecare_healthcare_db_v2');
assert(dbRaw !== null, 'Initial database seeded in localStorage');
const db = JSON.parse(dbRaw);

assert(db.users && db.users.length >= 8, `Users seeded (${db.users?.length} users)`);
assert(db.appointments && db.appointments.length >= 7, `Appointments seeded (${db.appointments?.length} appts)`);
assert(db.medicalRecords && db.medicalRecords.length >= 3, `Medical records seeded (${db.medicalRecords?.length} records)`);
assert(db.feedback && db.feedback.length >= 3, `Feedback reviews seeded (${db.feedback?.length} reviews)`);
assert(db.settings && db.settings.clinicName, `System settings seeded: ${db.settings?.clinicName}`);

// Verify window.PulseCare API
assert(typeof global.window.PulseCare === 'object', 'window.PulseCare global API is exposed');
assert(typeof global.window.PulseCare.confirmAppointment === 'function', 'confirmAppointment action exists');
assert(typeof global.window.PulseCare.completeAppointment === 'function', 'completeAppointment action exists');
assert(typeof global.window.PulseCare.cancelAppointment === 'function', 'cancelAppointment action exists');
assert(typeof global.window.PulseCare.editUser === 'function', 'editUser action exists');
assert(typeof global.window.PulseCare.deleteUser === 'function', 'deleteUser action exists');

console.log('\n========================================================');
console.log(`TEST RESULTS: ${passed} Passed, ${failed} Failed`);
console.log('========================================================');
if (failed > 0) process.exit(1);
