let selector = document.querySelector("#tel")
let im = new Inputmask("+7(999) 999-99-99")
im.mask(selector)

let validation = new JustValidate("form")

validation.addField("#name", [{
            rule: "required",
            errorMessage: "Введите имя!"
        },
        {
            rule: "minLength",
            value: 2,
            errorMessage: "Минимум 2 символа!"
        }
    ]).addField("#tel", [{
            validator: (value) => {
                const phone = selector.inputmask.unmaskedvalue()
                return Boolean(Number(phone) && phone.length > 0)
            },
            errorMessage: 'Введите телефон'
        },
        {
            validator: (value) => {
                const phone = selector.inputmask.unmaskedvalue()
                return Boolean(Number(phone) && phone.length === 10)
            },
            errorMessage: 'Введите телефон полностью'
        }
    ])
    .addField("#msg", [{
            rule: "required",
            errorMessage: "Введите сообщение!"
        },
        {
            rule: "minLength",
            value: 2,
            errorMessage: "Минимум 2 символа!"
        }
    ])
    .addField("#pair", [{
           rule: "required",
            errorMessage: "Введите сообщение!" 
        },
        {
             rule: "minLength",
            value: 4,
            errorMessage: "Минимум 4 символа!" 
        }
    ]).onSuccess(async function() {
        let data = {

            name: document.getElementById("name").value,
            tel: selector.inputmask.unmaskedvalue(),
            msg: document.getElementById("msg").value,
            pair: document.getElementById("pair").value
        }

        let response = await fetch("mail.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })

        let result = await response.text()

        alert(result)
    })

//timer
document.addEventListener('DOMContentLoaded', function() {
    // конечная дата, например 1 июля 2021
    const deadline = new Date(2024, 9, 19);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
});

