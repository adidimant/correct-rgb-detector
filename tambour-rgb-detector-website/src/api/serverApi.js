import axios from 'axios';


export const getClosestColors = async (file) => {
    try {
        let closestColors = [];
        var bodyFormData = new FormData();
        bodyFormData.append('originalname', 'temp');
        bodyFormData.append('files', file);
        axios({
            method: "post",
            url: 'http://localhost:8080/getClosestColors',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                closestColors = response;
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        return closestColors;
    } catch (e) {
        console.log(`failed ` + e);
        return [];
    }
};