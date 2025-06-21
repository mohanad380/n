// ملف JavaScript الرئيسي لموقع عالم الشبكات

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل زر القائمة الموحد
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav'); // استهداف القائمة الجديدة

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active'); // تبديل الكلاس لإظهار/إخفاء القائمة
            menuToggle.classList.toggle('active'); // يمكن استخدام هذا لتبديل شكل الأيقونة إذا لزم الأمر
        });
    }

    // تفعيل القوائم المنسدلة للأقسام والدروس في القائمة الجديدة
    const submenuToggles = document.querySelectorAll('.mobile-nav .has-submenu > a');

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // منع الانتقال للصفحة عند النقر على رابط القسم الرئيسي
            e.preventDefault();

            const parentLi = toggle.parentElement; // العنصر li الأب
            const submenu = parentLi.querySelector('.submenu'); // القائمة الفرعية

            // إغلاق جميع القوائم الفرعية الأخرى المفتوحة
            document.querySelectorAll('.mobile-nav .submenu.active').forEach(openSubmenu => {
                if (openSubmenu !== submenu) {
                    openSubmenu.classList.remove('active');
                    openSubmenu.parentElement.querySelector('a').classList.remove('open'); // إزالة كلاس السهم المفتوح
                }
            });

            // تبديل حالة القائمة الفرعية الحالية
            if (submenu) {
                submenu.classList.toggle('active');
                toggle.classList.toggle('open'); // تبديل كلاس السهم
            }
        });
    });

    // إغلاق القائمة عند النقر خارجها (اختياري)
    document.addEventListener('click', function(event) {
        if (mobileNav && mobileNav.classList.contains('active') && 
            !mobileNav.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('active');
            // إغلاق جميع القوائم الفرعية عند إغلاق القائمة الرئيسية
            document.querySelectorAll('.mobile-nav .submenu.active').forEach(openSubmenu => {
                openSubmenu.classList.remove('active');
                openSubmenu.parentElement.querySelector('a').classList.remove('open');
            });
        }
    });


    // --- الكود السابق للوظائف الأخرى يبقى كما هو --- 

    // تفعيل التبديل بين الأقسام في صفحات الاختبارات
    const testTabs = document.querySelectorAll('.test-tab');
    const testContents = document.querySelectorAll('.test-content');

    if (testTabs.length > 0) {
        testTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // إزالة الكلاس النشط من جميع الأقسام
                testTabs.forEach(t => t.classList.remove('active'));
                testContents.forEach(c => c.classList.remove('active'));

                // إضافة الكلاس النشط للقسم المختار
                tab.classList.add('active');
                testContents[index].classList.add('active');
            });
        });
    }

    // تفعيل الاختبارات التفاعلية
    const quizForms = document.querySelectorAll('.quiz-form');

    if (quizForms.length > 0) {
        quizForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                let score = 0;
                const questions = form.querySelectorAll('.question'); // افترض أن كل سؤال له كلاس .question
                const totalQuestions = questions.length;

                questions.forEach(question => {
                    const correctAnswer = question.dataset.correct;
                    const selectedAnswerInput = question.querySelector('input[type="radio"]:checked');
                    const options = question.querySelectorAll('.quiz-option'); // افترض أن كل خيار له كلاس .quiz-option

                    // إزالة التنسيقات السابقة
                    options.forEach(opt => opt.classList.remove('correct', 'incorrect'));

                    if (selectedAnswerInput) {
                        const selectedOption = selectedAnswerInput.closest('.quiz-option');
                        if (selectedAnswerInput.value === correctAnswer) {
                            score++;
                            if (selectedOption) selectedOption.classList.add('correct');
                        } else {
                            if (selectedOption) selectedOption.classList.add('incorrect');
                            // إظهار الإجابة الصحيحة
                            const correctOptionInput = question.querySelector(`input[value="${correctAnswer}"]`);
                            if (correctOptionInput) {
                                const correctOptionElement = correctOptionInput.closest('.quiz-option');
                                if (correctOptionElement) correctOptionElement.classList.add('correct');
                            }
                        }
                    } else {
                        // إذا لم يتم اختيار إجابة، يمكن إظهار الإجابة الصحيحة
                        const correctOptionInput = question.querySelector(`input[value="${correctAnswer}"]`);
                        if (correctOptionInput) {
                            const correctOptionElement = correctOptionInput.closest('.quiz-option');
                            if (correctOptionElement) correctOptionElement.classList.add('correct');
                        }
                    }
                });

                const resultElement = form.querySelector('.quiz-result');
                if (resultElement) {
                    const percentage = Math.round((score / totalQuestions) * 100);
                    resultElement.innerHTML = `النتيجة: ${score} من ${totalQuestions} (${percentage}%)`;
                    resultElement.classList.remove('passed', 'failed'); // إزالة الكلاسات السابقة
                    resultElement.style.display = 'block'; // إظهار النتيجة

                    if (percentage >= 70) { // تحديد نسبة النجاح
                        resultElement.classList.add('passed');
                    } else {
                        resultElement.classList.add('failed');
                    }
                }

                // تعطيل زر الإرسال بعد الإرسال لمنع الإرسال المتعدد
                const submitButton = form.querySelector('.quiz-submit');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'تم إرسال الإجابات';
                }
            });
        });
    }
});
