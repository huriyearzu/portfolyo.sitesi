function updateClock() {
    var now = new Date();
    var hour = now.getHours();
    var greeting;

    if (hour >= 0 && hour < 6) {
        greeting = "İYİ GECELER";
    } else if (hour >= 6 && hour < 12) {
        greeting = "İYİ SABAHLAR";
    } else if (hour >= 12 && hour < 18) {
        greeting = "İYİ GÜNLER";
    } else {
        greeting = "İYİ AKŞAMLAR";
    }

    var clockContainer = document.getElementById("clock-container");

    var greetingElement = document.createElement("div");
    greetingElement.innerText = greeting;

    var clockInfo = document.createElement("div");
    clockInfo.innerText = formatTime(now);
    
    clockContainer.innerHTML = ''; // Önceki içeriği temizle
    clockContainer.appendChild(greetingElement);
    clockContainer.appendChild(clockInfo);
}

function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    hours = padZero(hours);
    minutes = padZero(minutes);
    seconds = padZero(seconds);

    return hours + ":" + minutes + ":" + seconds;
}

function padZero(num) {
    return (num < 10 ? "0" : "") + num;
}

// İlk kez çalıştır
updateClock();

// Belirli aralıklarla güncelle (örneğin her saniye)
setInterval(updateClock, 1000);

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };