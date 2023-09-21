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
    if (exceptionList.some(url => window.location.href.startsWith(url))) {
        console.log("BME automatic login: login initiation is not supported on this page");
        return;
    }
    
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

    if (login) {
        console.log("BME automatic login: login initiation button was found (high priority)");
    } else { // If no high priority query selector matched, try the low priority ones
        const lowPriorityQuerySelectors = [
            "a[title='Bejelentkezési menü link']", // IIT (magyar oldal)
            "a[title='Login menu link']", // IIT (angol oldal)
            "a[title='A bejelentkezéshez kattintson ide.']", // AUT
        ];
        const lowPriorityQuerySelector = `:is(${lowPriorityQuerySelectors.join(", ")})`;

        login = document.querySelector(lowPriorityQuerySelector);

        if (login)
            console.log("BME automatic login: login initiation button was found (low priority)");
    }

    // If no query selector matched, try to find the login button by its text
    if (!login) {
        login =
            [...document.querySelectorAll("a")]
                .find(a => {
                    const content = a.innerHTML.toLowerCase();
                    const matchTexts = ["bejelentkezés", "login", "log in"];
                    const unmatchTexts = [" és"];

                    return matchTexts.some(text => content.includes(text))
                        && !unmatchTexts.some(text => content.includes(text));
                });
        
        if (login)
            console.log("BME automatic login: login initiation button was found (by text content)");
    }

    if (login)
        login.click();
    else
        console.warn("BME automatic login: login initiation button was not found");
}

initiateLogin();
