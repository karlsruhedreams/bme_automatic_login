/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const loginButton = [...document.querySelectorAll("a img")][1];

if (loginButton) {
    loginButton.click();
    console.log("BME automatic login: initiating login");
} else {
    console.warn("BME automatic login: login initiation button was not found");
}
