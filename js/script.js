function displayInstantText(element, text, addNewLine = false) {
    element.innerHTML += text + (addNewLine ? '<br>' : '');
}

function skipLoadingAnimation() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('skipLoading') === 'true';
}

function newLine(element) {
    element.innerHTML += '<br>';
}

function typeWriter(element, text, i, interval, addNewLine = false, callback) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(function() {
            typeWriter(element, text, i, interval, addNewLine, callback);
        }, interval);
    } else {
        if (addNewLine) {
            element.innerHTML += '<br>';
        }
        if (callback) {
            callback();
        }
    }
}

function sequenceOfCommands() {
    const terminal = document.getElementById('terminal');
    displayInstantText(terminal, 'PS C:\\Users\\Guest> ');
    typeWriter(terminal, 'git clone https://monportfolio.git', 0, 50, true, function() {
        setTimeout(function() {
            displayInstantText(terminal, "Cloning into 'monportfolio'...", true);
            newLine(terminal);
            setTimeout(function() {
                displayInstantText(terminal, "remote: Enumerating objects: 86, done.", true);
                setTimeout(function() {
                    displayInstantText(terminal, "remote: Counting objects: 100% (86/86), done.", true);
                    setTimeout(function() {
                        displayInstantText(terminal, "remote: Compressing objects: 100% (65/65), done.", true);
                        setTimeout(function() {
                            displayInstantText(terminal, "Receiving objects: 100% (86/86), 12.34 MiB | 5.67 MiB/s, done.", true);
                            setTimeout(function() {
                                displayInstantText(terminal, "Resolving deltas: 100% (30/30), done.", true);
                                newLine(terminal);
                                setTimeout(function() {
                                    displayInstantText(terminal, 'PS C:\\Users\\Guest\\monportfolio> ');
                                    typeWriter(terminal, 'start index.html', 0, 50, false, hideLoadingScreen);
                                }, 200);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 200);
        }, 100);
    });
}

function hideLoadingScreen() {
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 500);
}

window.onload = function() {
    if (!skipLoadingAnimation()) {
        sequenceOfCommands();
    } else {
        hideLoadingScreen();
    }
};

