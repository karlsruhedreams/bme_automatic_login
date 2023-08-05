/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/// If logging in with the BME Microsoft account, accept to stay signed in
function staySignedIn() {
    const title = document.querySelector("div.text-title").innerHTML;
    if (title != "Stay signed in?") {
        console.error("BME automatic login: Microsoft sign-in page does not match the expected title");
        return;
    }

    const email = document.querySelector("#displayName");
    if (!email) {
        console.warn("BME automatic login: email used for Microsoft sign-in was not found");
        return;
    }
    
    if (!email.innerHTML.endsWith("@edu.bme.hu")) {
        console.log("BME automatic login: not logging in with university Microsoft account");
        return;
    }
    
    const form = document.querySelector("form");
    if (!form) {
        console.warn("BME automatic login: form for Microsoft sign-in was not found");
        return;
    }

    form.submit();
    console.log("BME automatic login: accepted to stay signed in with Microsoft account");
}

staySignedIn();
