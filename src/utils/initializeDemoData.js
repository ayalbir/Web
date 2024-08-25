const initializeDemoData = async () => {
    const demoUsers = [
        {
            email: 'elay@example.com',
            password: '12345678p',
            firstName: 'Elay',
            familyName: 'Demo',
            birthdate: '1990-01-01',
            gender: 'male',
            profileImage: '/images/img_avatar2.png',
        },
        {
            email: 'ayal@example.com',
            password: '12345678p',
            firstName: 'Ayal',
            familyName: 'Demo',
            birthdate: '1991-02-02',
            gender: 'female',
            profileImage: '/images/img_avatar2.png',
        },
        {
            email: 'dvir@example.com',
            password: '12345678p',
            firstName: 'Dvir',
            familyName: 'Demo',
            birthdate: '1992-03-03',
            gender: 'male',
            profileImage: '/images/img_avatar3.png',
        },
    ];

    const demoVideos = [
        { email: "elay@example.com", title: "cool", description: "Description for video 1", url: "/videos/subscribe.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "yay", description: "Description for video 2", url: "/videos/walking.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "wow", description: "Description for video 3", url: "/videos/sand.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "neat", description: "Description for video 4", url: "/videos/dog.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "awesome", description: "Description for video 5", url: "/videos/sandals.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Linear Algebra", description: "Description for video 6", url: "/videos/dog.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Calculus", description: "Description for video 7", url: "/videos/subscribe.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Physics", description: "Description for video 8", url: "/videos/subscribe.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Chemistry", description: "Description for video 9", url: "/videos/dog.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Biology", description: "Description for video 10", url: "/videos/sandals.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "dvir@example.com", title: "History of the World War 2", description: "Description for video 11", url: "/videos/walking.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "dvir@example.com", title: "Geography", description: "Description for video 12", url: "/videos/walking.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "dvir@example.com", title: "Economics", description: "Description for video 13", url: "/videos/sandals.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "Astronomy", description: "Description for video 14", url: "/videos/dog.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "Art History", description: "Description for video 15", url: "/videos/subscribe.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "Music Theory", description: "Description for video 16", url: "/videos/sandals.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Programming 101", description: "Description for video 17", url: "/videos/dog.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Data Science", description: "Description for video 18", url: "/videos/subscribe.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Machine Learning", description: "Description for video 19", url: "/videos/sandals.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Artificial Intelligence", description: "Description for video 20", url: "/videos/walking.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "dvir@example.com", title: "Blockchain", description: "Description for video 21", url: "/videos/subscribe.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "dvir@example.com", title: "Cybersecurity", description: "Description for video 22", url: "/videos/walking.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "dvir@example.com", title: "Robotics", description: "Description for video 23", url: "/videos/subscribe.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "Astronomy Advanced", description: "Description for video 24", url: "/videos/walking.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "Modern Art", description: "Description for video 25", url: "/videos/sandals.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "elay@example.com", title: "Classical Music", description: "Description for video 26", url: "/videos/dog.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Advanced Programming", description: "Description for video 27", url: "/videos/walking.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Big Data", description: "Description for video 28", url: "/videos/sandals.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "Deep Learning", description: "Description for video 29", url: "/videos/sandals.mp4", pic: "/images/temp_pic.png", views: 0 },
        { email: "ayal@example.com", title: "AI in Practice", description: "Description for video 30", url: "/videos/dog.mp4", pic: "/images/temp_pic.png", views: 0 }
    ];

    const encodeFileToBase64 = (filePath) => {
        return new Promise((resolve, reject) => {
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const result = reader.result;
                        // Remove the first 22 characters of the base64 string
                        const encodedString = result.substring(22);
                        resolve(encodedString);
                    };
                    reader.onerror = (error) => reject(error);
                })
                .catch(error => reject(error));
        });
    };
    
    try {
        for (const user of demoUsers) {
            const profileImage = await encodeFileToBase64(user.profileImage);
            const completeUserData = { ...user, profileImage };
            const res = await fetch('http://127.0.0.1:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completeUserData),
            });
    
            if (res.ok) {
                const tokenRes = await fetch('http://127.0.0.1:8080/api/tokens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user.email, password: user.password }),
                });
    
                if (tokenRes.ok) {
                    const data = await tokenRes.json();
                  
                    localStorage.setItem(`${user.email}_token`, data.token);
                } else {
                    console.error(`Failed to get token for ${user.email}:`, await tokenRes.text());
                }
            } else {
                console.error(`Failed to register ${user.email}:`, await res.text());
            }
        }
    
        for (const video of demoVideos) {
            const user = demoUsers.find((u) => u.email === video.email);
            const encodedPic = await encodeFileToBase64(video.pic);
            const encodedUrl = await encodeFileToBase64(video.url);
            const token = localStorage.getItem(`${user.email}_token`);
            await fetch(`http://127.0.0.1:8080/api/users/${user.email}/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...video, pic: encodedPic, url: encodedUrl }),
            });
        }
    
        localStorage.setItem('demoDataInitialized', 'true');
    } catch (error) {
        console.error('Error initializing demo data:', error);
    }
    
};

export default initializeDemoData;