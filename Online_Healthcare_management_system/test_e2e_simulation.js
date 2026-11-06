const fs = require('fs');

console.log('===============================================================');
console.log('  PULSECARE HEALTHCARE SYSTEM - END-TO-END WORKFLOW TEST SUITE ');
console.log('===============================================================');

// Setup robust mock browser environment
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

global.window = {
  location: { hash: '#/' },
  scrollTo: () => {},
  print: () => {},
  addEventListener: (evt, fn) => {
    if (!windowListeners[evt]) windowListeners[evt] = [];
    windowListeners[evt].push(fn);
  }
};
const windowListeners = {};

const domElements = {};
function getOrCreateElem(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id,
      value: '',
      checked: false,
      textContent: '',
      innerHTML: '',
      style: {},
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        toggle(c, force) {
          if (force === undefined) {
            if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c);
          } else if (force) this.classes.add(c); else this.classes.delete(c);
        },
        contains(c) { return this.classes.has(c); }
      },
      listeners: {},
      addEventListener(evt, fn) {
        if (!this.listeners[evt]) this.listeners[evt] = [];
        this.listeners[evt].push(fn);
      },
      trigger(evt, eventObj = {}) {
        if (this.listeners[evt]) {
          this.listeners[evt].forEach(fn => fn(Object.assign({ preventDefault: () => {} }, eventObj)));
        }
      },
      reset() { this.value = ''; },
      appendChild(c) {},
      options: [{ text: 'Doctor', value: 'usr_doc_1' }],
      selectedIndex: 0
    };
  }
  return domElements[id];
}

const docListeners = {};
global.document = {
  getElementById: (id) => getOrCreateElem(id),
  querySelectorAll: (sel) => [],
  addEventListener: (evt, fn) => {
    if (!docListeners[evt]) docListeners[evt] = [];
    docListeners[evt].push(fn);
  },
  createElement: (tag) => {
    return {
      tagName: tag,
      className: '',
      innerHTML: '',
      style: {},
      appendChild: () => {},
      addEventListener: () => {}
    };
  }
};

// Execute app.js in sandbox
const appCode = fs.readFileSync('app.js', 'utf8');
eval(appCode);

// Fire DOMContentLoaded so all listeners attach!
if (docListeners['DOMContentLoaded']) {
  docListeners['DOMContentLoaded'].forEach(fn => fn());
}

let testsPassed = 0;
let testsFailed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${desc}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${desc}\n     Error: ${err.message}`);
    testsFailed++;
  }
}

function expect(val) {
  return {
    toBe(expected) {
      if (val !== expected) throw new Error(`Expected "${val}" to be "${expected}"`);
    },
    toEqual(expected) {
      if (JSON.stringify(val) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(val)} to equal ${JSON.stringify(expected)}`);
      }
    },
    toBeGreaterThan(expected) {
      if (!(val > expected)) throw new Error(`Expected ${val} to be greater than ${expected}`);
    },
    toBeTruthy() {
      if (!val) throw new Error(`Expected ${val} to be truthy`);
    },
    toBeFalsy() {
      if (val) throw new Error(`Expected ${val} to be falsy`);
    },
    toContain(expected) {
      if (!val || !val.includes(expected)) throw new Error(`Expected "${val}" to contain "${expected}"`);
    }
  };
}

// --------------------------------------------------------------------------
// TEST 1: DATABASE SEEDING
// --------------------------------------------------------------------------
console.log('\n--- 1. Database Seeding & Verification ---');
const rawDB = global.localStorage.getItem('pulsecare_healthcare_db_v2');
const db = JSON.parse(rawDB);

it('Database has initial users with Admin, Doctor, and Patient roles', () => {
  expect(db.users.length).toBeGreaterThan(5);
  expect(db.users.some(u => u.role === 'Admin')).toBeTruthy();
  expect(db.users.some(u => u.role === 'Doctor')).toBeTruthy();
  expect(db.users.some(u => u.role === 'Patient')).toBeTruthy();
});

it('Database has initial appointments across departments', () => {
  expect(db.appointments.length).toBeGreaterThan(4);
  expect(db.appointments.some(a => a.status === 'Confirmed')).toBeTruthy();
  expect(db.appointments.some(a => a.status === 'Completed')).toBeTruthy();
});

