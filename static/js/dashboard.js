let allData = [];
let charts = {};
const metrics = ['sleep', 'mood', 'screenTime', 'water', 'steps', 'work'];

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/get-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        /*allData = await response.json();
        allData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));*/

        //Dummy data
        allData = [
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-13T09:49:47.698461+00:00",
        "sleep": 5.6,
        "mood": 3,
        "screenTime": 4.8,
        "water": 2.2,
        "steps": 12422,
        "work": 2.8,
        "entryID": 25
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-14T09:49:47.698461+00:00",
        "sleep": 9.0,
        "mood": 4,
        "screenTime": 4.5,
        "water": 1.9,
        "steps": 7613,
        "work": 3.5,
        "entryID": 26
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-15T09:49:47.698461+00:00",
        "sleep": 8.7,
        "mood": 1,
        "screenTime": 3.7,
        "water": 3.3,
        "steps": 13870,
        "work": 3.2,
        "entryID": 27
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-16T09:49:47.698461+00:00",
        "sleep": 7.8,
        "mood": 5,
        "screenTime": 2.9,
        "water": 2.8,
        "steps": 13908,
        "work": 2.5,
        "entryID": 28
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-17T09:49:47.698461+00:00",
        "sleep": 7.5,
        "mood": 2,
        "screenTime": 3.4,
        "water": 3.0,
        "steps": 13970,
        "work": 3.1,
        "entryID": 29
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-18T09:49:47.698461+00:00",
        "sleep": 7.5,
        "mood": 2,
        "screenTime": 1.6,
        "water": 1.5,
        "steps": 13588,
        "work": 2.3,
        "entryID": 30
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-19T09:49:47.698461+00:00",
        "sleep": 6.2,
        "mood": 5,
        "screenTime": 2.6,
        "water": 2.5,
        "steps": 14012,
        "work": 1.7,
        "entryID": 31
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-20T09:49:47.698461+00:00",
        "sleep": 6.6,
        "mood": 1,
        "screenTime": 4.7,
        "water": 1.4,
        "steps": 11244,
        "work": 0.9,
        "entryID": 32
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-21T09:49:47.698461+00:00",
        "sleep": 8.2,
        "mood": 3,
        "screenTime": 1.7,
        "water": 2.9,
        "steps": 12948,
        "work": 3.7,
        "entryID": 33
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-22T09:49:47.698461+00:00",
        "sleep": 6.8,
        "mood": 3,
        "screenTime": 1.9,
        "water": 1.1,
        "steps": 5091,
        "work": 3.0,
        "entryID": 34
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-23T09:49:47.698461+00:00",
        "sleep": 6.3,
        "mood": 5,
        "screenTime": 1.6,
        "water": 1.1,
        "steps": 8760,
        "work": 2.0,
        "entryID": 35
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-24T09:49:47.698461+00:00",
        "sleep": 6.6,
        "mood": 1,
        "screenTime": 1.6,
        "water": 2.0,
        "steps": 9952,
        "work": 1.3,
        "entryID": 36
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-25T09:49:47.698461+00:00",
        "sleep": 8.4,
        "mood": 2,
        "screenTime": 4.6,
        "water": 2.1,
        "steps": 14274,
        "work": 2.0,
        "entryID": 37
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-26T09:49:47.698461+00:00",
        "sleep": 8.0,
        "mood": 1,
        "screenTime": 2.4,
        "water": 2.9,
        "steps": 11140,
        "work": 0.9,
        "entryID": 38
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-27T09:49:47.698461+00:00",
        "sleep": 7.0,
        "mood": 5,
        "screenTime": 2.5,
        "water": 2.1,
        "steps": 6053,
        "work": 2.0,
        "entryID": 39
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-28T09:49:47.698461+00:00",
        "sleep": 9.3,
        "mood": 5,
        "screenTime": 2.7,
        "water": 2.1,
        "steps": 10833,
        "work": 2.8,
        "entryID": 40
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-29T09:49:47.698461+00:00",
        "sleep": 5.9,
        "mood": 1,
        "screenTime": 1.7,
        "water": 1.2,
        "steps": 8463,
        "work": 3.9,
        "entryID": 41
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-30T09:49:47.698461+00:00",
        "sleep": 5.8,
        "mood": 5,
        "screenTime": 3.8,
        "water": 1.6,
        "steps": 12993,
        "work": 0.7,
        "entryID": 42
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-01-31T09:49:47.698461+00:00",
        "sleep": 9.0,
        "mood": 3,
        "screenTime": 2.3,
        "water": 2.0,
        "steps": 10967,
        "work": 2.1,
        "entryID": 43
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-01T09:49:47.698461+00:00",
        "sleep": 9.1,
        "mood": 1,
        "screenTime": 3.9,
        "water": 2.7,
        "steps": 5390,
        "work": 1.8,
        "entryID": 44
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-02T09:49:47.698461+00:00",
        "sleep": 6.1,
        "mood": 4,
        "screenTime": 2.5,
        "water": 2.0,
        "steps": 6668,
        "work": 2.1,
        "entryID": 45
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-03T09:49:47.698461+00:00",
        "sleep": 8.6,
        "mood": 5,
        "screenTime": 1.6,
        "water": 2.2,
        "steps": 13539,
        "work": 1.0,
        "entryID": 46
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-04T09:49:47.698461+00:00",
        "sleep": 9.4,
        "mood": 4,
        "screenTime": 4.1,
        "water": 2.5,
        "steps": 12574,
        "work": 1.3,
        "entryID": 47
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-05T09:49:47.698461+00:00",
        "sleep": 9.0,
        "mood": 1,
        "screenTime": 4.9,
        "water": 1.9,
        "steps": 10342,
        "work": 3.8,
        "entryID": 48
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-06T09:49:47.698461+00:00",
        "sleep": 8.7,
        "mood": 4,
        "screenTime": 3.8,
        "water": 1.4,
        "steps": 12335,
        "work": 1.2,
        "entryID": 49
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-07T09:49:47.698461+00:00",
        "sleep": 9.5,
        "mood": 4,
        "screenTime": 2.3,
        "water": 1.8,
        "steps": 9514,
        "work": 0.6,
        "entryID": 50
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-08T09:49:47.698461+00:00",
        "sleep": 5.6,
        "mood": 5,
        "screenTime": 3.6,
        "water": 2.5,
        "steps": 9055,
        "work": 1.2,
        "entryID": 51
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-09T09:49:47.698461+00:00",
        "sleep": 8.4,
        "mood": 3,
        "screenTime": 2.2,
        "water": 3.3,
        "steps": 14551,
        "work": 1.5,
        "entryID": 52
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-10T09:49:47.698461+00:00",
        "sleep": 6.5,
        "mood": 5,
        "screenTime": 4.0,
        "water": 1.1,
        "steps": 14031,
        "work": 1.9,
        "entryID": 53
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-11T09:49:47.698461+00:00",
        "sleep": 7.3,
        "mood": 3,
        "screenTime": 3.7,
        "water": 1.3,
        "steps": 8416,
        "work": 0.7,
        "entryID": 54
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-12T09:49:47.698461+00:00",
        "sleep": 7.0,
        "mood": 1,
        "screenTime": 4.5,
        "water": 2.3,
        "steps": 11071,
        "work": 0.9,
        "entryID": 55
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-13T09:49:47.698461+00:00",
        "sleep": 6.8,
        "mood": 1,
        "screenTime": 4.3,
        "water": 1.2,
        "steps": 13333,
        "work": 1.6,
        "entryID": 56
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-14T09:49:47.698461+00:00",
        "sleep": 5.9,
        "mood": 3,
        "screenTime": 3.7,
        "water": 1.0,
        "steps": 7599,
        "work": 3.0,
        "entryID": 57
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-15T09:49:47.698461+00:00",
        "sleep": 8.9,
        "mood": 3,
        "screenTime": 4.8,
        "water": 2.2,
        "steps": 14226,
        "work": 0.6,
        "entryID": 58
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-16T09:49:47.698461+00:00",
        "sleep": 9.4,
        "mood": 2,
        "screenTime": 3.2,
        "water": 3.0,
        "steps": 9318,
        "work": 3.0,
        "entryID": 59
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-17T09:49:47.698461+00:00",
        "sleep": 8.6,
        "mood": 1,
        "screenTime": 4.4,
        "water": 1.9,
        "steps": 13400,
        "work": 3.4,
        "entryID": 60
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-18T09:49:47.698461+00:00",
        "sleep": 6.5,
        "mood": 3,
        "screenTime": 2.2,
        "water": 2.9,
        "steps": 8571,
        "work": 2.7,
        "entryID": 61
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-19T09:49:47.698461+00:00",
        "sleep": 7.6,
        "mood": 1,
        "screenTime": 2.3,
        "water": 3.0,
        "steps": 13761,
        "work": 1.6,
        "entryID": 62
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-20T09:49:47.698461+00:00",
        "sleep": 6.9,
        "mood": 4,
        "screenTime": 4.4,
        "water": 2.0,
        "steps": 6256,
        "work": 1.9,
        "entryID": 63
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-21T09:49:47.698461+00:00",
        "sleep": 8.0,
        "mood": 4,
        "screenTime": 3.4,
        "water": 1.3,
        "steps": 9126,
        "work": 3.5,
        "entryID": 64
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-22T09:49:47.698461+00:00",
        "sleep": 8.4,
        "mood": 5,
        "screenTime": 1.6,
        "water": 2.4,
        "steps": 14781,
        "work": 0.9,
        "entryID": 65
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-23T09:49:47.698461+00:00",
        "sleep": 7.5,
        "mood": 3,
        "screenTime": 4.3,
        "water": 2.8,
        "steps": 14333,
        "work": 1.5,
        "entryID": 66
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-24T09:49:47.698461+00:00",
        "sleep": 7.5,
        "mood": 4,
        "screenTime": 2.6,
        "water": 1.7,
        "steps": 12237,
        "work": 2.9,
        "entryID": 67
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-25T09:49:47.698461+00:00",
        "sleep": 7.9,
        "mood": 4,
        "screenTime": 1.9,
        "water": 3.3,
        "steps": 8282,
        "work": 1.6,
        "entryID": 68
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-26T09:49:47.698461+00:00",
        "sleep": 6.9,
        "mood": 1,
        "screenTime": 3.3,
        "water": 2.2,
        "steps": 14166,
        "work": 2.5,
        "entryID": 69
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-27T09:49:47.698461+00:00",
        "sleep": 7.0,
        "mood": 2,
        "screenTime": 4.9,
        "water": 2.8,
        "steps": 10651,
        "work": 2.7,
        "entryID": 70
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-02-28T09:49:47.698461+00:00",
        "sleep": 8.3,
        "mood": 1,
        "screenTime": 1.9,
        "water": 3.0,
        "steps": 5964,
        "work": 1.6,
        "entryID": 71
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-01T09:49:47.698461+00:00",
        "sleep": 7.8,
        "mood": 1,
        "screenTime": 2.2,
        "water": 3.0,
        "steps": 9953,
        "work": 3.0,
        "entryID": 72
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-02T09:49:47.698461+00:00",
        "sleep": 6.5,
        "mood": 4,
        "screenTime": 5.0,
        "water": 1.9,
        "steps": 7097,
        "work": 0.7,
        "entryID": 73
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-03T09:49:47.698461+00:00",
        "sleep": 6.3,
        "mood": 4,
        "screenTime": 1.9,
        "water": 2.4,
        "steps": 8730,
        "work": 3.6,
        "entryID": 74
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-04T09:49:47.698461+00:00",
        "sleep": 6.2,
        "mood": 3,
        "screenTime": 1.8,
        "water": 3.2,
        "steps": 13001,
        "work": 3.9,
        "entryID": 75
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-05T09:49:47.698461+00:00",
        "sleep": 6.4,
        "mood": 2,
        "screenTime": 2.3,
        "water": 1.1,
        "steps": 10701,
        "work": 2.1,
        "entryID": 76
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-06T09:49:47.698461+00:00",
        "sleep": 9.4,
        "mood": 5,
        "screenTime": 4.5,
        "water": 3.3,
        "steps": 9964,
        "work": 2.8,
        "entryID": 77
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-07T09:49:47.698461+00:00",
        "sleep": 6.6,
        "mood": 4,
        "screenTime": 3.7,
        "water": 1.8,
        "steps": 9986,
        "work": 0.9,
        "entryID": 78
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-08T09:49:47.698461+00:00",
        "sleep": 5.6,
        "mood": 2,
        "screenTime": 4.5,
        "water": 2.7,
        "steps": 9049,
        "work": 3.0,
        "entryID": 79
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-09T09:49:47.698461+00:00",
        "sleep": 9.2,
        "mood": 4,
        "screenTime": 4.9,
        "water": 2.8,
        "steps": 11709,
        "work": 3.2,
        "entryID": 80
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-10T09:49:47.698461+00:00",
        "sleep": 7.4,
        "mood": 1,
        "screenTime": 4.2,
        "water": 1.0,
        "steps": 9573,
        "work": 2.6,
        "entryID": 81
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-11T09:49:47.698461+00:00",
        "sleep": 6.8,
        "mood": 2,
        "screenTime": 2.2,
        "water": 2.9,
        "steps": 9844,
        "work": 1.1,
        "entryID": 82
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-12T09:49:47.698461+00:00",
        "sleep": 8.5,
        "mood": 1,
        "screenTime": 5.0,
        "water": 1.9,
        "steps": 7005,
        "work": 2.4,
        "entryID": 83
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-13T09:49:47.698461+00:00",
        "sleep": 6.6,
        "mood": 2,
        "screenTime": 4.1,
        "water": 1.7,
        "steps": 12883,
        "work": 2.8,
        "entryID": 84
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-14T09:49:47.698461+00:00",
        "sleep": 5.6,
        "mood": 4,
        "screenTime": 3.4,
        "water": 2.0,
        "steps": 10521,
        "work": 1.4,
        "entryID": 85
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-15T09:49:47.698461+00:00",
        "sleep": 9.3,
        "mood": 5,
        "screenTime": 3.8,
        "water": 2.7,
        "steps": 6646,
        "work": 0.6,
        "entryID": 86
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-16T09:49:47.698461+00:00",
        "sleep": 6.6,
        "mood": 5,
        "screenTime": 3.4,
        "water": 2.6,
        "steps": 11365,
        "work": 0.6,
        "entryID": 87
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-17T09:49:47.698461+00:00",
        "sleep": 9.1,
        "mood": 4,
        "screenTime": 3.8,
        "water": 1.6,
        "steps": 11497,
        "work": 2.3,
        "entryID": 88
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-18T09:49:47.698461+00:00",
        "sleep": 8.8,
        "mood": 4,
        "screenTime": 4.6,
        "water": 2.4,
        "steps": 8425,
        "work": 3.7,
        "entryID": 89
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-19T09:49:47.698461+00:00",
        "sleep": 7.5,
        "mood": 4,
        "screenTime": 1.5,
        "water": 2.6,
        "steps": 13231,
        "work": 0.5,
        "entryID": 90
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-20T09:49:47.698461+00:00",
        "sleep": 7.7,
        "mood": 5,
        "screenTime": 2.4,
        "water": 2.7,
        "steps": 11625,
        "work": 2.5,
        "entryID": 91
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-21T09:49:47.698461+00:00",
        "sleep": 9.1,
        "mood": 2,
        "screenTime": 4.6,
        "water": 2.7,
        "steps": 11985,
        "work": 1.3,
        "entryID": 92
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-22T09:49:47.698461+00:00",
        "sleep": 6.8,
        "mood": 5,
        "screenTime": 4.3,
        "water": 1.5,
        "steps": 8436,
        "work": 1.5,
        "entryID": 93
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-23T09:49:47.698461+00:00",
        "sleep": 7.0,
        "mood": 3,
        "screenTime": 4.4,
        "water": 2.5,
        "steps": 11117,
        "work": 2.9,
        "entryID": 94
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-24T09:49:47.698461+00:00",
        "sleep": 8.1,
        "mood": 4,
        "screenTime": 2.6,
        "water": 2.7,
        "steps": 12523,
        "work": 1.3,
        "entryID": 95
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-25T09:49:47.698461+00:00",
        "sleep": 7.1,
        "mood": 3,
        "screenTime": 4.8,
        "water": 1.8,
        "steps": 13322,
        "work": 2.1,
        "entryID": 96
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-26T09:49:47.698461+00:00",
        "sleep": 6.4,
        "mood": 4,
        "screenTime": 4.5,
        "water": 1.6,
        "steps": 12011,
        "work": 3.0,
        "entryID": 97
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-27T09:49:47.698461+00:00",
        "sleep": 6.9,
        "mood": 3,
        "screenTime": 3.8,
        "water": 2.0,
        "steps": 10326,
        "work": 0.8,
        "entryID": 98
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-28T09:49:47.698461+00:00",
        "sleep": 6.8,
        "mood": 3,
        "screenTime": 3.9,
        "water": 2.2,
        "steps": 8308,
        "work": 0.6,
        "entryID": 99
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-29T09:49:47.698461+00:00",
        "sleep": 5.5,
        "mood": 1,
        "screenTime": 2.6,
        "water": 2.8,
        "steps": 7420,
        "work": 1.3,
        "entryID": 100
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-30T09:49:47.698461+00:00",
        "sleep": 7.3,
        "mood": 2,
        "screenTime": 4.4,
        "water": 3.0,
        "steps": 5316,
        "work": 1.0,
        "entryID": 101
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-03-31T09:49:47.698461+00:00",
        "sleep": 9.0,
        "mood": 3,
        "screenTime": 2.8,
        "water": 1.9,
        "steps": 5391,
        "work": 0.5,
        "entryID": 102
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-01T09:49:47.698461+00:00",
        "sleep": 6.8,
        "mood": 4,
        "screenTime": 2.5,
        "water": 2.7,
        "steps": 6411,
        "work": 0.6,
        "entryID": 103
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-02T09:49:47.698461+00:00",
        "sleep": 7.4,
        "mood": 4,
        "screenTime": 4.7,
        "water": 3.4,
        "steps": 7333,
        "work": 2.7,
        "entryID": 104
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-03T09:49:47.698461+00:00",
        "sleep": 7.4,
        "mood": 1,
        "screenTime": 4.8,
        "water": 1.3,
        "steps": 6003,
        "work": 3.8,
        "entryID": 105
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-04T09:49:47.698461+00:00",
        "sleep": 7.3,
        "mood": 2,
        "screenTime": 2.6,
        "water": 2.2,
        "steps": 5856,
        "work": 1.2,
        "entryID": 106
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-05T09:49:47.698461+00:00",
        "sleep": 9.1,
        "mood": 1,
        "screenTime": 1.9,
        "water": 1.9,
        "steps": 14112,
        "work": 0.9,
        "entryID": 107
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-06T09:49:47.698461+00:00",
        "sleep": 6.1,
        "mood": 1,
        "screenTime": 2.8,
        "water": 2.5,
        "steps": 7135,
        "work": 1.2,
        "entryID": 108
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-07T09:49:47.698461+00:00",
        "sleep": 7.1,
        "mood": 5,
        "screenTime": 4.7,
        "water": 1.2,
        "steps": 14410,
        "work": 3.5,
        "entryID": 109
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-08T09:49:47.698461+00:00",
        "sleep": 5.6,
        "mood": 1,
        "screenTime": 3.6,
        "water": 1.2,
        "steps": 6735,
        "work": 2.3,
        "entryID": 110
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-09T09:49:47.698461+00:00",
        "sleep": 6.5,
        "mood": 5,
        "screenTime": 2.7,
        "water": 1.5,
        "steps": 8670,
        "work": 2.7,
        "entryID": 111
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-10T09:49:47.698461+00:00",
        "sleep": 6.1,
        "mood": 3,
        "screenTime": 1.8,
        "water": 1.8,
        "steps": 5707,
        "work": 2.1,
        "entryID": 112
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-11T09:49:47.698461+00:00",
        "sleep": 7.8,
        "mood": 4,
        "screenTime": 1.8,
        "water": 3.0,
        "steps": 11278,
        "work": 0.7,
        "entryID": 113
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-12T09:49:47.698461+00:00",
        "sleep": 6.5,
        "mood": 3,
        "screenTime": 4.0,
        "water": 1.6,
        "steps": 14898,
        "work": 3.5,
        "entryID": 114
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-13T09:49:47.698461+00:00",
        "sleep": 7.5,
        "mood": 4,
        "screenTime": 2.8,
        "water": 1.8,
        "steps": 9362,
        "work": 2.1,
        "entryID": 115
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-14T09:49:47.698461+00:00",
        "sleep": 8.0,
        "mood": 3,
        "screenTime": 2.0,
        "water": 2.3,
        "steps": 10213,
        "work": 1.6,
        "entryID": 116
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-15T09:49:47.698461+00:00",
        "sleep": 8.6,
        "mood": 5,
        "screenTime": 3.1,
        "water": 2.2,
        "steps": 8573,
        "work": 2.1,
        "entryID": 117
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-16T09:49:47.698461+00:00",
        "sleep": 6.6,
        "mood": 4,
        "screenTime": 5.2,
        "water": 2.7,
        "steps": 16332,
        "work": 1.1,
        "entryID": 118
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-17T09:49:47.698461+00:00",
        "sleep": 7.9,
        "mood": 2,
        "screenTime": 6.1,
        "water": 1.3,
        "steps": 3241,
        "work": 0.6,
        "entryID": 119
    },
    {
        "userID": "553993d1-7c18-42b8-9f33-ecc97c20fc7a",
        "created_at": "2025-04-18T09:49:47.698461+00:00",
        "sleep": 8.1,
        "mood": 4,
        "screenTime": 2.4,
        "water": 4.1,
        "steps": 9347,
        "work": 3.2,
        "entryID": 120
    }
]

        initializeCharts();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

