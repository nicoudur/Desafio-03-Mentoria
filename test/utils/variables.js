const configlocal = JSON.parse(open('../config/config.local.json'));

export function getBaseURL(){
    return __ENV.BASE_URL || configlocal.baseUrl;
}