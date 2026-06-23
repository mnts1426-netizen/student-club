// js/auth.js

// 1. استيراد خدمات Auth من ملف الإعدادات ومن سيرفرات Firebase
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 2. تحديد عناصر واجهة تسجيل الدخول من صفحة الـ HTML
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// 3. الاستماع لحدث الضغط على زر "دخول"
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // منع الصفحة من إعادة التحميل التلقائي

  // جلب القيم التي كتبها المستخدم
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // إخفاء رسالة الخطأ القديمة إن وجدت
    errorMessage.style.display = "none";

    // محاولة تسجيل الدخول عبر Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // إذا نجح الدخول، يتم توجيهه إلى الصفحة الرئيسية (سننشئها لاحقاً)
    alert("تم تسجيل الدخول بنجاح!");
    window.location.href = "index.html";
  } catch (error) {
    // إذا فشل الدخول، تظهر رسالة الخطأ للمستخدم
    errorMessage.textContent =
      "خطأ: البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    errorMessage.style.display = "block";
    console.error(error.message);
  }
});
