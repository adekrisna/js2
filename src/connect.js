const LineAPI  = require('./api');

class LineConnect extends LineAPI {

  constructor(options) {
    super();

    if (typeof options !== 'undefined') {
      this.channelAccessToken = options.channelAccessToken;
      this.channelSecret = options.channelSecret;
      this.config.Headers['X-Line-Access'] = options.channelAccessToken;
    }
  }
  
  getQrFirst() {
    return new Promise((resolve,reject) => {
      this._qrCodeLogin().then(async (res) => {
        this.channelAccessToken = res.channelAccessToken;
        this.channelSecret = res.channelSecret;
        console.info(`[*] Token: ${this.channelAccessToken}`);
        console.info(`[*] channelSecret: ${res.channelSecret}\n`);
        let { mid, displayName } = await this._client.getProfile();
        console.info(`[*] mid: ${mid}\n`);
        console.info(`[*] Name: ${displayName}\n`);
        console.info(`NOTE: Dont forget , put your mid and admin on variable 'myBot' in main.js \n`);
        console.info(`Regrads Alfathdirk and thx for TCR Team \n`);
        console.info(`=======BOT RUNNING======\n`);
        await this._tokenLogin(this.channelAccessToken, this.channelSecret);
        resolve();
      });
    });
  }

  async startx () {
    if (typeof this.channelAccessToken != 'undefined'){
      await this._tokenLogin(this.channelAccessToken, this.channelSecret);
      this._client.removeAllMessages(); //Fix Chat Spam When Bot Started (This bug only appears when u are login using channelAccessToken)
      return this.longpoll();
    } else {
      return new Promise((resolve, reject) => {
        this.getQrFirst().then(async (res) => {
          resolve(this.longpoll());
        });
      })
    }
  }
  
  fetchOps(rev) {
    return this._fetchOps(rev, 1);
  }

  fetchOperations(rev) {
    return this._fetchOperations(rev, 5);
    
  }

  longpoll() {
    return new Promise((resolve, reject) => {
      this._fetchOps(this.revision, 1).then((operations) => {
        if (!operations) {
          console.log('No operations');
          reject('No operations');
          return;
        }
        return operations.map((operation) => {
              if(operation.revision.toString() != -1) {
                let revisionNum = operation.revision.toString();
                resolve({ revisionNum, operation });
              }
        });
      });
    });
  }

}

module.exports = LineConnect;