function initializeCharts() {
    metrics.forEach(metric => {
        const selectElement = document.getElementById(`${metric}Range`);
        if (selectElement) {
            selectElement.addEventListener("change", () => updateChart(metric));
        }
        updateChart(metric);
    });

    const overviewSelect = document.getElementById('overviewRange');
    if (overviewSelect) {
        overviewSelect.addEventListener("change", () => {
            const range = overviewSelect.value;
            updateOverviewChart(range);
        });
    }
    updateOverviewChart(allData);
}

function updateChart(metric) {
    const range = document.getElementById(`${metric}Range`).value;
    const filteredData = filterDataByRange(allData, range);

    const labels = filteredData.map(entry => new Date(entry.created_at).toLocaleDateString('en-GB'));
    const data = filteredData.map(entry => entry[metric]);

    const lastRecordedElement = document.getElementById(`${metric}Last`);
    if (lastRecordedElement) {
        lastRecordedElement.textContent = data.length > 0 ? data[data.length - 1] : 'N/A';
    }

    try {
        charts[metric].destroy();
    } catch (e) {
        console.error(e);
    }


    const ctx = document.getElementById(`${metric}Chart`).getContext("2d");
    charts[metric] = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: capitalizeFirstLetter(metric),
                data: data,
                borderColor: getMetricColor(metric),
                backgroundColor: getMetricColor(metric, 0.2),
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date",
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: capitalizeFirstLetter(metric),
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'white'
                    },
                    ticks: {
                        color: 'white'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Update overview chart based on selected metrics
function updateOverviewChart() {
    const range = document.getElementById(`overviewRange`).value;
    const filteredData = filterDataByRange(allData, range);
    const metric1 = document.getElementById('overviewMetric1').value;
    const metric2 = document.getElementById('overviewMetric2').value;

    if (metric1 === metric2) {
        alert("Please select two different metrics.");
        return;
    }

    // Generate date range
    const dates = [...new Set(filteredData.map(entry => entry.created_at))].sort();
    const dateLabels = dates.map(date => new Date(date).toLocaleDateString('en-GB'));

    // Prepare datasets
    const dataset1 = prepareDataset(filteredData, dates, metric1, 'y');
    const dataset2 = prepareDataset(filteredData, dates, metric2, 'y1');

    try {
        overviewChart.destroy();
    } catch (error) {
        console.error(error);
    }

    // Create new chart
    const ctx = document.getElementById('overviewChart').getContext('2d');
    overviewChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabels,
            datasets: [dataset1, dataset2]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    },
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: capitalizeFirstLetter(metric1)
                    },
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: capitalizeFirstLetter(metric2)
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            }
        }
    });
}