it('Database has system settings with clinic name and working hours', () => {
  expect(db.settings.clinicName).toBe('PulseCare Regional Medical Center');
  expect(db.settings.appointmentDuration).toBe(30);
});

// --------------------------------------------------------------------------
// TEST 2: AUTHENTICATION (LOGIN & REGISTRATION)
// --------------------------------------------------------------------------
console.log('\n--- 2. Authentication Workflows ---');

it('Login fails with invalid password and shows error', () => {
  const emailInput = getOrCreateElem('loginEmail');
  const pwdInput = getOrCreateElem('loginPassword');
  const errBox = getOrCreateElem('loginErrorMessage');
  const loginForm = getOrCreateElem('authLoginForm');

  emailInput.value = 'admin@pulsecare.org';
  pwdInput.value = 'wrongpassword';
  loginForm.trigger('submit');

  expect(errBox.style.display).toBe('block');
  expect(errBox.textContent).toBe('Incorrect password entered. Please try again.');
});

it('Login succeeds with valid admin credentials and creates session', () => {
  const emailInput = getOrCreateElem('loginEmail');
  const pwdInput = getOrCreateElem('loginPassword');
  const loginForm = getOrCreateElem('authLoginForm');

  emailInput.value = 'admin@pulsecare.org';
  pwdInput.value = 'admin123';
  loginForm.trigger('submit');

  const sess = JSON.parse(global.localStorage.getItem('pulsecare_active_user_v2'));
  expect(sess.email).toBe('admin@pulsecare.org');
  expect(sess.role).toBe('Admin');
  expect(global.window.location.hash).toBe('#/admin');
});

it('Registration validates password confirmation match', () => {
  const regForm = getOrCreateElem('authRegisterForm');
  const errBox = getOrCreateElem('registerErrorMessage');

  getOrCreateElem('regFullName').value = 'Test User';
  getOrCreateElem('regEmail').value = 'test.user@example.com';
  getOrCreateElem('regPassword').value = 'password123';
  getOrCreateElem('regConfirmPassword').value = 'different123';
  getOrCreateElem('regRole').value = 'Patient';

  regForm.trigger('submit');

  expect(errBox.style.display).toBe('block');
  expect(errBox.textContent).toContain('match');
});

it('Registration prevents duplicate email address', () => {
  const regForm = getOrCreateElem('authRegisterForm');
  const errBox = getOrCreateElem('registerErrorMessage');

  getOrCreateElem('regFullName').value = 'Alex Duplicate';
  getOrCreateElem('regEmail').value = 'alex.johnson@email.com'; // Existing email
  getOrCreateElem('regPassword').value = 'password123';
  getOrCreateElem('regConfirmPassword').value = 'password123';
  getOrCreateElem('regRole').value = 'Patient';

  regForm.trigger('submit');

  expect(errBox.style.display).toBe('block');
  expect(errBox.textContent).toContain('already exists');
});

it('Registration creates new user, sets active session, and redirects to dashboard', () => {
  const regForm = getOrCreateElem('authRegisterForm');

  getOrCreateElem('regFullName').value = 'Dr. Gregory House';
  getOrCreateElem('regEmail').value = 'gregory.house@pulsecare.org';
  getOrCreateElem('regPassword').value = 'house123';
  getOrCreateElem('regConfirmPassword').value = 'house123';
  getOrCreateElem('regRole').value = 'Doctor';
  getOrCreateElem('regSpecialty').value = 'Neurology';

  regForm.trigger('submit');

  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const newUser = currentDb.users.find(u => u.email === 'gregory.house@pulsecare.org');

  expect(newUser).toBeTruthy();
  expect(newUser.role).toBe('Doctor');
  expect(newUser.specialization).toBe('Neurology');
  expect(global.window.location.hash).toBe('#/doctor');
});

// --------------------------------------------------------------------------
// TEST 3: ADMIN WORKFLOWS
// --------------------------------------------------------------------------
console.log('\n--- 3. Administrator Operations ---');

