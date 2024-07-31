/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

const apiUrl = 'https://api.jsonbin.io/v3/b/66a961f8ad19ca34f88f284e';
const apiKey = '$2a$10$NUYjfL8kAkknlCMCACEFR.im.LBIpHsNWpw/MZHvGizy8S5h7ZxyO';

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}


// Function to handle form submission for submitting an incident
document.getElementById('submitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var incidentType = document.getElementById('incidentType').value;
    var description = document.getElementById('description').value;

    // Send incident data to the server
    fetch(`${apiUrl}/latest`, {
        method: 'POST',
        headers: { 'X-Master-Key': apiKey },
        body: JSON.stringify({ incidentType, description })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Incident submitted successfully');
            window.location.href = 'view.html';  // Redirect to view page
        } else {
            alert('Submission failed');
        }
    })
    .catch(error => console.error('Error:', error));
});


// Function to fetch and display all incidents from the server
window.addEventListener('load', function() {
    // Fetch incidents from the server
    fetch(`${apiUrl}/latest`, {
        headers: { 'X-Master-Key': apiKey }
    })
    .then(response => response.json())
    .then(data => {
        var incidentList = document.getElementById('incidentList');
        data.incidents.forEach(incident => {
            var div = document.createElement('div');
            div.innerHTML = `<h2>${incident.incidentType}</h2><p>${incident.description}</p>`;
            incidentList.appendChild(div);
        });
    })
    .catch(error => console.error('Error:', error));
});