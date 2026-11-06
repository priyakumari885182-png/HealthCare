# 🏥 PulseCare - Complete Online Healthcare Management System

A modern, fully functional, role-based **Online Healthcare Management System** built with **HTML5, Vanilla CSS, and Modular JavaScript**, featuring persistent client-side data management, session security, dynamic appointment conflict prevention, and interactive operational analytics.

---

## 🌟 Demo User Accounts (Pre-configured)

For instant evaluation, the login page features **1-Click Quick Demo Login** buttons:

| Role | Email Address | Password | Sample User |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@pulsecare.org` | `admin123` | Dr. Eleanor Vance (Super Administrator) |
| **Doctor** | `sarah.mitchell@pulsecare.org` | `doctor123` | Dr. Sarah Mitchell (Senior Cardiologist) |
| **Doctor** | `james.wilson@pulsecare.org` | `doctor123` | Dr. James Wilson (Neurology Specialist) |
| **Patient** | `alex.johnson@email.com` | `patient123` | Alex Johnson |
| **Patient** | `priya.sharma@email.com` | `patient123` | Priya Sharma |

*You can also register brand-new accounts with any role (Admin, Doctor, or Patient) using the Registration page.*

---

## 🚀 How to Run the Application

The application is completely self-contained with **zero required external npm dependencies**.

### Option 1: Start the Local HTTP Server (Recommended)
```bash
# In the project directory:
node server.js
```
Open your browser and navigate to:
```
http://localhost:3000
```

### Option 2: Direct File Open
You can also open [index.html](file:///c:/Users/priya/OneDrive/Desktop/Online_Healthcare_management_system/index.html) directly in any modern web browser.

---

## 🧭 Complete Interactive Feature Matrix

### 1. 🌐 Public Landing Page (`#/`)
- **Modern Healthcare Design:** Clean clinical palette (cyan, sapphire, emerald, and glassmorphism).
- **Navigation Links:**
  - `Home` → Scrolls smoothly to the hero section.
  - `About` → Scrolls to the hospital facility and accreditation details.
  - `Services` → Highlights Appointment Booking, Doctor Management, Medical Records, and Dashboards.
  - `Contact` → Functional contact form that validates and dispatches confirmation toasts.
  - `Login` → Navigates to `#/login`.
  - `Register` → Navigates to `#/register`.
  - `Book Appointment` → Smart auth detection (redirects unauthenticated visitors to login/register, or takes patients directly to booking).
  - `Get Started` → Navigates to `#/register`.
  - `Go to My Dashboard` → Appears when user is logged in.

### 2. 🔐 Authentication & Session Security (`#/login`, `#/register`)
- **Registration:**
  - Validates Full Name, Email, Password, Confirm Password, and Role (`Admin`, `Doctor`, `Patient`).
  - Specialty dropdown automatically appears when registering as a Doctor.
  - Validates minimum password length (6+ characters) and matching confirmation.
  - Prevents duplicate email registrations with clear error banners.
  - Auto-logs in the newly created user and redirects to the appropriate role dashboard.
- **Login:**
  - Validates email and password against stored database.
  - Password visibility toggle (👁️).
  - Validates account `Active` status.
  - Role-based redirects (`#/admin`, `#/doctor`, `#/patient`).
- **Session Protection:**
  - Route guards prevent unauthorized access to role dashboards.
  - Unauthorized access displays a dedicated **403 Forbidden Access Page** (`#/unauthorized`).
  - Working **Logout** buttons in all sidebars and topbars immediately terminate the session.

### 3. 🛡️ Administrator Dashboard (`#/admin`)
- **Sidebar Tabs:** `Dashboard`, `User Management`, `Appointment Management`, `System Settings`, `Performance Analytics`, `Profile`, `Logout`.
- **Overview KPIs:** Real calculations for Total Users, Total Doctors, Total Patients, Total Appointments, Upcoming Appointments, and Completed Appointments.
- **User Management:**
  - Live search by name and email.
  - Filter by role (`All`, `Admin`, `Doctor`, `Patient`).
  - **Add User Modal:** Create new Admins, Doctors, or Patients with auto-generated profiles.
  - **Edit User Modal:** Update user credentials, role, and account status (`Active` / `Inactive`).
  - **Delete User Action:** Confirmation prompt with instant table refresh.
  - **View Details Modal:** Complete user history and profile inspection.
- **Appointment Management:**
  - Master table with status badges (`Pending`, `Confirmed`, `Completed`, `Cancelled`).
  - **Schedule Appointment:** Select Patient, Doctor, Date, Time, and Reason.
  - **Conflict Prevention Engine:** Blocks bookings if the doctor already has an appointment or blocked hours at that slot.
  - **Reschedule & Status Updates:** Live date/time modifications.
