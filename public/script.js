// script.js
function redirectToGoogleSheet() {
    window.location.href = 'https://drive.google.com/drive/folders/1U4kMmXBS0UNcLzeJsPulKyCEvWAW8ZbK';
}

function createAttendance() {
    alert('Create Attendance button clicked');
    // Add logic to handle creating attendance
}
document.addEventListener('DOMContentLoaded', function () {
    // サーバーからのメッセージがあれば表示する
    const messageElement = document.getElementById('message');
    const message = messageElement.getAttribute('data-message');
    if (message) {
        alert(message); // または、メッセージを表示する別の方法を選択
    }
});
function deleteAttendance() {
    alert('Delete Attendance button clicked');
    // Add logic to handle deleting attendance
}


document.addEventListener('DOMContentLoaded', function () {
    // サーバーからのメッセージがあれば表示する
    const deleteMessage = new URLSearchParams(window.location.search).get('deleteMessage');

    if (deleteMessage) {
        // 削除完了メッセージをダイアログで表示
        window.alert(deleteMessage);
    }
    const createMessage = new URLSearchParams(window.location.search).get('createMessage');

    if (createMessage) {
        window.alert(createMessage)
    }
});



function createAttendance() {
    window.location.href = '/create';
}
function deleteAttendance() {
    window.location.href = '/delete';
}


