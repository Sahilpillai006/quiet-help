import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    update,
    remove,
    onValue,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";


/* =====================================================
   FIREBASE CONFIG
===================================================== */

const firebaseConfig = {

    apiKey: "add your firebase apikey",

    authDomain:
        "doamain-name.firebase.com,

    databaseURL:
        "your firebseurl.firebasedatabase.app",

    projectId:
        "iproject-id from firebase",

    storageBucket:
        "your storage bucket.firebasestorage.app",

    messagingSenderId:
        "messaging id",

    appId:
        "your app id",

    measurementId:
        "your measurement id"

};


/* =====================================================
   INITIALIZE FIREBASE
===================================================== */

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


/* =====================================================
   FIREBASE REFERENCES
===================================================== */

const studentsRef =
    ref(database, "students");

const requestsRef =
    ref(database, "requests");


/* =====================================================
   APPLICATION DATA
===================================================== */

let students = {};

let requests = {};

let editingDeviceId = null;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const studentForm =
    document.getElementById("studentForm");

const studentNameInput =
    document.getElementById("studentName");

const rollNumberInput =
    document.getElementById("rollNumber");

const classNameInput =
    document.getElementById("className");

const deviceIdInput =
    document.getElementById("deviceId");

const studentSubmitBtn =
    document.getElementById("studentSubmitBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

const studentList =
    document.getElementById("studentList");

const requestList =
    document.getElementById("requestList");

const historyList =
    document.getElementById("historyList");

const searchInput =
    document.getElementById("searchInput");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");

const systemStatus =
    document.getElementById("systemStatus");

const notification =
    document.getElementById("notification");

const notificationText =
    document.getElementById("notificationText");


/* =====================================================
   FIREBASE CONNECTION STATUS
===================================================== */

onValue(
    ref(database, ".info/connected"),
    (snapshot) => {

        if (snapshot.val() === true) {

            systemStatus.textContent =
                "Active";

        } else {

            systemStatus.textContent =
                "Offline";

        }

    }
);


/* =====================================================
   STUDENT DATABASE LISTENER
===================================================== */

onValue(
    studentsRef,
    (snapshot) => {

        students =
            snapshot.val() || {};


        renderStudents();

        renderRequests();

        renderHistory();

    }
);


/* =====================================================
   ADD / EDIT STUDENT
===================================================== */

studentForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const name =
            studentNameInput.value.trim();

        const rollNumber =
            rollNumberInput.value.trim();

        const className =
            classNameInput.value.trim();

        const deviceId =
            deviceIdInput.value;


        /* ---------------------------------------------
           VALIDATION
        --------------------------------------------- */

        if (
            !name ||
            !rollNumber ||
            !className ||
            !deviceId
        ) {

            showNotification(
                "Please fill all fields."
            );

            return;
        }


        try {

            /* =========================================
               EDIT MODE
            ========================================= */

            if (editingDeviceId) {

                await update(

                    ref(
                        database,
                        `students/${editingDeviceId}`
                    ),

                    {
                        name: name,

                        rollNumber:
                            Number(rollNumber),

                        className:
                            className
                    }

                );


                showNotification(
                    "Student details updated successfully."
                );


                exitEditMode();


                return;
            }


            /* =========================================
               ADD MODE
            ========================================= */

            if (students[deviceId]) {

                showNotification(

                    `${deviceId} is already assigned to a student.`

                );

                return;
            }


            await set(

                ref(
                    database,
                    `students/${deviceId}`
                ),

                {

                    name: name,

                    rollNumber:
                        Number(rollNumber),

                    className:
                        className,

                    deviceId:
                        deviceId

                }

            );


            studentForm.reset();


            showNotification(
                "Student registered successfully."
            );


        } catch (error) {

            console.error(error);


            showNotification(
                "Failed to save student details."
            );

        }

    }
);


/* =====================================================
   RENDER REGISTERED STUDENTS
===================================================== */