it('Admin can create a new user via adminUserForm', () => {
  const form = getOrCreateElem('adminUserForm');
  getOrCreateElem('editUserId').value = '';
  getOrCreateElem('adminUserModalName').value = 'Nurse Jackie';
  getOrCreateElem('adminUserModalEmail').value = 'nurse.jackie@pulsecare.org';
  getOrCreateElem('adminUserModalPassword').value = 'jackie123';
  getOrCreateElem('adminUserModalRole').value = 'Admin';
  getOrCreateElem('adminUserModalStatus').value = 'Active';

  form.trigger('submit');

  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const nurse = currentDb.users.find(u => u.email === 'nurse.jackie@pulsecare.org');
  expect(nurse).toBeTruthy();
  expect(nurse.name).toBe('Nurse Jackie');
});

it('Admin can edit an existing user', () => {
  const form = getOrCreateElem('adminUserForm');
  getOrCreateElem('editUserId').value = 'usr_pt_1'; // Alex Johnson
  getOrCreateElem('adminUserModalName').value = 'Alexander Johnson Senior';
  getOrCreateElem('adminUserModalEmail').value = 'alex.johnson@email.com';
  getOrCreateElem('adminUserModalPassword').value = '';
  getOrCreateElem('adminUserModalRole').value = 'Patient';
  getOrCreateElem('adminUserModalStatus').value = 'Active';

  form.trigger('submit');

  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const updatedAlex = currentDb.users.find(u => u.id === 'usr_pt_1');
  expect(updatedAlex.name).toBe('Alexander Johnson Senior');
});

it('Admin scheduling prevents booking conflict on busy doctor', () => {
  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  // Find an existing confirmed appointment
  const existing = currentDb.appointments.find(a => a.doctorId === 'usr_doc_1' && a.status === 'Confirmed');
  expect(existing).toBeTruthy();

  const form = getOrCreateElem('adminApptForm');
  getOrCreateElem('adminApptEditId').value = '';
  getOrCreateElem('adminApptPatientSelect').value = 'usr_pt_2';
  getOrCreateElem('adminApptDoctorSelect').value = existing.doctorId;
  getOrCreateElem('adminApptDate').value = existing.date;
  getOrCreateElem('adminApptTime').value = existing.time; // Duplicate slot
  getOrCreateElem('adminApptReason').value = 'Conflicting checkup request';

  form.trigger('submit');

  // Database should NOT have added a duplicate
  const updatedDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const duplicates = updatedDb.appointments.filter(a => a.doctorId === existing.doctorId && a.date === existing.date && a.time === existing.time && a.status !== 'Cancelled');
  expect(duplicates.length).toBe(1);
});

it('Admin can update system settings and persist to database', () => {
  // Render settings tab to attach listener
  global.window.PulseCare.switchAdminTab('settings');

  const form = getOrCreateElem('settingsGeneralForm');
  getOrCreateElem('setClinicName').value = 'PulseCare Metropolitan Medical Hub';
  getOrCreateElem('setPhone').value = '+1 (800) 777-9900';
  getOrCreateElem('setEmail').value = 'operations@pulsecare.org';
  getOrCreateElem('setAddress').value = '900 Metro Hospital Way, Suite 100';
  getOrCreateElem('setDuration').value = '45';
  getOrCreateElem('setWorkingDays').value = 'Monday - Friday';
  getOrCreateElem('setWorkingStart').value = '07:30 AM';
  getOrCreateElem('setWorkingEnd').value = '07:00 PM';
  getOrCreateElem('setNotifEmail').checked = true;
  getOrCreateElem('setNotifReminders').checked = true;

  form.trigger('submit');

  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  expect(currentDb.settings.clinicName).toBe('PulseCare Metropolitan Medical Hub');
  expect(currentDb.settings.appointmentDuration).toBe(45);
});

// --------------------------------------------------------------------------
// TEST 4: DOCTOR WORKFLOWS
// --------------------------------------------------------------------------
console.log('\n--- 4. Doctor Operations ---');

