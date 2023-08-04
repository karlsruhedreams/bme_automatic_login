/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function initiateLogin() {
    // Do not initiate login on the following, custom login pages
    const exceptionList = [
        "https://www.hit.bme.hu/login", // HIT bejelentkezés második oldala
        "https://www.tmit.bme.hu/user", // TMIT bejelentkezés második oldala
    ];
    if (exceptionList.some(url => window.location.href.startsWith(url)))
        return;

    // Start with the high priority query selectors
    const highPriorityQuerySelectors = [
        "#login-btn", // VET, HVT, jobb oldali szabványos eduID gomb
        "#shib_login_url a", // MIT bejelentkezés második oldalán
        "#block-system-main a img", // IIT bejelentkezés második oldalán
        "#btnStudentLogin", // AUT bejelentkezés második oldalán
        "a[title='Log in']", // VIK Moodle
        "a[title='EduID Login']", // GTK Moodle
    ];
    const highPriorityQuerySelector = `:is(${highPriorityQuerySelectors.join(", ")})`;
    var login = document.querySelector(highPriorityQuerySelector);

    // If no high priority query selector matched, try the low priority ones
    if (!login) {
        const lowPriorityQuerySelectors = [
            "a[title='Bejelentkezési menü link']", // IIT (magyar oldal)
            "a[title='Login menu link']", // IIT (angol oldal)
            "a[title='A bejelentkezéshez kattintson ide.']", // AUT
        ];
        const lowPriorityQuerySelector = `:is(${lowPriorityQuerySelectors.join(", ")})`;

        login = document.querySelector(lowPriorityQuerySelector);
    }

    login = login ?? [...document.querySelectorAll("a")]
        .find(a => {
            const content = a.innerHTML.toLowerCase();
            const texts = ["bejelentkezés", "login", "log in"];

            return texts.some(text => content.includes(text));
        });

    if (login)
        login.click();
    else
        console.warn("BME automatic login: login initiation button was not found");
}

initiateLogin();
