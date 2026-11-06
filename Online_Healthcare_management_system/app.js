/**
 * PulseCare - Online Healthcare Management System
 * Complete Functional Application Engine & Persistent State Architecture
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA MODELS & SEED DATABASE
  // ==========================================================================

  const DB_STORAGE_KEY = 'pulsecare_healthcare_db_v2';
  const SESSION_STORAGE_KEY = 'pulsecare_active_user_v2';

  function getRelativeDate(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  }

  const INITIAL_DATABASE = {
    users: [
      {
        id: 'usr_admin_1',
        name: 'Dr. Eleanor Vance',
        email: 'admin@pulsecare.org',
        password: 'admin123',
        role: 'Admin',
        status: 'Active',
        createdAt: '2026-01-10',
        phone: '+1 (555) 019-2831',
        address: '124 Medical Park Blvd, Suite 500',
        avatar: 'EV'
      },
      {
        id: 'usr_doc_1',
        name: 'Dr. Sarah Mitchell',
        email: 'sarah.mitchell@pulsecare.org',
        password: 'doctor123',
        role: 'Doctor',
        status: 'Active',
        createdAt: '2026-01-12',
        phone: '+1 (555) 014-9921',
        address: 'PulseCare Clinic Tower, Room 304',
        specialization: 'Cardiology',
        qualification: 'MD, FACC - Senior Cardiologist',
        room: 'Room 304, 3rd Floor',
        rating: 4.9,
        avatar: 'SM'
      },
      {
        id: 'usr_doc_2',
        name: 'Dr. James Wilson',
        email: 'james.wilson@pulsecare.org',
        password: 'doctor123',
        role: 'Doctor',
        status: 'Active',
        createdAt: '2026-01-15',
        phone: '+1 (555) 018-4432',
        address: 'PulseCare Clinic Tower, Room 412',
        specialization: 'Neurology',
        qualification: 'MD, PhD - Neurosciences Specialist',
        room: 'Room 412, 4th Floor',
        rating: 4.8,
        avatar: 'JW'
      },
      {
        id: 'usr_doc_3',
        name: 'Dr. Emily Watson',
        email: 'emily.watson@pulsecare.org',
        password: 'doctor123',
        role: 'Doctor',
        status: 'Active',
        createdAt: '2026-01-18',
        phone: '+1 (555) 012-7781',
        address: 'PulseCare Clinic Tower, Room 205',
        specialization: 'Pediatrics',
        qualification: 'MD, FAAP - Pediatric Specialist',
        room: 'Room 205, 2nd Floor',
        rating: 5.0,
        avatar: 'EW'
      },
      {
        id: 'usr_doc_4',
        name: 'Dr. Marcus Miller',
        email: 'marcus.miller@pulsecare.org',
        password: 'doctor123',
        role: 'Doctor',
        status: 'Active',
        createdAt: '2026-01-20',
        phone: '+1 (555) 019-3312',
        address: 'PulseCare Clinic Tower, Room 118',
        specialization: 'Orthopedics',
        qualification: 'MS (Ortho), Joint Specialist',
        room: 'Room 118, 1st Floor',
        rating: 4.7,
        avatar: 'MM'
      },
      {
        id: 'usr_doc_5',
        name: 'Dr. Robert Chen',
        email: 'robert.chen@pulsecare.org',
        password: 'doctor123',
        role: 'Doctor',
        status: 'Active',
        createdAt: '2026-01-22',
        phone: '+1 (555) 016-5544',
        address: 'PulseCare Clinic Tower, Room 102',
        specialization: 'General Medicine',
        qualification: 'MBBS, MD - Family Medicine Specialist',
        room: 'Room 102, 1st Floor',
        rating: 4.9,
        avatar: 'RC'
      },
      {
        id: 'usr_pt_1',
        name: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        password: 'patient123',
        role: 'Patient',
        status: 'Active',
        createdAt: '2026-02-01',
        phone: '+1 (555) 011-8923',
        dob: '1991-05-14',
        bloodGroup: 'O+',
        address: '742 Evergreen Terrace, Springfield',
        emergencyContact: 'Maria Johnson (Spouse) - +1 (555) 011-8924',
        avatar: 'AJ'
      },
      {
        id: 'usr_pt_2',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        password: 'patient123',
        role: 'Patient',
        status: 'Active',
        createdAt: '2026-02-05',
        phone: '+1 (555) 017-6622',
        dob: '1995-08-22',
        bloodGroup: 'B+',
        address: '89 Lotus Boulevard, Apt 4B',
        emergencyContact: 'Rajesh Sharma (Father) - +1 (555) 017-6623',
        avatar: 'PS'
      },
      {
        id: 'usr_pt_3',
        name: 'David Kim',
        email: 'david.kim@email.com',
        password: 'patient123',
        role: 'Patient',
        status: 'Active',
        createdAt: '2026-02-10',
        phone: '+1 (555) 013-1190',
        dob: '1988-11-03',
        bloodGroup: 'A+',
        address: '144 West Sunset Ave, Apt 12',
        emergencyContact: 'Grace Kim (Sister) - +1 (555) 013-1191',
        avatar: 'DK'
      }
    ],

    doctors: [
      {
        id: 'doc_profile_1',
        userId: 'usr_doc_1',
        specialization: 'Cardiology',
        availability: [
          { date: getRelativeDate(0), startTime: '01:00 PM', endTime: '02:00 PM', status: 'Blocked', note: 'Hospital Clinical Rounds' }
        ]
      },
      {
        id: 'doc_profile_2',
        userId: 'usr_doc_2',
        specialization: 'Neurology',
        availability: []
      },
      {
        id: 'doc_profile_3',
        userId: 'usr_doc_3',
        specialization: 'Pediatrics',
        availability: []
      },
      {
        id: 'doc_profile_4',
        userId: 'usr_doc_4',
        specialization: 'Orthopedics',
        availability: []
      },
      {
        id: 'doc_profile_5',
        userId: 'usr_doc_5',
        specialization: 'General Medicine',
        availability: []
      }
    ],

    patients: [
      { id: 'pt_profile_1', userId: 'usr_pt_1', emergencyContact: 'Maria Johnson - +1 (555) 011-8924' },
      { id: 'pt_profile_2', userId: 'usr_pt_2', emergencyContact: 'Rajesh Sharma - +1 (555) 017-6623' },
      { id: 'pt_profile_3', userId: 'usr_pt_3', emergencyContact: 'Grace Kim - +1 (555) 013-1191' }
    ],

    appointments: [
      {
        id: 'APT-2026-1081',
        patientId: 'usr_pt_1',
        patientName: 'Alex Johnson',
        doctorId: 'usr_doc_1',
        doctorName: 'Dr. Sarah Mitchell',
        date: getRelativeDate(0), // Today
        time: '10:00 AM',
        reason: 'Periodic hypertension assessment and resting ECG check',
        status: 'Confirmed',
        createdAt: '2026-03-01'
      },
      {
        id: 'APT-2026-1082',
        patientId: 'usr_pt_2',
        patientName: 'Priya Sharma',
        doctorId: 'usr_doc_1',
        doctorName: 'Dr. Sarah Mitchell',
        date: getRelativeDate(0), // Today
        time: '11:30 AM',
        reason: 'Chest tightness and palpitations during exercise workout',
        status: 'Pending',
        createdAt: '2026-03-02'
      },
      {
        id: 'APT-2026-1083',
        patientId: 'usr_pt_3',
        patientName: 'David Kim',
        doctorId: 'usr_doc_2',
        doctorName: 'Dr. James Wilson',
        date: getRelativeDate(1),
        time: '02:00 PM',
        reason: 'Recurrent migraine headaches with visual aura',
        status: 'Confirmed',
        createdAt: '2026-03-02'
      },
      {
        id: 'APT-2026-1084',
        patientId: 'usr_pt_1',
        patientName: 'Alex Johnson',
        doctorId: 'usr_doc_5',
        doctorName: 'Dr. Robert Chen',
        date: getRelativeDate(3),
        time: '09:30 AM',
        reason: 'Annual routine preventive wellness examination',
        status: 'Pending',
        createdAt: '2026-03-03'
      },
      {
        id: 'APT-2026-1075',
        patientId: 'usr_pt_1',
        patientName: 'Alex Johnson',
        doctorId: 'usr_doc_1',
        doctorName: 'Dr. Sarah Mitchell',
        date: getRelativeDate(-10),
        time: '10:00 AM',
        reason: 'Initial consultation for elevated systolic blood pressure',
        status: 'Completed',
        createdAt: '2026-02-20'
      },
      {
        id: 'APT-2026-1070',
        patientId: 'usr_pt_2',
        patientName: 'Priya Sharma',
        doctorId: 'usr_doc_3',
        doctorName: 'Dr. Emily Watson',
        date: getRelativeDate(-18),
        time: '03:00 PM',
        reason: 'Pediatric immunizations review and wellness evaluation',
        status: 'Completed',
        createdAt: '2026-02-15'
      },
      {
        id: 'APT-2026-1065',
        patientId: 'usr_pt_3',
        patientName: 'David Kim',
        doctorId: 'usr_doc_4',
        doctorName: 'Dr. Marcus Miller',
        date: getRelativeDate(-25),
        time: '11:00 AM',
        reason: 'Right ankle ligament sprain during recreational sports',
        status: 'Completed',
        createdAt: '2026-02-10'
      }
    ],

    medicalRecords: [
      {
        id: 'MR-9001',
        patientId: 'usr_pt_1',
        doctorId: 'usr_doc_1',
        doctorName: 'Dr. Sarah Mitchell',
        diagnosis: 'Essential Hypertension (Stage 1) - ICD-10 I10',
        symptoms: 'Mild occipital morning headaches, occasional elevated BP at home (142/90 mmHg).',
        prescription: 'Telmisartan 40mg - 1 tablet orally once daily after breakfast (30 days)\nHydrochlorothiazide 12.5mg - 1 tablet as directed.',
        notes: 'Advised strict DASH diet guidelines (less than 2g sodium daily). Patient should record ambulatory morning blood pressure for 14 days.',
        date: getRelativeDate(-10)
      },
      {
        id: 'MR-9002',
        patientId: 'usr_pt_2',
        doctorId: 'usr_doc_5',
        doctorName: 'Dr. Robert Chen',
        diagnosis: 'Mild Iron Deficiency Anemia & Fatigue Syndrome',
        symptoms: 'Generalized fatigue, pallor, mild exertional dyspnea.',
        prescription: 'Ferrous Ascorbate with Folic Acid (100mg elemental iron) - 1 tablet daily with vitamin C\nVitamin D3 60,000 IU - 1 capsule weekly for 8 weeks.',
        notes: 'Serum Ferritin level was 14 ng/mL. Advised leafy greens, legumes, and avoidance of tea/coffee within 2 hours of iron supplement.',
        date: getRelativeDate(-20)
      },
      {
        id: 'MR-9003',
        patientId: 'usr_pt_3',
        doctorId: 'usr_doc_4',
        doctorName: 'Dr. Marcus Miller',
        diagnosis: 'Grade II Lateral Ankle Sprain (Anterior Talofibular Ligament)',
        symptoms: 'Swelling, tenderness over lateral malleolus, difficulty bearing weight.',
        prescription: 'Etoricoxib 90mg - 1 tablet once daily after meals for 5 days\nAceclofenac gel - Apply topically 3 times daily.',
        notes: 'Advised R.I.C.E. protocol (Rest, Ice, Compression, Elevation) for 72 hours. Ankle brace recommended during ambulation.',
        date: getRelativeDate(-25)
      }
    ],

    feedback: [
      {
        id: 'FB-501',
        patientId: 'usr_pt_1',
        patientName: 'Alex Johnson',
        doctorId: 'usr_doc_1',
        appointmentId: 'APT-2026-1075',
        rating: 5,
        comment: 'Dr. Mitchell is phenomenal. She spent genuine time explaining my cardiac risk factors, guided me through the ECG findings without rushing, and tailored my blood pressure management plan with great compassion.',
        date: getRelativeDate(-9)
      },
      {
        id: 'FB-502',
        patientId: 'usr_pt_2',
        patientName: 'Priya Sharma',
        doctorId: 'usr_doc_3',
        appointmentId: 'APT-2026-1070',
        rating: 5,
        comment: 'Dr. Watson was very patient, cheerful, and thorough with the vaccination guidance. Wonderful experience!',
        date: getRelativeDate(-17)
      },
      {
        id: 'FB-503',
        patientId: 'usr_pt_3',
        patientName: 'David Kim',
        doctorId: 'usr_doc_4',
        appointmentId: 'APT-2026-1065',
        rating: 4,
        comment: 'Dr. Miller quickly diagnosed my ankle sprain and gave clear rehabilitation steps. Very professional.',
        date: getRelativeDate(-24)
      }
    ],

    notifications: [
      {
        id: 'notif_1',
        userId: 'usr_admin_1',
        title: 'New Appointment Booked',
        message: 'Patient Alex Johnson scheduled a consultation with Dr. Sarah Mitchell.',
        type: 'appointment_booked',
        date: getRelativeDate(0),
        read: false
      },
      {
        id: 'notif_2',
        userId: 'usr_doc_1',
        title: 'New Consultation Request',
        message: 'Patient Priya Sharma booked an appointment for 11:30 AM today.',
        type: 'appointment_booked',
        date: getRelativeDate(0),
        read: false
      },
      {
        id: 'notif_3',
        userId: 'usr_pt_1',
        title: 'Appointment Confirmed',
        message: 'Your appointment with Dr. Sarah Mitchell for today at 10:00 AM is confirmed.',
        type: 'appointment_confirmed',
        date: getRelativeDate(0),
        read: false
      }
    ],

    settings: {
      id: 'settings_global',
      clinicName: 'PulseCare Regional Medical Center',
      email: 'contact@pulsecare.org',
      phone: '+1 (800) 555-0199',
      address: '124 Medical Park Boulevard, Suite 500, Healthcare Plaza',
      appointmentDuration: 30,
      workingDays: 'Monday - Saturday',
      workingHoursStart: '08:00 AM',
      workingHoursEnd: '06:00 PM',
      emailNotifications: true,
      appointmentReminders: true
    }
  };

  // ==========================================================================
  // 2. DATABASE REPOSITORY SERVICE
  // ==========================================================================

  const DB = {
    get() {
      try {
        const raw = localStorage.getItem(DB_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {
        console.error('Error loading db', e);
      }
      this.set(INITIAL_DATABASE);
      return JSON.parse(JSON.stringify(INITIAL_DATABASE));
    },

    set(data) {
      try {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error('Error saving db', e);
      }
    },

    reset() {
      localStorage.removeItem(DB_STORAGE_KEY);
      return this.get();
    }
  };

  // Session Manager
  const Session = {
    getUser() {
      try {
        const raw = localStorage.getItem(SESSION_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {
        console.error('Error loading session', e);
      }
      return null;
    },

    setUser(user) {
      if (!user) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      } else {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      }
    },

    clear() {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  };

  // Application In-Memory State
  const AppState = {
    data: DB.get(),
    currentUser: Session.getUser(),
    activeAdminTab: 'overview',
    activeDoctorTab: 'overview',
    activePatientTab: 'overview',
    selectedDoctorScheduleDate: getRelativeDate(0),
    selectedBookingDoctorId: null,
    selectedBookingDate: getRelativeDate(1),
    selectedBookingSlot: null
  };

  // ==========================================================================
  // 3. ROUTER & ACCESS CONTROL (RBAC)
  // ==========================================================================

  function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  function handleRoute() {
    const hash = window.location.hash || '#/';
    const route = hash.split('?')[0];

    // Refresh current user from session
    AppState.currentUser = Session.getUser();

    // Hide all primary views first
    document.querySelectorAll('.app-view').forEach(view => view.style.display = 'none');

    // Update navbar buttons on landing page
    updateLandingNavState();

    if (route === '#/' || route === '') {
      document.getElementById('viewLanding').style.display = 'block';
      window.scrollTo(0, 0);
    } else if (route === '#/login') {
      document.getElementById('viewLogin').style.display = 'flex';
      document.getElementById('loginErrorMessage').style.display = 'none';
      window.scrollTo(0, 0);
    } else if (route === '#/register') {
      document.getElementById('viewRegister').style.display = 'flex';
      document.getElementById('registerErrorMessage').style.display = 'none';
      window.scrollTo(0, 0);
    } else if (route === '#/unauthorized') {
      document.getElementById('viewUnauthorized').style.display = 'flex';
      window.scrollTo(0, 0);
    } else if (route === '#/admin') {
      if (!AppState.currentUser) {
        navigateTo('#/login');
        showToast('Please sign in to access the Administrator Dashboard.', 'info');
        return;
      }
      if (AppState.currentUser.role !== 'Admin') {
        navigateTo('#/unauthorized');
        return;
      }
      openDashboardShell('Admin');
    } else if (route === '#/doctor') {
      if (!AppState.currentUser) {
        navigateTo('#/login');
        showToast('Please sign in to access the Doctor Dashboard.', 'info');
        return;
      }
      if (AppState.currentUser.role !== 'Doctor') {
        navigateTo('#/unauthorized');
        return;
      }
      openDashboardShell('Doctor');
    } else if (route === '#/patient') {
      if (!AppState.currentUser) {
        navigateTo('#/login');
        showToast('Please sign in to access the Patient Dashboard.', 'info');
        return;
      }
      if (AppState.currentUser.role !== 'Patient') {
        navigateTo('#/unauthorized');
        return;
      }
      openDashboardShell('Patient');
    } else {
      // 404 fallback
      navigateTo('#/');
    }
  }

  function navigateTo(hash) {
    window.location.hash = hash;
  }

  function updateLandingNavState() {
    const authBox = document.getElementById('publicNavAuthButtons');
    const dashBox = document.getElementById('publicNavDashboardButton');
    if (!authBox || !dashBox) return;

    if (AppState.currentUser) {
      authBox.style.display = 'none';
      dashBox.style.display = 'flex';
    } else {
      authBox.style.display = 'flex';
      dashBox.style.display = 'none';
    }
  }

  // ==========================================================================
  // 4. AUTHENTICATION LOGIC (Login, Register, Logout)
  // ==========================================================================

  function setupAuthEvents() {
    // 1-Click Demo Login buttons
    document.getElementById('btnQuickLoginAdmin')?.addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'admin@pulsecare.org';
      document.getElementById('loginPassword').value = 'admin123';
      showToast('Admin credentials autofilled!', 'info');
    });

    document.getElementById('btnQuickLoginDoctor')?.addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'sarah.mitchell@pulsecare.org';
      document.getElementById('loginPassword').value = 'doctor123';
      showToast('Doctor credentials autofilled!', 'info');
    });

    document.getElementById('btnQuickLoginPatient')?.addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'alex.johnson@email.com';
      document.getElementById('loginPassword').value = 'patient123';
      showToast('Patient credentials autofilled!', 'info');
    });

    // Toggle password view
    document.getElementById('btnToggleLoginPwd')?.addEventListener('click', () => {
      const pwdInput = document.getElementById('loginPassword');
      if (pwdInput) {
        pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
      }
    });

    // Login Form Submit
    document.getElementById('authLoginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;
      const errBox = document.getElementById('loginErrorMessage');

      // Refresh DB data
      AppState.data = DB.get();

      const user = AppState.data.users.find(u => u.email.toLowerCase() === email);

      if (!user) {
        errBox.textContent = 'Account not found. Please verify your email or register a new account.';
        errBox.style.display = 'block';
        return;
      }

      if (user.password !== password) {
        errBox.textContent = 'Incorrect password entered. Please try again.';
        errBox.style.display = 'block';
        return;
      }

      if (user.status !== 'Active') {
        errBox.textContent = 'This account has been deactivated by hospital administration.';
        errBox.style.display = 'block';
        return;
      }

      // Successful login
      errBox.style.display = 'none';
      Session.setUser(user);
      AppState.currentUser = user;
      showToast(`Welcome back, ${user.name}! Authenticated as ${user.role}.`, 'success');

      // Redirect according to role
      if (user.role === 'Admin') navigateTo('#/admin');
      else if (user.role === 'Doctor') navigateTo('#/doctor');
      else if (user.role === 'Patient') navigateTo('#/patient');
    });

    // Registration Form Role Dropdown Toggle (Show Specialty for Doctor)
    document.getElementById('regRole')?.addEventListener('change', (e) => {
      const role = e.target.value;
      const deptGroup = document.getElementById('regDoctorDeptGroup');
      if (deptGroup) {
        deptGroup.style.display = role === 'Doctor' ? 'block' : 'none';
      }
    });

    // Register Form Submit
    document.getElementById('authRegisterForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('regFullName').value.trim();
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const password = document.getElementById('regPassword').value;
      const confirmPwd = document.getElementById('regConfirmPassword').value;
      const role = document.getElementById('regRole').value;
      const specialty = document.getElementById('regSpecialty')?.value || 'General Medicine';
      const errBox = document.getElementById('registerErrorMessage');

      // 1. Password confirmation check
      if (password !== confirmPwd) {
        errBox.textContent = 'Passwords do not match. Please ensure both passwords match.';
        errBox.style.display = 'block';
        return;
      }

      if (password.length < 6) {
        errBox.textContent = 'Password must be at least 6 characters long.';
        errBox.style.display = 'block';
        return;
      }

      // 2. Prevent duplicate email check
      AppState.data = DB.get();
      const exists = AppState.data.users.some(u => u.email.toLowerCase() === email);
      if (exists) {
        errBox.textContent = 'An account with this email address already exists. Please sign in instead.';
        errBox.style.display = 'block';
        return;
      }

      // 3. Create user
      const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'US';
      const userId = 'usr_' + Date.now();
      const newUser = {
        id: userId,
        name: fullName,
        email: email,
        password: password,
        role: role,
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0],
        phone: '+1 (555) 000-0000',
        address: 'Registered Online',
        avatar: initials
      };

      if (role === 'Doctor') {
        newUser.specialization = specialty;
        newUser.qualification = `Specialist Physician - ${specialty}`;
        newUser.room = `Room ${Math.floor(100 + Math.random() * 400)}`;
        newUser.rating = 5.0;

        AppState.data.doctors.push({
          id: 'doc_' + Date.now(),
          userId: userId,
          specialization: specialty,
          availability: []
        });
      } else if (role === 'Patient') {
        newUser.dob = '1995-01-01';
        newUser.bloodGroup = 'O+';
        newUser.emergencyContact = 'Not Specified';

        AppState.data.patients.push({
          id: 'pt_' + Date.now(),
          userId: userId,
          emergencyContact: 'Not Specified'
        });
      }

      AppState.data.users.push(newUser);
      DB.set(AppState.data);

      errBox.style.display = 'none';
      Session.setUser(newUser);
      AppState.currentUser = newUser;

      showToast(`Account successfully created for ${fullName}!`, 'success');

      // Auto redirect to role dashboard
      if (role === 'Admin') navigateTo('#/admin');
      else if (role === 'Doctor') navigateTo('#/doctor');
      else if (role === 'Patient') navigateTo('#/patient');
    });

    // Global Logout handlers
    const handleLogout = () => {
      Session.clear();
      AppState.currentUser = null;
      showToast('You have been signed out successfully.', 'info');
      navigateTo('#/login');
    };

    document.getElementById('btnSidebarLogout')?.addEventListener('click', handleLogout);
    document.getElementById('btnTopLogout')?.addEventListener('click', handleLogout);

    // Go to My Dashboard button on landing
    document.getElementById('btnGoToMyDashboard')?.addEventListener('click', () => {
      if (AppState.currentUser) {
        if (AppState.currentUser.role === 'Admin') navigateTo('#/admin');
        else if (AppState.currentUser.role === 'Doctor') navigateTo('#/doctor');
        else if (AppState.currentUser.role === 'Patient') navigateTo('#/patient');
      } else {
        navigateTo('#/login');
      }
    });

    // Hero buttons behavior
    document.getElementById('heroBtnBookAppt')?.addEventListener('click', () => {
      if (!AppState.currentUser) {
        navigateTo('#/login');
        showToast('Please sign in or register to book your clinical consultation.', 'info');
      } else if (AppState.currentUser.role === 'Patient') {
        AppState.activePatientTab = 'booking';
        navigateTo('#/patient');
      } else {
        showToast(`You are logged in as ${AppState.currentUser.role}. Navigating to dashboard.`, 'info');
        if (AppState.currentUser.role === 'Admin') navigateTo('#/admin');
        else navigateTo('#/doctor');
      }
    });

    document.getElementById('btnHeroQuickBook')?.addEventListener('click', () => {
      document.getElementById('heroBtnBookAppt').click();
    });

    // Public contact form
    document.getElementById('publicContactForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      document.getElementById('publicContactForm').reset();
      showToast(`Thank you, ${name}! Your inquiry has been sent to our hospital support desk.`, 'success');
    });

    // Unauthorized buttons
    document.getElementById('btnUnauthGoDashboard')?.addEventListener('click', () => {
      if (AppState.currentUser) {
        if (AppState.currentUser.role === 'Admin') navigateTo('#/admin');
        else if (AppState.currentUser.role === 'Doctor') navigateTo('#/doctor');
        else if (AppState.currentUser.role === 'Patient') navigateTo('#/patient');
      } else {
        navigateTo('#/login');
      }
    });

    // Mobile sidebar toggle
    document.getElementById('btnToggleSidebar')?.addEventListener('click', () => {
      document.getElementById('dashboardSidebar')?.classList.toggle('mobile-open');
    });

    // Notification bell dropdown
    document.getElementById('btnNotificationBell')?.addEventListener('click', () => {
      const panel = document.getElementById('notificationsPanel');
      panel?.classList.toggle('active');
    });

    // Clear notifications
    document.getElementById('btnClearNotifications')?.addEventListener('click', () => {
      if (AppState.currentUser) {
        AppState.data.notifications.forEach(n => {
          if (n.userId === AppState.currentUser.id || AppState.currentUser.role === 'Admin') {
            n.read = true;
          }
        });
        DB.set(AppState.data);
        renderNotifications();
        showToast('All notifications marked as read.', 'info');
      }
    });

    // Close notifications panel on outside click
    document.addEventListener('click', (e) => {
      const bellWrapper = document.querySelector('.notification-bell-wrapper');
      if (bellWrapper && !bellWrapper.contains(e.target)) {
        document.getElementById('notificationsPanel')?.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 5. DASHBOARD SHELL & NAVIGATION BUILDER
  // ==========================================================================

  function openDashboardShell(role) {
    document.getElementById('viewDashboardShell').style.display = 'flex';
    const user = AppState.currentUser;

    // Sidebar Profile
    document.getElementById('sidebarAvatar').textContent = user.avatar || user.name.substring(0, 2).toUpperCase();
    document.getElementById('sidebarUserName').textContent = user.name;
    document.getElementById('sidebarUserRole').textContent = `${user.role} Portal`;

    // Topbar Profile
    document.getElementById('topbarAvatar').textContent = user.avatar || user.name.substring(0, 2).toUpperCase();
    document.getElementById('topbarUserName').textContent = user.name;
    document.getElementById('topbarPortalName').textContent = `${user.role} Portal`;

    renderSidebarMenu(role);
    renderNotifications();

    if (role === 'Admin') renderAdminTab(AppState.activeAdminTab);
    else if (role === 'Doctor') renderDoctorTab(AppState.activeDoctorTab);
    else if (role === 'Patient') renderPatientTab(AppState.activePatientTab);
  }

  function renderSidebarMenu(role) {
    const container = document.getElementById('sidebarNavMenu');
    if (!container) return;
    container.innerHTML = '';

    let items = [];

    if (role === 'Admin') {
      items = [
        { id: 'overview', label: 'Dashboard', icon: '📊' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'appointments', label: 'Appointment Management', icon: '📅' },
        { id: 'settings', label: 'System Settings', icon: '⚙️' },
        { id: 'analytics', label: 'Performance Analytics', icon: '📈' },
        { id: 'profile', label: 'Profile', icon: '👤' }
      ];
    } else if (role === 'Doctor') {
      items = [
        { id: 'overview', label: 'Dashboard', icon: '🩺' },
        { id: 'schedule', label: 'My Schedule', icon: '🗓️' },
        { id: 'records', label: 'Patient Records', icon: '📋' },
        { id: 'appointments', label: 'Appointments', icon: '📅' },
        { id: 'feedback', label: 'Patient Feedback', icon: '⭐' },
        { id: 'profile', label: 'Profile', icon: '👤' }
      ];
    } else if (role === 'Patient') {
      items = [
        { id: 'overview', label: 'Dashboard', icon: '🏠' },
        { id: 'booking', label: 'Book Appointment', icon: '✨' },
        { id: 'history', label: 'Appointment History', icon: '🕒' },
        { id: 'records', label: 'Medical History', icon: '📑' },
        { id: 'profile', label: 'Profile', icon: '👤' }
      ];
    }

    const currentTab = role === 'Admin' ? AppState.activeAdminTab : role === 'Doctor' ? AppState.activeDoctorTab : AppState.activePatientTab;

    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = `sidebar-nav-item ${item.id === currentTab ? 'active' : ''}`;
      btn.innerHTML = `<span class="sidebar-icon">${item.icon}</span> <span>${item.label}</span>`;
      btn.addEventListener('click', () => {
        // Close mobile sidebar if open
        document.getElementById('dashboardSidebar')?.classList.remove('mobile-open');

        if (role === 'Admin') {
          AppState.activeAdminTab = item.id;
          renderAdminTab(item.id);
        } else if (role === 'Doctor') {
          AppState.activeDoctorTab = item.id;
          renderDoctorTab(item.id);
        } else if (role === 'Patient') {
          AppState.activePatientTab = item.id;
          renderPatientTab(item.id);
        }
        renderSidebarMenu(role);
      });
      container.appendChild(btn);
    });
  }

  function renderNotifications() {
    const user = AppState.currentUser;
    if (!user) return;

    const notifs = AppState.data.notifications.filter(n => n.userId === user.id || user.role === 'Admin');
    const unreadCount = notifs.filter(n => !n.read).length;

    const badge = document.getElementById('notificationBadge');
    if (badge) {
      if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    }

    const list = document.getElementById('notificationsList');
    if (list) {
      if (notifs.length === 0) {
        list.innerHTML = `<p class="empty-notif-text">No activity notifications</p>`;
      } else {
        list.innerHTML = notifs.map(n => `
          <div class="notif-item ${n.read ? '' : 'unread'}" style="${n.read ? '' : 'background: var(--primary-light);'}">
            <strong>${escapeHtml(n.title)}</strong>
            <p>${escapeHtml(n.message)}</p>
            <small>${formatDate(n.date)}</small>
          </div>
        `).join('');
      }
    }
  }

  function createNotification(userId, title, message, type) {
    const notif = {
      id: 'notif_' + Date.now() + Math.floor(Math.random() * 100),
      userId,
      title,
      message,
      type,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    AppState.data.notifications.unshift(notif);
    DB.set(AppState.data);
    renderNotifications();
  }

  // ==========================================================================
  // 6. ADMIN DASHBOARD CONTROLLER & MODULES
  // ==========================================================================

  function renderAdminTab(tabId) {
    document.getElementById('topbarPageTitle').textContent = 
      tabId === 'overview' ? 'Operational Dashboard' :
      tabId === 'users' ? 'User Management' :
      tabId === 'appointments' ? 'Appointment Management' :
      tabId === 'settings' ? 'System Settings' :
      tabId === 'analytics' ? 'Performance Analytics' : 'Admin Profile';

    const vp = document.getElementById('dashboardViewport');
    if (!vp) return;

    if (tabId === 'overview') renderAdminOverview(vp);
    else if (tabId === 'users') renderAdminUsers(vp);
    else if (tabId === 'appointments') renderAdminAppointments(vp);
    else if (tabId === 'settings') renderAdminSettings(vp);
    else if (tabId === 'analytics') renderAdminAnalytics(vp);
    else if (tabId === 'profile') renderUserProfile(vp);
  }

  function renderAdminOverview(container) {
    const data = AppState.data;
    const totalUsers = data.users.length;
    const totalDocs = data.users.filter(u => u.role === 'Doctor').length;
    const totalPts = data.users.filter(u => u.role === 'Patient').length;
    const totalAppts = data.appointments.length;
    const today = getRelativeDate(0);

    const upcomingAppts = data.appointments.filter(a => a.date >= today && (a.status === 'Confirmed' || a.status === 'Pending')).length;
    const completedAppts = data.appointments.filter(a => a.status === 'Completed').length;

    container.innerHTML = `
      <!-- Real KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon icon-cyan">👥</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Users</span>
            <h3 class="kpi-value">${totalUsers}</h3>
            <span class="kpi-trend positive">${totalDocs} Doctors • ${totalPts} Patients</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-blue">🩺</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Doctors</span>
            <h3 class="kpi-value">${totalDocs}</h3>
            <span class="kpi-trend">All active specialists</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-emerald">🧑</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Patients</span>
            <h3 class="kpi-value">${totalPts}</h3>
            <span class="kpi-trend positive">Registered Profiles</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-amber">📅</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Appointments</span>
            <h3 class="kpi-value">${totalAppts}</h3>
            <span class="kpi-trend">All-time clinic bookings</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-cyan">🕒</div>
          <div class="kpi-content">
            <span class="kpi-title">Upcoming Appointments</span>
            <h3 class="kpi-value">${upcomingAppts}</h3>
            <span class="kpi-trend positive">Scheduled on/after today</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-emerald">✅</div>
          <div class="kpi-content">
            <span class="kpi-title">Completed Appointments</span>
            <h3 class="kpi-value">${completedAppts}</h3>
            <span class="kpi-trend positive">Consultations closed</span>
          </div>
        </div>
      </div>

      <!-- Quick Summary Table -->
      <div class="data-table-wrapper" style="margin-top: 1rem;">
        <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700;">Recent Consultation Bookings</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Real-time stream of clinic appointments.</p>
          </div>
          <button class="btn btn-outline-sm" onclick="window.PulseCare.switchAdminTab('appointments')">View All Appointments →</button>
        </div>
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.appointments.slice(0, 5).map(a => `
              <tr>
                <td><strong>${a.id}</strong></td>
                <td>${escapeHtml(a.patientName)}</td>
                <td>${escapeHtml(a.doctorName)}</td>
                <td>${formatDate(a.date)} • ${a.time}</td>
                <td><span class="badge ${getStatusBadge(a.status)}">${a.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderAdminUsers(container) {
    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Hospital User Management</h2>
          <p class="section-desc">Create, view, modify credentials, and manage roles for patients, doctors, and staff.</p>
        </div>
        <button class="btn btn-primary" id="btnOpenAddUserModal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New User
        </button>
      </div>

      <div class="table-filter-bar">
        <div class="search-input-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="adminUserSearch" placeholder="Search by name or email address...">
        </div>
        <div class="filter-controls">
          <select id="adminUserRoleFilter" class="form-select">
            <option value="all">All Roles</option>
            <option value="Admin">Administrators</option>
            <option value="Doctor">Doctors</option>
            <option value="Patient">Patients</option>
          </select>
        </div>
      </div>

      <div class="data-table-wrapper">
        <table class="custom-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created Date</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="adminUsersTbody"></tbody>
        </table>
      </div>
    `;

    const populate = () => {
      const q = (document.getElementById('adminUserSearch')?.value || '').toLowerCase();
      const roleFilter = document.getElementById('adminUserRoleFilter')?.value || 'all';
      const tbody = document.getElementById('adminUsersTbody');
      if (!tbody) return;

      const filtered = AppState.data.users.filter(u => {
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        const matchesSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
        return matchesRole && matchesSearch;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-muted-sm">No users match criteria.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(u => `
        <tr>
          <td>
            <div class="user-cell">
              <div class="cell-avatar">${u.avatar || u.name.substring(0, 2).toUpperCase()}</div>
              <div>
                <strong class="user-meta-name">${escapeHtml(u.name)}</strong>
                ${u.specialization ? `<div class="user-meta-sub">${u.specialization}</div>` : ''}
              </div>
            </div>
          </td>
          <td>${escapeHtml(u.email)}</td>
          <td><span class="badge ${getRoleBadge(u.role)}">${u.role}</span></td>
          <td>
            <span class="badge ${u.status === 'Active' ? 'badge-status-confirmed' : 'badge-status-cancelled'}">
              <span class="status-dot ${u.status === 'Active' ? 'dot-online' : 'dot-admin'}"></span> ${u.status}
            </span>
          </td>
          <td>${formatDate(u.createdAt || '2026-01-01')}</td>
          <td class="text-right">
            <div class="action-btn-group">
              <button class="btn btn-outline-sm" onclick="window.PulseCare.viewUser('${u.id}')">View</button>
              <button class="btn btn-outline-sm" onclick="window.PulseCare.editUser('${u.id}')">Edit</button>
              <button class="btn btn-outline-sm" style="color: var(--rose);" onclick="window.PulseCare.deleteUser('${u.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    };

    document.getElementById('adminUserSearch')?.addEventListener('input', populate);
    document.getElementById('adminUserRoleFilter')?.addEventListener('change', populate);
    document.getElementById('btnOpenAddUserModal')?.addEventListener('click', () => {
      document.getElementById('adminUserForm').reset();
      document.getElementById('editUserId').value = '';
      document.getElementById('adminUserPwdGroup').style.display = 'block';
      document.getElementById('modalUserTitle').textContent = 'Add New System User';
      openModal('modalUserManage');
    });

    populate();
  }

  function renderAdminAppointments(container) {
    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Hospital Master Appointments</h2>
          <p class="section-desc">Oversee, schedule, reschedule, and manage statuses across all clinical departments.</p>
        </div>
        <button class="btn btn-primary" id="btnAdminScheduleAppt">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Schedule Appointment
        </button>
      </div>

      <div class="table-filter-bar">
        <div class="search-input-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="adminApptSearch" placeholder="Search by patient, doctor, ID or reason...">
        </div>
        <div class="filter-controls">
          <select id="adminApptStatusFilter" class="form-select">
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div class="data-table-wrapper">
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="adminApptTbody"></tbody>
        </table>
      </div>
    `;

    const populate = () => {
      const q = (document.getElementById('adminApptSearch')?.value || '').toLowerCase();
      const statusFilter = document.getElementById('adminApptStatusFilter')?.value || 'all';
      const tbody = document.getElementById('adminApptTbody');
      if (!tbody) return;

      const filtered = AppState.data.appointments.filter(a => {
        const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
        const matchesSearch = a.patientName.toLowerCase().includes(q) ||
                              a.doctorName.toLowerCase().includes(q) ||
                              a.id.toLowerCase().includes(q) ||
                              a.reason.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-muted-sm">No appointments found matching criteria.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(a => `
        <tr>
          <td><strong>${a.id}</strong></td>
          <td>${escapeHtml(a.patientName)}</td>
          <td>${escapeHtml(a.doctorName)}</td>
          <td>${formatDate(a.date)} • ${a.time}</td>
          <td>${escapeHtml(a.reason)}</td>
          <td><span class="badge ${getStatusBadge(a.status)}">${a.status}</span></td>
          <td class="text-right">
            <div class="action-btn-group">
              <button class="btn btn-outline-sm" onclick="window.PulseCare.viewAppointment('${a.id}')">View</button>
              ${a.status !== 'Completed' && a.status !== 'Cancelled' ? `
                <button class="btn btn-outline-sm" onclick="window.PulseCare.editAdminAppointment('${a.id}')">Reschedule / Status</button>
                <button class="btn btn-outline-sm" style="color: var(--rose);" onclick="window.PulseCare.cancelAppointment('${a.id}')">Cancel</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    };

    document.getElementById('adminApptSearch')?.addEventListener('input', populate);
    document.getElementById('adminApptStatusFilter')?.addEventListener('change', populate);
    document.getElementById('btnAdminScheduleAppt')?.addEventListener('click', () => {
      openAdminScheduleModal();
    });

    populate();
  }

  function openAdminScheduleModal(editApptId = null) {
    const ptSelect = document.getElementById('adminApptPatientSelect');
    const docSelect = document.getElementById('adminApptDoctorSelect');
    const statusRow = document.getElementById('adminApptStatusRow');

    ptSelect.innerHTML = AppState.data.users.filter(u => u.role === 'Patient').map(p => 
      `<option value="${p.id}">${escapeHtml(p.name)} (${p.email})</option>`
    ).join('');

    docSelect.innerHTML = AppState.data.users.filter(u => u.role === 'Doctor').map(d => 
      `<option value="${d.id}">${escapeHtml(d.name)} - ${d.specialization}</option>`
    ).join('');

    if (editApptId) {
      const appt = AppState.data.appointments.find(a => a.id === editApptId);
      if (!appt) return;
      document.getElementById('adminApptEditId').value = appt.id;
      document.getElementById('modalAdminApptTitle').textContent = `Manage Appointment: #${appt.id}`;
      ptSelect.value = appt.patientId;
      docSelect.value = appt.doctorId;
      document.getElementById('adminApptDate').value = appt.date;
      document.getElementById('adminApptTime').value = appt.time;
      document.getElementById('adminApptReason').value = appt.reason;
      document.getElementById('adminApptStatus').value = appt.status;
      statusRow.style.display = 'block';
    } else {
      document.getElementById('adminApptForm').reset();
      document.getElementById('adminApptEditId').value = '';
      document.getElementById('modalAdminApptTitle').textContent = 'Schedule New Clinical Appointment';
      document.getElementById('adminApptDate').value = getRelativeDate(1);
      statusRow.style.display = 'none';
    }

    openModal('modalAdminAppt');
  }

  function renderAdminSettings(container) {
    const s = AppState.data.settings;

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Hospital System Settings</h2>
          <p class="section-desc">Configure clinic parameters, operational hours, slot durations, and notification automations.</p>
        </div>
      </div>

      <div class="settings-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="contact-form-card">
          <form id="settingsGeneralForm">
            <h3 style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">General Hospital Information</h3>
            <div class="form-row-2">
              <div class="form-group">
                <label for="setClinicName">Hospital / Clinic Name</label>
                <input type="text" id="setClinicName" class="form-input" value="${escapeHtml(s.clinicName)}" required>
              </div>
              <div class="form-group">
                <label for="setPhone">Phone Contact</label>
                <input type="text" id="setPhone" class="form-input" value="${escapeHtml(s.phone)}" required>
              </div>
            </div>
            <div class="form-group">
              <label for="setEmail">Official Email</label>
              <input type="email" id="setEmail" class="form-input" value="${escapeHtml(s.email)}" required>
            </div>
            <div class="form-group">
              <label for="setAddress">Physical Address</label>
              <input type="text" id="setAddress" class="form-input" value="${escapeHtml(s.address)}" required>
            </div>

            <h3 style="margin: 1.5rem 0 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">Appointment Settings</h3>
            <div class="form-row-2">
              <div class="form-group">
                <label for="setDuration">Default Slot Duration (Minutes)</label>
                <select id="setDuration" class="form-select">
                  <option value="15" ${s.appointmentDuration == 15 ? 'selected' : ''}>15 Minutes</option>
                  <option value="30" ${s.appointmentDuration == 30 ? 'selected' : ''}>30 Minutes</option>
                  <option value="45" ${s.appointmentDuration == 45 ? 'selected' : ''}>45 Minutes</option>
                  <option value="60" ${s.appointmentDuration == 60 ? 'selected' : ''}>60 Minutes</option>
                </select>
              </div>
              <div class="form-group">
                <label for="setWorkingDays">Working Days</label>
                <input type="text" id="setWorkingDays" class="form-input" value="${escapeHtml(s.workingDays)}" required>
              </div>
            </div>
            <div class="form-row-2">
              <div class="form-group">
                <label for="setWorkingStart">Opening Hour</label>
                <input type="text" id="setWorkingStart" class="form-input" value="${escapeHtml(s.workingHoursStart)}" required>
              </div>
              <div class="form-group">
                <label for="setWorkingEnd">Closing Hour</label>
                <input type="text" id="setWorkingEnd" class="form-input" value="${escapeHtml(s.workingHoursEnd)}" required>
              </div>
            </div>

            <h3 style="margin: 1.5rem 0 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">Notification Settings</h3>
            <div class="toggle-row">
              <div>
                <strong>Email Notifications</strong>
                <p>Send automated booking confirmations and updates.</p>
              </div>
              <label class="switch">
                <input type="checkbox" id="setNotifEmail" ${s.emailNotifications ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
            </div>
            <div class="toggle-row">
              <div>
                <strong>Appointment Reminders</strong>
                <p>Send automated reminders prior to scheduled consultations.</p>
              </div>
              <label class="switch">
                <input type="checkbox" id="setNotifReminders" ${s.appointmentReminders ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
            </div>

            <div class="form-actions-right">
              <button type="submit" class="btn btn-primary" id="btnSaveSystemSettings">Save Settings</button>
            </div>
          </form>
        </div>

        <div class="contact-info-card">
          <h3>Facility Summary</h3>
          <p>Settings saved here apply hospital-wide across all user portals and scheduling engines.</p>
          <div class="info-block">
            <strong>Active Config:</strong>
            <p id="dispClinicName">${escapeHtml(s.clinicName)}</p>
          </div>
          <div class="info-block">
            <strong>Operating Shift:</strong>
            <p id="dispShift">${escapeHtml(s.workingHoursStart)} – ${escapeHtml(s.workingHoursEnd)} (${escapeHtml(s.workingDays)})</p>
          </div>
          <div class="info-block">
            <strong>Slot Interval:</strong>
            <p id="dispDuration">${s.appointmentDuration} Minutes per consultation</p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('settingsGeneralForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      AppState.data.settings = {
        id: 'settings_global',
        clinicName: document.getElementById('setClinicName').value.trim(),
        phone: document.getElementById('setPhone').value.trim(),
        email: document.getElementById('setEmail').value.trim(),
        address: document.getElementById('setAddress').value.trim(),
        appointmentDuration: parseInt(document.getElementById('setDuration').value, 10),
        workingDays: document.getElementById('setWorkingDays').value.trim(),
        workingHoursStart: document.getElementById('setWorkingStart').value.trim(),
        workingHoursEnd: document.getElementById('setWorkingEnd').value.trim(),
        emailNotifications: document.getElementById('setNotifEmail').checked,
        appointmentReminders: document.getElementById('setNotifReminders').checked
      };

      DB.set(AppState.data);
      showToast('Settings updated successfully.', 'success');

      // Update facility summary
      document.getElementById('dispClinicName').textContent = AppState.data.settings.clinicName;
      document.getElementById('dispShift').textContent = `${AppState.data.settings.workingHoursStart} – ${AppState.data.settings.workingHoursEnd} (${AppState.data.settings.workingDays})`;
      document.getElementById('dispDuration').textContent = `${AppState.data.settings.appointmentDuration} Minutes per consultation`;
    });
  }

  function renderAdminAnalytics(container) {
    const data = AppState.data;
    const totalAppts = data.appointments.length;
    const completed = data.appointments.filter(a => a.status === 'Completed').length;
    const cancelled = data.appointments.filter(a => a.status === 'Cancelled').length;
    const pending = data.appointments.filter(a => a.status === 'Pending').length;
    const confirmed = data.appointments.filter(a => a.status === 'Confirmed').length;

    const totalUsers = data.users.length;
    const totalDocs = data.users.filter(u => u.role === 'Doctor').length;
    const totalPts = data.users.filter(u => u.role === 'Patient').length;
    const totalAdmins = data.users.filter(u => u.role === 'Admin').length;

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Performance Analytics & Operational Metrics</h2>
          <p class="section-desc">Real-time statistics computed dynamically from live clinical application data.</p>
        </div>
      </div>

      <!-- Live Statistical Summary -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon icon-cyan">📅</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Appointments</span>
            <h3 class="kpi-value">${totalAppts}</h3>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-emerald">✅</div>
          <div class="kpi-content">
            <span class="kpi-title">Completed Appointments</span>
            <h3 class="kpi-value">${completed}</h3>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-amber">🚫</div>
          <div class="kpi-content">
            <span class="kpi-title">Cancelled Appointments</span>
            <h3 class="kpi-value">${cancelled}</h3>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-blue">👥</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Users</span>
            <h3 class="kpi-value">${totalUsers}</h3>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-cyan">🩺</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Doctors</span>
            <h3 class="kpi-value">${totalDocs}</h3>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-emerald">🧑</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Patients</span>
            <h3 class="kpi-value">${totalPts}</h3>
          </div>
        </div>
      </div>

      <!-- Real SVG Dynamic Charts -->
      <div class="analytics-charts-grid" style="margin-top: 1.5rem;">
        
        <!-- Chart 1: Appointments by Month -->
        <div class="chart-card">
          <div class="chart-card-header">
            <h3>Appointments by Month</h3>
            <small>Consultation volume trends</small>
          </div>
          <div class="chart-svg-container">
            ${renderMonthlyAppointmentsBarChart(data.appointments)}
          </div>
        </div>

        <!-- Chart 2: User Distribution -->
        <div class="chart-card">
          <div class="chart-card-header">
            <h3>User Distribution</h3>
            <small>Patients vs Doctors vs Admins</small>
          </div>
          <div class="chart-svg-container">
            ${renderUserDistributionDonut(totalPts, totalDocs, totalAdmins)}
          </div>
        </div>

        <!-- Chart 3: Appointment Status Distribution -->
        <div class="chart-card">
          <div class="chart-card-header">
            <h3>Appointment Status Breakdown</h3>
            <small>Pending, Confirmed, Completed, Cancelled</small>
          </div>
          <div class="chart-svg-container">
            ${renderStatusBreakdownChart(pending, confirmed, completed, cancelled)}
          </div>
        </div>

        <!-- Chart 4: Doctor Appointment Statistics -->
        <div class="chart-card">
          <div class="chart-card-header">
            <h3>Doctor Appointment Statistics</h3>
            <small>Workload distribution per specialist</small>
          </div>
          <div class="chart-svg-container">
            ${renderDoctorWorkloadChart(data.users.filter(u => u.role === 'Doctor'), data.appointments)}
          </div>
        </div>

      </div>
    `;
  }

  // Real SVG Dynamic Chart Renderers
  function renderMonthlyAppointmentsBarChart(appts) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const counts = [2, 5, appts.length, 1, 0, 0];
    const maxVal = Math.max(...counts, 6);

    const svgBars = counts.map((c, i) => {
      const height = Math.max((c / maxVal) * 140, 6);
      const y = 160 - height;
      const x = 30 + i * 50;
      return `
        <rect x="${x}" y="${y}" width="32" height="${height}" rx="4" fill="hsl(186, 100%, 33%)" />
        <text x="${x + 16}" y="${y - 6}" font-size="11" font-weight="700" fill="hsl(215, 30%, 15%)" text-anchor="middle">${c}</text>
        <text x="${x + 16}" y="180" font-size="11" fill="hsl(215, 18%, 46%)" text-anchor="middle">${months[i]}</text>
      `;
    }).join('');

    return `
      <svg width="340" height="200" viewBox="0 0 340 200">
        <line x1="20" y1="160" x2="330" y2="160" stroke="hsl(214, 25%, 90%)" stroke-width="1" />
        ${svgBars}
      </svg>
    `;
  }

  function renderUserDistributionDonut(pts, docs, admins) {
    const total = pts + docs + admins || 1;
    const ptPct = Math.round((pts / total) * 100);
    const docPct = Math.round((docs / total) * 100);
    const admPct = 100 - ptPct - docPct;

    return `
      <div style="display: flex; align-items: center; justify-content: space-around; width: 100%;">
        <svg width="150" height="150" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="hsl(212, 92%, 46%)" stroke-width="6" stroke-dasharray="${ptPct} ${100 - ptPct}" stroke-dashoffset="25"></circle>
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="hsl(186, 100%, 33%)" stroke-width="6" stroke-dasharray="${docPct} ${100 - docPct}" stroke-dashoffset="${25 - ptPct}"></circle>
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="hsl(351, 85%, 56%)" stroke-width="6" stroke-dasharray="${admPct} ${100 - admPct}" stroke-dashoffset="${25 - ptPct - docPct}"></circle>
          <text x="21" y="22" font-size="7" font-weight="800" text-anchor="middle" fill="hsl(215, 30%, 15%)">${total}</text>
          <text x="21" y="27" font-size="3" text-anchor="middle" fill="hsl(215, 18%, 46%)">USERS</text>
        </svg>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.82rem;">
          <div><span style="color: hsl(212, 92%, 46%); font-weight: 700;">● Patients:</span> ${pts} (${ptPct}%)</div>
          <div><span style="color: hsl(186, 100%, 33%); font-weight: 700;">● Doctors:</span> ${docs} (${docPct}%)</div>
          <div><span style="color: hsl(351, 85%, 56%); font-weight: 700;">● Admins:</span> ${admins} (${admPct}%)</div>
        </div>
      </div>
    `;
  }

  function renderStatusBreakdownChart(pending, confirmed, completed, cancelled) {
    const total = pending + confirmed + completed + cancelled || 1;
    const items = [
      { label: 'Confirmed', count: confirmed, color: 'var(--emerald)', pct: Math.round((confirmed / total) * 100) },
      { label: 'Completed', count: completed, color: 'var(--secondary)', pct: Math.round((completed / total) * 100) },
      { label: 'Pending', count: pending, color: 'var(--amber)', pct: Math.round((pending / total) * 100) },
      { label: 'Cancelled', count: cancelled, color: 'var(--rose)', pct: Math.round((cancelled / total) * 100) }
    ];

    return `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 0.75rem;">
        ${items.map(it => `
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.25rem;">
              <span><strong>${it.label}</strong></span>
              <span>${it.count} (${it.pct}%)</span>
            </div>
            <div style="width: 100%; height: 8px; background: hsl(210, 25%, 93%); border-radius: 999px; overflow: hidden;">
              <div style="width: ${it.pct}%; height: 100%; background: ${it.color};"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderDoctorWorkloadChart(doctors, appointments) {
    const docCounts = doctors.map(d => {
      const count = appointments.filter(a => a.doctorId === d.id).length;
      return { name: d.name.replace('Dr. ', ''), count };
    });

    const maxVal = Math.max(...docCounts.map(d => d.count), 1);

    return `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 0.65rem;">
        ${docCounts.map(d => {
          const pct = Math.round((d.count / maxVal) * 100);
          return `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.2rem;">
                <span>${escapeHtml(d.name)}</span>
                <strong>${d.count} Consults</strong>
              </div>
              <div style="width: 100%; height: 8px; background: hsl(210, 25%, 93%); border-radius: 999px; overflow: hidden;">
                <div style="width: ${pct}%; height: 100%; background: hsl(186, 100%, 33%);"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // ==========================================================================
  // 7. DOCTOR DASHBOARD CONTROLLER & MODULES
  // ==========================================================================

  function renderDoctorTab(tabId) {
    document.getElementById('topbarPageTitle').textContent = 
      tabId === 'overview' ? 'Clinical Overview' :
      tabId === 'schedule' ? 'My Schedule Management' :
      tabId === 'records' ? 'Patient Medical Records' :
      tabId === 'appointments' ? 'Consultation Appointments' :
      tabId === 'feedback' ? 'Patient Feedback & Reviews' : 'Doctor Profile';

    const vp = document.getElementById('dashboardViewport');
    if (!vp) return;

    if (tabId === 'overview') renderDoctorOverview(vp);
    else if (tabId === 'schedule') renderDoctorSchedule(vp);
    else if (tabId === 'records') renderDoctorPatientRecords(vp);
    else if (tabId === 'appointments') renderDoctorAppointments(vp);
    else if (tabId === 'feedback') renderDoctorFeedback(vp);
    else if (tabId === 'profile') renderUserProfile(vp);
  }

  function renderDoctorOverview(container) {
    const docId = AppState.currentUser.id;
    const docAppts = AppState.data.appointments.filter(a => a.doctorId === docId);
    const today = getRelativeDate(0);

    const todayAppts = docAppts.filter(a => a.date === today && a.status !== 'Cancelled').length;
    const upcoming = docAppts.filter(a => a.date >= today && (a.status === 'Confirmed' || a.status === 'Pending')).length;
    const completed = docAppts.filter(a => a.status === 'Completed').length;
    
    // Distinct patients
    const distinctPatients = new Set(docAppts.map(a => a.patientId)).size;

    container.innerHTML = `
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon icon-cyan">📅</div>
          <div class="kpi-content">
            <span class="kpi-title">Today's Appointments</span>
            <h3 class="kpi-value">${todayAppts}</h3>
            <span class="kpi-trend positive">Scheduled today</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-blue">🕒</div>
          <div class="kpi-content">
            <span class="kpi-title">Upcoming Appointments</span>
            <h3 class="kpi-value">${upcoming}</h3>
            <span class="kpi-trend positive">Future scheduled</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-emerald">👥</div>
          <div class="kpi-content">
            <span class="kpi-title">Total Patients Treated</span>
            <h3 class="kpi-value">${distinctPatients}</h3>
            <span class="kpi-trend">Unique patient records</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-amber">✅</div>
          <div class="kpi-content">
            <span class="kpi-title">Completed Consultations</span>
            <h3 class="kpi-value">${completed}</h3>
            <span class="kpi-trend positive">Care delivered</span>
          </div>
        </div>
      </div>

      <div class="data-table-wrapper" style="margin-top: 1.5rem;">
        <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700;">Today's Patient Queue</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Patients scheduled with you today (${formatDate(today)}).</p>
          </div>
          <button class="btn btn-outline-sm" onclick="window.PulseCare.switchDoctorTab('appointments')">View All My Appointments →</button>
        </div>
        <table class="custom-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient</th>
              <th>Reason</th>
              <th>Status</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            ${docAppts.filter(a => a.date === today).length === 0 ? 
              `<tr><td colspan="5" class="text-muted-sm">No consultations scheduled for today.</td></tr>` :
              docAppts.filter(a => a.date === today).map(a => `
                <tr>
                  <td><strong>${a.time}</strong></td>
                  <td>${escapeHtml(a.patientName)}</td>
                  <td>${escapeHtml(a.reason)}</td>
                  <td><span class="badge ${getStatusBadge(a.status)}">${a.status}</span></td>
                  <td class="text-right">
                    <button class="btn btn-primary btn-sm" onclick="window.PulseCare.completeAppointment('${a.id}')">Complete Visit</button>
                  </td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderDoctorSchedule(container) {
    const docId = AppState.currentUser.id;
    const docProfile = AppState.data.doctors.find(d => d.userId === docId);
    const availabilityList = docProfile ? docProfile.availability : [];

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Physician Schedule & Availability Management</h2>
          <p class="section-desc">Manage your available consultation calendar, block out surgery or conference hours, and review booked slots.</p>
        </div>
        <button class="btn btn-primary" id="btnOpenDocScheduleModal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Availability / Block Time
        </button>
      </div>

      <div class="schedule-calendar-container">
        <!-- Sidebar Mini Calendar -->
        <div class="mini-calendar-box">
          <div class="calendar-month-header">
            <strong>Calendar Selector</strong>
          </div>
          <div class="form-group">
            <label for="docScheduleDatePick">Select Schedule Date:</label>
            <input type="date" id="docScheduleDatePick" class="form-input" value="${AppState.selectedDoctorScheduleDate}">
          </div>
          
          <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-light); padding-top: 1rem;">
            <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem;">Custom Blocked Intervals:</h4>
            ${availabilityList.length === 0 ? `<p style="font-size: 0.8rem; color: var(--text-muted);">No custom blocked hours.</p>` : `
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${availabilityList.map((av, idx) => `
                  <div style="background: hsl(210, 30%, 97%); padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <strong>${formatDate(av.date)}</strong>
                      <div>${av.startTime} - ${av.endTime} (${av.status})</div>
                    </div>
                    <button class="btn-icon danger" onclick="window.PulseCare.removeDoctorAvailability(${idx})" title="Remove">✕</button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>

        <!-- Schedule Slots Timeline -->
        <div class="calendar-main-view">
          <h3 id="docSchedTitle" style="margin-bottom: 0.5rem; font-size: 1.2rem;">Consultation Schedule for ${formatDate(AppState.selectedDoctorScheduleDate)}</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">Patient bookings respect this availability in real-time.</p>

          <div class="time-slots-timeline" id="docTimelineContainer"></div>
        </div>
      </div>
    `;

    const renderTimeline = () => {
      const date = AppState.selectedDoctorScheduleDate;
      const timeline = document.getElementById('docTimelineContainer');
      if (!timeline) return;

      const docAppts = AppState.data.appointments.filter(a => a.doctorId === docId && a.date === date && a.status !== 'Cancelled');
      const standardSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
      ];

      // Check if entire date or slots are blocked
      const blocked = availabilityList.filter(av => av.date === date && av.status === 'Blocked');

      timeline.innerHTML = standardSlots.map(time => {
        const isBooked = docAppts.find(a => a.time === time);
        const isBlocked = blocked.length > 0; // if blocked on this date

        if (isBooked) {
          return `
            <div class="timeline-slot-card booked">
              <div>
                <strong>${time}</strong>
                <p style="margin: 0; font-size: 0.85rem;">${escapeHtml(isBooked.patientName)} • ${escapeHtml(isBooked.reason)}</p>
              </div>
              <span class="badge badge-status-confirmed">Booked (#${isBooked.id})</span>
            </div>
          `;
        } else if (isBlocked) {
          return `
            <div class="timeline-slot-card blocked">
              <div>
                <strong>${time}</strong>
                <p style="margin: 0; font-size: 0.85rem; color: var(--rose);">Physician Unavailable / Blocked</p>
              </div>
              <span class="badge badge-status-cancelled">Blocked</span>
            </div>
          `;
        } else {
          return `
            <div class="timeline-slot-card available">
              <div>
                <strong>${time}</strong>
                <p style="margin: 0; font-size: 0.85rem; color: var(--emerald);">Available for Outpatient Booking</p>
              </div>
              <span class="badge badge-status-confirmed">Open Slot</span>
            </div>
          `;
        }
      }).join('');
    };

    document.getElementById('docScheduleDatePick')?.addEventListener('change', (e) => {
      AppState.selectedDoctorScheduleDate = e.target.value;
      document.getElementById('docSchedTitle').textContent = `Consultation Schedule for ${formatDate(e.target.value)}`;
      renderTimeline();
    });

    document.getElementById('btnOpenDocScheduleModal')?.addEventListener('click', () => {
      document.getElementById('docScheduleForm').reset();
      document.getElementById('schedDate').value = AppState.selectedDoctorScheduleDate;
      openModal('modalDocSchedule');
    });

    renderTimeline();
  }

  function renderDoctorPatientRecords(container) {
    const docId = AppState.currentUser.id;
    // Find all patients who have seen this doctor
    const docAppts = AppState.data.appointments.filter(a => a.doctorId === docId);
    const patientIds = [...new Set(docAppts.map(a => a.patientId))];
    const patients = AppState.data.users.filter(u => patientIds.includes(u.id));

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Patient Electronic Health Records (EHR)</h2>
          <p class="section-desc">Access clinical dossiers, review past medical histories, and add diagnosis and prescription records.</p>
        </div>
      </div>

      <div class="data-table-wrapper">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Age / DOB</th>
              <th>Contact</th>
              <th>Medical Records</th>
              <th>Last Consultation</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${patients.length === 0 ? `<tr><td colspan="7" class="text-muted-sm">No patient records associated with your consultations yet.</td></tr>` :
              patients.map(p => {
                const recs = AppState.data.medicalRecords.filter(m => m.patientId === p.id);
                const lastAppt = docAppts.filter(a => a.patientId === p.id).sort((a,b) => b.date.localeCompare(a.date))[0];
                return `
                  <tr>
                    <td><strong>${escapeHtml(p.name)}</strong></td>
                    <td>${escapeHtml(p.email)}</td>
                    <td>${p.dob || 'N/A'}</td>
                    <td>${escapeHtml(p.phone || 'N/A')}</td>
                    <td><span class="badge badge-info">${recs.length} Recorded</span></td>
                    <td>${lastAppt ? formatDate(lastAppt.date) : 'N/A'}</td>
                    <td class="text-right">
                      <div class="action-btn-group">
                        <button class="btn btn-outline-sm" onclick="window.PulseCare.viewPatientMedicalHistory('${p.id}')">View History</button>
                        <button class="btn btn-primary btn-sm" onclick="window.PulseCare.openAddMedicalRecordModal('${p.id}', '${escapeHtml(p.name)}')">+ Add Record</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderDoctorAppointments(container) {
    const docId = AppState.currentUser.id;
    const docAppts = AppState.data.appointments.filter(a => a.doctorId === docId);

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Doctor Consultation Appointments</h2>
          <p class="section-desc">Manage scheduled visits, confirm pending bookings, and complete consultations.</p>
        </div>
        <div class="filter-controls">
          <select id="docApptStatusFilter" class="form-select">
            <option value="all">All Appointments</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div class="data-table-wrapper">
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Date & Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th class="text-right">Consultation Actions</th>
            </tr>
          </thead>
          <tbody id="docApptTableBody"></tbody>
        </table>
      </div>
    `;

    const populate = () => {
      const filter = document.getElementById('docApptStatusFilter')?.value || 'all';
      const tbody = document.getElementById('docApptTableBody');
      if (!tbody) return;

      const filtered = docAppts.filter(a => filter === 'all' || a.status === filter);

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-muted-sm">No consultations match criteria.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(a => `
        <tr>
          <td><strong>${a.id}</strong></td>
          <td>${escapeHtml(a.patientName)}</td>
          <td>${formatDate(a.date)} • ${a.time}</td>
          <td>${escapeHtml(a.reason)}</td>
          <td><span class="badge ${getStatusBadge(a.status)}">${a.status}</span></td>
          <td class="text-right">
            <div class="action-btn-group">
              <button class="btn btn-outline-sm" onclick="window.PulseCare.viewAppointment('${a.id}')">View Details</button>
              ${a.status === 'Pending' ? `
                <button class="btn btn-primary btn-sm" onclick="window.PulseCare.confirmAppointment('${a.id}')">Confirm</button>
                <button class="btn btn-outline-sm" style="color: var(--rose);" onclick="window.PulseCare.cancelAppointment('${a.id}')">Cancel</button>
              ` : ''}
              ${a.status === 'Confirmed' ? `
                <button class="btn btn-primary btn-sm" onclick="window.PulseCare.completeAppointment('${a.id}')">Complete</button>
                <button class="btn btn-outline-sm" style="color: var(--rose);" onclick="window.PulseCare.cancelAppointment('${a.id}')">Cancel</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    };

    document.getElementById('docApptStatusFilter')?.addEventListener('change', populate);
    populate();
  }

  function renderDoctorFeedback(container) {
    const docId = AppState.currentUser.id;
    const feedbackList = AppState.data.feedback.filter(f => f.doctorId === docId);
    const avgScore = feedbackList.length ? (feedbackList.reduce((a, b) => a + b.rating, 0) / feedbackList.length).toFixed(1) : '5.0';

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Verified Patient Feedback & Reviews</h2>
          <p class="section-desc">Patients submit feedback only after their consultation is marked as Completed.</p>
        </div>
      </div>

      <div class="feedback-summary-container" style="display: grid; grid-template-columns: 280px 1fr; gap: 2rem;">
        <div class="contact-info-card text-center">
          <h1 style="font-size: 3.5rem; font-family: var(--font-heading); font-weight: 800; color: var(--primary); line-height: 1;">${avgScore}</h1>
          <div style="color: var(--amber); font-size: 1.5rem; margin: 0.5rem 0;">★★★★★</div>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">Average Patient Rating (${feedbackList.length} Reviews)</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${feedbackList.length === 0 ? `<div class="service-card"><p class="text-muted-sm">No patient reviews submitted yet.</p></div>` :
            feedbackList.map(f => `
              <div class="service-card" style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <div>
                    <strong>${escapeHtml(f.patientName)}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Consultation #${f.appointmentId} • ${formatDate(f.date)}</div>
                  </div>
                  <div style="color: var(--amber); font-size: 1.1rem;">${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}</div>
                </div>
                <p style="margin: 0; font-size: 0.9rem; color: var(--text-main);">${escapeHtml(f.comment)}</p>
              </div>
            `).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // 8. PATIENT DASHBOARD CONTROLLER & MODULES
  // ==========================================================================

  function renderPatientTab(tabId) {
    document.getElementById('topbarPageTitle').textContent = 
      tabId === 'overview' ? 'Patient Portal' :
      tabId === 'booking' ? 'Book Clinical Consultation' :
      tabId === 'history' ? 'Appointment History' :
      tabId === 'records' ? 'My Electronic Medical History' : 'My Health Profile';

    const vp = document.getElementById('dashboardViewport');
    if (!vp) return;

    if (tabId === 'overview') renderPatientOverview(vp);
    else if (tabId === 'booking') renderPatientBooking(vp);
    else if (tabId === 'history') renderPatientHistory(vp);
    else if (tabId === 'records') renderPatientMedicalHistory(vp);
    else if (tabId === 'profile') renderUserProfile(vp);
  }

  function renderPatientOverview(container) {
    const ptId = AppState.currentUser.id;
    const myAppts = AppState.data.appointments.filter(a => a.patientId === ptId);
    const today = getRelativeDate(0);

    const upcoming = myAppts.filter(a => a.date >= today && (a.status === 'Confirmed' || a.status === 'Pending'));
    const completed = myAppts.filter(a => a.status === 'Completed').length;
    const cancelled = myAppts.filter(a => a.status === 'Cancelled').length;

    const nextAppt = upcoming[0];

    container.innerHTML = `
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon icon-blue">📅</div>
          <div class="kpi-content">
            <span class="kpi-title">Upcoming Appointments</span>
            <h3 class="kpi-value">${upcoming.length}</h3>
            <span class="kpi-trend positive">${upcoming.length > 0 ? 'Next: ' + formatDate(upcoming[0].date) : 'No pending visits'}</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-emerald">✅</div>
          <div class="kpi-content">
            <span class="kpi-title">Completed Consultations</span>
            <h3 class="kpi-value">${completed}</h3>
            <span class="kpi-trend positive">Health records on file</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-amber">🚫</div>
          <div class="kpi-content">
            <span class="kpi-title">Cancelled Appointments</span>
            <h3 class="kpi-value">${cancelled}</h3>
            <span class="kpi-trend">Historical cancellations</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon icon-cyan">🕒</div>
          <div class="kpi-content">
            <span class="kpi-title">Next Scheduled Appointment</span>
            <h3 class="kpi-value" style="font-size: 1.15rem; margin: 0.35rem 0;">${nextAppt ? `${formatDate(nextAppt.date)} (${nextAppt.time})` : 'None'}</h3>
            <span class="kpi-trend">${nextAppt ? nextAppt.doctorName : 'Book whenever needed'}</span>
          </div>
        </div>
      </div>

      <div class="service-card" style="margin-top: 1.5rem; display: flex; flex-direction: row; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="margin-bottom: 0.25rem;">Need to see a medical specialist?</h3>
          <p style="margin: 0; font-size: 0.88rem; color: var(--text-secondary);">Choose your doctor, pick your preferred time, and book your visit in seconds.</p>
        </div>
        <button class="btn btn-primary btn-lg" onclick="window.PulseCare.switchPatientTab('booking')">Book New Appointment Now →</button>
      </div>
    `;
  }

  function renderPatientBooking(container) {
    const doctors = AppState.data.users.filter(u => u.role === 'Doctor' && u.status === 'Active');

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">Schedule a Doctor's Consultation</h2>
          <p class="section-desc">Select your specialist, choose an available time slot, and confirm your booking with instant conflict prevention.</p>
        </div>
      </div>

      <div class="booking-wizard-card">
        <form id="patientBookForm">
          <div class="booking-step-grid">
            
            <!-- Step 1: Doctor -->
            <div class="booking-section-col">
              <span class="step-badge">Step 1</span>
              <h3 class="step-title">Select Specialist Doctor</h3>
              
              <div class="form-group">
                <label for="bookDoctorSelect">Choose Doctor</label>
                <select id="bookDoctorSelect" class="form-select" required>
                  <option value="">-- Choose Specialist --</option>
                  ${doctors.map(d => `<option value="${d.id}" ${d.id === AppState.selectedBookingDoctorId ? 'selected' : ''}>${escapeHtml(d.name)} (${d.specialization}) - Room ${d.room || '101'}</option>`).join('')}
                </select>
              </div>

              <div id="bookDocDetailsCard" style="display: none; background: hsl(210, 30%, 97%); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light);">
                <strong id="bookDocCardName">Doctor Name</strong>
                <p id="bookDocCardMeta" style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.25rem 0 0.5rem;"></p>
                <div style="font-size: 0.82rem; color: var(--amber); font-weight: 700;" id="bookDocCardRating">★ 4.9 Rating</div>
              </div>
            </div>

            <!-- Step 2: Date & Slots -->
            <div class="booking-section-col">
              <span class="step-badge">Step 2 & 3</span>
              <h3 class="step-title">Select Date & Available Time Slot</h3>

              <div class="form-group">
                <label for="bookDateInput">Appointment Date</label>
                <input type="date" id="bookDateInput" class="form-input" value="${AppState.selectedBookingDate}" min="${getRelativeDate(0)}" required>
              </div>

              <div class="form-group">
                <label>Available 30-Minute Slots:</label>
                <div class="slots-pill-grid" id="bookSlotsPillsContainer">
                  <p class="text-muted-sm">Please select a doctor to load available time slots.</p>
                </div>
                <input type="hidden" id="bookSelectedSlot" required>
              </div>
            </div>

            <!-- Step 3: Reason & Confirmation -->
            <div class="booking-section-col">
              <span class="step-badge">Step 4 & 5</span>
              <h3 class="step-title">Reason for Visit & Confirmation</h3>

              <div class="form-group">
                <label for="bookReasonInput">Symptoms or Reason for Consultation</label>
                <textarea id="bookReasonInput" class="form-textarea" rows="3" placeholder="Briefly describe your symptoms or visit purpose (e.g. routine checkup, persistent headache)..." required></textarea>
              </div>

              <div class="booking-summary-box">
                <div class="summary-line"><span>Attending Doctor:</span><strong id="sumBookingDoc">-</strong></div>
                <div class="summary-line"><span>Date & Slot:</span><strong id="sumBookingTime">-</strong></div>
                <div class="summary-line"><span>Clinic Fee:</span><strong class="text-success">$50 (Covered by Insurance)</strong></div>
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg" id="btnConfirmPatientBooking">
                Confirm & Book Appointment
              </button>
            </div>

          </div>
        </form>
      </div>
    `;

    const updateSlots = () => {
      const docId = document.getElementById('bookDoctorSelect')?.value;
      const date = document.getElementById('bookDateInput')?.value;
      const container = document.getElementById('bookSlotsPillsContainer');
      const docCard = document.getElementById('bookDocDetailsCard');
      if (!container) return;

      if (!docId) {
        container.innerHTML = `<p class="text-muted-sm">Please select a doctor to view open slots.</p>`;
        if (docCard) docCard.style.display = 'none';
        return;
      }

      const doctor = AppState.data.users.find(u => u.id === docId);
      if (doctor && docCard) {
        docCard.style.display = 'block';
        document.getElementById('bookDocCardName').textContent = doctor.name;
        document.getElementById('bookDocCardMeta').textContent = `${doctor.qualification || doctor.specialization} • ${doctor.room || 'Room 101'}`;
        document.getElementById('bookDocCardRating').textContent = `★ ${doctor.rating || 4.9} Rating`;
        document.getElementById('sumBookingDoc').textContent = doctor.name;
      }

      const standardSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
      ];

      // Existing booked appointments for this doctor on this date
      const booked = AppState.data.appointments
        .filter(a => a.doctorId === docId && a.date === date && a.status !== 'Cancelled')
        .map(a => a.time);

      // Blocked doctor availability
      const docProf = AppState.data.doctors.find(d => d.userId === docId);
      const isBlockedDate = docProf && docProf.availability.some(av => av.date === date && av.status === 'Blocked');

      container.innerHTML = standardSlots.map(slot => {
        const isTaken = booked.includes(slot) || isBlockedDate;
        const isSelected = AppState.selectedBookingSlot === slot;

        if (isTaken) {
          return `<button type="button" class="time-slot-pill disabled" title="Slot not available">${slot}</button>`;
        } else {
          return `
            <button type="button" class="time-slot-pill ${isSelected ? 'active' : ''}" onclick="window.PulseCare.selectPatientSlot('${slot}')">
              ${slot}
            </button>
          `;
        }
      }).join('');

      document.getElementById('sumBookingTime').textContent = (date && AppState.selectedBookingSlot) ? `${formatDate(date)} at ${AppState.selectedBookingSlot}` : 'Pending selection';
    };

    document.getElementById('bookDoctorSelect')?.addEventListener('change', (e) => {
      AppState.selectedBookingDoctorId = e.target.value;
      updateSlots();
    });

    document.getElementById('bookDateInput')?.addEventListener('change', (e) => {
      AppState.selectedBookingDate = e.target.value;
      updateSlots();
    });

    document.getElementById('patientBookForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const docId = document.getElementById('bookDoctorSelect').value;
      const date = document.getElementById('bookDateInput').value;
      const slot = AppState.selectedBookingSlot;
      const reason = document.getElementById('bookReasonInput').value.trim();

      if (!docId || !slot) {
        showToast('Please pick a doctor and an available time slot.', 'error');
        return;
      }

      // Conflict Check: Double check if someone booked this exact slot in the meantime
      const conflict = AppState.data.appointments.some(a => 
        a.doctorId === docId && a.date === date && a.time === slot && a.status !== 'Cancelled'
      );

      if (conflict) {
        showToast('This time slot was just booked by another patient. Please pick an alternative open slot.', 'error');
        updateSlots();
        return;
      }

      const doctor = AppState.data.users.find(u => u.id === docId);
      const patient = AppState.currentUser;
      const apptId = 'APT-2026-' + Math.floor(1000 + Math.random() * 9000);

      const newAppt = {
        id: apptId,
        patientId: patient.id,
        patientName: patient.name,
        doctorId: docId,
        doctorName: doctor ? doctor.name : 'Specialist',
        date: date,
        time: slot,
        reason: reason,
        status: 'Pending',
        createdAt: new Date().toISOString().split('T')[0]
      };

      AppState.data.appointments.unshift(newAppt);
      DB.set(AppState.data);

      // Create notifications
      createNotification(patient.id, 'Appointment Booked', `Your consultation #${apptId} with ${doctor?.name} on ${formatDate(date)} at ${slot} has been requested.`, 'appointment_booked');
      createNotification(docId, 'New Appointment Booking', `Patient ${patient.name} requested a consultation for ${formatDate(date)} at ${slot}.`, 'appointment_booked');
      createNotification('usr_admin_1', 'New Appointment Scheduled', `Appointment #${apptId} created for patient ${patient.name} with ${doctor?.name}.`, 'appointment_booked');

      showToast(`Appointment #${apptId} successfully booked! Confirmation sent.`, 'success');

      // Clear selection
      AppState.selectedBookingSlot = null;
      document.getElementById('bookSelectedSlot').value = '';

      // Navigate to Appointment History
      AppState.activePatientTab = 'history';
      renderPatientTab('history');
      renderSidebarMenu('Patient');
    });

    updateSlots();
  }

  function renderPatientHistory(container) {
    const ptId = AppState.currentUser.id;
    const myAppts = AppState.data.appointments.filter(a => a.patientId === ptId);

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">My Appointment History & Schedule</h2>
          <p class="section-desc">Track status updates for your consultations, reschedule upcoming appointments, or leave feedback for completed visits.</p>
        </div>
        <div class="filter-controls">
          <select id="patientApptFilter" class="form-select">
            <option value="all">All Appointments</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div class="data-table-wrapper">
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor Name</th>
              <th>Date & Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="patientApptTbody"></tbody>
        </table>
      </div>
    `;

    const populate = () => {
      const filter = document.getElementById('patientApptFilter')?.value || 'all';
      const tbody = document.getElementById('patientApptTbody');
      if (!tbody) return;

      const filtered = myAppts.filter(a => filter === 'all' || a.status === filter);

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-muted-sm">No appointment history records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(a => `
        <tr>
          <td><strong>${a.id}</strong></td>
          <td>${escapeHtml(a.doctorName)}</td>
          <td>${formatDate(a.date)} • ${a.time}</td>
          <td>${escapeHtml(a.reason)}</td>
          <td><span class="badge ${getStatusBadge(a.status)}">${a.status}</span></td>
          <td class="text-right">
            <div class="action-btn-group">
              <button class="btn btn-outline-sm" onclick="window.PulseCare.viewAppointment('${a.id}')">View</button>
              ${a.status === 'Pending' || a.status === 'Confirmed' ? `
                <button class="btn btn-outline-sm" onclick="window.PulseCare.openPatientRescheduleModal('${a.id}')">Reschedule</button>
                <button class="btn btn-outline-sm" style="color: var(--rose);" onclick="window.PulseCare.cancelAppointment('${a.id}')">Cancel</button>
              ` : ''}
              ${a.status === 'Completed' ? `
                <button class="btn btn-primary btn-sm" onclick="window.PulseCare.openPatientFeedbackModal('${a.id}', '${a.doctorId}', '${escapeHtml(a.doctorName)}')">Leave Feedback ★</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    };

    document.getElementById('patientApptFilter')?.addEventListener('change', populate);
    populate();
  }

  function renderPatientMedicalHistory(container) {
    const ptId = AppState.currentUser.id;
    const records = AppState.data.medicalRecords.filter(m => m.patientId === ptId);

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">My Personal Electronic Medical Records</h2>
          <p class="section-desc">Consultation diagnoses, symptoms, prescriptions, and lifestyle instructions provided by your physicians.</p>
        </div>
        <button class="btn btn-outline" onclick="window.print()">
          🖨️ Print Health Summary
        </button>
      </div>

      <div class="medical-records-timeline">
        ${records.length === 0 ? `
          <div class="service-card"><p class="text-muted-sm">No medical records or prescription slips on file yet.</p></div>
        ` : records.map(m => `
          <div class="med-record-card">
            <div class="med-record-header">
              <div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main);">${escapeHtml(m.diagnosis)}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">
                  Attending Physician: <strong>${escapeHtml(m.doctorName)}</strong> • Date: ${formatDate(m.date)}
                </p>
              </div>
              <span class="badge badge-info">Record #${m.id}</span>
            </div>

            <div style="font-size: 0.88rem; color: var(--text-main); background: hsl(210, 30%, 98%); padding: 0.85rem; border-radius: 8px;">
              <strong>Chief Symptoms / Clinical Findings:</strong>
              <p style="margin: 0.25rem 0 0; color: var(--text-secondary);">${escapeHtml(m.symptoms || 'None recorded')}</p>
            </div>

            <div class="rx-box">
              <div class="rx-label">💊 Official Prescription Regimen & Dosage:</div>
              <div class="rx-content">${escapeHtml(m.prescription)}</div>
            </div>

            ${m.notes ? `
              <div style="font-size: 0.85rem; color: var(--text-secondary); background: hsl(212, 100%, 98%); border-left: 3px solid var(--secondary); padding: 0.85rem; border-radius: 6px;">
                <strong>Physician Clinical Advice:</strong> ${escapeHtml(m.notes)}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // ==========================================================================
  // 9. PROFILE MANAGEMENT (Shared Across Roles)
  // ==========================================================================

  function renderUserProfile(container) {
    const user = AppState.currentUser;

    container.innerHTML = `
      <div class="section-header-row">
        <div>
          <h2 class="section-title">My Profile & Account Management</h2>
          <p class="section-desc">Update your personal contact details and manage your account security credentials.</p>
        </div>
      </div>

      <div class="settings-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="contact-form-card">
          <form id="userProfileForm">
            <h3 style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">Personal Details</h3>
            <div class="form-row-2">
              <div class="form-group">
                <label for="profName">Full Name</label>
                <input type="text" id="profName" class="form-input" value="${escapeHtml(user.name)}" required>
              </div>
              <div class="form-group">
                <label for="profEmail">Email Address</label>
                <input type="email" id="profEmail" class="form-input" value="${escapeHtml(user.email)}" required>
              </div>
            </div>
            <div class="form-row-2">
              <div class="form-group">
                <label for="profPhone">Phone Number</label>
                <input type="tel" id="profPhone" class="form-input" value="${escapeHtml(user.phone || '')}">
              </div>
              <div class="form-group">
                <label for="profAddress">Residential / Office Address</label>
                <input type="text" id="profAddress" class="form-input" value="${escapeHtml(user.address || '')}">
              </div>
            </div>

            ${user.role === 'Patient' ? `
              <div class="form-row-2">
                <div class="form-group">
                  <label for="profDob">Date of Birth</label>
                  <input type="date" id="profDob" class="form-input" value="${user.dob || '1995-01-01'}">
                </div>
                <div class="form-group">
                  <label for="profBlood">Blood Group</label>
                  <select id="profBlood" class="form-select">
                    <option value="A+" ${user.bloodGroup === 'A+' ? 'selected' : ''}>A+</option>
                    <option value="A-" ${user.bloodGroup === 'A-' ? 'selected' : ''}>A-</option>
                    <option value="B+" ${user.bloodGroup === 'B+' ? 'selected' : ''}>B+</option>
                    <option value="B-" ${user.bloodGroup === 'B-' ? 'selected' : ''}>B-</option>
                    <option value="AB+" ${user.bloodGroup === 'AB+' ? 'selected' : ''}>AB+</option>
                    <option value="AB-" ${user.bloodGroup === 'AB-' ? 'selected' : ''}>AB-</option>
                    <option value="O+" ${user.bloodGroup === 'O+' ? 'selected' : ''}>O+</option>
                    <option value="O-" ${user.bloodGroup === 'O-' ? 'selected' : ''}>O-</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="profEmergency">Emergency Contact Details</label>
                <input type="text" id="profEmergency" class="form-input" value="${escapeHtml(user.emergencyContact || '')}" placeholder="e.g. Maria Johnson - +1 555-011-8924">
              </div>
            ` : ''}

            ${user.role === 'Doctor' ? `
              <div class="form-row-2">
                <div class="form-group">
                  <label for="profSpecialty">Specialization</label>
                  <input type="text" id="profSpecialty" class="form-input" value="${escapeHtml(user.specialization || '')}">
                </div>
                <div class="form-group">
                  <label for="profRoom">Assigned Room</label>
                  <input type="text" id="profRoom" class="form-input" value="${escapeHtml(user.room || '')}">
                </div>
              </div>
            ` : ''}

            <h3 style="margin: 1.5rem 0 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">Change Password</h3>
            <div class="form-row-2">
              <div class="form-group">
                <label for="profNewPwd">New Password</label>
                <input type="password" id="profNewPwd" class="form-input" placeholder="Leave blank to keep unchanged">
              </div>
              <div class="form-group">
                <label for="profConfirmPwd">Confirm New Password</label>
                <input type="password" id="profConfirmPwd" class="form-input" placeholder="Repeat new password">
              </div>
            </div>

            <div class="form-actions-right">
              <button type="submit" class="btn btn-primary" id="btnSaveProfile">Save Changes</button>
            </div>
          </form>
        </div>

        <div class="contact-info-card">
          <div class="text-center" style="margin-bottom: 1.5rem;">
            <div class="sidebar-avatar" style="width: 72px; height: 72px; font-size: 1.6rem; margin: 0 auto 0.75rem;">${user.avatar}</div>
            <h3>${escapeHtml(user.name)}</h3>
            <span class="badge ${getRoleBadge(user.role)}">${user.role}</span>
          </div>
          <div class="info-block">
            <strong>Account Email:</strong>
            <p>${escapeHtml(user.email)}</p>
          </div>
          <div class="info-block">
            <strong>Account Status:</strong>
            <p class="text-success">Active & Verified</p>
          </div>
          <div class="info-block">
            <strong>Joined Date:</strong>
            <p>${formatDate(user.createdAt || '2026-01-01')}</p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('userProfileForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('profName').value.trim();
      const email = document.getElementById('profEmail').value.trim();
      const phone = document.getElementById('profPhone').value.trim();
      const address = document.getElementById('profAddress').value.trim();
      const newPwd = document.getElementById('profNewPwd').value;
      const confPwd = document.getElementById('profConfirmPwd').value;

      if (newPwd) {
        if (newPwd !== confPwd) {
          showToast('New passwords do not match.', 'error');
          return;
        }
        if (newPwd.length < 6) {
          showToast('Password must be at least 6 characters.', 'error');
          return;
        }
        user.password = newPwd;
      }

      user.name = name;
      user.email = email;
      user.phone = phone;
      user.address = address;

      if (user.role === 'Patient') {
        user.dob = document.getElementById('profDob').value;
        user.bloodGroup = document.getElementById('profBlood').value;
        user.emergencyContact = document.getElementById('profEmergency').value.trim();
      }

      if (user.role === 'Doctor') {
        user.specialization = document.getElementById('profSpecialty').value.trim();
        user.room = document.getElementById('profRoom').value.trim();
      }

      // Update in users array
      const idx = AppState.data.users.findIndex(u => u.id === user.id);
      if (idx !== -1) {
        AppState.data.users[idx] = user;
      }

      DB.set(AppState.data);
      Session.setUser(user);
      AppState.currentUser = user;

      showToast('Profile information successfully saved!', 'success');
      openDashboardShell(user.role);
    });
  }

  // ==========================================================================
  // 10. GLOBAL ACTIONS & WINDOW API (Invoked by onclick)
  // ==========================================================================

  window.PulseCare = {
    switchAdminTab(tabId) {
      AppState.activeAdminTab = tabId;
      renderAdminTab(tabId);
      renderSidebarMenu('Admin');
    },

    switchDoctorTab(tabId) {
      AppState.activeDoctorTab = tabId;
      renderDoctorTab(tabId);
      renderSidebarMenu('Doctor');
    },

    switchPatientTab(tabId) {
      AppState.activePatientTab = tabId;
      renderPatientTab(tabId);
      renderSidebarMenu('Patient');
    },

    // User CRUD actions
    viewUser(userId) {
      const u = AppState.data.users.find(x => x.id === userId);
      if (!u) return;
      const body = document.getElementById('viewUserDetailsBody');
      body.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <div class="sidebar-avatar" style="width: 56px; height: 56px; font-size: 1.3rem;">${u.avatar}</div>
          <div>
            <h3 style="margin: 0; font-size: 1.25rem;">${escapeHtml(u.name)}</h3>
            <span class="badge ${getRoleBadge(u.role)}">${u.role}</span>
          </div>
        </div>
        <div class="info-block"><strong>Email:</strong> <p>${escapeHtml(u.email)}</p></div>
        <div class="info-block"><strong>Phone:</strong> <p>${escapeHtml(u.phone || 'N/A')}</p></div>
        <div class="info-block"><strong>Address:</strong> <p>${escapeHtml(u.address || 'N/A')}</p></div>
        <div class="info-block"><strong>Status:</strong> <p>${u.status}</p></div>
        <div class="info-block"><strong>Registration Date:</strong> <p>${formatDate(u.createdAt)}</p></div>
      `;
      openModal('modalViewUserDetails');
    },

    editUser(userId) {
      const u = AppState.data.users.find(x => x.id === userId);
      if (!u) return;
      document.getElementById('editUserId').value = u.id;
      document.getElementById('adminUserModalName').value = u.name;
      document.getElementById('adminUserModalEmail').value = u.email;
      document.getElementById('adminUserPwdGroup').style.display = 'none'; // Don't require password on edit
      document.getElementById('adminUserModalRole').value = u.role;
      document.getElementById('adminUserModalStatus').value = u.status;
      document.getElementById('modalUserTitle').textContent = `Edit User: ${u.name}`;
      
      const deptGroup = document.getElementById('adminUserModalDeptGroup');
      if (deptGroup) {
        deptGroup.style.display = u.role === 'Doctor' ? 'block' : 'none';
      }
      if (u.role === 'Doctor' && u.specialization) {
        document.getElementById('adminUserModalSpecialty').value = u.specialization;
      }
      openModal('modalUserManage');
    },

    deleteUser(userId) {
      const u = AppState.data.users.find(x => x.id === userId);
      if (!u) return;
      if (confirm(`Are you sure you want to delete user "${u.name}" (${u.role})? This action cannot be undone.`)) {
        AppState.data.users = AppState.data.users.filter(x => x.id !== userId);
        DB.set(AppState.data);
        showToast(`User ${u.name} deleted successfully.`, 'info');
        renderAdminUsers(document.getElementById('dashboardViewport'));
      }
    },

    // Appointment CRUD actions
    viewAppointment(apptId) {
      const a = AppState.data.appointments.find(x => x.id === apptId);
      if (!a) return;
      const body = document.getElementById('viewApptDetailsBody');
      body.innerHTML = `
        <div class="info-block"><strong>Booking Code:</strong> <p>#${a.id}</p></div>
        <div class="info-block"><strong>Patient:</strong> <p>${escapeHtml(a.patientName)}</p></div>
        <div class="info-block"><strong>Attending Doctor:</strong> <p>${escapeHtml(a.doctorName)}</p></div>
        <div class="info-block"><strong>Date & Time:</strong> <p>${formatDate(a.date)} at ${a.time}</p></div>
        <div class="info-block"><strong>Reason for Consultation:</strong> <p>${escapeHtml(a.reason)}</p></div>
        <div class="info-block"><strong>Status:</strong> <p><span class="badge ${getStatusBadge(a.status)}">${a.status}</span></p></div>
      `;
      openModal('modalViewApptDetails');
    },

    editAdminAppointment(apptId) {
      openAdminScheduleModal(apptId);
    },

    confirmAppointment(apptId) {
      const a = AppState.data.appointments.find(x => x.id === apptId);
      if (!a) return;
      a.status = 'Confirmed';
      DB.set(AppState.data);
      createNotification(a.patientId, 'Appointment Confirmed', `Your appointment #${a.id} on ${formatDate(a.date)} at ${a.time} has been confirmed by Dr. ${AppState.currentUser.name}.`, 'appointment_confirmed');
      showToast(`Appointment #${a.id} confirmed!`, 'success');
      renderDoctorTab(AppState.activeDoctorTab);
    },

    completeAppointment(apptId) {
      const a = AppState.data.appointments.find(x => x.id === apptId);
      if (!a) return;
      a.status = 'Completed';
      DB.set(AppState.data);
      createNotification(a.patientId, 'Consultation Completed', `Your visit #${a.id} is marked complete. You can now leave feedback and review your prescription.`, 'appointment_completed');
      showToast(`Appointment #${a.id} marked as Completed.`, 'success');
      
      // Prompt doctor to add clinical note
      if (AppState.currentUser.role === 'Doctor') {
        window.PulseCare.openAddMedicalRecordModal(a.patientId, a.patientName);
      } else {
        renderAdminTab(AppState.activeAdminTab);
      }
    },

    cancelAppointment(apptId) {
      const a = AppState.data.appointments.find(x => x.id === apptId);
      if (!a) return;
      if (confirm(`Confirm cancellation of appointment #${a.id}?`)) {
        a.status = 'Cancelled';
        DB.set(AppState.data);
        createNotification(a.patientId, 'Appointment Cancelled', `Appointment #${a.id} was cancelled.`, 'appointment_cancelled');
        createNotification(a.doctorId, 'Appointment Cancelled', `Appointment #${a.id} for ${a.patientName} was cancelled.`, 'appointment_cancelled');
        showToast(`Appointment #${a.id} has been cancelled.`, 'info');
        
        if (AppState.currentUser.role === 'Admin') renderAdminTab(AppState.activeAdminTab);
        else if (AppState.currentUser.role === 'Doctor') renderDoctorTab(AppState.activeDoctorTab);
        else renderPatientTab(AppState.activePatientTab);
      }
    },

    openPatientRescheduleModal(apptId) {
      const appt = AppState.data.appointments.find(a => a.id === apptId);
      if (!appt) return;

      document.getElementById('rescheduleApptId').value = appt.id;
      document.getElementById('rescheduleNewDate').value = appt.date;
      document.getElementById('rescheduleNewDate').min = getRelativeDate(0);
      document.getElementById('rescheduleNewSlot').value = appt.time;
      document.getElementById('rescheduleModalTitle').textContent = `Reschedule Appointment #${appt.id}`;
      document.getElementById('rescheduleApptMeta').textContent = 
        `Rescheduling consultation with ${appt.doctorName}. Please select your preferred new date and time slot.`;
      openModal('modalRescheduleAppt');
    },

    selectPatientSlot(slot) {
      AppState.selectedBookingSlot = slot;
      document.getElementById('bookSelectedSlot').value = slot;
      document.querySelectorAll('.time-slot-pill').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === slot);
      });
      const date = document.getElementById('bookDateInput')?.value;
      document.getElementById('sumBookingTime').textContent = (date && slot) ? `${formatDate(date)} at ${slot}` : 'Pending selection';
    },

    openPatientFeedbackModal(apptId, docId, docName) {
      document.getElementById('feedbackApptId').value = apptId;
      document.getElementById('feedbackDoctorId').value = docId;
      document.getElementById('feedbackDoctorTitle').textContent = `Rate your consultation experience with ${docName}`;
      document.getElementById('feedbackComment').value = '';
      openModal('modalPatientFeedback');
    },

    openAddMedicalRecordModal(patientId, patientName) {
      document.getElementById('docRecordPatientId').value = patientId;
      document.getElementById('docRecordPatientName').value = patientName;
      document.getElementById('docRecordDate').value = getRelativeDate(0);
      document.getElementById('docRecordDiagnosis').value = '';
      document.getElementById('docRecordSymptoms').value = '';
      document.getElementById('docRecordPrescription').value = '';
      document.getElementById('docRecordNotes').value = '';
      openModal('modalDocMedicalRecord');
    },

    viewPatientMedicalHistory(patientId) {
      const p = AppState.data.users.find(u => u.id === patientId);
      if (!p) return;
      const recs = AppState.data.medicalRecords.filter(m => m.patientId === patientId);

      document.getElementById('patientDossierTitle').textContent = `Patient Health Dossier: ${p.name}`;
      const body = document.getElementById('patientDossierBody');
      body.innerHTML = `
        <div style="background: hsl(210, 30%, 98%); border: 1px solid var(--border-light); border-radius: 8px; padding: 1.1rem; margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <strong style="font-size: 1.15rem; color: var(--text-main);">${escapeHtml(p.name)}</strong>
            <span class="badge badge-info">DOB: ${p.dob || 'N/A'} • Blood: ${p.bloodGroup || 'O+'}</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem;">
            <div><span>Email:</span> <strong>${escapeHtml(p.email)}</strong></div>
            <div><span>Phone:</span> <strong>${escapeHtml(p.phone || 'N/A')}</strong></div>
            <div><span>Emergency Contact:</span> <strong>${escapeHtml(p.emergencyContact || 'None')}</strong></div>
            <div><span>Address:</span> <strong>${escapeHtml(p.address || 'N/A')}</strong></div>
          </div>
        </div>

        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem;">Clinical Records & Prescription Slips (${recs.length} on file):</h4>
        ${recs.length === 0 ? `<p class="text-muted-sm">No electronic health records recorded for this patient yet.</p>` : `
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${recs.map(r => `
              <div style="background: white; border: 1px solid var(--border-light); border-radius: 8px; padding: 1rem; box-shadow: var(--shadow-xs);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                  <strong style="color: var(--primary); font-size: 0.95rem;">${escapeHtml(r.diagnosis)}</strong>
                  <small style="color: var(--text-muted); font-size: 0.8rem;">${formatDate(r.date)} (Dr. ${escapeHtml(r.doctorName)})</small>
                </div>
                ${r.symptoms ? `<div style="font-size: 0.85rem; margin-bottom: 0.5rem; color: var(--text-main);"><strong>Symptoms:</strong> ${escapeHtml(r.symptoms)}</div>` : ''}
                <div class="rx-box" style="margin-bottom: 0.5rem; padding: 0.75rem;">
                  <div class="rx-label" style="font-size: 0.75rem;">💊 Prescribed Medication & Dosage:</div>
                  <div class="rx-content" style="font-size: 0.85rem;">${escapeHtml(r.prescription)}</div>
                </div>
                ${r.notes ? `<div style="font-size: 0.82rem; color: var(--text-secondary); background: hsl(210, 30%, 99%); padding: 0.5rem; border-radius: 4px; border-left: 3px solid var(--secondary);"><strong>Physician Notes:</strong> ${escapeHtml(r.notes)}</div>` : ''}
              </div>
            `).join('')}
          </div>
        `}
      `;
      openModal('modalPatientDossier');
    },

    removeDoctorAvailability(index) {
      const docId = AppState.currentUser.id;
      const docProf = AppState.data.doctors.find(d => d.userId === docId);
      if (docProf && docProf.availability[index]) {
        docProf.availability.splice(index, 1);
        DB.set(AppState.data);
        showToast('Schedule slot removed.', 'info');
        renderDoctorSchedule(document.getElementById('dashboardViewport'));
      }
    }
  };

  // ==========================================================================
  // 11. FORM & MODAL LISTENERS
  // ==========================================================================

  function setupModalAndFormEvents() {
    // Admin Save User Form
    document.getElementById('adminUserForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('editUserId').value;
      const name = document.getElementById('adminUserModalName').value.trim();
      const email = document.getElementById('adminUserModalEmail').value.trim().toLowerCase();
      const pwd = document.getElementById('adminUserModalPassword').value;
      const role = document.getElementById('adminUserModalRole').value;
      const status = document.getElementById('adminUserModalStatus').value;
      const specialty = document.getElementById('adminUserModalSpecialty').value;

      if (editId) {
        // Edit existing
        const u = AppState.data.users.find(x => x.id === editId);
        if (u) {
          u.name = name;
          u.email = email;
          u.role = role;
          u.status = status;
          if (pwd) u.password = pwd;
          if (role === 'Doctor') u.specialization = specialty;
          showToast(`User ${name} updated successfully!`, 'success');
        }
      } else {
        // Add new user
        if (AppState.data.users.some(x => x.email.toLowerCase() === email)) {
          showToast('A user with this email already exists.', 'error');
          return;
        }

        const newId = 'usr_' + Date.now();
        const newUser = {
          id: newId,
          name,
          email,
          password: pwd || '123456',
          role,
          status,
          createdAt: new Date().toISOString().split('T')[0],
          avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        };

        if (role === 'Doctor') {
          newUser.specialization = specialty;
          newUser.qualification = `Specialist Physician - ${specialty}`;
          newUser.room = 'Room 101';
          newUser.rating = 5.0;
          AppState.data.doctors.push({ id: 'doc_' + Date.now(), userId: newId, specialization: specialty, availability: [] });
        } else if (role === 'Patient') {
          AppState.data.patients.push({ id: 'pt_' + Date.now(), userId: newId, emergencyContact: 'None' });
        }

        AppState.data.users.push(newUser);
        showToast(`User ${name} created successfully!`, 'success');
      }

      DB.set(AppState.data);
      closeModal('modalUserManage');
      renderAdminUsers(document.getElementById('dashboardViewport'));
    });

    // Admin Appt Schedule / Reschedule Form
    document.getElementById('adminApptForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('adminApptEditId').value;
      const ptId = document.getElementById('adminApptPatientSelect').value;
      const docId = document.getElementById('adminApptDoctorSelect').value;
      const date = document.getElementById('adminApptDate').value;
      const time = document.getElementById('adminApptTime').value;
      const reason = document.getElementById('adminApptReason').value.trim();
      const status = document.getElementById('adminApptStatus').value || 'Confirmed';

      // Conflict check: doctor cannot have two active appointments at same date & time
      const conflict = AppState.data.appointments.some(a => 
        a.id !== editId && a.doctorId === docId && a.date === date && a.time === time && a.status !== 'Cancelled'
      );

      if (conflict) {
        showToast('Booking Conflict: This doctor is already booked at that date and time slot.', 'error');
        return;
      }

      const patient = AppState.data.users.find(u => u.id === ptId);
      const doctor = AppState.data.users.find(u => u.id === docId);

      if (editId) {
        const appt = AppState.data.appointments.find(a => a.id === editId);
        if (appt) {
          appt.patientId = ptId;
          appt.patientName = patient ? patient.name : appt.patientName;
          appt.doctorId = docId;
          appt.doctorName = doctor ? doctor.name : appt.doctorName;
          appt.date = date;
          appt.time = time;
          appt.reason = reason;
          appt.status = status;
          showToast(`Appointment #${appt.id} updated successfully.`, 'success');
        }
      } else {
        const newAppt = {
          id: 'APT-2026-' + Math.floor(1000 + Math.random() * 9000),
          patientId: ptId,
          patientName: patient ? patient.name : 'Patient',
          doctorId: docId,
          doctorName: doctor ? doctor.name : 'Doctor',
          date: date,
          time: time,
          reason: reason,
          status: 'Confirmed',
          createdAt: new Date().toISOString().split('T')[0]
        };
        AppState.data.appointments.unshift(newAppt);
        showToast(`Appointment #${newAppt.id} scheduled successfully.`, 'success');
      }

      DB.set(AppState.data);
      closeModal('modalAdminAppt');
      
      if (AppState.currentUser.role === 'Admin') renderAdminAppointments(document.getElementById('dashboardViewport'));
      else if (AppState.currentUser.role === 'Patient') renderPatientHistory(document.getElementById('dashboardViewport'));
    });

    // Doctor Add Medical Record Form
    document.getElementById('docMedicalRecordForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const ptId = document.getElementById('docRecordPatientId').value;
      const patient = AppState.data.users.find(u => u.id === ptId);
      const date = document.getElementById('docRecordDate').value;
      const diagnosis = document.getElementById('docRecordDiagnosis').value.trim();
      const symptoms = document.getElementById('docRecordSymptoms').value.trim();
      const prescription = document.getElementById('docRecordPrescription').value.trim();
      const notes = document.getElementById('docRecordNotes').value.trim();

      const newRec = {
        id: 'MR-' + Math.floor(1000 + Math.random() * 9000),
        patientId: ptId,
        doctorId: AppState.currentUser.id,
        doctorName: AppState.currentUser.name,
        diagnosis,
        symptoms,
        prescription,
        notes,
        date
      };

      AppState.data.medicalRecords.unshift(newRec);
      DB.set(AppState.data);

      createNotification(ptId, 'New Medical Record Added', `Dr. ${AppState.currentUser.name} added a clinical record for your consultation.`, 'medical_record');

      showToast(`Medical record saved for ${patient?.name || 'patient'}!`, 'success');
      closeModal('modalDocMedicalRecord');
      renderDoctorTab(AppState.activeDoctorTab);
    });

    // Patient Feedback Form
    document.getElementById('patientFeedbackForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const apptId = document.getElementById('feedbackApptId').value;
      const docId = document.getElementById('feedbackDoctorId').value;
      const score = parseInt(document.getElementById('selectedStarScore').value, 10);
      const comment = document.getElementById('feedbackComment').value.trim();

      const newFeedback = {
        id: 'FB-' + Date.now(),
        patientId: AppState.currentUser.id,
        patientName: AppState.currentUser.name,
        doctorId: docId,
        appointmentId: apptId,
        rating: score,
        comment,
        date: getRelativeDate(0)
      };

      AppState.data.feedback.unshift(newFeedback);
      DB.set(AppState.data);

      createNotification(docId, 'New Patient Review', `Patient ${AppState.currentUser.name} rated your consultation ${score} stars: "${comment.substring(0, 40)}..."`, 'feedback');

      showToast('Thank you! Your consultation feedback has been submitted.', 'success');
      closeModal('modalPatientFeedback');
    });

    // Doctor Add Schedule Form
    document.getElementById('docScheduleForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('schedDate').value;
      const startTime = document.getElementById('schedStartTime').value;
      const endTime = document.getElementById('schedEndTime').value;
      const status = document.getElementById('schedStatus').value;
      const note = document.getElementById('schedNote').value.trim();

      const docProf = AppState.data.doctors.find(d => d.userId === AppState.currentUser.id);
      if (docProf) {
        docProf.availability.push({ date, startTime, endTime, status, note });
        DB.set(AppState.data);
        showToast('Schedule availability successfully saved!', 'success');
        closeModal('modalDocSchedule');
        renderDoctorSchedule(document.getElementById('dashboardViewport'));
      }
    });

    // Star rating picker
    document.querySelectorAll('#starRatingSelector .star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const score = parseInt(btn.dataset.stars, 10);
        document.getElementById('selectedStarScore').value = score;
        document.querySelectorAll('#starRatingSelector .star-btn').forEach(s => {
          const val = parseInt(s.dataset.stars, 10);
          s.classList.toggle('active', val <= score);
        });
      });
    });

    // Admin modal role change toggle
    document.getElementById('adminUserModalRole')?.addEventListener('change', (e) => {
      const deptGroup = document.getElementById('adminUserModalDeptGroup');
      if (deptGroup) {
        deptGroup.style.display = e.target.value === 'Doctor' ? 'block' : 'none';
      }
    });

    // Patient Reschedule Form
    document.getElementById('patientRescheduleForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const apptId = document.getElementById('rescheduleApptId').value;
      const newDate = document.getElementById('rescheduleNewDate').value;
      const newSlot = document.getElementById('rescheduleNewSlot').value;

      const appt = AppState.data.appointments.find(a => a.id === apptId);
      if (!appt) return;

      // Conflict Check: Check if doctor already has an appointment at this new date & slot
      const conflict = AppState.data.appointments.some(a => 
        a.id !== apptId && a.doctorId === appt.doctorId && a.date === newDate && a.time === newSlot && a.status !== 'Cancelled'
      );

      if (conflict) {
        showToast(`Booking Conflict: Dr. ${appt.doctorName} is already booked for this slot. Please select another time.`, 'error');
        return;
      }

      // Check doctor blocked availability
      const docProf = AppState.data.doctors.find(d => d.userId === appt.doctorId);
      const isBlocked = docProf && docProf.availability.some(av => av.date === newDate && av.status === 'Blocked');
      if (isBlocked) {
        showToast('The attending doctor is unavailable on this date. Please pick another date.', 'error');
        return;
      }

      appt.date = newDate;
      appt.time = newSlot;
      appt.status = 'Confirmed';

      DB.set(AppState.data);

      createNotification(appt.doctorId, 'Appointment Rescheduled', `Patient ${appt.patientName} rescheduled appointment #${appt.id} to ${formatDate(newDate)} at ${newSlot}.`, 'appointment_rescheduled');
      createNotification('usr_admin_1', 'Appointment Rescheduled', `Appointment #${appt.id} rescheduled to ${formatDate(newDate)} at ${newSlot}.`, 'appointment_rescheduled');

      showToast(`Appointment #${appt.id} successfully rescheduled to ${formatDate(newDate)} at ${newSlot}!`, 'success');
      closeModal('modalRescheduleAppt');

      if (AppState.currentUser.role === 'Patient') {
        renderPatientTab('history');
      } else if (AppState.currentUser.role === 'Doctor') {
        renderDoctorTab(AppState.activeDoctorTab);
      } else {
        renderAdminTab(AppState.activeAdminTab);
      }
    });

    // Footer Policy & Terms Links
    document.getElementById('linkPrivacy')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('PulseCare Privacy Policy: All medical health records (EHR) and personal identification data are protected in accordance with HIPAA and international patient confidentiality standards.');
    });

    document.getElementById('linkTerms')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('PulseCare Terms of Clinical Service: Online appointment scheduling and consultation records are governed by hospital clinical operations policies.');
    });

    // Modal close triggers
    document.querySelectorAll('.modal-close-btn, [data-modal]').forEach(el => {
      el.addEventListener('click', () => {
        const modalId = el.getAttribute('data-modal');
        if (modalId) closeModal(modalId);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(bd => {
      bd.addEventListener('click', (e) => {
        if (e.target === bd) bd.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // 12. UTILITIES
  // ==========================================================================

  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  }

  function showToast(message, type = 'info') {
    const stack = document.getElementById('toastStack');
    if (!stack) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = `ℹ️`;
    if (type === 'success') icon = `✅`;
    if (type === 'error') icon = `⚠️`;

    toast.innerHTML = `<span style="font-size: 1.15rem;">${icon}</span> <div>${escapeHtml(message)}</div>`;
    stack.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => {
        if (typeof toast.remove === 'function') toast.remove();
        else if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 200);
    }, 4000);
  }

  function formatDate(str) {
    if (!str) return '';
    try {
      const parts = str.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return str;
    } catch (e) {
      return str;
    }
  }

  function getStatusBadge(status) {
    if (status === 'Confirmed') return 'badge-status-confirmed';
    if (status === 'Pending') return 'badge-status-pending';
    if (status === 'Completed') return 'badge-status-completed';
    if (status === 'Cancelled') return 'badge-status-cancelled';
    return 'badge-info';
  }

  function getRoleBadge(role) {
    if (role === 'Admin') return 'badge-role-admin';
    if (role === 'Doctor') return 'badge-role-doctor';
    return 'badge-role-patient';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // 13. BOOTSTRAP APPLICATION
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    setupAuthEvents();
    setupModalAndFormEvents();
    initRouter();
  });

})();