it('Doctor can add custom schedule block that disables appointment booking', () => {
  // Set active user as Dr. Sarah Mitchell
  const docUser = db.users.find(u => u.id === 'usr_doc_1');
  global.localStorage.setItem('pulsecare_active_user_v2', JSON.stringify(docUser));

  // Re-eval to load session
  eval(appCode);
  if (docListeners['DOMContentLoaded']) {
    docListeners['DOMContentLoaded'].forEach(fn => fn());
  }

  const form = getOrCreateElem('docScheduleForm');
  const targetDate = '2026-11-20';
  getOrCreateElem('schedDate').value = targetDate;
  getOrCreateElem('schedStartTime').value = '09:00 AM';
  getOrCreateElem('schedEndTime').value = '12:00 PM';
  getOrCreateElem('schedStatus').value = 'Blocked';
  getOrCreateElem('schedNote').value = 'Cardiology Symposium';

  form.trigger('submit');

  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const docProf = currentDb.doctors.find(d => d.userId === 'usr_doc_1');
  const blocked = docProf.availability.find(av => av.date === targetDate && av.status === 'Blocked');
  expect(blocked).toBeTruthy();
  expect(blocked.note).toBe('Cardiology Symposium');
});

it('Doctor can confirm a pending appointment', () => {
  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const pendingAppt = currentDb.appointments.find(a => a.doctorId === 'usr_doc_1' && a.status === 'Pending');
  expect(pendingAppt).toBeTruthy();

  global.window.PulseCare.confirmAppointment(pendingAppt.id);

  const updatedDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const confirmed = updatedDb.appointments.find(a => a.id === pendingAppt.id);
  expect(confirmed.status).toBe('Confirmed');
});

it('Doctor can complete appointment and add a clinical record with prescription', () => {
  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const confirmedAppt = currentDb.appointments.find(a => a.doctorId === 'usr_doc_1' && a.status === 'Confirmed');
  expect(confirmedAppt).toBeTruthy();

  global.window.PulseCare.completeAppointment(confirmedAppt.id);

  // Add medical record for patient
  const recordForm = getOrCreateElem('docMedicalRecordForm');
  getOrCreateElem('docRecordPatientId').value = confirmedAppt.patientId;
  getOrCreateElem('docRecordDate').value = '2026-10-08';
  getOrCreateElem('docRecordDiagnosis').value = 'Sinus Tachycardia - Resolved';
  getOrCreateElem('docRecordSymptoms').value = 'Resting heart rate normalized';
  getOrCreateElem('docRecordPrescription').value = 'Metoprolol 25mg - 1 tablet daily (30 days)';
  getOrCreateElem('docRecordNotes').value = 'Advised continued hydration.';

  recordForm.trigger('submit');

  const updatedDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const newRec = updatedDb.medicalRecords.find(m => m.diagnosis === 'Sinus Tachycardia - Resolved');
  expect(newRec).toBeTruthy();
  expect(newRec.patientId).toBe(confirmedAppt.patientId);
  expect(newRec.prescription).toContain('Metoprolol 25mg');
});

// --------------------------------------------------------------------------
// TEST 5: PATIENT WORKFLOWS
// --------------------------------------------------------------------------
console.log('\n--- 5. Patient Operations ---');

it('Patient can submit feedback only after appointment is completed', () => {
  // Set active user as patient Priya Sharma
  const ptUser = db.users.find(u => u.id === 'usr_pt_2');
  global.localStorage.setItem('pulsecare_active_user_v2', JSON.stringify(ptUser));
  global.window.location.hash = '#/patient';
  eval(appCode);
  if (docListeners['DOMContentLoaded']) {
    docListeners['DOMContentLoaded'].forEach(fn => fn());
  }

  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const completedAppt = currentDb.appointments.find(a => a.patientId === 'usr_pt_2' && a.status === 'Completed');
  expect(completedAppt).toBeTruthy();

  const feedbackForm = getOrCreateElem('patientFeedbackForm');
  getOrCreateElem('feedbackApptId').value = completedAppt.id;
  getOrCreateElem('feedbackDoctorId').value = completedAppt.doctorId;
  getOrCreateElem('selectedStarScore').value = '5';
  getOrCreateElem('feedbackComment').value = 'Excellent clinical guidance and attentive care.';

  feedbackForm.trigger('submit');

  const updatedDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const newReview = updatedDb.feedback.find(f => f.appointmentId === completedAppt.id);
  expect(newReview).toBeTruthy();
  expect(newReview.rating).toBe(5);
  expect(newReview.comment).toBe('Excellent clinical guidance and attentive care.');
});

