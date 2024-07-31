document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device is ready');

    // Initialize Firebase (automatically done by the plugin)

    // Registration
    document.getElementById('register-btn').addEventListener('click', function() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Registered successfully
                var user = userCredential.user;
                console.log('User registered:', user);

                // Store additional user data in Realtime Database
                firebase.database().ref('users/' + user.uid).set({
                    uid: user.uid,
                    name: user.name,
                    email: email,
                    password: password
                }).then(() => {
                    window.location.href = 'login.html';
                    alert('Registration successful, Kindly sign in with your registered details');
                }).catch((error) => {
                    console.error('Error storing user data:', error);
                    alert('Error storing user data');
                });
            })
            .catch((error) => {
                console.error('Error registering:', error);
                alert('Registration failed: ' + error.message);
            });
    });

    // Login
    document.getElementById('login-btn').addEventListener('click', function() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Logged in successfully
                var user = userCredential.user;
                console.log('User logged in:', user);

                // Retrieve user data from Realtime Database
                firebase.database().ref('users/' + user.uid).once('value')
                    .then((snapshot) => {
                        var userData = snapshot.val();
                        window.location.href = 'submit.html';
                        alert('Login successful. User data: ' + JSON.stringify(userData));
                    })
                    .catch((error) => {
                        console.error('Error retrieving user data:', error);
                        alert('Error retrieving user data');
                    });
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert('Login failed: ' + error.message);
            });
    });
}