import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
  db,
  serverTimestamp
} from "./firebase-core.js";

export async function saveRecruiterLogin({ recruiterName, isAdmin }) {
  await addDoc(collection(db, "recruiterLogins"), {
    recruiterName,
    isAdmin,
    userAgent: navigator.userAgent,
    createdAt: serverTimestamp()
  });
}

export async function saveContactSubmission({ recruiterName, email, phone }) {
  await addDoc(collection(db, "contactSubmissions"), {
    recruiterName,
    email,
    phone,
    userAgent: navigator.userAgent,
    createdAt: serverTimestamp()
  });
}

export async function getAdminFirestoreSummary() {
  const loginsSnap = await getDocs(
    query(collection(db, "recruiterLogins"), orderBy("createdAt", "desc"))
  );

  const contactsSnap = await getDocs(
    query(collection(db, "contactSubmissions"), orderBy("createdAt", "desc"))
  );

  const chatsSnap = await getDocs(
    query(collection(db, "aiChats"), orderBy("createdAt", "desc"))
  );

  return {
    logins: loginsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    contacts: contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    chats: chatsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  };
}

window.saveRecruiterLogin = saveRecruiterLogin;
window.saveContactSubmission = saveContactSubmission;
window.getAdminFirestoreSummary = getAdminFirestoreSummary;