it('Patient booking wizard prevents booking conflicting or blocked slots', () => {
  global.window.PulseCare.switchPatientTab('booking');
  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const existingConfirmed = currentDb.appointments.find(a => a.doctorId === 'usr_doc_1' && a.status === 'Confirmed');

  // Attempt booking the same slot
  getOrCreateElem('bookDoctorSelect').value = 'usr_doc_1';
  getOrCreateElem('bookDateInput').value = existingConfirmed.date;
  getOrCreateElem('bookReasonInput').value = 'Checkup duplicate slot test';

  // Manually select duplicate slot
  global.window.PulseCare.selectPatientSlot(existingConfirmed.time);

  const bookForm = getOrCreateElem('patientBookForm');
  bookForm.trigger('submit');

  const afterDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const count = afterDb.appointments.filter(a => a.doctorId === 'usr_doc_1' && a.date === existingConfirmed.date && a.time === existingConfirmed.time && a.status !== 'Cancelled').length;
  expect(count).toBe(1); // Still only 1, no duplicate allowed!
});

it('Patient booking succeeds on open available slot and generates appointment ID', () => {
  // Re-render the booking tab so the form listener is re-attached
  global.window.PulseCare.switchPatientTab('booking');
  getOrCreateElem('bookDoctorSelect').value = 'usr_doc_2'; // Dr. James Wilson
  getOrCreateElem('bookDateInput').value = '2026-12-01';
  getOrCreateElem('bookReasonInput').value = 'Headache and migraine evaluation';

  global.window.PulseCare.selectPatientSlot('02:30 PM');

  const bookForm = getOrCreateElem('patientBookForm');
  bookForm.trigger('submit');

  const afterDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const newAppt = afterDb.appointments.find(a => a.doctorId === 'usr_doc_2' && a.date === '2026-12-01' && a.time === '02:30 PM');
  expect(newAppt).toBeTruthy();
  expect(newAppt.id).toContain('APT-2026-');
  expect(newAppt.status).toBe('Pending');
});

it('Patient can update profile details and change password', () => {
  // Render profile tab to attach listener
  global.window.PulseCare.switchPatientTab('profile');

  const form = getOrCreateElem('userProfileForm');
  getOrCreateElem('profName').value = 'Priya Sharma Updated';
  getOrCreateElem('profEmail').value = 'priya.sharma@email.com';
  getOrCreateElem('profPhone').value = '+1 (555) 999-1122';
  getOrCreateElem('profAddress').value = '100 New Medical Boulevard';
  getOrCreateElem('profDob').value = '1995-08-22';
  getOrCreateElem('profBlood').value = 'B+';
  getOrCreateElem('profEmergency').value = 'Rajesh Sharma - +1 555-017-6623';
  getOrCreateElem('profNewPwd').value = 'newsecret123';
  getOrCreateElem('profConfirmPwd').value = 'newsecret123';

  form.trigger('submit');

  const updatedDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const priya = updatedDb.users.find(u => u.email === 'priya.sharma@email.com');
  expect(priya.name).toBe('Priya Sharma Updated');
  expect(priya.password).toBe('newsecret123');
  expect(priya.phone).toBe('+1 (555) 999-1122');
});

// --------------------------------------------------------------------------
// TEST 6: NOTIFICATION SYSTEM
// --------------------------------------------------------------------------
console.log('\n--- 6. Notification System ---');

it('Notifications are created and can be marked as read', () => {
  const currentDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  expect(currentDb.notifications.length).toBeGreaterThan(0);

  // Trigger clear notifications button
  const clearBtn = getOrCreateElem('btnClearNotifications');
  clearBtn.trigger('click');

  const updatedDb = JSON.parse(global.localStorage.getItem('pulsecare_healthcare_db_v2'));
  const unreadForUser = updatedDb.notifications.filter(n => n.userId === 'usr_pt_2' && !n.read);
  expect(unreadForUser.length).toBe(0);
});

console.log('\n===============================================================');
console.log(`  E2E TEST SUMMARY: ${testsPassed} Passed, ${testsFailed} Failed`);
console.log('===============================================================');

if (testsFailed > 0) process.exit(1);