// Prepare dataset for a specific metric
function prepareDataset(data, dates, metric, yAxisID) {
    // Map dates to values
    const dateValueMap = {};
    data.forEach(entry => {
        const date = entry.created_at;
        if (!dateValueMap[date]) {
            dateValueMap[date] = {};
        }
        dateValueMap[date][metric] = entry[metric];
    });

    // Extract values and normalize
    const values = dates.map(date => dateValueMap[date]?.[metric] || 0);

    return {
        label: capitalizeFirstLetter(metric),
        data: values,
        borderColor: getMetricColor(metric),
        backgroundColor: getMetricColor(metric, 0.2),
        yAxisID: yAxisID,
        fill: false,
        tension: 0.1
    };
}

function filterDataByRange(data, range) {
  const now = new Date();
  let startDate;

  switch (range) {
    case '7':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case '30':
      startDate = new Date(now.setDate(now.getDate() - 30));
      break;
    case '90':
      startDate = new Date(now.setDate(now.getDate() - 90));
      break;
    case 'all':
    default:
      return data;
  }

  return data.filter(entry => new Date(entry.created_at) >= startDate);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getMetricColor(metric, alpha = 1) {
    const colors = {
        sleep: `rgba(255, 99, 132, ${alpha})`,
        mood: `rgba(54, 162, 235, ${alpha})`,
        screenTime: `rgba(255, 206, 86, ${alpha})`,
        water: `rgba(75, 192, 192, ${alpha})`,
        steps: `rgba(153, 102, 255, ${alpha})`,
        work: `rgba(255, 159, 64, ${alpha})`
    };
    return colors[metric] || `rgba(0, 0, 0, ${alpha})`;
}
