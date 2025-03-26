const supertest = require('supertest');
const config = require('../config');

class BasePage {
    constructor() {
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    async sendRequest(method, path, headers = {}, data = null) {
        const combinedHeaders = { ...this.defaultHeaders, ...headers };

        const request = supertest(config.baseUrl);
        let req;

            switch (method.toUpperCase()) {
                case 'GET':
                    req = request.get(path);
                    break;
                case 'POST':
                    req = request.post(path);
                    break;
                case 'PUT':
                    req = request.put(path);
                    break;
                case 'DELETE':
                    req = request.delete(path);
                    break;
                case 'PATCH':
                    req = request.patch(path);
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }

            // Set headers
            Object.entries(combinedHeaders).forEach(([key, value]) => {
                req.set(key, value);
            });

            if (data) {
                // Convert data to string if it's an object
                const requestBody = typeof data === 'object' ? JSON.stringify(data) : data;
                req.send(requestBody);
            }

            const response = await new Promise((resolve, reject) => {
                req.end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });

        return response;
    }

    generateExternalId() {
        return Math.floor(Math.random() * 99999999) + 100000000;
    }
}

module.exports = BasePage;