function renderStudents() {

    studentList.innerHTML = "";


    const deviceIds =
        Object.keys(students);


    if (deviceIds.length === 0) {

        studentList.innerHTML = `

            <p class="empty-message">
                No students registered yet.
            </p>

        `;

        return;
    }


    deviceIds.forEach(
        (deviceId) => {

            const student =
                students[deviceId];


            const card =
                document.createElement("div");


            card.className =
                "student-card";


            card.innerHTML = `

                <div class="student-info">

                    <h4>
                        ${escapeHTML(student.name)}
                    </h4>


                    <p>

                        Roll No:
                        ${escapeHTML(
                            String(
                                student.rollNumber
                            )
                        )}

                        |

                        Class:
                        ${escapeHTML(
                            student.className
                        )}

                    </p>


                    <span class="device-badge">

                        ${escapeHTML(deviceId)}

                    </span>

                </div>


                <div class="student-actions">

                    <button
                        class="edit-btn"
                        data-device="${deviceId}"
                    >
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        data-device="${deviceId}"
                    >
                        Delete
                    </button>

                </div>

            `;


            studentList.appendChild(card);

        }
    );


    /* ---------------------------------------------
       EDIT BUTTONS
    --------------------------------------------- */

    document
        .querySelectorAll(".edit-btn")
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        editStudent(
                            button.dataset.device
                        );

                    }
                );

            }
        );


    /* ---------------------------------------------
       DELETE BUTTONS
    --------------------------------------------- */

    document
        .querySelectorAll(".delete-btn")
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteStudent(
                            button.dataset.device
                        );

                    }
                );

            }
        );

}


/* =====================================================
   EDIT STUDENT
===================================================== */

function editStudent(deviceId) {

    const student =
        students[deviceId];


    if (!student) {
        return;
    }


    editingDeviceId =
        deviceId;


    /* Fill form */

    studentNameInput.value =
        student.name || "";


    rollNumberInput.value =
        student.rollNumber || "";


    classNameInput.value =
        student.className || "";


    deviceIdInput.value =
        deviceId;


    /* Lock device */

    deviceIdInput.disabled =
        true;


    /* Change submit button */

    studentSubmitBtn.textContent =
        "Save Changes";


    studentSubmitBtn.classList.add(
        "save-mode"
    );


    /* Show cancel */

    cancelEditBtn.style.display =
        "block";


    showNotification(
        `Editing ${student.name}`
    );

}


/* =====================================================
   EXIT EDIT MODE
===================================================== */

function exitEditMode() {

    editingDeviceId =
        null;


    studentForm.reset();


    deviceIdInput.disabled =
        false;


    studentSubmitBtn.textContent =
        "Add Student";


    studentSubmitBtn.classList.remove(
        "save-mode"
    );


    cancelEditBtn.style.display =
        "none";

}


/* =====================================================
   CANCEL EDIT
===================================================== */

cancelEditBtn.addEventListener(
    "click",
    () => {

        exitEditMode();


        showNotification(
            "Edit cancelled."
        );

    }
);


/* =====================================================
   DELETE STUDENT
===================================================== */

async function deleteStudent(deviceId) {

    const student =
        students[deviceId];


    if (!student) {
        return;
    }


    const confirmed =
        confirm(
            `Delete ${student.name} from ${deviceId}?`
        );


    if (!confirmed) {
        return;
    }


    try {

        await remove(
            ref(
                database,
                `students/${deviceId}`
            )
        );


        /* If currently editing this student */

        if (
            editingDeviceId === deviceId
        ) {

            exitEditMode();

        }


        showNotification(
            "Student deleted."
        );


    } catch (error) {

        console.error(error);


        showNotification(
            "Failed to delete student."
        );

    }

}


/* =====================================================
   REQUEST DATABASE LISTENER
===================================================== */

onValue(
    requestsRef,
    (snapshot) => {

        requests =
            snapshot.val() || {};


        renderRequests();

        renderHistory();

        updateStats();

    }
);


/* =====================================================
   RENDER ACTIVE REQUESTS
===================================================== */