- **System Settings:**
  - General: Clinic Name, Official Email, Contact Phone, Physical Address.
  - Appointment: Consultation slot duration (15, 30, 45, 60 mins), Working Days, Operating Hours.
  - Notification Automations: Email notifications and reminder switches.
  - **Save Settings:** Actually updates database and persists across page reloads with confirmation toast.
- **Performance Analytics:**
  - Real-time SVG charts that update dynamically based on database entries:
    1. *Appointments by Month* (Bar chart)
    2. *User Distribution* (Donut chart: Patients vs Doctors vs Admins)
    3. *Appointment Status Breakdown* (Progress distributions)
    4. *Doctor Appointment Statistics* (Workload per physician)

### 4. 👨‍⚕️ Doctor Dashboard (`#/doctor`)
- **Strict Doctor Filtering:** All views and metrics only show data relevant to the logged-in doctor.
- **Sidebar Tabs:** `Dashboard`, `My Schedule`, `Patient Records`, `Appointments`, `Patient Feedback`, `Profile`, `Logout`.
- **Overview KPIs:** Today's Appointments, Upcoming Appointments, Total Patients Treated, Completed Consultations.
- **My Schedule Management:**
  - Date selector and live timeline of consultations for any day.
  - Displays booked patient consultations, open slots, and blocked intervals.
  - **Add Schedule / Block Availability:** Mark dates/times as `Available` or `Blocked` (e.g. for surgery or rounds).
  - Unblock / remove custom schedule items.
- **Patient Records (EHR):**
  - Roster of all patients treated by this doctor.
  - **View Medical Dossier:** Inspect past diagnoses, symptoms, and prescriptions.
  - **Add / Update Medical Record Modal:** Add timestamped diagnoses, chief symptoms, prescription slips, and clinical notes.
- **Appointments Management:**
  - **Confirm Action:** Changes status from `Pending` to `Confirmed` (Patient immediately sees confirmed status and receives a notification).
  - **Complete Action:** Changes status to `Completed` (enables patient to submit verified feedback).
  - **Cancel Action:** Cancels consultation.
- **Patient Feedback:**
  - Real-time computed average star rating (e.g. 4.9 ★).
  - Stream of patient reviews with star ratings and comments.

### 5. 🧑 Patient Dashboard (`#/patient`)
- **Sidebar Tabs:** `Dashboard`, `Book Appointment`, `Appointment History`, `Medical History`, `Profile`, `Logout`.
- **Overview KPIs:** Upcoming Appointments, Completed Consultations, Cancelled Appointments, Next Scheduled Visit.
- **Appointment Booking Engine:**
  - **Step 1:** Select Specialist Doctor (previews qualification, room, and rating).
  - **Step 2:** Select Preferred Date.
  - **Step 3:** Interactive 30-minute time slot pills (dynamically detects already booked slots or doctor blocked hours and disables them).
  - **Step 4:** Enter chief medical symptoms or reason for visit.
  - **Step 5:** Confirm booking (generates appointment ID, dispatches notifications to doctor and admin, and adds to history).
- **Appointment History:**
  - Filter by status (`Pending`, `Confirmed`, `Completed`, `Cancelled`).
  - **Reschedule Appointment:** Update date/slot with live conflict checks.
  - **Cancel Appointment:** Cancel pending or confirmed visits.
  - **Leave Feedback Modal:** Rate completed consultations (1 to 5 stars) and write clinical reviews.
- **Medical History:**
  - Chronological timeline of clinical records entered by doctors for this patient.
  - View-only protection (prevents tampering with clinical diagnoses).
  - Styled Prescription (Rx) medication slip with dosage directions.
  - **Print Health Summary:** Browser print integration (`window.print()`).
- **Profile Management:**
  - Self-service form for updating contact information, Date of Birth, Blood Group, Address, and Emergency Contact.
  - Change Password feature with confirmation check.

### 6. 🔔 Real-Time In-App Notification System
- Notification bell with unread badge counter in the top bar.
- Generates notifications when:
  - An appointment is booked
  - An appointment is confirmed by a doctor
  - An appointment is completed
  - An appointment is cancelled or rescheduled
  - A doctor adds a medical record
  - A patient leaves a feedback review
- "Mark all read" button to clear notifications.

---

## 📁 Repository Structure

```
Online_Healthcare_management_system/
├── index.html          # Unified Single-Page Application (Landing, Auth, Dashboards, Modals)
├── style.css           # Modern clinical CSS design system (HSL tokens, glassmorphism, responsive)
├── app.js              # Application engine, data store (localStorage), router, RBAC, CRUD logic
├── server.js           # Built-in lightweight Node.js HTTP server
├── package.json        # NPM scripts and project metadata
├── PRD (1).md          # Product Requirements Document for project submission
└── README.md           # Project documentation and guide
```
