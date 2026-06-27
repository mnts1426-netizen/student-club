import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

// 1. حماية الصفحات
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "login.html";
});

// 2. تسجيل الخروج
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}

// 3. نظام المنح والخصم (إضافة سجل)
window.submitPoints = async (studentId) => {
  const reasonSelect = document.getElementById("reasonSelect");
  const customReason = document.getElementById("customReason");
  const customPoints = document.getElementById("customPoints");

  let reason, amount;

  if (reasonSelect.value === "custom") {
    reason = customReason.value;
    amount = parseInt(customPoints.value);
  } else {
    [reason, amount] = reasonSelect.value.split(",");
    amount = parseInt(amount);
  }

  if (!reason || isNaN(amount)) return alert("يرجى إدخال بيانات صحيحة");

  await addDoc(collection(db, "points_logs"), {
    studentId: studentId,
    reason: reason,
    amount: amount,
    type: amount >= 0 ? "منح" : "خصم",
    timestamp: serverTimestamp(),
  });

  alert("تمت العملية بنجاح");
  location.reload();
};

// 4. جلب سجل النقاط للطالب
window.loadPointsHistory = async (studentId) => {
  const historyBody = document.getElementById("historyBody");
  if (!historyBody) return;

  const q = query(
    collection(db, "points_logs"),
    where("studentId", "==", studentId),
    orderBy("timestamp", "desc"),
  );
  const snap = await getDocs(q);

  historyBody.innerHTML = "";
  snap.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.timestamp ? data.timestamp.toDate().toLocaleDateString("ar-SA") : "الآن"}</td>
      <td style="color:${data.amount >= 0 ? "green" : "red"}">${data.type}</td>
      <td>${data.amount}</td>
      <td>${data.reason}</td>
    `;
    historyBody.appendChild(row);
  });
};

// 5. دالة عرض الطلاب الأصلية
async function loadStudents() {
  const tableBody = document.querySelector("#studentsTableBody");
  if (!tableBody) return;
  const querySnapshot = await getDocs(collection(db, "students"));
  tableBody.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const student = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.subscriptionType || "غير محدد"}</td>
      <td><button onclick="window.location.href='student-details.html?id=${doc.id}'">التفاصيل</button></td>
    `;
    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", loadStudents);