function renderRequests() {

    requestList.innerHTML = "";


    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const entries =
        Object.entries(requests)

            .filter(
                ([requestId, request]) => {

                    /* Hide resolved requests */

                    if (
                        request.status ===
                        "Resolved"
                    ) {

                        return false;
                    }


                    const student =
                        students[
                            request.deviceId
                        ];


                    const studentName =
                        student?.name ||
                        "Unknown Student";


                    return studentName
                        .toLowerCase()
                        .includes(
                            searchText
                        );

                }
            )

            .sort(
                (a, b) => {

                    return (
                        (b[1].timestamp || 0) -
                        (a[1].timestamp || 0)
                    );

                }
            );


    if (entries.length === 0) {

        requestList.innerHTML = `

            <p class="empty-message">
                No active help requests.
            </p>

        `;

        return;
    }


    entries.forEach(
        ([requestId, request]) => {

            const student =
                students[
                    request.deviceId
                ] || {};


            const name =
                student.name ||
                "Unknown Student";


            const roll =
                student.rollNumber ??
                "-";


            const className =
                student.className ||
                "-";


            const card =
                createRequestCard(

                    requestId,

                    request,

                    name,

                    roll,

                    className

                );


            requestList.appendChild(card);

        }
    );

}


/* =====================================================
   CREATE REQUEST CARD
===================================================== */

function createRequestCard(
    requestId,
    request,
    name,
    roll,
    className
) {

    const card =
        document.createElement("div");


    card.className =
        "request-card";


    const time =
        formatTimestamp(
            request.timestamp
        );


    const statusClass =
        getStatusClass(
            request.status
        );


    card.innerHTML = `

        <h3>
            ${escapeHTML(name)}
        </h3>


        <div class="request-details">

            Roll No:
            ${escapeHTML(
                String(roll)
            )}

            <br>


            Class:
            ${escapeHTML(
                className
            )}

            <br>


            Device:
            ${escapeHTML(
                request.deviceId || "-"
            )}

            <br>


            Time:
            ${escapeHTML(time)}

            <br>


            Event:
            ${escapeHTML(
                request.event || "HELP"
            )}

        </div>


        <span
            class="status-badge ${statusClass}"
        >

            ${escapeHTML(
                request.status ||
                "Pending"
            )}

        </span>


        <div class="request-actions">

            ${
                request.status ===
                "Pending"

                ?

                `

                <button
                    class="acknowledge-btn"
                    data-id="${requestId}"
                >
                    Acknowledge
                </button>

                `

                :

                ""
            }


            ${
                request.status ===
                "Acknowledged"

                ?

                `

                <button
                    class="resolve-btn"
                    data-id="${requestId}"
                >
                    Resolve
                </button>

                `

                :

                ""
            }

        </div>

    `;


    /* Acknowledge */

    const acknowledgeButton =
        card.querySelector(
            ".acknowledge-btn"
        );


    if (acknowledgeButton) {

        acknowledgeButton.addEventListener(
            "click",
            () => {

                updateRequestStatus(
                    requestId,
                    "Acknowledged"
                );

            }
        );

    }


    /* Resolve */

    const resolveButton =
        card.querySelector(
            ".resolve-btn"
        );


    if (resolveButton) {

        resolveButton.addEventListener(
            "click",
            () => {

                updateRequestStatus(
                    requestId,
                    "Resolved"
                );

            }
        );

    }


    return card;

}


/* =====================================================
   UPDATE REQUEST STATUS
===================================================== */

async function updateRequestStatus(
    requestId,
    status
) {

    try {

        await update(

            ref(
                database,
                `requests/${requestId}`
            ),

            {
                status: status
            }

        );


        showNotification(
            `Request marked as ${status}.`
        );


    } catch (error) {

        console.error(error);


        showNotification(
            "Failed to update request."
        );

    }

}


/* =====================================================
   REQUEST HISTORY
===================================================== */

