/**
 * assets/js/main.js
 * ملف الجافاسكريبت التفاعلي الشامل لمشروع دليل فعاليات SVU
 * يتضمن:
 * 1. زر العودة للأعلى (Scroll-to-top) [Bonus]
 * 2. الفلترة الفورية لصفحة الفعاليات (events.html) بالاسم والتصنيف والموقع
 * 3. التحقق من نموذج صفحة اتصل بنا (contact.html) وعرض تنبيهات Bootstrap
 * 4. التفاعلات الخاصة بصفحة تفاصيل الفعالية (event.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. زر الصعود للأعلى (Scroll to Top)
  // ==========================================
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // 2. فلترة قائمة الفعاليات (events.html)
  // ==========================================
  const filterForm = document.getElementById("eventsFilterForm");
  const eventCards = document.querySelectorAll(".event-item");

  if (filterForm && eventCards.length > 0) {
    const searchInput = document.getElementById("searchKeyword");
    const categorySelect = document.getElementById("filterCategory");
    const locationSelect = document.getElementById("filterLocation");

    function applyFilter() {
      const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";
      const selectedCategory = categorySelect ? categorySelect.value : "all";
      const selectedLocation = locationSelect ? locationSelect.value : "all";

      eventCards.forEach((card) => {
        const title = (card.getAttribute("data-title") || "").toLowerCase();
        const category = card.getAttribute("data-category");
        const location = card.getAttribute("data-location");

        const matchesKeyword = title.includes(keyword);
        const matchesCategory = selectedCategory === "all" || category === selectedCategory;
        const matchesLocation = selectedLocation === "all" || location === selectedLocation;

        if (matchesKeyword && matchesCategory && matchesLocation) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }

    if (searchInput) searchInput.addEventListener("input", applyFilter);
    if (categorySelect) categorySelect.addEventListener("change", applyFilter);
    if (locationSelect) locationSelect.addEventListener("change", applyFilter);
  }

  // ==========================================
  // 3. التحقق من نموذج الاتصال (contact.html)
  // ==========================================
  const contactForm = document.getElementById("contactForm");
  const alertContainer = document.getElementById("formAlertContainer");

  if (contactForm && alertContainer) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("userName").value.trim();
      const email = document.getElementById("userEmail").value.trim();
      const message = document.getElementById("userMessage").value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      alertContainer.innerHTML = "";

      // التحقق من الحقول المطلوبة
      if (!name || !email || !message) {
        showAlert("يرجى ملء كافة الحقول المطلوبة قبل الإرسال.", "danger");
        return;
      }

      // التحقق من صيغة البريد الإلكتروني
      if (!emailPattern.test(email)) {
        showAlert("صيغة البريد الإلكتروني غير صحيحة، يرجى كتابتها بالشكل: name@domain.com", "warning");
        return;
      }

      // إشعار النجاح وتفريغ الحقول
      showAlert("تم إرسال رسالتك بنجاح! سنقوم بالتواصل معك في أقرب وقت.", "success");
      contactForm.reset();
    });

    function showAlert(text, type) {
      alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
          ${text}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button>
        </div>
      `;
    }
  }
});

// ==========================================
// 4. دوال التفاعل في صفحة تفاصيل الفعالية (event.html)
// ==========================================
function triggerCalendarAlert() {
  alert("تمت إضافة موعد الفعالية بنجاح إلى تقويمك الجامعي!");
}

function triggerShareAlert() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    alert("تم نسخ رابط الفعالية بنجاح إلى الحافظة!");
  } else {
    alert("رابط الفعالية: " + window.location.href);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const eventCards = document.querySelectorAll(".event-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedFilter = this.getAttribute("data-filter");

      eventCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        // إذا كان الفلتر "الكل" أو يطابق تصنيف الكارد يظهر، وغير ذلك يختفي
        if (selectedFilter === "all" || cardCategory === selectedFilter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

