const videos = [
    { src: 'https://drive.google.com/file/d/1LlPn6ACK4uc7RIHHxC617MbpWg3WPwdK/preview', category: 'Football Edits' },
    { src: 'https://drive.google.com/file/d/1LeB1BTVDXUlNPAztEoX7vUFHLITPE8Wy/preview', category: 'Football Edits' },
    { src: 'https://drive.google.com/file/d/13YxW_9aOEQVwZckVR8LZRPK6xAWsxUYe/preview', category: 'Gaming Videos' },
    { src: 'https://drive.google.com/file/d/1WvF0RNkmXyJDmDYicLShM1EJ_hrAvQ0m/preview', category: 'Ecommerce Ads' },
    { src: 'https://drive.google.com/file/d/19pGELOcPCiRE9MvFSgVGW0uU2kqoX1C-/preview', category: 'Ecommerce Ads' },
    { src: 'https://drive.google.com/file/d/1KWDEYFB7kpZrsBBNmM1SC_GL9GtjbRX6/preview', category: 'Ecommerce Ads' },
    { src: 'https://drive.google.com/file/d/1Z44prGPhxNrI-EAnlAIjYPBaCcKsl-70/preview', category: 'Color Grading' },
    { src: 'https://drive.google.com/file/d/1VKakYuT5RbpBcYOVIqp_KXwPzZGtK6fv/preview', category: 'Documentary Style' },
    { src: 'https://drive.google.com/file/d/1LMBXgn8gw0LD2LjsPmCR_pQXCacfZAV9/preview', category: 'Documentary Style' },
    { src: 'https://drive.google.com/file/d/1Us9oO28sjfLtelPR5ZZ_GL9KlhESFeD6/preview', category: 'Documentary Style' },
    { src: 'https://drive.google.com/file/d/12DKvqdCPlauiWfQxAFlfANfOa19iT4Cn/preview', category: 'Anime Long Form' },
    { src: 'https://drive.google.com/file/d/1ULDUrM-j-fx40g7HgA6nggZPvCIbdR2_/preview', category: 'Anime Long Form' },
    { src: 'https://drive.google.com/file/d/1phDRwovujmjm77B6vT0NnVfvX9Fb8EM2/preview', category: 'Anime Long Form' },
    { src: 'https://drive.google.com/file/d/1DlDYiUlyCRQyBl-neNiCIV3szQnC-HtO/preview', category: 'Anime Long Form' },
    { src: 'https://drive.google.com/file/d/159CqKZBe0K7TcAe7C9_8YxOqBY2wreRa/preview', category: 'Long Videos' },
    { src: 'https://drive.google.com/file/d/12MfFG1fLFB_CvPKFO6gnPI4DjPAua4Dr/preview', category: 'Long Videos' },
    { src: 'https://drive.google.com/file/d/1fi_X2WKhl6-qbfXlQT7YtbOaUYAMcV7v/preview', category: 'Long Videos' },
    { src: 'https://drive.google.com/file/d/1gUIJWzf8vRuWZqXuNnxqjK_x7oaFYNdP/preview', category: 'Long Videos' },
    { src: 'https://drive.google.com/file/d/1QKFn-iT0_bB9EXXSCMqDQ5kxFCbK3VEg/preview', category: 'Long Videos' },
    { src: 'https://drive.google.com/file/d/1U0ibXya1jmLwoDj1qvnhGfsGOFguAZw-/preview', category: 'Short Form' },
    { src: 'https://drive.google.com/file/d/1Oc0P-J0UFW8bO3kgyJ99v6Qth9kCkS7e/preview', category: 'Short Form' },
    { src: 'https://drive.google.com/file/d/1JFzqJtAM67m52dcsSuQJQI4J3GCGNONc/preview', category: 'Short Form' },
    { src: 'https://drive.google.com/file/d/1ucc7-UAK-NF0VbRqAYrnKSe0FC95JK3l/preview', category: 'Short Form' },
    { src: 'https://drive.google.com/file/d/1yU77_jxd80W0KX7dcyZDyE-nZV7ae8V1/preview', category: 'Short Form' },
    { src: 'https://drive.google.com/file/d/124ojD_Mb47nT47jREAGuT4B97F-6DUGK/preview', category: 'Short Form' },
    { src: 'https://drive.google.com/file/d/1jlj2REncMmiYNLGY1KUby7OCtIkkiqH8/preview', category: 'Ads' },
    { src: 'https://drive.google.com/file/d/1UeL5PBnsxFE0sCouQjCwQ_zd4WVygHye/preview', category: 'Ads' },
    { src: 'https://drive.google.com/file/d/1J56RJ4AZaT7PpqsSmj6JZH1vhSkeH60r/preview', category: 'Ads' }
];


function displayVideos(category) {
    var container = document.getElementById("All");
    container.innerHTML = "";

    videos.forEach(video => {
        if (category == video.category || category == 'All') {
            //thumbnail extraction
            var thumbnailElement = document.createElement('img');
            var thumbnailid = video.src.split("/d/")[1].split("/preview")[0];
            thumbnailElement.src = 'https://drive.google.com/thumbnail?id='+thumbnailid;
            thumbnailElement.alt = 'Video Thumbnail';
            thumbnailElement.style.cursor = 'pointer';

            thumbnailElement.onclick = function() {
                var iframeElement = document.createElement('iframe');
                iframeElement.src = video.src;
                iframeElement.allowFullscreen = true;
                iframeElement.controls = true;
                container.innerHTML = ""; 
                container.appendChild(iframeElement);
            };
            container.appendChild(thumbnailElement);
        }
    });
}



window.onload = displayVideos('All');