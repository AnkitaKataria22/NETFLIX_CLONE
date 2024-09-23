import axios from "axios";
import http from "node:http";
import https from "node:https";

class AxiosCustomInstance {
  static instance;

  static getInstance() {
    if (!AxiosCustomInstance.instance) {
      const httpAgent = new http.Agent({
        maxSockets: 160,
        maxFreeSockets: 160,
        timeout: 60000,
        freeSocketTimeout: 30000,
        keepAliveMsecs: 60000,
      });
      const httpsAgent = new https.Agent({
        maxSockets: 160,
        maxFreeSockets: 160,
        timeout: 60000,
        freeSocketTimeout: 30000,
        keepAliveMsecs: 60000,
      });
      AxiosCustomInstance.instance = axios.create({
        httpAgent,
        httpsAgent,
      });
    }

    return AxiosCustomInstance.instance;
  }
}

export default AxiosCustomInstance;