function renderHistory() {

    historyList.innerHTML = "";


    const entries =
        Object.entries(requests)

            .filter(
                ([requestId, request]) =>
                    request.status ===
                    "Resolved"
            )

            .sort(
                (a, b) => {

                    return (
                        (b[1].timestamp || 0) -
                        (a[1].timestamp || 0)
                    );

                }
            );


    if (entries.length === 0) {

        historyList.innerHTML = `

            <p class="empty-message">
                No request history.
            </p>

        `;

        return;
    }


    entries.forEach(
        ([requestId, request]) => {

            const student =
                students[
                    request.deviceId
                ] || {};


            const name =
                student.name ||
                "Unknown Student";


            const roll =
                student.rollNumber ??
                "-";


            const className =
                student.className ||
                "-";


            const card =
                document.createElement("div");


            card.className =
                "history-card";


            card.innerHTML = `

                <h3>
                    ${escapeHTML(name)}
                </h3>


                <div class="request-details">

                    Roll No:
                    ${escapeHTML(
                        String(roll)
                    )}

                    <br>


                    Class:
                    ${escapeHTML(
                        className
                    )}

                    <br>


                    Device:
                    ${escapeHTML(
                        request.deviceId || "-"
                    )}

                    <br>


                    Time:
                    ${escapeHTML(
                        formatTimestamp(
                            request.timestamp
                        )
                    )}

                </div>


                <span
                    class="status-badge status-resolved"
                >
                    Resolved
                </span>

            `;


            historyList.appendChild(card);

        }
    );

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    () => {

        renderRequests();

    }
);


/* =====================================================
   CLEAR HISTORY
===================================================== */

clearHistoryBtn.addEventListener(
    "click",
    async () => {

        const historyEntries =
            Object.entries(requests)
                .filter(
                    ([requestId, request]) =>
                        request.status ===
                        "Resolved"
                );


        if (
            historyEntries.length === 0
        ) {

            showNotification(
                "There is no history to clear."
            );

            return;
        }


        const confirmed =
            confirm(
                "Delete all resolved request history?"
            );


        if (!confirmed) {
            return;
        }


        try {

            for (
                const [requestId]
                of historyEntries
            ) {

                await remove(

                    ref(
                        database,
                        `requests/${requestId}`
                    )

                );

            }


            showNotification(
                "Request history cleared."
            );


        } catch (error) {

            console.error(error);


            showNotification(
                "Failed to clear history."
            );

        }

    }
);


/* =====================================================
   STATISTICS
===================================================== */

function updateStats() {

    let pending = 0;

    let acknowledged = 0;

    let resolved = 0;


    Object.values(requests)
        .forEach(
            (request) => {

                if (
                    request.status ===
                    "Pending"
                ) {

                    pending++;

                }

                else if (
                    request.status ===
                    "Acknowledged"
                ) {

                    acknowledged++;

                }

                else if (
                    request.status ===
                    "Resolved"
                ) {

                    resolved++;

                }

            }
        );


    document.getElementById(
        "pendingCount"
    ).textContent =
        pending;


    document.getElementById(
        "acknowledgedCount"
    ).textContent =
        acknowledged;


    document.getElementById(
        "resolvedCount"
    ).textContent =
        resolved;


    document.getElementById(
        "totalCount"
    ).textContent =
        pending +
        acknowledged +
        resolved;

}


/* =====================================================
   TIMESTAMP
===================================================== */

function formatTimestamp(timestamp) {

    if (!timestamp) {

        return "Waiting for timestamp...";

    }


    const date =
        new Date(
            Number(timestamp)
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return "Invalid time";

    }


    return date.toLocaleString();

}


/* =====================================================
   STATUS CSS CLASS
===================================================== */

function getStatusClass(status) {

    if (
        status ===
        "Acknowledged"
    ) {

        return "status-acknowledged";

    }


    if (
        status ===
        "Resolved"
    ) {

        return "status-resolved";

    }


    return "status-pending";

}


/* =====================================================
   NOTIFICATION
===================================================== */

function showNotification(message) {

    notificationText.textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(
        () => {

            notification.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}
