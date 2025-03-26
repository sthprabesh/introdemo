import http from "k6/http"; // Import the HTTP module for making API requests
import { check, sleep } from "k6"; // Import utilities for assertions and pauses

export let options = {
    stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 10 },
        { duration: "10s", target: 0 },
    ],
};

export default function () {
    let res = http.get("http://localhost:3000/get-users"); // Updated to match the server route

    check(res, {
        "status is 200": (r) => r.status === 200,
        "response time is < 500ms": (r) => r.timings.duration < 500,
    });

    console.log(`Response status: ${res.status}`);
    console.log(`Response time: ${res.timings.duration}ms`);

    sleep(1);
}
